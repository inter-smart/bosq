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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { fetchFromAPIWithCredentials } from "@/lib/helper";
import { commonValidations } from "@/lib/validations";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useTranslations } from "next-intl";

// Validation schema
const formSchema = z.object({
  firstName: commonValidations.name("First name"),
  lastName: commonValidations.name("Last name"),
  displayName: commonValidations.name("Display name"),
  email: commonValidations.email(),
  phone: commonValidations.phone(),
});

// Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-[#282828]",
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
);

const errorStyle = cn("text-[#f17423]");

export default function PersonalInformationForm({ data }) {
  const t = useTranslations("account");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      displayName: data?.displayName || "",
      email: data?.email || "",
      phone: data?.phone || "",
    },
  });

  console.log("datasL", data);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (values) => {
    setLoading(true);
    setSuccess(null);

    try {
      // Parse phone number to extract country code and mobile
      const parsedPhone = parsePhoneNumberFromString(values.phone);
      const countryCode = parsedPhone?.countryCallingCode
        ? `+${parsedPhone.countryCallingCode}`
        : "";
      const mobile = parsedPhone?.nationalNumber || values.phone;

      // Map form fields to backend expected format
      const profileData = {
        first_name: values.firstName,
        last_name: values.lastName,
        display_name: values.displayName,
        email: values.email,
        country_code: countryCode,
        mobile: mobile,
      };

      const recaptchaToken = await executeRecaptcha(
        "personal_information_form",
      );

      const result = await fetchFromAPIWithCredentials(
        "/api/frontend/profile/edit-profile",
        {
          method: "PUT",
          body: JSON.stringify({
            recaptcha_token: recaptchaToken,
            ...profileData,
          }),
        },
      );

      if (!result.error) {
        setSuccess(t("success_info_update"));
      } else {
        setSuccess(result.message || t("error_info_update"));
      }
    } catch (err) {
      console.error(err);
      setSuccess(err.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    form.reset({
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      phone: "",
    });
    setSuccess(null);
  };

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
                {t("first_name")}<span className={errorStyle}>*</span>
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
                {t("last_name")}<span className={errorStyle}>*</span>
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

        {/* Display Name */}
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {t("display_name")}<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder={t("display_name_desc")}
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
                {t("email_address")}<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className={inputStyle}
                  disabled={true}
                  placeholder={t("enter_email")}
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
                {t("phone")}<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="ae"
                  value={field.value || ""}
                  onChange={(value) => field.onChange(value)}
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
        />

        {/* Submit and Reset Buttons */}
        <div className="w-full mt-2 flex gap-2.5">
          <Button
            type="submit"
            variant="black"
            disabled={loading}
            className="min-w-[120px] 2xl:min-w-40"
          >
            {loading ? t("saving") : t("save_changes")}
          </Button>

          <Button
            type="button"
            variant="white"
            onClick={handleReset}
            className="min-w-[80px] xl:min-w-[90px] 2xl:min-w-[120px] border border-black hover:border-[#f17423]"
          >
            {t("reset")}
          </Button>
        </div>

        {/* Success/Error Message */}
        {success && !loading && (
          <p
            className={cn(
              "text-[10px] mt-1 w-full",
              success.includes(t("success_info_update"))
                ? "text-green-600"
                : "text-red-600",
            )}
          >
            {success}
          </p>
        )}
      </form>
    </Form>
  );
}
