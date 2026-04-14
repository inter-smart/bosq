"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { toast } from "sonner";
import { API_URL } from "@/lib/api/client";
import { useTranslations } from "next-intl";
import { commonValidations, setValidationTranslator } from "@/lib/validations";

// Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]",
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
);

const errorStyle = cn("text-[#f17423]");

const textareaStyle = cn(
  inputStyle,
  "leading-tight min-h-[80px] 2xl:min-h-[100px] py-[15px] resize-none",
);

export default function ContactEnquiryForm({ locale }) {
  const t = useTranslations("form");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const tErrors = useTranslations("errors");

  const isEN = locale === "en";

  // ✅ inject translator (once per render is fine)
  setValidationTranslator(tErrors);

  const [selectedCountry, setSelectedCountry] = useState("ae");

  // Validation schema
  const formSchema = z.object({
    name: commonValidations.name(t("full_name")),
    email: commonValidations.email(),
    phone: commonValidations.phone(selectedCountry.toUpperCase()),
    message: commonValidations.message(t("message")),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const URL = `${API_URL}/api/frontend/enquiries/contact`;

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha("contact_enquiry_form");
      const normalizedPhone = values.phone.replace(/[^\d+]/g, "");

      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recaptcha_token: recaptchaToken,
          type: "contact",
          phone: normalizedPhone,
          ...values,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(isEN ? data?.message?.en : data?.message?.ar);
      }
      form.reset();

      console.log(data);
      toast.success(isEN ? data?.message?.en : data?.message?.ar);
    } catch (err) {
      console.error(err);
      toast.error(err);
      console.log(err);
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
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Phone */}
        {/* <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {t("phone_number")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  defaultCountry="ae"
                  {...field}
                  className={cn(
                    inputStyle,
                    "w-full p-0 [&_input]:flex-1 [--react-international-phone-country-selector-border-color:#e9e9e9] [--react-international-phone-border-color:#e9e9e9] [--react-international-phone-height:35px] 2xl:[--react-international-phone-height:45px] [--react-international-phone-flag-width:20px] [--react-international-phone-flag-height:20px]",
                  )}
                  placeholder={t("enter_mobile")}
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {t("phone_number")}
                <span className={errorStyle}>*</span>
              </FormLabel>

              <FormControl>
                <PhoneInput
                  value={field.value}
                  onChange={(phone, meta) => {
                    field.onChange(phone);
                    setSelectedCountry(meta.country.iso2);
                    // form.trigger("phone");
                  }}
                  defaultCountry="ae"
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className={cn(
                    inputStyle,
                    "w-full p-0 [&_input]:flex-1 [--react-international-phone-country-selector-border-color:#e9e9e9] [--react-international-phone-border-color:#e9e9e9] [--react-international-phone-height:35px] 2xl:[--react-international-phone-height:45px]"
                  )}
                  placeholder={t("enter_mobile")}
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
            <FormItem className="w-full">
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

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
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
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="w-full mt-1">
          <Button
            type="submit"
            variant="black"
            disabled={loading}
            className="min-w-[130px] 2xl:min-w-[200px]"
          >
            {loading ? t("submitting") : t("submit_now")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
