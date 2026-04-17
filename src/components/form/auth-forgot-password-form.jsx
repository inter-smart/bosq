"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { commonValidations, setValidationTranslator } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function AuthForgotPasswordForm({ locale, setStep, step }) {
  const t = useTranslations("auth.forgot_password");

  const tErrors = useTranslations("errors");
  
  
        // ✅ inject translator (once per render is fine)
    setValidationTranslator(tErrors);

  // Step 1: Email validation schema
  const emailSchema = z.object({
    email:commonValidations.email(),
  });

  // Step 2: OTP validation schema
  const otpSchema = z.object({
    otp: commonValidations.otp(),
  });

  // Step 3: Password validation schema
  const passwordSchema = z
    .object({
      password: commonValidations.password(),
      confirmPassword: commonValidations.password(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("error_match"),
      path: ["confirmPassword"],
    });

  // Shared styles
  const labelStyle = cn(
    "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]",
  );

  const inputStyle = cn(
    "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
  );

  const errorStyle = cn("text-[#f17423]");

  const {
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    pendingEmail,
    isAuthenticated,
    isLoading,
    clearAuthError,
  } = useAuth();

  const router = useRouter();

  // Guard: if already logged in (e.g. browser back button), redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(`/${locale}`);
    }
  }, [isAuthenticated, locale, router]);

  const isEN = locale === "en";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 1: Email form
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  // Step 2: OTP form
  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Step 3: Password form
  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Step 1: Submit email
  const onSubmitEmail = async (values) => {
    clearAuthError();

    const result = await forgotPassword(values.email);

    if (result.success) {
      toast.success(t("success_send"));
      setTimeout(() => { setStep(2); }, 1500);
    } else {
      toast.error(isEN ? result.error?.en : result.error?.ar || t("error_send"));
    }
  };

  // Step 2: Verify OTP
  const onSubmitOtp = async (values) => {
    clearAuthError();

    const result = await verifyResetOtp(values.otp, pendingEmail);

    if (result.success) {
      toast.success(t("success_verify"));
      setTimeout(() => { setStep(3); }, 1500);
    } else {
      toast.error(isEN ? result.error?.en : result.error?.ar || t("error_verify"));
    }
  };

  // Step 3: Reset password
  const onSubmitPassword = async (values) => {
    clearAuthError();

    const result = await resetPassword(values.password);

    if (result.success) {
      toast.success(t("success_reset"));
      setTimeout(() => { window.location.href = `/${locale}/login`; }, 2000);
    } else {
      toast.error(isEN ? result.error?.en : result.error?.ar || t("error_reset"));
    }
  };

  const toggleStyle = cn(
    "absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700",
    locale === "ar" ? "left-3" : "right-3",
  );

  return (
    <div className="w-full">
      {/* Step 1: Email */}
      {step === 1 && (
        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit(onSubmitEmail)}
            className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
          >
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className={labelStyle}>
                    {t("email_label")}<span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className={inputStyle}
                      placeholder={t("email_placeholder")}
                    />
                  </FormControl>
                  <FormMessage className={errorStyle} />
                </FormItem>
              )}
            />

            <div className="w-full mt-1">
              <Button
                type="submit"
                variant="black"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? t("loading_send") : t("submit_email")}
              </Button>
            </div>

          </form>
        </Form>
      )}

      {/* Step 2: OTP */}
      {step === 2 && (
        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onSubmitOtp)}
            className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
          >
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className={labelStyle}>
                    {t("otp_label")}<span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={4}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className={errorStyle} />
                </FormItem>
              )}
            />

            <div className="w-full mt-1">
              <Button
                type="submit"
                variant="black"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? t("loading_verify") : t("submit_otp")}
              </Button>
            </div>

          </form>
        </Form>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
            className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
          >
            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className={labelStyle}>
                    {t("password_label")}<span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className={cn(
                          inputStyle,
                          locale === "ar" ? "pl-10" : "pr-10",
                        )}
                        placeholder={t("password_placeholder")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={cn(toggleStyle)}
                      >
                        {showPassword ? (
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

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className={labelStyle}>
                    {t("confirm_password_label")}<span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        className={cn(
                          inputStyle,
                          locale === "ar" ? "pl-10" : "pr-10",
                        )}
                        placeholder={t("confirm_password_placeholder")}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
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

            <div className="w-full mt-1">
              <Button
                type="submit"
                variant="black"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? t("loading_reset") : t("submit_password")}
              </Button>
            </div>

          </form>
        </Form>
      )}
    </div>
  );
}
