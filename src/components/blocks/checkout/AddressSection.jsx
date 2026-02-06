"use client";

import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import AddAddressBlock from "./AddAddressBlock";
import AddressBlock from "./AddressBlock";
import { toast } from "sonner";
import { useGetAddressesQuery } from "@/store/services/addressApi";
import { AddressListSkeletonCompact } from "@/components/skeletons/AddressBoxSkeleton";

const AddressSection = ({ locale }) => {
  const [useSameAddress, setUseSameAddress] = React.useState(true);
  const [showShippingAddressForm, setShowShippingAddressForm] = React.useState(false);
  const [showBillingAddressForm, setShowBillingAddressForm] = React.useState(false);

  const { data, isLoading, isError } = useGetAddressesQuery();

  if (isError) return <div>Failed to load addresses</div>;

  const address = data?.data;

  return (
    <>
      {isLoading ? (
        <AddressListSkeletonCompact />
      ) : (
        address.length > 0 && (
          <AddressBlock locale={locale} variant={"shipping"} data={address} useSameAddress={useSameAddress} setUseSameAddress={setUseSameAddress} />
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
        <AddAddressBlock locale={locale} onCancel={() => setShowShippingAddressForm(false)} onSuccess={() => setShowShippingAddressForm(false)} />
      )}

      {/* Billing Address Block - Only show if checkbox is unchecked */}
      {!useSameAddress && (
        <>
          <AddressBlock locale={locale} variant={"billing"} data={data?.billingAddress} />

          {/* Add New Billing Address Button */}
          {!showBillingAddressForm && (
            <div className="w-full mb-1 xl:mb-2.5 2xl:mb-4">
              <Button
                variant={"white"}
                onClick={() => setShowBillingAddressForm(true)}
                className="xl:text-[12px] 2xl:text-[14px] font-medium min-w-[120px] xl:min-w-[150px] 2xl:min-w-[190px] bg-white"
              >
                Add New Address
                <Plus className="size-3" />
              </Button>
            </div>
          )}

          {/* Billing Address Form */}
          {showBillingAddressForm && (
            <AddAddressBlock locale={locale} onCancel={() => setShowBillingAddressForm(false)} onSuccess={() => setShowBillingAddressForm(false)} />
          )}
        </>
      )}
    </>
  );
};

export default AddressSection;
