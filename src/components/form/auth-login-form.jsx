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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { commonValidations, setValidationTranslator } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
// Validation schema

// Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]",
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
);

const errorStyle = cn("text-[#f17423]");

export default function AuthLoginForm({ locale, data }) {
  const tAuth = useTranslations("auth.login");
  const tCommon = useTranslations("auth.common");
  const tErrors = useTranslations("errors");

  const isEN = locale === "en";
  // ✅ inject translator (once per render is fine)
  setValidationTranslator(tErrors);

  const formSchema = z.object({
    email: commonValidations.email(),
    password: commonValidations.password(),
    rememberMe: commonValidations.rememberMe,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { login, isAuthenticated, isLoading, clearAuthError } = useAuth();
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || `/${locale}`;
  const activity = searchParams.get("activity") || null;

  // Guard: if already logged in (e.g. browser back button), redirect away
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  useEffect(() => {
    if (activity && activity === "wishlist")
      toast.error("Please login to access your wishlist.", {
        id: "wishlist-auth",
      });
  }, [activity]);

  const onSubmit = async (values) => {
    try {
      clearAuthError();

      const result = await login(values);
      if (result?.success) {
        toast.success(tAuth("success"));
        setIsRedirecting(true);
      } else {
        toast.error(isEN ? result.error.en : result.error.ar || tAuth("error"));
      }
    } catch (error) {
      toast.error(isEN ? error?.en : (error?.ar ?? tAuth("error")));
    }
  };

  const toggleStyle = cn(
    "absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700",
    locale === "ar" ? "left-3" : "right-3",
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {tCommon("email_label")}
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

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {tCommon("password_label")}
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
                    placeholder={tCommon("password_placeholder")}
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

        {/* Remember Me & Forgot Password */}
        <div className="w-full flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label htmlFor="rememberMe" className={labelStyle}>
                  {tCommon("remember_me")}
                </Label>
              </FormItem>
            )}
          />
          <Button
            variant="link"
            className="font-light h-auto! p-0 text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px]"
            asChild
          >
            <Link href={`/${locale}/forgot-password`}>
              {tAuth("forgot_password")}
            </Link>
          </Button>
        </div>

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
      </form>

      {/* Redirect overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="h-10 w-10 rounded-full border-4 border-[#e9e9e9] border-t-[#f17423] animate-spin" />
        </div>
      )}
    </Form>
  );
}
