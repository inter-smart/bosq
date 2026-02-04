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

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { commonValidations } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

// Validation schema
const formSchema = z.object({
  otp: commonValidations.otp,
});

// Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]",
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] focus-visible:ring-1",
  // "bg-red-500"
);

const errorStyle = cn("text-[#f17423]");

export default function AuthOtpForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { verifyOtp, pendingEmail, isLoading, clearAuthError } = useAuth();
  const [success, setSuccess] = useState("");

  const router = useRouter();
  const onSubmit = async (values) => {
    clearAuthError();
    setSuccess("");

    const result = await verifyOtp(values.otp, pendingEmail);

    if (result.success) {
      setSuccess("OTP verified successfully!");
      router.push("/create-password");
    } else {
      setSuccess(result.error || "Invalid OTP. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
      >
        {/* OTP Input */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>Enter OTP</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={4}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className={inputStyle} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} className={inputStyle} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} className={inputStyle} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className={inputStyle} />
                  </InputOTPGroup>
                </InputOTP>
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
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>

        {/* Success/Error Message */}
        {success && !isLoading && (
          <p
            className={cn(
              "text-[10px] mt-1 w-full",
              success.includes("successfully")
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
