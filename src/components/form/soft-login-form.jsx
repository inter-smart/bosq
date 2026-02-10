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
import { useRouter } from "next/navigation";

// Validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address").max(100, "Email is too long"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password is too long"),
  rememberMe: z.boolean().default(false),
});

// Shared styles
const labelStyle = cn("text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]");

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
);

const errorStyle = cn("text-[#f17423]");

export default function SoftLoginForm() {
  const { login } = useAuth();
  const router = useRouter();

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
      setError(result.error || "Invalid email or password. Please try again.");
    }
    console.log("REFRESHING");
    router.refresh();
    console.log("REFRESHING");

    setLoading(false);
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
                Email<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" className={inputStyle} placeholder="Enter your email" />
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
                Password<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} type="password" className={inputStyle} placeholder="Enter your Password" />
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
                    Remember me
                  </Label>
                </div>
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="w-full mt-2 flex">
          <Button type="submit" variant="black" disabled={loading} className="min-w-[120px] 2xl:min-w-40">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
