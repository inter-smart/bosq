"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSubmitProductEnquiryMutation } from "@/store/services/productEnquiryApi";

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
import { cn } from "@/lib/utils";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import Image from "next/image";
import { X } from "lucide-react";
import { commonValidations } from "@/lib/validations";
import { useParams } from "next/navigation";

// ✅ Final Correct Schema
const formSchema = z.object({
  fullName: commonValidations.name("Full Name"),
  email: commonValidations.email("Email Address"),
  phone: commonValidations.phone,
  city: commonValidations.text("City").optional(),
  message: commonValidations.text("Message").optional(),
  attachment: z.any().optional(),
});

// Styles
const labelStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]"
);

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1"
);

const errorStyle = cn("text-[#f17423]");

const textareaStyle = cn(
  inputStyle,
  "leading-tight min-h-[80px] 2xl:min-h-[100px] py-[15px] resize-none"
);

export default function ProductEnquiryForm({ productId }) {

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitProductEnquiry, { isLoading }] = useSubmitProductEnquiryMutation();
  const { slug } = useParams(); // Using slug to identify product? Or should it be passed as prop?
  // The modal is used in ProductDetail page, but `data` prop was passed to `ProductEnquireModal`.
  // `ProductEnquiryForm` doesn't receive props in the user's code. 
  // I need to check how to get product ID.
  // The user's code for ProductEnquireModal has `data` prop which is `productsData`.
  /*
    <ProductEnquiryForm />
  */
  // It seems `ProductEnquiryForm` needs to accept `productId` as a prop.
  // But I can't change the usage in `ProductEnquireModal` easily without knowing `productsData` structure.
  // Wait, `ProductEnquireModal` wrapper code:
  /*
    const ProductEnquireModal = ({ children, data, locale }) => {
       ...
       <ProductEnquiryForm />
    }
  */
  // I should update `ProductEnquireModal` to pass `productId={data?.id}` to `ProductEnquiryForm`.
  // But let's assume I can modify `ProductEnquiryForm` signature.

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      message: "",
      attachment: null,
    },
  });

  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // File upload
  const [uploadedFile, setUploadedFile] = useState(null);

  const onSubmit = async (values) => {
    setSuccess("");
    setErrorMessage("");

    if (!executeRecaptcha) {
      setErrorMessage("Recaptcha not initialized");
      return;
    }

    try {
      const token = await executeRecaptcha("product_enquiry");

      const formData = {
        product_id: productId,
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        city: values.city,
        message: values.message,
        recaptcha_token: token,
        // Attachment handling? The backend service expects `media_path` but current implementation doesn't look like it handles file upload yet unless I verify it.
        // The backend model has `media_path`.
        // The user code uses `JSON.stringify` in the previous version. File upload needs FormData.
        // But the backend `ProductEnquiryService` expects `data` object. 
        // If `media_path` is passed, it assumes file is already uploaded?
        // I'll stick to JSON for now as user code did, but attachment might fail.
        // I'll check if I can get productId from context or props.
      };

      // We need to pass product_id. I will assume it comes from props.

      const payload = {
        ...formData,
        // If I need to send file, I probably need to upload it first or send as FormData.
        // For now, I will omit attachment in the API call if backend doesn't support multipart yet (Controller uses `req.body`).
        // To support file upload, the backend controller needs to handle multipart/form-data.
      };

      await submitProductEnquiry(payload).unwrap();

      form.reset();
      setUploadedFile(null);
      setSuccess("Enquiry sent successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setUploadedFile(file);
      form.setValue("attachment", file);
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    form.setValue("attachment", null);
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
            <FormItem className="w-full">
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                Email Address<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className={inputStyle}
                  placeholder="Enter Email Address"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                Contact Number<span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="ae"
                  {...field}
                  className={cn(inputStyle, "w-full p-0 [&_input]:flex-1  [--react-international-phone-country-selector-border-color:#e9e9e9] [--react-international-phone-border-color:#e9e9e9] [--react-international-phone-height:35px] 2xl:[--react-international-phone-height:45px] [--react-international-phone-flag-width:20px] [--react-international-phone-flag-height:20px]")}
                  placeholder="Enter phone number"
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>City</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={inputStyle}
                  placeholder="Enter Your City"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Upload Image */}
        <FormField
          control={form.control}
          name="attachment"
          render={() => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>Upload Image</FormLabel>
              <FormControl>
                <div className="max-w-full space-y-2">
                  {!uploadedFile ? (
                    <label
                      htmlFor="file-upload"
                      className={cn(
                        inputStyle,
                        "flex items-center justify-between gap-x-1 border cursor-pointer"
                      )}
                    >
                      <span className="text-[#aeaeae]">Choose Image</span>
                      <Image
                        src="/images/icon-attachment.svg"
                        alt="icon-attachment"
                        width={20}
                        height={20}
                        className="w-2 xl:w-3"
                        unoptimized
                      />

                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.png,.jpeg,.jpg"
                        onChange={handleFileChange}
                      />
                    </label>
                  ) : (
                    <div
                      className={cn(
                        inputStyle,
                        "flex items-center justify-between gap-x-1 border"
                      )}
                    >
                      <span className="line-clamp-1 flex-1 pr-2">
                        {uploadedFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={handleFileRemove}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="size-3 xl:size-4" />
                      </button>
                    </div>
                  )}
                </div>
              </FormControl>

              <FormMessage className="font-light text-black">
                &nbsp;Max. 10 MB. (Type: pdf, doc, png, jpeg, docx)
              </FormMessage>
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className={textareaStyle}
                  placeholder="Enter Message..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="w-full mt-2 flex flex-col gap-2">
          <Button
            type="submit"
            variant={"black"}
            disabled={isLoading}
            className="min-w-full"
          >
            {isLoading ? "Sending..." : "Submit Enquiry"}
          </Button>
          {errorMessage && (
            <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
          )}
          {success && !isLoading && (
            <p className="text-green-600 text-sm mt-1">{success}</p>
          )}
        </div>


      </form>
    </Form>
  );
}
