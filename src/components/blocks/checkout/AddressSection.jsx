"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddAddressBlock from "./AddAddressBlock";
import AddressBlock from "./AddressBlock";
import { useGetAddressesQuery } from "@/store/services/addressApi";
import { AddressListSkeletonCompact } from "@/components/skeletons/AddressBoxSkeleton";
import { setUseSameAddressForBilling, setUseSameAddressForShipping } from "@/store/slices/checkoutSlice";
import { cn } from "@/lib/utils";

const AddressSection = ({ locale }) => {
  const dispatch = useDispatch();
  const t = useTranslations("address");
  const useSameAddressForBilling = useSelector((state) => state.checkout.useSameAddressForBilling);
  const useSameAddressForShipping = useSelector((state) => state.checkout.useSameAddressForShipping);
  const user = useSelector((state) => state.auth.user);

  const [showShippingAddressForm, setShowShippingAddressForm] = React.useState(false);
  const [showBillingAddressForm, setShowBillingAddressForm] = React.useState(false);

  const { data, isLoading, isError } = useGetAddressesQuery(undefined, { skip: !user });

  const shippingAddresses = data?.data?.shipping || [];
  const billingAddresses = data?.data?.billing || [];

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
  };

  const handleUseSameForShippingChange = (value) => {
    dispatch(setUseSameAddressForShipping(value));
  };

  if (isError) return <div>{t("failed_to_load")}</div>;

  return (
    <>
      {/* Shipping Address Block - disabled when "Use Same For Shipping" is checked on billing */}
      <div className={cn(useSameAddressForShipping && "opacity-50 pointer-events-none")}>
        {isLoading ? (
          <AddressListSkeletonCompact />
        ) : (
          shippingAddresses.length > 0 && (
            <AddressBlock
              locale={locale}
              variant={"shipping"}
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
        <AddAddressBlock
          locale={locale}
          variant="shipping"
          onCancel={() => setShowShippingAddressForm(false)}
          onSuccess={() => setShowShippingAddressForm(false)}
        />
      )}

      {/* Billing Address Block - disabled when "Use Same For Billing" is checked on shipping */}
      <div className={cn(useSameAddressForBilling && "opacity-50 pointer-events-none")}>
        {billingAddresses.length > 0 && (
          <AddressBlock
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
          <AddAddressBlock
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
    </>
  );
};

export default AddressSection;
