"use client";

import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import AddAddressBlock from "./AddAddressBlock";
import AddressBlock from "./AddressBlock";
import { toast } from "sonner";

const AddressSection = ({ locale }) => {
  const [useSameAddress, setUseSameAddress] = React.useState(true);
  const [showShippingAddressForm, setShowShippingAddressForm] = React.useState(false);
  const [showBillingAddressForm, setShowBillingAddressForm] = React.useState(false);
  const [address, setAddress] = React.useState([]);

  const fetchAddress = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frontend/address`, {
        credentials: "include",
      });

      const data = await response.json();

      console.log(data);
      console.log(data?.data?.address);

      setAddress(data?.data?.address);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <>
      <AddressBlock locale={locale} variant={"shipping"} data={address} useSameAddress={useSameAddress} setUseSameAddress={setUseSameAddress} />

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
