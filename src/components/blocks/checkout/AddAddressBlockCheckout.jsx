"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { X } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";
import AddressFormCheckout from "./AddressFormCheckout";

const AddAddressBlockCheckout = ({ locale, variant = "shipping", onCancel, onSuccess }) => {
  const t = useTranslations("address");
  return (
    <div className="w-full h-auto block p-3 lg:p-4 xl:p-4 2xl:p-7 rounded-[4px] border border-[#e0e0e0] mb-1 xl:mb-2.5 2xl:mb-4">
      <div className="flex justify-between items-center mb-3 xl:mb-5 2xl:mb-8">
        <Heading as="h4" size="heading4" className="font-normal text-[#282828]">
          {variant === "billing" ? t("add_new_billing") : t("add_new_shipping")}
        </Heading>
        {onCancel && (
          <Button variant={"ghost"} onClick={onCancel} className="h-auto p-1 hover:bg-gray-100">
            <X className="size-4" />
          </Button>
        )}
      </div>
      <AddressFormCheckout locale={locale} variant={variant} onSuccess={onSuccess} />
    </div>
  );
};

export default AddAddressBlockCheckout;
