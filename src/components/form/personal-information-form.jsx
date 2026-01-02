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

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

// Validation schema
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  displayName: z
    .string()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name cannot exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .max(20, "Phone number is too long"),
});

// Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-[#282828]"
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1"
);

const errorStyle = cn("text-[#f17423]");

export default function PersonalInformationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      lastName: "",
      displayName: "",
      email: "",
      phone: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (values) => {
    setLoading(true);
    setSuccess(null);

    // Simulate API call for local testing
    setTimeout(() => {
      console.log("Personal Information:", values);
      form.reset();
      setSuccess("Information saved successfully!");
      setLoading(false);
    }, 1000);

    // TODO: Connect to API when ready
    // try {
    //   const res = await fetch("http://localhost:1337/api/user/profile", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ data: values }),
    //   });
    //   if (!res.ok) throw new Error("Failed to save information");
    //   form.reset();
    //   setSuccess("Information saved successfully!");
    // } catch (err) {
    //   console.error(err);
    //   setSuccess("Something went wrong. Please try again.");
    // }
    // setLoading(false);
  };

  const handleReset = () => {
    form.reset();
    setSuccess(null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
      >
        {/* First Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                First Name<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder="Enter your first name"
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                Last Name<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder="Enter your last name"
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Display Name */}
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                Display Name<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder="This will be how your name will be displayed in the account section and in reviews"
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                Email Address<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className={inputStyle}
                  placeholder="Enter email address"
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                Phone<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="ae"
                  {...field}
                  className={cn(inputStyle, "w-full p-0 [&_input]:flex-1")}
                  placeholder="Enter your mobile number"
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Submit and Reset Buttons */}
        <div className="w-full mt-2 flex gap-2.5">
          <Button
            type="submit"
            variant="black"
            disabled={loading}
            className="min-w-[120px] 2xl:min-w-40"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            type="button"
            variant="white"
            onClick={handleReset}
            className="min-w-[80px] xl:min-w-[90px] 2xl:min-w-[120px] border border-black hover:border-[#f17423]"
          >
            Reset
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
