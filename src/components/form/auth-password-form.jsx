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
import { Eye, EyeOff } from "lucide-react";
import { commonValidations } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

// Validation schema
const formSchema = z
  .object({
    password: commonValidations.password(),
    confirmPassword: commonValidations.password(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function AuthPasswordForm({ locale }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { createPassword, isLoading, clearAuthError } = useAuth();
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (values) => {
    clearAuthError();
    setSuccess("");

    const result = await createPassword(values.password);

    if (result.success) {
      setSuccess("Password created successfully!");
      router.push("login");
    } else {
      setSuccess(result.error || "Something went wrong. Please try again.");
    }
  };

  // Shared styles
  const labelStyle = cn(
    "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]",
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
        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                Password<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className={cn(inputStyle)}
                    placeholder="Choose a strong password"
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

        {/* Confirm Password */}
        <FormField
          control={form.control}
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
                    className={cn(inputStyle)}
                    placeholder="Confirm your password"
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
        <div className="w-full mt-1">
          <Button
            type="submit"
            variant="black"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Creating..." : "Create Password"}
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
