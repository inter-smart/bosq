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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { fetchFromAPIWithCredentials } from "@/lib/helper";
import { useTranslations } from "next-intl";
import { commonValidations } from "@/lib/validations";
import { toast } from "sonner";

export default function PasswordChangeForm({ locale }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const t = useTranslations("account");

  const isEn = locale === "en";
  // Validation schema — defined inside component so messages are translated
  const formSchema = z
    .object({
      currentPassword: commonValidations.password(),
      newPassword: commonValidations.password(),
      confirmPassword: z.string().min(1, t("confirm_password_required")),
    })
    .superRefine((data, ctx) => {
      if (data.newPassword === data.currentPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("password_same_as_current"),
          path: ["newPassword"],
        });
      }
      if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("password_mismatch"),
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);

    const recaptchaToken = await executeRecaptcha("change_password_form");
    try {
      const { error, message } = await fetchFromAPIWithCredentials(
        "/api/frontend/profile/change-password",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recaptcha_token: recaptchaToken,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          }),
        },
      );

      if (error) {
        toast.error(isEn ? message?.en : message?.ar);
      }
      else{
        form.reset();
        toast.success((isEn ? message?.en : message?.ar) || t("password_changed_successfully"));
      }
    } catch (err) {
      console.error(err);
      toast.error(isEn ? err?.en : err?.ar );
    } finally {
      setLoading(false);
    }
  };

  // Shared styles
  const labelStyle = cn(
    "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-[#282828]",
  );

  const inputStyle = cn(
    "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
    locale === "ar" ? "pl-10" : "pr-10",
  );
  const toggleStyle = cn(
    "absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700",
    locale === "ar" ? "left-3" : "right-3",
  );

  const errorStyle = cn("text-[#f17423]");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
      >
        {/* Current Password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {t("current_password")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showCurrentPassword ? "text" : "password"}
                    className={cn(inputStyle)}
                    placeholder={t("enter_current_password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className={cn(toggleStyle)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {t("new_password")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.trigger("confirmPassword");
                    }}
                    type={showNewPassword ? "text" : "password"}
                    className={cn(inputStyle)}
                    placeholder={t("new_password_placeholder")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={cn(toggleStyle)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {t("confirm_new_password")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    className={cn(inputStyle)}
                    placeholder={t("confirm_password_placeholder")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={cn(toggleStyle)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="w-full mt-2 flex gap-2.5">
          <Button
            type="submit"
            variant="black"
            disabled={loading}
            className="min-w-[120px] 2xl:min-w-40"
          >
            {loading ? t("changing") : t("change_password")}
          </Button>
        </div>

        {/* Success/Error Message */}
        {success && !loading && (
          <p
            className={cn(
              "text-[10px] mt-1 w-full",
              success === "Password changed successfully" ||
                success?.toLowerCase().includes("success")
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
