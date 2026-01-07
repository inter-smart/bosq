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

// Validation schema
const formSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function PasswordChangeForm({ locale }) {
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
    setSuccess(null);

    // Simulate API call for local testing
    setTimeout(() => {
      console.log("Password Change:", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      form.reset();
      setSuccess("Password changed successfully!");
      setLoading(false);
    }, 1000);

    // TODO: Connect to API when ready
    // try {
    //   const res = await fetch("http://localhost:1337/api/auth/change-password", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       currentPassword: values.currentPassword,
    //       newPassword: values.newPassword,
    //     }),
    //   });
    //   if (!res.ok) throw new Error("Failed to change password");
    //   form.reset();
    //   setSuccess("Password changed successfully!");
    // } catch (err) {
    //   console.error(err);
    //   setSuccess("Current password is incorrect. Please try again.");
    // }
    // setLoading(false);
  };

  // Shared styles
  const labelStyle = cn(
    "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-[#282828]"
  );

  const inputStyle = cn(
    "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
    locale === "ar" ? "pl-10" : "pr-10"
  );
  const toggleStyle = cn(
    "absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700",
    locale === "ar" ? "left-3" : "right-3"
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
                Current Password<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showCurrentPassword ? "text" : "password"}
                    className={cn(inputStyle)}
                    placeholder="Enter your current password"
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
                New Password<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showNewPassword ? "text" : "password"}
                    className={cn(inputStyle)}
                    placeholder="Choose a strong password"
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
        <div className="w-full mt-2 flex gap-2.5">
          <Button
            type="submit"
            variant="black"
            disabled={loading}
            className="min-w-[120px] 2xl:min-w-40"
          >
            {loading ? "Changing..." : "Change Password"}
          </Button>
        </div>

        {/* Success/Error Message */}
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
  );
}
