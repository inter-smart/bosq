"use client";
import AddressForm from "@/components/form/address-form";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { X } from "lucide-react";
import React from "react";

const AddAddressBlock = ({ locale, variant = "shipping", onCancel, onSuccess }) => {
  return (
    <div className="w-full h-auto block p-3 lg:p-4 xl:p-4 2xl:p-7 rounded-[4px] border border-[#e0e0e0] mb-1 xl:mb-2.5 2xl:mb-4">
      <div className="flex justify-between items-center mb-3 xl:mb-5 2xl:mb-8">
        <Heading as="h4" size="heading4" className="font-normal text-[#282828]">
          {variant === "billing" ? "Add New Billing Address" : "Add New Shipping Address"}
        </Heading>
        {onCancel && (
          <Button variant={"ghost"} onClick={onCancel} className="h-auto p-1 hover:bg-gray-100">
            <X className="size-4" />
          </Button>
        )}
      </div>
      <AddressForm locale={locale} variant={variant} onSuccess={onSuccess} />
    </div>
  );
};

export default AddAddressBlock;
