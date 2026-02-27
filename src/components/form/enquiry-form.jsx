"use client";

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

export default function EnquiryForm({ locale }) {
  const t = useTranslations("form");



  const tErrors = useTranslations("errors");

  setValidationTranslator(tErrors);

  const [selectedCountry, setSelectedCountry] = useState("ae");

  // ✅ Validation schema
const formSchema = z.object({
  name: commonValidations.name(t("full_name")),
  email: commonValidations.email(),
  phone: commonValidations.phone(selectedCountry.toUpperCase()),
  additionalDetails: commonValidations.message(t("message")),
});


const isEn = locale === "en";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      additionalDetails: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const URL = `${API_URL}/api/frontend/enquiries/contact`;

  const onSubmit = async (values) => {
    if (!executeRecaptcha) {
      toast.error(t("submit_error"));
      return;
    }

    setLoading(true);
    setSuccess(null);

    try {
      const recaptchaToken = await executeRecaptcha("lead_generation_form");
      const normalizedPhone = values.phone.replace(/[^\d+]/g, "");

      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          phone: normalizedPhone,
          message: values.additionalDetails,
          recaptcha_token: recaptchaToken,
          type: "lead-generation",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error((isEn ? data?.message?.en : data?.message?.ar) || t("submit_error"));
      } else {
        const msg = (isEn ? data?.message?.en : data?.message?.ar) || t("success_message");
        toast.success(msg);
        form.reset();
        setSuccess(msg);
      }
    } catch (err) {
      const msg = (isEn ? err?.en : err?.ar) || t("submit_error");
      toast.error(msg);
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
                {t("full_name")}<span className={errorStyle}>*</span>
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
                {t("phone_number")}<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  value={field.value}
                  onChange={(phone, meta) => {
                    field.onChange(phone);
                    setSelectedCountry(meta.country.iso2);
                  }}
                  defaultCountry="ae"
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className={cn(
                    inputStyle,
                    "w-full p-0 [&_input]:flex-1 [--react-international-phone-country-selector-border-color:#bababa] [--react-international-phone-border-color:#bababa] [--react-international-phone-height:35px] 2xl:[--react-international-phone-height:45px]",
                  )}
                  placeholder={t("enter_phone")}
                />
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
                {t("email_id")}<span className={errorStyle}>*</span>
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
