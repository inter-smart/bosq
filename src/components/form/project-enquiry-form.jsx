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
import { cn } from "@/lib/utils";
import { PhoneInput, parseCountry, defaultCountries } from "react-international-phone";
import "react-international-phone/style.css";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";
import { API_URL } from "@/lib/api/client";
import { useTranslations } from "next-intl";
import { commonValidations, setValidationTranslator } from "@/lib/validations";

// ✅ Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]",
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#bababa] rounded-[4px] px-[15px] focus-visible:ring-1",
);

const errorStyle = cn("text-[#f17423]");

const textareaStyle = cn(
  inputStyle,
  "leading-tight min-h-[80px] 2xl:min-h-[100px] py-[15px] resize-none",
);

export default function ProjectEnquiryForm({ projectId, locale }) {
  const isEN = locale === "en";

  const t = useTranslations("form");

  const tErrors = useTranslations("errors");

  setValidationTranslator(tErrors);

  const [selectedCountry, setSelectedCountry] = useState("ae");
  const [formKey, setFormKey] = useState(0);
  const [success, setSuccess] = useState(null);
  const phoneWrapperRef = useRef(null);

  // Build a static iso2 → country name lookup from the library's bundled data
  const countryNameMap = useRef(
    Object.fromEntries(defaultCountries.map((c) => { const p = parseCountry(c); return [p.iso2, p.name]; }))
  );

  // Patch alt + title on every flag <img data-country="..."> inside the phone wrapper.
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
    const id = requestAnimationFrame(patchAllFlags.current);
    return () => cancelAnimationFrame(id);
  }, [selectedCountry]);

  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    additionalDetails: "",
  };

  // ✅ Validation schema
  const formSchema = useMemo(
    () =>
      z.object({
        name: commonValidations.name(t("full_name")),
        email: commonValidations.email(),
        phone: commonValidations.phone(selectedCountry.toUpperCase()),
        additionalDetails: commonValidations.message(t("message")),
      }),
    [selectedCountry, t],
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const [loading, setLoading] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const URL = `${API_URL}/api/frontend/enquiries/project`;

  const onSubmit = async (values) => {
    setLoading(true);
    setSuccess(null);

    try {
      const recaptchaToken = await executeRecaptcha("project_enquiry_form");
      const normalizedPhone = values.phone.replace(/[^\d+]/g, "");

      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          phone: normalizedPhone,
          message: values.additionalDetails,
          project_id: projectId || null,
          recaptcha_token: recaptchaToken,
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
        setSuccess(isEN ? data?.message?.en : data?.message?.ar || t("success_message"));

        setTimeout(() => {
          form.reset(defaultValues);
          form.clearErrors();
          setFormKey((prev) => prev + 1);
        }, 100);
      }
    } catch (err) {
      toast.error(isEN ? err?.en : err?.ar || t("submit_error"));
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {t("full_name")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder={t("enter_name")}
                />
              </FormControl>
              <FormMessage />
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
                    value={field.value}
                    onChange={(phone, meta) => {
                      const countryIso = meta.country.iso2;
                      const callingCode = `+${meta.country.callingCode}`;

                      if (phone !== field.value) {
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
                    defaultCountry={selectedCountry}
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    className={cn(
                      inputStyle,
                      "w-full p-0 [&_input]:flex-1 [--react-international-phone-country-selector-border-color:#bababa] [--react-international-phone-border-color:#bababa] [--react-international-phone-height:35px] 2xl:[--react-international-phone-height:45px]",
                    )}
                    placeholder={t("enter_phone")}
                  />
                </div>
              </FormControl>
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Details */}
        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>{t("tell_us_more")}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className={textareaStyle}
                  placeholder={t("form_placeholder_project")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="w-full mt-2 flex">
          <Button
            type="submit"
            variant={"black"}
            disabled={loading}
            className="min-w-[120px] 2xl:min-w-40 ml-auto cursor-pointer"
          >
            {loading ? t("submitting") : t("submit_enquiry")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
