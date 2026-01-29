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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { commonValidations } from "@/lib/validations";
import { login } from "@/lib/helper";
import { useRouter } from "next/navigation";

// Validation schema
const formSchema = z.object({
  email: commonValidations.email(),
  password:commonValidations.password(),
  rememberMe: commonValidations.rememberMe
});

// Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]"
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1"
);

const errorStyle = cn("text-[#f17423]");

export default function AuthLoginForm({ locale, data }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const onSubmit = async (values) => {
    setLoading(true);
    setSuccess("");

    try {
   

      const {data, error, message} = await login(values);

      if(error){
        setSuccess(message);
        return;
      }


      if(data){
        localStorage.setItem("auth_token", data.accessToken);
        setSuccess("Login successful!");
        router.push("/")
      }


      // Redirect to dashboard
      // window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setSuccess("Invalid email or password. Please try again.");
    }

    setLoading(false);
  };

  const toggleStyle = cn(
    "absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700",
    locale === "ar" ? "left-3" : "right-3"
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
                Email
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

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className={cn(
                      inputStyle,
                      locale === "ar" ? "pl-10" : "pr-10"
                    )}
                    placeholder="Enter your password"
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
                  Remember Me
                </Label>
              </FormItem>
            )}
          />
          <Button
            variant="link"
            className="font-light h-auto! p-0 text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px]"
            asChild
          >
            <Link href="/en/forgot-password">Forgot Password?</Link>
          </Button>
        </div>

        {/* Submit Button */}
        <div className="w-full mt-1">
          <Button
            type="submit"
            variant="black"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>

        {/* Success/Error Message */}
        {success && !loading && (
          <p
            className={cn(
              "text-[10px] mt-1 w-full",
              success.includes("successful") ? "text-green-600" : "text-red-600"
            )}
          >
            {success}
          </p>
        )}
      </form>
    </Form>
  );
}
