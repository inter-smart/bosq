"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

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

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { commonValidations } from "@/lib/validations";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

// Validation schema
const formSchema = z.object({
  fullName: commonValidations.name(),
  email: commonValidations.email(),
  phone: z.string().min(8, "Phone number is required"),
});

// Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]",
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
);

const errorStyle = cn("text-[#f17423]");

export default function AuthCreateForm() {
  const tAuth = useTranslations("auth.signup");
  const tCommon = useTranslations("auth.common");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const { register, isLoading, clearAuthError } = useAuth();
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const onSubmit = async (values) => {
    clearAuthError();
    setSuccess("");

    try {
      const phoneNumber = parsePhoneNumberFromString(values.phone);

      if (!phoneNumber || !phoneNumber.isValid()) {
        setSuccess(tAuth("invalid_phone"));
        return;
      }

      const payload = {
        name: values.fullName,
        email: values.email,
        countryCode: `+${phoneNumber.countryCallingCode}`,
        mobile: phoneNumber.nationalNumber,
      };

      const result = await register(payload);

      if (result.success) {
        setSuccess(tAuth("success"));
        toast.success(tAuth("success"));
        router.push("/otp-submission");
      } else {
        setSuccess(result.error || tAuth("error"));
        toast.error(result.error || tAuth("error"));
      }
    } catch (err) {
      console.error(err);
      setSuccess(err.message);
    }
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
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {tCommon("name_label")}<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder={tCommon("name_placeholder")}
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
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {tCommon("mobile_label")}<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="ae"
                  {...field}
                  className={cn(
                    inputStyle,
                    "w-full p-0 [&_input]:flex-1 [--react-international-phone-country-selector-border-color:#e9e9e9] [--react-international-phone-border-color:#e9e9e9] [--react-international-phone-height:35px] 2xl:[--react-international-phone-height:45px] [--react-international-phone-flag-width:20px] [--react-international-phone-flag-height:20px]",
                  )}
                  placeholder={tCommon("mobile_placeholder")}
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
                {tCommon("email_label")}<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className={inputStyle}
                  placeholder={tCommon("email_placeholder")}
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
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? tAuth("loading") : tAuth("submit")}
          </Button>
        </div>

        {/* Success/Error Message */}
        {success && !isLoading && (
          <p
            className={cn(
              "text-[10px] mt-1 w-full",
              success === tAuth("success") || success.includes("successfully")
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
