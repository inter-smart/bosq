"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect, useMemo } from "react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { PhoneInput, parseCountry, defaultCountries } from "react-international-phone";
import "react-international-phone/style.css";
import { commonValidations, setValidationTranslator } from "@/lib/validations";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";
import { API_URL } from "@/lib/api/client";
import { useTranslations } from "next-intl";

// Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-[#282828]",
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] data-[size=default]:h-[35px] 2xl:data-[size=default]:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
);

const errorStyle = cn("text-[#f17423]");

const textareaStyle = cn(
  inputStyle,
  "leading-tight min-h-[80px] 2xl:min-h-[100px] py-[15px] resize-none",
);

export default function RequestEnquiryForm({
  locale = "en",
  states,
  dropdownData,
}) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("ae");
  const [formKey, setFormKey] = useState(0);
  const phoneWrapperRef = useRef(null);

  // Build a static iso2 → country name lookup from the library's bundled data
  const countryNameMap = useRef(
    Object.fromEntries(defaultCountries.map((c) => { const p = parseCountry(c); return [p.iso2, p.name]; }))
  );

  // Patch alt + title on every flag <img data-country="..."> inside the phone wrapper.
  // The library renders all flags in the DOM from mount (dropdown uses display:none/block),
  // so a single pass after paint is enough. Re-run when the selected country changes so
  // the button flag is also kept in sync.
  const patchAllFlags = useRef(() => {
    const wrapper = phoneWrapperRef.current;
    if (!wrapper) return;
    wrapper.querySelectorAll("img[data-country]").forEach((img) => {
      const iso2 = img.getAttribute("data-country");
      const name = countryNameMap.current[iso2] ?? iso2;
      if (name) {
        img.alt = name;
        img.title = name;
      }
    });
  });

  useEffect(() => {
    // Use rAF so the DOM is fully painted before we query
    const id = requestAnimationFrame(patchAllFlags.current);
    return () => cancelAnimationFrame(id);
  }, [selectedCountry]);

  const isEN = locale === "en";
  const t = useTranslations("form");

  const tErrors = useTranslations("errors");

  setValidationTranslator(tErrors);

  const nameMin1 = (field) =>
    z
      .string()
      .trim()
      .min(1, tErrors("required", { field }))
      .max(100, tErrors("max_length", { field, max: 100 }))
      .refine((val) => !/[\t\n\r]/.test(val), tErrors("invalid_whitespace", { field }))
      .refine((val) => /^[\p{L}][\p{L}\s'-]*$/u.test(val), tErrors("invalid_characters", { field }))
      .refine((val) => !/\d/.test(val), tErrors("no_numbers", { field }))
      .refine(
        (val) => !/(<script>|<\/script>|javascript:|alert\(|onerror=|onload=)/i.test(val),
        tErrors("invalid_content", { field }),
      )
      .refine(
        (val) => !/('|--|;|\/\*|\*\/| OR | AND )/i.test(val),
        tErrors("invalid_content", { field }),
      );

  // Validation schema
  const formSchema = useMemo(() =>
      z.object({
        firstName: nameMin1(t("first_name")),
        lastName: nameMin1(t("last_name")),
        companyName: commonValidations.optionalString(),
        email: commonValidations.email(),
        phone: commonValidations.phone(selectedCountry.toUpperCase()),
        state: commonValidations.region(),
        dropdown_id: commonValidations.dropdown(),
        message: commonValidations.message(t("message")),
      }),
    [selectedCountry, t],
  );

  const defaultValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    state: "",
    dropdown_id: "",
    message: "",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setSuccess(null);
    try {
      const recaptchaToken = await executeRecaptcha(
        "customization_enquiry_form",
      );
      const URL = `${API_URL}/api/frontend/enquiries/customization`;

      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recaptcha_token: recaptchaToken,
          first_name: values.firstName,
          last_name: values.lastName,
          state_id: values.state,
          company_name: values.companyName,
          dropdown_id: values.dropdown_id
            ? Number(values.dropdown_id)
            : undefined,
          ...values,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(
          isEN ? data?.message?.en : data?.message?.ar || t("submit_error"),
        );
      } else {
        toast.success(
          isEN ? data?.message?.en : data?.message?.ar || t("success_message"),
        );
        setSuccess(
          isEN ? data?.message?.en : data?.message?.ar || t("success_message"),
        );

        setTimeout(() => {
          form.reset(defaultValues);
          form.clearErrors();
          setFormKey((prev) => prev + 1);
        }, 100);
      }
    } catch (err) {
      setSuccess(isEN ? err?.en : err?.ar || t("submit_error"));
      toast.error(isEN ? err?.en : err?.ar || t("submit_error"));
    }

    setLoading(false);
  };

  const hasData = Array.isArray(dropdownData) && dropdownData.length > 0;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
      >
        {/* First Name */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {t("first_name")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder={t("enter_first_name")}
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {t("last_name")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder={t("enter_last_name")}
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>{t("company_name")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder={t("enter_company_name")}
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {t("email_id")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className={inputStyle}
                  placeholder={t("enter_email_id")}
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {t("phone_number")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <div ref={phoneWrapperRef}>
                  <PhoneInput
                    key={formKey}
                    defaultCountry={selectedCountry}
                    value={field.value}
                    onChange={(phone, meta) => {
                      const countryIso = meta.country.iso2;
                      const callingCode = `+${meta.country.callingCode}`;

                      if (phone !== field.value) {
                        // If it's just the prefix being added to an empty field, don't trigger onChange
                        if (!field.value && phone.trim() === callingCode) {
                          form.setValue("phone", "", { shouldValidate: false });
                          return;
                        }
                        field.onChange(phone);
                      }

                      if (countryIso !== selectedCountry) {
                        setSelectedCountry(countryIso);
                      }
                    }}
                    className={cn(
                      inputStyle,
                      "w-full p-0 [&_input]:flex-1 [--react-international-phone-country-selector-border-color:#e9e9e9] [--react-international-phone-border-color:#e9e9e9] [--react-international-phone-height:35px] 2xl:[--react-international-phone-height:45px] [--react-international-phone-flag-width:20px] [--react-international-phone-flag-height:20px]",
                    )}
                    placeholder={t("enter_mobile")}
                  />
                </div>
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Region */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {t("location_placeholder")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <Select
                dir={locale === "ar" ? "rtl" : "ltr"}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className={cn(inputStyle, "w-full")}>
                    <SelectValue placeholder={t("select_state")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states?.map((item, index) => (
                    <SelectItem
                      key={index}
                      value={item.id.toString()}
                      className={labelStyle}
                    >
                      {item?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* What can we help with */}
        <FormField
          control={form.control}
          name="dropdown_id"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {t("help_with")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <Select
                dir={locale === "ar" ? "rtl" : "ltr"}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className={cn(inputStyle, "w-full")}>
                    <SelectValue placeholder={t("select_option")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {hasData ? (
                    dropdownData.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.id.toString()}
                        className={labelStyle}
                      >
                        {isEN ? item.title : item.title_ar}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                      {t("no_data")}
                    </div>
                  )}
                </SelectContent>
              </Select>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>{t("message")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className={textareaStyle}
                  placeholder={t("form_placeholder_inquiry")}
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="w-full mt-2 flex">
          <Button
            type="submit"
            variant="black"
            disabled={loading}
            className="min-w-[120px] 2xl:min-w-40"
          >
            {loading ? t("submitting") : t("enquire_now")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
