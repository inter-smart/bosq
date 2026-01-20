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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Heading } from "../utils/heading";

// Validation schema
const formSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name cannot exceed 50 characters"),
    companyName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(10, "Phone number is required")
      .max(20, "Phone number is too long"),
    region: z.string().min(1, "Please select a region"),
    streetAddress: z.string().min(1, "Street address is required"),
    apartment: z.string().optional(),
    country: z.string().min(1, "Please select a country"),
    orderNotes: z.string().optional(),
    shipToDifferentAddress: z.boolean().default(false),
    shippingFullName: z.string().optional(),
    shippingCompanyName: z.string().optional(),
    shippingRegion: z.string().optional(),
    shippingStreetAddress: z.string().optional(),
    shippingApartment: z.string().optional(),
    shippingCountry: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validate shipping fields only if checkbox is checked
    if (data.shipToDifferentAddress) {
      if (!data.shippingFullName || data.shippingFullName.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Shipping name is required",
          path: ["shippingFullName"],
        });
      }
      if (!data.shippingRegion) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Shipping region is required",
          path: ["shippingRegion"],
        });
      }
      if (!data.shippingStreetAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Shipping street address is required",
          path: ["shippingStreetAddress"],
        });
      }
      if (!data.shippingCountry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Shipping country is required",
          path: ["shippingCountry"],
        });
      }
    }
  });

// Shared styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-[#282828]"
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] data-[size=default]:h-[35px] 2xl:data-[size=default]:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1"
);

const errorStyle = cn("text-[#f17423]");

const textareaStyle = cn(
  inputStyle,
  "leading-tight min-h-[80px] 2xl:min-h-[100px] py-[15px] resize-none"
);

export default function AddressForm({locale}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      region: "",
      streetAddress: "",
      apartment: "",
      country: "",
      orderNotes: "",
      shipToDifferentAddress: false,
      shippingFullName: "",
      shippingCompanyName: "",
      shippingRegion: "",
      shippingStreetAddress: "",
      shippingApartment: "",
      shippingCountry: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const shipToDifferent = form.watch("shipToDifferentAddress");

  const regions = ["United Arab Emirates", "Asia", "Europe", "North America"];
  const countries = ["Dubai", "India", "United States", "United Kingdom"];

  const onSubmit = async (values) => {
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:1337/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: values }),
      });

      if (!res.ok) throw new Error("Failed to send enquiry");

      form.reset();
      setSuccess("Order submitted successfully!");
    } catch (err) {
      console.error(err);
      setSuccess("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2"
      >
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                Name<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Company Name */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>Company Name (Optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder="Enter your company name"
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
                  className={cn(inputStyle, "w-full p-0 [&_input]:flex-1 [--react-international-phone-country-selector-border-color:#e9e9e9] [--react-international-phone-border-color:#e9e9e9] [--react-international-phone-height:35px] 2xl:[--react-international-phone-height:45px] [--react-international-phone-flag-width:20px] [--react-international-phone-flag-height:20px]")}
                  placeholder="Enter your mobile number"
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Region */}
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                Country / Region<span className={errorStyle}>*</span>
              </FormLabel>
              <Select dir={locale === "ar" ? "rtl" : "ltr"} onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={cn(inputStyle, "w-full")}>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regions.map((item, index) => (
                    <SelectItem key={index} value={item} className={labelStyle}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Street Address */}
        <FormField
          control={form.control}
          name="streetAddress"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                Street Address<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder="Enter street address"
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Apartment */}
        <FormField
          control={form.control}
          name="apartment"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>Apartment</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder="Apartment, Suite, Unit, etc (optional)"
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Country */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                State / Country<span className={errorStyle}>*</span>
              </FormLabel>
              <Select dir={locale === "ar" ? "rtl" : "ltr"} onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={cn(inputStyle, "w-full")}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((item, index) => (
                    <SelectItem key={index} value={item} className={labelStyle}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Order Notes */}
        <FormField
          control={form.control}
          name="orderNotes"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>Order Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className={textareaStyle}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Ship to Different Address Checkbox */}
        <FormField
          control={form.control}
          name="shipToDifferentAddress"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="shipToDifferent"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="shipToDifferent" className={labelStyle}>
                    Ship to a Different Address?
                  </Label>
                </div>
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* Shipping Address Section - Shows when checkbox is checked */}
        {shipToDifferent && (
          <>
            <div className="w-full my-1.5 xl:my-2">
              <Heading
                as="h4"
                size="heading4"
                className="font-normal text-[#282828] mb-2"
              >
                Shipping Address
              </Heading>
              <hr />
            </div>
            <FormField
              control={form.control}
              name="shippingFullName"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel className={labelStyle}>
                    Name<span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={inputStyle}
                      placeholder="Enter recipient name"
                    />
                  </FormControl>
                  <FormMessage className={errorStyle} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingCompanyName"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel className={labelStyle}>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={inputStyle}
                      placeholder="Enter company name"
                    />
                  </FormControl>
                  <FormMessage className={errorStyle} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingRegion"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel className={labelStyle}>
                    Country / Region<span className={errorStyle}>*</span>
                  </FormLabel>
                  <Select dir={locale === "ar" ? "rtl" : "ltr"} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={cn(inputStyle, "w-full")}>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regions.map((item, index) => (
                        <SelectItem
                          key={index}
                          value={item}
                          className={labelStyle}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={errorStyle} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingStreetAddress"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel className={labelStyle}>
                    Street Address<span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={inputStyle}
                      placeholder="Enter street address"
                    />
                  </FormControl>
                  <FormMessage className={errorStyle} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingApartment"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel className={labelStyle}>Apartment</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={inputStyle}
                      placeholder="Apartment, Suite, Unit, etc (optional)"
                    />
                  </FormControl>
                  <FormMessage className={errorStyle} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingCountry"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel className={labelStyle}>
                    State / Country<span className={errorStyle}>*</span>
                  </FormLabel>
                  <Select dir={locale === "ar" ? "rtl" : "ltr"} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={cn(inputStyle, "w-full")}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((item, index) => (
                        <SelectItem
                          key={index}
                          value={item}
                          className={labelStyle}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={errorStyle} />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Submit Button */}
        <div className="w-full mt-2 flex">
          <Button
            type="submit"
            variant="black"
            disabled={loading}
            className="min-w-[120px] 2xl:min-w-40"
          >
            {loading ? "Submitting..." : "Add Address"}
          </Button>
        </div>

        {/* Success/Error Message */}
        {success && !loading && (
          <p
            className={cn(
              "mt-1 w-full",
              success.includes("success") ? "text-green-600" : "text-red-600"
            )}
          >
            {success}
          </p>
        )}
      </form>
    </Form>
  );
}
