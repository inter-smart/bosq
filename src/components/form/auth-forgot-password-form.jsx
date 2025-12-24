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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

// Step 1: Email validation schema
const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Step 2: OTP validation schema
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

// Step 3: Password validation schema
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]"
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1"
);

const errorStyle = cn("text-[#f17423]");

export default function AuthForgotPasswordForm() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
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
    setLoading(true);
    setSuccess("");

    // Simulate API call for local testing
    setTimeout(() => {
      console.log("Step 1 - Email:", values.email);
      setEmail(values.email);
      setSuccess("OTP sent to your email!");
      setLoading(false);

      setTimeout(() => {
        setStep(2);
        setSuccess("");
      }, 1500);
    }, 1000);

    // TODO: Connect to API when ready
    // try {
    //   const res = await fetch("http://localhost:1337/api/auth/forgot-password", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: values.email }),
    //   });
    //   if (!res.ok) throw new Error("Failed to send OTP");
    //   setEmail(values.email);
    //   setSuccess("OTP sent to your email!");
    //   setTimeout(() => {
    //     setStep(2);
    //     setSuccess("");
    //   }, 1500);
    // } catch (err) {
    //   console.error(err);
    //   setSuccess("Email not found. Please try again.");
    // }
    // setLoading(false);
  };

  // Step 2: Verify OTP
  const onSubmitOtp = async (values) => {
    setLoading(true);
    setSuccess("");

    // Simulate API call for local testing
    setTimeout(() => {
      console.log("Step 2 - OTP:", values.otp, "Email:", email);

      // Accept any 6-digit OTP for testing
      if (values.otp.length === 6) {
        setSuccess("OTP verified successfully!");
        setLoading(false);

        setTimeout(() => {
          setStep(3);
          setSuccess("");
        }, 1500);
      } else {
        setSuccess("Invalid OTP. Please try again.");
        setLoading(false);
      }
    }, 1000);

    // TODO: Connect to API when ready
    // try {
    //   const res = await fetch("http://localhost:1337/api/auth/verify-reset-otp", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, otp: values.otp }),
    //   });
    //   if (!res.ok) throw new Error("Invalid OTP");
    //   setSuccess("OTP verified successfully!");
    //   setTimeout(() => {
    //     setStep(3);
    //     setSuccess("");
    //   }, 1500);
    // } catch (err) {
    //   console.error(err);
    //   setSuccess("Invalid OTP. Please try again.");
    // }
    // setLoading(false);
  };

  // Step 3: Reset password
  const onSubmitPassword = async (values) => {
    setLoading(true);
    setSuccess("");

    // Simulate API call for local testing
    setTimeout(() => {
      console.log("Step 3 - Password Reset:", {
        email,
        password: values.password,
      });

      setSuccess("Password reset successfully!");
      setLoading(false);

      // Simulate redirect to login after 2 seconds
      setTimeout(() => {
        console.log("Redirecting to /login...");
        // Uncomment when ready: window.location.href = "/login";
      }, 2000);
    }, 1000);

    // TODO: Connect to API when ready
    // try {
    //   const res = await fetch("http://localhost:1337/api/auth/reset-password", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       email,
    //       password: values.password,
    //     }),
    //   });
    //   if (!res.ok) throw new Error("Failed to reset password");
    //   setSuccess("Password reset successfully!");
    //   setTimeout(() => {
    //     window.location.href = "/login";
    //   }, 2000);
    // } catch (err) {
    //   console.error(err);
    //   setSuccess("Something went wrong. Please try again.");
    // }
    // setLoading(false);
  };

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
                    Email<span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className={inputStyle}
                      placeholder="Enter your email"
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
                disabled={loading}
                className="w-full"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>

            {success && !loading && (
              <p
                className={cn(
                  "text-[10px] mt-1 w-full",
                  success.includes("sent") ? "text-green-600" : "text-red-600"
                )}
              >
                {success}
              </p>
            )}
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
                    Enter OTP<span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
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
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={5} />
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
                disabled={loading}
                className="w-full"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>

            {success && !loading && (
              <p
                className={cn(
                  "text-[10px] mt-1 w-full",
                  success.includes("verified")
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {success}
              </p>
            )}
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
                    New Password<span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className={cn(inputStyle, "pr-10")}
                        placeholder="Choose a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                    Confirm Password<span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        className={cn(inputStyle, "pr-10")}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
                disabled={loading}
                className="w-full"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </div>

            {success && !loading && (
              <p
                className={cn(
                  "text-[10px] mt-1 w-full",
                  success.includes("successfully")
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {success}
              </p>
            )}
          </form>
        </Form>
      )}
    </div>
  );
}
