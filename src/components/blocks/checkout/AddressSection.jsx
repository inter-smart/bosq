"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddAddressBlock from "./AddAddressBlock";
import AddressBlock from "./AddressBlock";
import { useGetAddressesQuery } from "@/store/services/addressApi";
import { AddressListSkeletonCompact } from "@/components/skeletons/AddressBoxSkeleton";
import { setUseSameAddressForBilling, setUseSameAddressForShipping } from "@/store/slices/checkoutSlice";

const AddressSection = ({ locale }) => {
  const dispatch = useDispatch();
  const useSameAddressForBilling = useSelector((state) => state.checkout.useSameAddressForBilling);
  const useSameAddressForShipping = useSelector((state) => state.checkout.useSameAddressForShipping);

  const [showShippingAddressForm, setShowShippingAddressForm] = React.useState(false);
  const [showBillingAddressForm, setShowBillingAddressForm] = React.useState(false);

  const { data, isLoading, isError } = useGetAddressesQuery();

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

  if (isError) return <div>Failed to load addresses</div>;

  return (
    <>
      {/* Shipping Address Block - Always shown */}
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
          />
        )
      )}

      {/* Add New Shipping Address Button */}
      {!showShippingAddressForm && (
        <div className="w-full mb-1 xl:mb-2.5 2xl:mb-4">
          <Button
            variant={"white"}
            onClick={() => setShowShippingAddressForm(true)}
            className="xl:text-[12px] 2xl:text-[14px] font-medium min-w-[120px] xl:min-w-[150px] 2xl:min-w-[190px] bg-white"
          >
            Add New Address
            <Plus className="size-3" />
          </Button>
        </div>
      )}

      {/* Shipping Address Form */}
      {showShippingAddressForm && (
        <AddAddressBlock
          locale={locale}
          variant="shipping"
          onCancel={() => setShowShippingAddressForm(false)}
          onSuccess={() => setShowShippingAddressForm(false)}
        />
      )}

      <>
        {billingAddresses.length > 0 && (
          <AddressBlock
            locale={locale}
            variant={"billing"}
            data={billingAddresses}
            useSameAddress={useSameAddressForShipping}
            setUseSameAddress={handleUseSameForShippingChange}
          />
        )}

        {/* Add New Billing Address Button */}
        {!showBillingAddressForm && (
          <div className="w-full mb-1 xl:mb-2.5 2xl:mb-4">
            <Button
              variant={"white"}
              onClick={() => setShowBillingAddressForm(true)}
              className="xl:text-[12px] 2xl:text-[14px] font-medium min-w-[120px] xl:min-w-[150px] 2xl:min-w-[190px] bg-white"
            >
              Add New Billing Address
              <Plus className="size-3" />
            </Button>
          </div>
        )}

        {/* Billing Address Form */}
        {showBillingAddressForm && (
          <AddAddressBlock
            locale={locale}
            variant="billing"
            onCancel={() => setShowBillingAddressForm(false)}
            onSuccess={() => setShowBillingAddressForm(false)}
          />
        )}
      </>
    </>
  );
};

export default AddressSection;
