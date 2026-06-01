"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import AddAddressBlockCheckout from "./AddAddressBlockCheckout";
import AddressBlockCheckout from "./AddressBlockCheckout";
import { useGetAddressesQuery } from "@/store/services/addressApi";
import { AddressListSkeletonCompact } from "@/components/skeletons/AddressBoxSkeleton";
import {
  setUseSameAddressForBilling,
  setUseSameAddressForShipping,
  setSelectedShippingAddress,
  setSelectedBillingAddress,
} from "@/store/slices/checkoutSlice";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UpdateAddressFormCheckout from "@/components/form/update-address-form-checkout";
import { useShippingChargeUpdater } from "@/hooks/useShippingChargeUpdater";

const AddressSection = ({ locale }) => {
  const dispatch = useDispatch();
  const t = useTranslations("address");
  const useSameAddressForBilling = useSelector((state) => state.checkout.useSameAddressForBilling);
  const useSameAddressForShipping = useSelector((state) => state.checkout.useSameAddressForShipping);
  const selectedShippingAddressId = useSelector((state) => state.checkout.selectedShippingAddressId);
  const selectedBillingAddressId = useSelector((state) => state.checkout.selectedBillingAddressId);

  const [showShippingAddressForm, setShowShippingAddressForm] = useState(false);
  const [showBillingAddressForm, setShowBillingAddressForm] = useState(false);
  const [editModalAddress, setEditModalAddress] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading, isError } = useGetAddressesQuery(undefined, { refetchOnMountOrArgChange: true });
  const { updateCharge } = useShippingChargeUpdater();

  const shippingAddresses = data?.data?.shipping || [];
  const billingAddresses = data?.data?.billing || [];

  // Helper: get the state_id integer from a given address id
  const getStateIdFromAddressId = (addressId) => {
    const allAddresses = [...shippingAddresses, ...billingAddresses];
    const addr = allAddresses.find((a) => a.id === addressId);
    return addr?.state_id ?? null;
  };

  // Auto-enable "use same address" checkbox when only one type is available
  useEffect(() => {
    if (isLoading) return;

    const hasShipping = shippingAddresses.length > 0;
    const hasBilling = billingAddresses.length > 0;

    // If only shipping addresses exist, auto-enable "use same for billing"
    if (hasShipping && !hasBilling && !useSameAddressForBilling) {
      dispatch(setUseSameAddressForBilling(true));
    }
    // If only billing addresses exist, auto-enable "use same for shipping"
    else if (hasBilling && !hasShipping && !useSameAddressForShipping) {
      dispatch(setUseSameAddressForShipping(true));
    }
  }, [shippingAddresses.length, billingAddresses.length, isLoading, dispatch, useSameAddressForBilling, useSameAddressForShipping]);

  const handleUseSameForBillingChange = (value) => {
    dispatch(setUseSameAddressForBilling(value));
    // Auto-select first shipping address if none is selected
    if (value && shippingAddresses.length > 0 && !selectedShippingAddressId) {
      const sorted = [...shippingAddresses].sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0));
      dispatch(setSelectedShippingAddress((sorted.find((a) => a.is_default) || sorted[0]).id));
    }
    // Shipping address still governs the charge — fire update with shipping state
    const governingId = selectedShippingAddressId;
    const stateId = getStateIdFromAddressId(governingId);
    if (stateId) updateCharge(stateId);
  };

  const handleUseSameForShippingChange = (value) => {
    dispatch(setUseSameAddressForShipping(value));

    // Auto-select first billing address if none is selected
    if (value && billingAddresses.length > 0 && !selectedBillingAddressId) {
      const sorted = [...billingAddresses].sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0));
      const selected = sorted.find((a) => a.is_default) || sorted[0];
      dispatch(setSelectedBillingAddress(selected.id));
    }

    if (value) {
      // Billing address is now used for shipping — update charge with billing state
      const governingId = selectedBillingAddressId;
      const stateId = getStateIdFromAddressId(governingId);
      if (stateId) updateCharge(stateId);
    } else {
      // Reverted — shipping address governs again
      const governingId = selectedShippingAddressId;
      const stateId = getStateIdFromAddressId(governingId);
      if (stateId) updateCharge(stateId);
    }

    // Open edit modal when unchecking and no shipping addresses exist
    if (!value && shippingAddresses.length === 0) {
      const selectedBilling = billingAddresses.find((a) => a.id === selectedBillingAddressId) || billingAddresses[0];
      if (selectedBilling) {
        setEditModalAddress(selectedBilling);
        setIsEditModalOpen(true);
      }
    }
  };

  // Determine if the address being edited in the modal is the effective shipping address
  const effectiveShippingAddressId = useSameAddressForShipping ? selectedBillingAddressId : selectedShippingAddressId;

  if (isError) return <div>{t("failed_to_load")}</div>;

  return (
    <>
      {/* Shipping Address Block - disabled when "Use Same For Shipping" is checked on billing */}
      <div className={cn(useSameAddressForShipping && "opacity-50 pointer-events-none")}>
        {isLoading ? (
          <AddressListSkeletonCompact />
        ) : (
          shippingAddresses.length > 0 && (
            <AddressBlockCheckout
              locale={locale}
              variant={"shipping"}
              isFromCheckout={true}
              data={shippingAddresses}
              useSameAddress={useSameAddressForBilling}
              setUseSameAddress={handleUseSameForBillingChange}
              disabled={useSameAddressForShipping}
            />
          )
        )}
      </div>

      {/* Shipping Address Form */}
      {showShippingAddressForm && (
        <AddAddressBlockCheckout
          locale={locale}
          variant="billing"
          onCancel={() => setShowShippingAddressForm(false)}
          onSuccess={() => setShowShippingAddressForm(false)}
        />
      )}

      {/* Billing Address Block - disabled when "Use Same For Billing" is checked on shipping */}
      <div className={cn(useSameAddressForBilling && "opacity-50 pointer-events-none")}>
        {billingAddresses.length > 0 && (
          <AddressBlockCheckout
            locale={locale}
            variant={"billing"}
            data={billingAddresses}
            useSameAddress={useSameAddressForShipping}
            setUseSameAddress={handleUseSameForShippingChange}
            disabled={useSameAddressForBilling}
          />
        )}

        {/* Billing Address Form */}
        {showBillingAddressForm && !useSameAddressForBilling && (
          <AddAddressBlockCheckout
            locale={locale}
            variant="billing"
            onCancel={() => setShowBillingAddressForm(false)}
            onSuccess={() => setShowBillingAddressForm(false)}
          />
        )}
      </div>
      <div className="w-full mb-1 xl:mb-2.5 2xl:mb-4">
        <Button
          variant={"white"}
          onClick={() => setShowShippingAddressForm(true)}
          className="xl:text-[12px] 2xl:text-[14px] font-medium min-w-[120px] xl:min-w-[150px] 2xl:min-w-[190px] bg-white"
        >
          {t("add_new")}
          <Plus className="size-3" />
        </Button>
      </div>

      {/* Edit Address Dialog - triggered when "use same for shipping" with no shipping addresses */}
      <AlertDialog
        dir={locale === "ar" ? "rtl" : "ltr"}
        open={isEditModalOpen}
        onOpenChange={(open) => {
          setIsEditModalOpen(open);
          if (!open) setEditModalAddress(null);
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
              isFromCheckout={true}
              showShipToDifferent={true}
              locale={locale}
              addressData={editModalAddress}
              onStateChange={editModalAddress?.id === effectiveShippingAddressId ? updateCharge : null}
              onSuccess={() => {
                setIsEditModalOpen(false);
                setEditModalAddress(null);
              }}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddressSection;

