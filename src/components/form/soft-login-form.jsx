"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { fetchCart } from "@/store/slices/cartSlice";
import { fetchUserProfile } from "@/store/slices/authSlice";
import GoogleLoginButton from "@/components/form/google-login-button";

// Shared styles
const labelStyle = cn("text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]");

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
);

const errorStyle = cn("text-[#f17423]");

export default function SoftLoginForm({ locale }) {
  const { login } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const tAuth = useTranslations("auth");
  const tValidation = useTranslations("validation");
  const tCommon = useTranslations("common");

  const formSchema = z.object({
    email: z.string().email(tValidation("email.invalid_format")).max(100, tValidation("email.max")),
    password: z.string().min(6, tValidation("password.min")).max(100, tValidation("password.max")),
    rememberMe: z.boolean().default(false),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setLoading(true);
    setError(null);

    const result = await login({
      email: values.email,
      password: values.password,
    });

    if (!result.success) {
      const errMsg = result.error?.message || result.error || tAuth("login.error");
      setError(typeof errMsg === "string" ? errMsg : tAuth("login.error"));
      setLoading(false);
      return;
    }

    // Fetch full user profile (name, etc.) and sync cart after login
    dispatch(fetchUserProfile());
    dispatch(fetchCart());

    // Navigate to the same checkout URL to force server components to re-fetch
    // the merged cart while preserving the ?flow= param
    const url = new URL(window.location.href);
    url.searchParams.delete("type");

    window.location.replace(url.pathname + (url.search ? url.search : ""));

    setLoading(false);
  };

  const handleGoogleSuccess = () => {
    dispatch(fetchUserProfile());
    dispatch(fetchCart());
    const url = new URL(window.location.href);
    url.searchParams.delete("type");

    window.location.replace(url.pathname + (url.search ? url.search : ""));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {tAuth("common.email_label")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" className={inputStyle} placeholder={tAuth("common.email_placeholder")} />
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
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {tAuth("common.password_label")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} type="password" className={inputStyle} placeholder={tAuth("common.password_placeholder")} />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Remember Me Checkbox */}
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex items-center gap-3">
                  <Checkbox id="rememberMe" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="rememberMe" className={labelStyle}>
                    {tAuth("common.remember_me")}
                  </Label>
                </div>
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="w-full mt-2 flex flex-col items-start gap-2">
          <Button type="submit" variant="black" disabled={loading} className="min-w-[120px] 2xl:min-w-40">
            {loading ? tAuth("login.loading") : tAuth("login.submit")}
          </Button>
          {error && <p className="text-[12px] 2xl:text-[14px] font-light text-[#f17423]">{error}</p>}
        </div>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-1 xl:my-2">
        <div className="flex-1 h-px bg-[#e9e9e9]" />
        <span className="text-[11px] 2xl:text-[13px] font-light text-[#aeaeae]">{tCommon("or")}</span>
        <div className="flex-1 h-px bg-[#e9e9e9]" />
      </div>

      {/* Google Login */}
      <GoogleLoginButton locale={locale} onOk={handleGoogleSuccess} />
    </Form>
  );
}
