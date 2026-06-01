"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UpdateAddressFormCheckout from "@/components/form/update-address-form-checkout";
import { X } from "lucide-react";
import Image from "@/components/utils/custom-image";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/utils/text";
import { cn } from "@/lib/utils";
import { useDeleteAddressMutation, useUpdateDefaultAddressMutation } from "@/store/services/addressApi";
import { toast } from "sonner";
import { setSelectedShippingAddress, setSelectedBillingAddress } from "@/store/slices/checkoutSlice";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/store/hooks";

const AddressBlockCheckout = ({ locale, variant, data, useSameAddress, setUseSameAddress, isFromCheckout }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const selectedShippingAddressId = useSelector((state) => state.checkout.selectedShippingAddressId);
  const selectedBillingAddressId = useSelector((state) => state.checkout.selectedBillingAddressId);

  const [deleteAddress, { isLoading: isDeletingAddress }] = useDeleteAddressMutation();
  const [updateDefaultAddress, { isLoading: isUpdatingDefault }] = useUpdateDefaultAddressMutation();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [pendingAction, setPendingAction] = useState(null);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);

  const tToast = useTranslations("toast");
  const t = useTranslations("address");
  const tCommon = useTranslations("common");

  // Get the selected address ID based on variant
  const selectedAddressId = variant === "shipping" ? selectedShippingAddressId : selectedBillingAddressId;

  // Sort addresses: default address first
  const sortedAddresses = data
    ? [...data].sort((a, b) => {
        if (a.is_default && !b.is_default) return -1;
        if (!a.is_default && b.is_default) return 1;
        return 0;
      })
    : [];

  const isProcessing = (pendingAction?.kind === "delete" && isDeletingAddress) || (pendingAction?.kind === "setDefault" && isUpdatingDefault);

  // Stable key: re-run only when the set of address IDs changes
  const addressIdKey = sortedAddresses.map((a) => a.id).join(",");

  // Auto-select when:
  // 1. No address is selected yet, OR
  // 2. The selected ID no longer exists in this address list (stale/cross-type reference)
  useEffect(() => {
    if (sortedAddresses.length === 0) return;
    const selectedExistsInList = sortedAddresses.some((a) => a.id === selectedAddressId);
    if (!selectedAddressId || !selectedExistsInList) {
      const defaultAddress = sortedAddresses.find((addr) => addr.is_default);
      const addressToSelect = defaultAddress || sortedAddresses[0];
      if (addressToSelect) {
        if (variant === "shipping") {
          dispatch(setSelectedShippingAddress(addressToSelect.id));
        } else {
          dispatch(setSelectedBillingAddress(addressToSelect.id));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressIdKey, selectedAddressId, variant, dispatch]);

  const handleEditClick = (address) => {
    setEditingAddress(address);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id, type) => {
    setPendingAction({ id, kind: "delete", addressType: type });
    setIsActionDialogOpen(true);
  };

  const handleUpdateDefault = (id, type) => {
    setPendingAction({ id, kind: "setDefault", addressType: type });
    setIsActionDialogOpen(true);
  };

  const confirmAction = async () => {
    if (!pendingAction) return;
    setIsActionDialogOpen(false);

    try {
      if (pendingAction.kind === "delete") {
        await deleteAddress({ id: pendingAction.id, addressType: pendingAction.addressType, isAuthenticated }).unwrap();
        toast.success(`${tToast("delete_address")}`);
      } else {
        await updateDefaultAddress({ id: pendingAction.id, addressType: pendingAction.addressType, isAuthenticated }).unwrap();
        toast.success(`${tToast("default_address")}`);
      }
    } catch (error) {
      console.error("Action error details:", error);
      toast.error(locale === "en" ? error?.en : error?.ar || "Something went wrong");
      // toast.error(`${tToast("something_went_wrong")}`);
    } finally {
      setPendingAction(null);
    }
  };

  const handleAddressSelect = (addressId) => {
    if (variant === "shipping") {
      dispatch(setSelectedShippingAddress(addressId));
    } else {
      dispatch(setSelectedBillingAddress(addressId));
    }
  };

  return (
    <>
      <div className="w-full h-auto block rounded-[4px] border border-[#e0e0e0] overflow-hidden mb-1 xl:mb-2.5 2xl:mb-4">
        <div className="w-full h-auto bg-black px-3 lg:px-4 xl:px-4 2xl:px-7 py-2.5 lg:py-2 xl:py-4 2xl:py-5 flex justify-between items-center gap-2">
          <Heading as="h4" size="heading4" className="text-white">
            {variant === "billing" ? t("billing") : t("shipping")}
          </Heading>

          {/* Same Address Checkbox */}
          {setUseSameAddress && (
            <div className="flex items-center gap-2">
              <Checkbox
                id={variant === "shipping" ? "sameForBilling" : "sameForShipping"}
                checked={useSameAddress}
                onCheckedChange={setUseSameAddress}
                className={"border-white data-[state=checked]:bg-white data-[state=checked]:text-black"}
              />
              <Label htmlFor={variant === "shipping" ? "sameForBilling" : "sameForShipping"}>
                <Text as="span" size="text3" className="text-white">
                  {variant === "shipping" ? t("use_same_for_billing") : t("use_same_for_shipping")}
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
                {t("no_addresses")}
              </Text>
            </div>
          ) : (
            sortedAddresses.map((item, index) => (
              <div key={"address-item-" + index} className="w-full sm:w-1/2 lg:w-1/2">
                <div
                  onClick={() => handleAddressSelect(item.id)}
                  className={cn(
                    "w-full h-full p-2.5 xl:p-3.5 2xl:p-5 transition relative z-0 cursor-pointer",
                    locale === "ar" ? "pr-10 xl:pr-12 2xl:pr-18" : "pl-10 xl:pl-12 2xl:pl-18",
                    selectedAddressId === item.id ? "bg-[#eaeaea]/60" : "bg-[#eaeaea]/40 hover:bg-[#eaeaea]/60",
                  )}
                >
                  {/* Selection Indicator */}
                  <div
                    className={cn(
                      "w-4 xl:w-4 2xl:w-5 aspect-square rounded-full border-2 bg-transparent absolute top-2.5 xl:top-3.5 2xl:top-5 transition-colors flex items-center justify-center",
                      locale === "ar" ? "right-3.5 xl:right-3.5 2xl:right-5" : "left-3.5 xl:left-3.5 2xl:left-5",
                      selectedAddressId === item.id ? "border-[#f17423]" : item.is_default ? "border-black" : "border-[#a1a1a1]",
                    )}
                  >
                    {selectedAddressId === item.id && <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full bg-[#f17423]" />}
                  </div>

                  <Heading as="div" size="heading5" className="font-medium text-[#282828] mb-1 xl:mb-2">
                    {item?.full_name || item?.name}
                  </Heading>
                  <Text as="div" size="text3" className="text-[#282828] mb-1 xl:mb-2">
                    {item?.address_line_1 && parse(item?.address_line_1)}
                    {item?.address_line_2 && ", "}
                    {item?.address_line_2 && parse(item?.address_line_2)}
                    {item?.address && parse(item?.address)}
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
                      <Image src={"/images/icon-edit.svg"} alt={"icon-edit"} width={10} height={10} className="w-2 xl:w-2.5" quality={90} />
                      {tCommon("edit")}
                    </Button>
                    {!item.is_default && (
                      <Button
                        variant={"white"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateDefault(item.id, item?.address_type);
                        }}
                        className={
                          "min-w-[70px] xl:min-w-[80px] 2xl:min-w-[100px] h-[20px] lg:h-[22px] 2xl:h-[24px] 3xl:h-[26px] bg-white gap-1 border border-[#e9e9e9] hover:text-black hover:bg-white hover:border-[#f17423]"
                        }
                      >
                        {t("set_default")}
                      </Button>
                    )}
                    <Button
                      variant={"white"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id, item?.address_type);
                      }}
                      className={
                        "min-w-[55px] xl:min-w-[60px] 2xl:min-w-[85px] h-[20px] lg:h-[22px] 2xl:h-[24px] 3xl:h-[26px] bg-white gap-1 border border-[#e9e9e9] hover:text-red-600 hover:bg-white hover:border-red-600"
                      }
                    >
                      <Image src={"/images/icon-delete.svg"} alt={"icon-delete"} width={10} height={10} className="w-2 xl:w-2.5" quality={90} />
                      {tCommon("delete")}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Address Dialog */}
      <AlertDialog
        dir={locale === "ar" ? "rtl" : "ltr"}
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) setEditingAddress(null);
        }}
      >
        <AlertDialogContent className={"xl:max-w-[768px] 2xl:max-w-[840px] gap-0"}>
          <AlertDialogHeader className={"flex-row items-center justify-between mb-2 2xl:mb-4"}>
            <AlertDialogTitle className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-semibold text-[#282828]">
              {t("edit_title")}
            </AlertDialogTitle>
            <AlertDialogDescription className={"sr-only"}>{t("edit_description")}</AlertDialogDescription>
            <AlertDialogCancel className={"h-auto p-0 border-0 hover:bg-transparent"}>
              <X className="size-5 text-black" />
            </AlertDialogCancel>
          </AlertDialogHeader>

          <div className="max-h-[70vh] mask-[linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)] overflow-y-auto overflow-x-hidden">
            <UpdateAddressFormCheckout
              isFromCheckout={isFromCheckout}
              locale={locale}
              addressData={editingAddress}
              onSuccess={() => {
                setIsEditDialogOpen(false);
                setEditingAddress(null);
              }}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        dir={locale === "ar" ? "rtl" : "ltr"}
        open={isActionDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsActionDialogOpen(false);
            setPendingAction(null);
          }
        }}
      >
        <AlertDialogContent size="none" className=" gap-4 p-6">
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle className="text-base font-semibold text-gray-900">
              {pendingAction?.kind === "delete" ? t("delete_title") : t("set_default_title")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-600">
              {pendingAction?.kind === "delete" ? t("delete_confirm") : t("set_default_confirm")}
            </AlertDialogDescription>
            {pendingAction?.kind === "delete" && pendingAction?.addressType === "billing" && (
              <p className="text-sm text-red-600 font-medium">{t("delete_billing_warning")}</p>
            )}
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-row justify-end gap-3 sm:space-x-0">
            <AlertDialogCancel
              className="mt-0 px-4 py-2 h-auto text-sm font-medium border border-gray-300 hover:bg-gray-50"
              onClick={() => {
                setIsActionDialogOpen(false);
                setPendingAction(null);
              }}
            >
              {tCommon("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              className="mt-0 px-4 py-2 h-auto text-sm font-medium bg-red-600 hover:bg-red-700 text-white border-0"
              onClick={(e) => {
                e.preventDefault();
                confirmAction();
              }}
              disabled={isProcessing}
            >
              {pendingAction?.kind === "delete"
                ? isDeletingAddress
                  ? t("deleting")
                  : tCommon("delete")
                : isUpdatingDefault
                  ? tCommon("updating")
                  : t("set_default")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddressBlockCheckout;
