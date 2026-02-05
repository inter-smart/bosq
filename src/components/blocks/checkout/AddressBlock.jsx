"use client";
import React, { useState } from "react";
import { Heading } from "@/components/utils/heading";
import parse from "html-react-parser";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UpdateAddressForm from "@/components/form/update-address-form";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/utils/text";
import { cn } from "@/lib/utils";

const AddressBlock = ({ locale, variant, data, useSameAddress, setUseSameAddress }) => {
  console.log(data);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Sort addresses: default address first
  const sortedAddresses = data
    ? [...data].sort((a, b) => {
        if (a.is_default && !b.is_default) return -1;
        if (!a.is_default && b.is_default) return 1;
        return 0;
      })
    : [];

  // Set initial selected address to default
  useState(() => {
    const defaultAddress = sortedAddresses.find((addr) => addr.is_default);
    if (defaultAddress && !selectedAddressId) {
      setSelectedAddressId(defaultAddress.id);
    }
  });

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setIsEditDialogOpen(true);
  };

  const handleSetDefault = async (addressId) => {
    try {
      // API call to set default address
      // await setDefaultAddressAPI(addressId, variant);
      console.log("Set as default:", addressId);

      // Update local state or refetch data
    } catch (error) {
      console.error("Failed to set default address:", error);
    }
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      // API call to delete address
      // await deleteAddressAPI(addressId);
      console.log("Delete address:", addressId);

      // Update local state or refetch data
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
  };

  return (
    <>
      <div className="w-full h-auto block rounded-[4px] border border-[#e0e0e0] overflow-hidden mb-1 xl:mb-2.5 2xl:mb-4">
        <div className="w-full h-auto bg-black px-3 lg:px-4 xl:px-4 2xl:px-7 py-2.5 lg:py-2 xl:py-4 2xl:py-5 flex justify-between items-center gap-2">
          <Heading as="h4" size="heading4" className="text-white">
            {data?.title}
          </Heading>

          {/* Same Address Checkbox - Only for Shipping */}
          {variant === "shipping" && setUseSameAddress && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="billingAddress"
                checked={useSameAddress}
                onCheckedChange={setUseSameAddress}
                className={"border-white data-[state=checked]:bg-white data-[state=checked]:text-black"}
              />
              <Label htmlFor="billingAddress">
                <Text as="span" size="text3" className="text-white">
                  Use Same Address For Billing
                </Text>
              </Label>
            </div>
          )}
        </div>

        {/* Address List */}
        <div className="flex flex-wrap -m-0.5 xl:-m-1 2xl:-m-1.5 [&>*]:p-0.5 xl:[&>*]:p-1 2xl:[&>*]:p-1.5">
          {sortedAddresses.length === 0 ? (
            <div className="w-full p-4 text-center">
              <Text as="div" size="text3" className="text-[#808080]">
                No addresses found. Please add a new address.
              </Text>
            </div>
          ) : (
            sortedAddresses.map((item, index) => (
              <div key={"address-item-" + index} className="w-full sm:w-1/2 lg:w-1/2">
                <div
                  onClick={() => handleAddressSelect(item.id)}
                  className={cn(
                    "w-full p-2.5 xl:p-3.5 2xl:p-5 transition hover:shadow-sm relative z-0",
                    locale === "ar" ? "pr-10 xl:pr-12 2xl:pr-18" : "pl-10 xl:pl-12 2xl:pl-18",
                    selectedAddressId === item.id ? "bg-[#eaeaea]/60" : "bg-[#eaeaea]/40",
                  )}
                >
                  {/* Selection Indicator */}
                  <div
                    className={cn(
                      "w-4 xl:w-4 2xl:w-5 aspect-square rounded-full border-3 bg-transparent absolute top-2.5 xl:top-3.5 2xl:top-5 transition-colors",
                      locale === "ar" ? "right-3.5 xl:right-3.5 2xl:right-5" : "left-3.5 xl:left-3.5 2xl:left-5",
                      selectedAddressId === item.id ? "border-[#f17423]" : "border-[#a1a1a1]",
                      item.is_default && "border-black",
                    )}
                  />

                  <Heading as="div" size="heading5" className="font-medium text-[#282828] mb-1 xl:mb-2">
                    {item?.full_name}
                  </Heading>
                  <Text as="div" size="text3" className="text-[#282828] mb-1 xl:mb-2">
                    {item?.address_line_1 && parse(item?.address_line_1)}
                    {item?.address_line_2 && ", "}
                    {item?.address_line_2 && parse(item?.address_line_2)}
                  </Text>
                  <Text as="div" size="text3" className="font-medium text-[#282828] mb-2 xl:mb-2.5">
                    <a href={`tel:${item?.phone}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {item?.phone}
                    </a>
                  </Text>

                  {/* Action Buttons */}
                  <div className="flex gap-0.5 xl:gap-1 flex-wrap">
                    <Button
                      variant={"white"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(item);
                      }}
                      className={
                        "min-w-[45px] xl:min-w-[50px] 2xl:min-w-[70px] h-[20px] lg:h-[22px] 2xl:h-[24px] 3xl:h-[26px] bg-white gap-1 border border-[#e9e9e9] hover:text-black hover:bg-white hover:border-[#f17423]"
                      }
                    >
                      <Image src={"/images/icon-edit.svg"} alt={"icon-edit"} width={10} height={10} className="w-2 xl:w-2.5" />
                      Edit
                    </Button>
                    {!item.is_default && (
                      <Button
                        variant={"white"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetDefault(item.id);
                        }}
                        className={
                          "min-w-[70px] xl:min-w-[80px] 2xl:min-w-[100px] h-[20px] lg:h-[22px] 2xl:h-[24px] 3xl:h-[26px] bg-white gap-1 border border-[#e9e9e9] hover:text-black hover:bg-white hover:border-[#f17423]"
                        }
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant={"white"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className={
                        "min-w-[55px] xl:min-w-[60px] 2xl:min-w-[85px] h-[20px] lg:h-[22px] 2xl:h-[24px] 3xl:h-[26px] bg-white gap-1 border border-[#e9e9e9] hover:text-red-600 hover:bg-white hover:border-red-600"
                      }
                    >
                      <Image src={"/images/icon-delete.svg"} alt={"icon-delete"} width={10} height={10} className="w-2 xl:w-2.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Address Dialog */}
      <AlertDialog dir={locale === "ar" ? "rtl" : "ltr"} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AlertDialogContent className={"xl:max-w-[768px] 2xl:max-w-[840px] gap-0"}>
          <AlertDialogHeader className={"flex-row items-center justify-between mb-2 2xl:mb-4"}>
            <AlertDialogTitle className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-semibold text-[#282828]">
              Edit Address
            </AlertDialogTitle>
            <AlertDialogDescription className={"sr-only"}>Edit Address form.</AlertDialogDescription>
            <AlertDialogCancel className={"h-auto p-0 border-0 hover:bg-transparent"}>
              <X className="size-5 text-black" />
            </AlertDialogCancel>
          </AlertDialogHeader>

          <div className="max-h-[70vh] mask-[linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)] overflow-y-auto overflow-x-hidden">
            <UpdateAddressForm locale={locale} addressData={editingAddress} onSuccess={() => setIsEditDialogOpen(false)} />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddressBlock;
