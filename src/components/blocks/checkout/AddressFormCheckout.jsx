"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { PhoneInput, parseCountry, defaultCountries } from "react-international-phone";
import "react-international-phone/style.css";
import { commonValidations, setValidationTranslator } from "@/lib/validations";
import { fetchFromAPIWithCredentials } from "@/lib/helper";
import { useAddAddressMutation } from "@/store/services/addressApi";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useShippingChargeUpdater } from "@/hooks/useShippingChargeUpdater";

// Validation schema

// Shared styles
const labelStyle = cn("text-[12px] md:text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-[#282828]");

const inputStyle = cn(
  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] data-[size=default]:h-[35px] 2xl:data-[size=default]:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1",
);

const errorStyle = cn("text-[#f17423]");

const textareaStyle = cn(inputStyle, "leading-tight min-h-[80px] 2xl:min-h-[100px] py-[15px] resize-none");

import { useTranslations } from "next-intl";
import { useAppSelector } from "@/store/hooks";
import { Heading } from "@/components/utils/heading";

export default function AddressFormCheckout({ locale, variant = "shipping", type, onSuccess }) {
  console.log("type", type);
  const t = useTranslations("form");
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { updateCharge, calculateCharge } = useShippingChargeUpdater();

  // Local state for in-form delivery charge preview (not dispatched until save)
  const [previewCharge, setPreviewCharge] = useState(null);
  const [isCalculatingCharge, setIsCalculatingCharge] = useState(false);
  const [pendingStateId, setPendingStateId] = useState(null);

  const tErrors = useTranslations("errors");
  setValidationTranslator(tErrors);

  const defaultValues = {
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    streetAddress: "",
    apartment: "",
    country: "",
    state: "",
    orderNotes: "",
    shipToDifferentAddress: false,
    shippingFullName: "",
    shippingCompanyName: "",
    shippingCountry: "",
    shippingState: "",
    shippingStreetAddress: "",
    shippingApartment: "",
  };

  const formSchema = useMemo(
    () =>
      z
        .object({
          fullName: commonValidations.name(t("full_name")),
          companyName: commonValidations.optionalString(),
          email: commonValidations.email(),
          phone: commonValidations.phone(),
          streetAddress: commonValidations.requiredString(t("street_address")),
          apartment: commonValidations.optionalString(),
          country: z.string().min(1, t("country_required")),
          state: z.string().min(1, t("state_required")),
          orderNotes: commonValidations.optionalString(),
          shipToDifferentAddress: commonValidations.optionalBoolean(),
          shippingFullName: commonValidations.optionalString(),
          shippingCompanyName: commonValidations.optionalString(),
          shippingCountry: commonValidations.optionalString(),
          shippingState: commonValidations.optionalString(),
          shippingStreetAddress: commonValidations.optionalString(),
          shippingApartment: commonValidations.optionalString(),
        })
        .superRefine((data, ctx) => {
          // Validate shipping fields only if checkbox is checked
          if (data.shipToDifferentAddress) {
            if (!data.shippingFullName || data.shippingFullName.length < 2) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("shipping_name_required"),
                path: ["shippingFullName"],
              });
            }
            if (!data.shippingCountry) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("shipping_country_required"),
                path: ["shippingCountry"],
              });
            }
            if (!data.shippingState) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("shipping_state_required"),
                path: ["shippingState"],
              });
            }
            if (!data.shippingStreetAddress) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("shipping_street_address_required"),
                path: ["shippingStreetAddress"],
              });
            }
          }
        }),
    [t],
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const [addAddress, { isLoading }] = useAddAddressMutation();

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [shippingStates, setShippingStates] = useState([]);

  const shipToDifferent = form.watch("shipToDifferentAddress");
  const selectedCountry = form.watch("country");
  const selectedShippingCountry = form.watch("shippingCountry");

  // Separate state for phone country selector (for flag alt/title patching)
  const [phoneCountry, setPhoneCountry] = useState("ae");
  const [formKey, setFormKey] = useState(0);
  const phoneWrapperRef = useRef(null);

  // Build a static iso2 → country name lookup from the library's bundled data
  const countryNameMap = useRef(
    Object.fromEntries(
      defaultCountries.map((c) => {
        const p = parseCountry(c);
        return [p.iso2, p.name];
      }),
    ),
  );

  // Patch alt + title on every flag <img data-country="..."> inside the phone wrapper.
  const patchAllFlags = useRef(() => {
    const wrapper = phoneWrapperRef.current;
    if (!wrapper) return;
    wrapper.querySelectorAll("img[data-country]").forEach((img) => {
      const iso2 = img.getAttribute("data-country");
      const name = countryNameMap.current[iso2] ?? iso2;
      if (name) {
        img.alt = name;
        img.title = name;
      }
    });
  });

  useEffect(() => {
    const id = requestAnimationFrame(patchAllFlags.current);
    return () => cancelAnimationFrame(id);
  }, [phoneCountry]);

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await fetchFromAPIWithCredentials("/api/frontend/country");
        if (data) {
          setCountries(data);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (!selectedCountry) {
        setStates([]);
        return;
      }
      try {
        const { data } = await fetchFromAPIWithCredentials(`/api/frontend/state?slug=${selectedCountry}`);
        if (data) {
          setStates(data);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, [selectedCountry]);

  // Fetch shipping states when shipping country changes
  useEffect(() => {
    const fetchShippingStates = async () => {
      if (!selectedShippingCountry) {
        setShippingStates([]);
        return;
      }
      try {
        const { data } = await fetchFromAPIWithCredentials(`/api/frontend/state?slug=${selectedShippingCountry}`);
        if (data) {
          setShippingStates(data);
        }
      } catch (error) {
        console.error("Error fetching shipping states:", error);
      }
    };
    fetchShippingStates();
  }, [selectedShippingCountry]);

  const onSubmit = async (values) => {
    if (!executeRecaptcha) {
      toast.error(t("added_failed"));
      return;
    }
    const recaptchaToken = await executeRecaptcha("address_form");

    try {
      await addAddress({
        values: {
          ...values,
          recaptcha_token: recaptchaToken,
          addressType: variant,
          isAuthenticated,
        },
      }).unwrap();

      toast.success(t("added_success"));

      // Commit the previewed charge to OrderSummary on successful save
      if (pendingStateId) {
        updateCharge(pendingStateId, type ? type : "cart");
      }

      setTimeout(() => {
        form.reset(defaultValues);
        form.clearErrors();
        setFormKey((prev) => prev + 1);
        setPreviewCharge(null);
        setPendingStateId(null);
        onSuccess?.();
      }, 100);
    } catch (err) {
      console.error(err);
      const msg = err?.message || { en: "Something went wrong", ar: "حدث خطأ ما" };
      toast.error(locale === "en" ? msg.en : msg.ar);
      if (err?.redirectToLogin) {
        router.push(`/${locale}/login`);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap items-start -mx-4 [&>*]:px-4 [&>*]:py-2">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {t("full_name")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className={inputStyle} placeholder={t("enter_name")} />
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
              <FormLabel className={labelStyle}>{t("company_name")}</FormLabel>
              <FormControl>
                <Input {...field} className={inputStyle} placeholder={t("enter_company_name")} />
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
                {t("email_address")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} type="email" className={inputStyle} placeholder={t("enter_email")} />
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
                {t("phone")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <div ref={phoneWrapperRef}>
                  <PhoneInput
                    key={formKey}
                    defaultCountry={phoneCountry}
                    value={field.value}
                    onChange={(phone, meta) => {
                      const callingCode = `+${meta.country.callingCode}`;
                      if (phone !== field.value) {
                        if (!field.value && phone.trim() === callingCode) {
                          form.setValue("phone", "", { shouldValidate: false });
                          return;
                        }
                        field.onChange(phone);
                      }
                      const iso = meta.country.iso2;
                      if (iso !== phoneCountry) setPhoneCountry(iso);
                    }}
                    className={cn(
                      inputStyle,
                      "w-full p-0 [&_input]:flex-1 [--react-international-phone-country-selector-border-color:#e9e9e9] [--react-international-phone-border-color:#e9e9e9] [--react-international-phone-height:35px] 2xl:[--react-international-phone-height:45px] [--react-international-phone-flag-width:20px] [--react-international-phone-flag-height:20px]",
                    )}
                    placeholder={t("enter_mobile")}
                  />
                </div>
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
                {t("country")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <Select
                dir={locale === "ar" ? "rtl" : "ltr"}
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("state", ""); // Reset state when country changes
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className={cn(inputStyle, "w-full")}>
                    <SelectValue placeholder={t("select_country")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((item) => (
                    <SelectItem key={item.slug} value={item.slug} className={labelStyle}>
                      {item.name}
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
                {t("street_address")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} className={inputStyle} placeholder={t("enter_street_address")} />
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
              <FormLabel className={labelStyle}>{t("apartment")}</FormLabel>
              <FormControl>
                <Input {...field} className={inputStyle} placeholder={t("apartment_placeholder")} />
              </FormControl>
              <FormMessage className={errorStyle} />
            </FormItem>
          )}
        />

        {/* State */}
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2">
              <FormLabel className={labelStyle}>
                {t("state")}
                <span className={errorStyle}>*</span>
              </FormLabel>
              <Select
                dir={locale === "ar" ? "rtl" : "ltr"}
                onValueChange={async (stateSlug) => {
                  field.onChange(stateSlug);
                  if (!shipToDifferent) {
                    const stateObj = states.find((s) => s.slug === stateSlug);
                    if (stateObj?.id) {
                      setPendingStateId(stateObj.id);
                      setIsCalculatingCharge(true);
                      const charge = await calculateCharge(stateObj.id, type ? type : "cart");
                      setPreviewCharge(charge);
                      setIsCalculatingCharge(false);
                    }
                  }
                }}
                value={field.value}
                disabled={!selectedCountry || states.length === 0}
              >
                <FormControl>
                  <SelectTrigger className={cn(inputStyle, "w-full")}>
                    <SelectValue placeholder={selectedCountry ? t("select_state") : t("select_country_first")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states.map((item) => (
                    <SelectItem key={item.slug} value={item.slug} className={labelStyle}>
                      {item.name}
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
              <FormLabel className={labelStyle}>{t("order_notes")}</FormLabel>
              <FormControl>
                <Textarea {...field} className={textareaStyle} placeholder={t("order_notes_placeholder")} />
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
                    onCheckedChange={async (checked) => {
                      field.onChange(checked);
                      const slug = checked ? form.getValues("shippingState") : form.getValues("state");
                      const list = checked ? shippingStates : states;
                      const stateObj = list.find((s) => s.slug === slug);
                      if (stateObj?.id) {
                        setPendingStateId(stateObj.id);
                        setIsCalculatingCharge(true);
                        const charge = await calculateCharge(stateObj.id, type ? type : "cart");
                        setPreviewCharge(charge);
                        setIsCalculatingCharge(false);
                      } else {
                        setPreviewCharge(null);
                        setPendingStateId(null);
                      }
                    }}
                  />
                  <Label htmlFor="shipToDifferent" className={labelStyle}>
                    {t("ship_to_different")}
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
              <Heading as="h4" size="heading4" className="font-normal text-[#282828] mb-2">
                {t("shipping_address")}
              </Heading>
              <hr />
            </div>
            <FormField
              control={form.control}
              name="shippingFullName"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel className={labelStyle}>
                    {t("full_name")}
                    <span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className={inputStyle} placeholder={t("enter_recipient_name")} />
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
                  <FormLabel className={labelStyle}>{t("company_name")}</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputStyle} placeholder={t("enter_company_name")} />
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
                    {t("country")}
                    <span className={errorStyle}>*</span>
                  </FormLabel>
                  <Select
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("shippingState", ""); // Reset state when country changes
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={cn(inputStyle, "w-full")}>
                        <SelectValue placeholder={t("select_country")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((item) => (
                        <SelectItem key={item.slug} value={item.slug} className={labelStyle}>
                          {item.name}
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
                    {t("street_address")}
                    <span className={errorStyle}>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className={inputStyle} placeholder={t("enter_street_address")} />
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
                  <FormLabel className={labelStyle}>{t("apartment")}</FormLabel>
                  <FormControl>
                    <Input {...field} className={inputStyle} placeholder={t("apartment_placeholder")} />
                  </FormControl>
                  <FormMessage className={errorStyle} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingState"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/2">
                  <FormLabel className={labelStyle}>
                    {t("state")}
                    <span className={errorStyle}>*</span>
                  </FormLabel>
                  <Select
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    onValueChange={async (stateSlug) => {
                      field.onChange(stateSlug);
                      const stateObj = shippingStates.find((s) => s.slug === stateSlug);
                      if (stateObj?.id) {
                        setPendingStateId(stateObj.id);
                        setIsCalculatingCharge(true);
                        const charge = await calculateCharge(stateObj.id, type ? type : "cart");
                        setPreviewCharge(charge);
                        setIsCalculatingCharge(false);
                      }
                    }}
                    value={field.value}
                    disabled={!selectedShippingCountry || shippingStates.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger className={cn(inputStyle, "w-full")}>
                        <SelectValue placeholder={selectedShippingCountry ? t("select_state") : t("select_country_first")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {shippingStates.map((item) => (
                        <SelectItem key={item.slug} value={item.slug} className={labelStyle}>
                          {item.name}
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

        {/* Delivery Charge Preview */}
        {(previewCharge !== null || isCalculatingCharge) && (
          <div className="w-full">
            <div className="flex items-center justify-between px-3 py-2.5 rounded bg-[#f5f5f5] border border-[#e0e0e0]">
              <span className="text-[11px] xl:text-[12px] text-[#808080]">{t("estimated_delivery")}</span>
              {isCalculatingCharge ? (
                <span className="text-[11px] xl:text-[12px] text-[#808080] animate-pulse">{t("calculating")}</span>
              ) : (
                <span className="text-[11px] xl:text-[12px] font-semibold text-[#282828]">
                  {previewCharge === "0.00" ? t("free") : `AED ${previewCharge}`}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="w-full mt-2 flex">
          <Button type="submit" variant="black" disabled={isLoading} className="min-w-[120px] 2xl:min-w-40">
            {isLoading ? t("submitting") : t("add_address")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
