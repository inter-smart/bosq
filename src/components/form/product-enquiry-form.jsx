"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSubmitProductEnquiryMutation } from "@/store/services/productEnquiryApi";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import Image from "next/image";
import { X } from "lucide-react";
import { commonValidations, setValidationTranslator } from "@/lib/validations";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

// Styles
const labelStyle = cn("text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-light text-[#282828]");

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
);

const errorStyle = cn("text-[#f17423]");

const textareaStyle = cn(inputStyle, "leading-tight min-h-[80px] 2xl:min-h-[100px] py-[15px] resize-none");

export default function ProductEnquiryForm({ productId, onClose }) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitProductEnquiry, { isLoading }] = useSubmitProductEnquiryMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("ae");
  // File upload
  const [uploadedFile, setUploadedFile] = useState(null);

  const t = useTranslations("form");
  const tErrors = useTranslations("errors");
  const tToast = useTranslations("toast");
  // ✅ inject translator (once per render is fine)
  setValidationTranslator(tErrors);

  // ✅ Final Correct Schema
  const formSchema = z.object({
    fullName: commonValidations.name(t("full_name")),
    email: commonValidations.email(),
    phone: commonValidations.phone(selectedCountry.toUpperCase()),
    city: commonValidations.text("City").optional(),
    message: commonValidations.message(t("message")),
    attachment: commonValidations.image(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      city: "",
      message: "",
      attachment: null,
    },
  });

  const onSubmit = async (values) => {
    setErrorMessage("");

    if (!executeRecaptcha) {
      setErrorMessage("Recaptcha not initialized");
      return;
    }

    try {
      const token = await executeRecaptcha("product_enquiry");

      const formData = new FormData();
      formData.append("product_id", productId);
      formData.append("name", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("city", values.city);
      formData.append("message", values.message);
      formData.append("recaptcha_token", token);
      formData.append("media_path", uploadedFile);

      await submitProductEnquiry(formData).unwrap();

      form.reset();
      setUploadedFile(null);
      toast.success(t("success_message"));
      onClose?.();
    } catch (error) {
      console.error(error);
      setErrorMessage(error?.data?.message || tErrors("invalid_content", { field: "form" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setUploadedFile(file);
      form.setValue("attachment", file, {
        shouldValidate: true, // ✅ trigger Zod
        shouldDirty: true, // ✅ mark field as touched
      });
    }
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
    form.setValue("attachment", null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>
                {t("full_name")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className={inputStyle} placeholder={t("enter_name")} />
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
                {t("email_id")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" className={inputStyle} placeholder={t("enter_email_id")} />
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
                {t("phone_number")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  defaultCountry="ae"
                  {...field}
                  className={cn(
                    inputStyle,
                    "w-full p-0 [&_input]:flex-1  [--react-international-phone-country-selector-border-color:#e9e9e9] [--react-international-phone-border-color:#e9e9e9] [--react-international-phone-height:35px] 2xl:[--react-international-phone-height:45px] [--react-international-phone-flag-width:20px] [--react-international-phone-flag-height:20px]",
                  )}
                  placeholder={t("enter_phone")}
                  onChange={(phone, meta) => {
                    field.onChange(phone);
                    setSelectedCountry(meta.country.iso2);
                    form.trigger("phone");
                  }}
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
              <FormLabel className={labelStyle}>{t("city")}</FormLabel>
              <FormControl>
                <Input {...field} className={inputStyle} placeholder={t("enter_city")} />
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
              <FormLabel className={labelStyle}>{t("upload_image")}</FormLabel>
              <FormControl>
                <div className="max-w-full space-y-2">
                  {!uploadedFile ? (
                    <label htmlFor="file-upload" className={cn(inputStyle, "flex items-center justify-between gap-x-1 border cursor-pointer")}>
                      <span className="text-[#aeaeae]">{t("choose_image")}</span>
                      <Image src="/images/icon-attachment.svg" alt="icon-attachment" width={20} height={20} className="w-2 xl:w-3" unoptimized />

                      <input id="file-upload" type="file" className="hidden" accept=".pdf,.doc,.docx,.png,.jpeg,.jpg" onChange={handleFileChange} />
                    </label>
                  ) : (
                    <div className={cn(inputStyle, "flex items-center justify-between gap-x-1 border")}>
                      <span className="line-clamp-1 flex-1 pr-2">{uploadedFile.name}</span>
                      <button type="button" onClick={handleFileRemove} className="text-red-500 hover:text-red-700 transition-colors">
                        <X className="size-3 xl:size-4" />
                      </button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className={labelStyle}>{t("message")}</FormLabel>
              <FormControl>
                <Textarea {...field} className={textareaStyle} placeholder={t("form_placeholder_inquiry")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="w-full mt-2 flex flex-col gap-2">
          <Button type="submit" variant={"black"} disabled={isLoading} className="min-w-full">
            {isLoading ? t("submitting") : t("submit_enquiry")}
          </Button>
          {errorMessage && <p className="text-red-600 text-sm mt-1">{errorMessage}</p>}
        </div>
      </form>
    </Form>
  );
}
