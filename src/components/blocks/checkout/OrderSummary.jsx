"use client";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/utils/text";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

const paymentMethods = [
  {
    id: 1,
    name: "Cash On Delivery (COD)",
    description: "Pay by card or another accepted payment method",
  },
  {
    id: 2,
    name: "Pay Online",
    description: "You will be redirected to payment gateway.",
  },
];

const OrderSummary = ({ products, cartId, subTotal, itemsCount, totalItems, locale }) => {
  // Get selected addresses from Redux
  const { selectedShippingAddressId, selectedBillingAddressId, useSameAddressForBilling, useSameAddressForShipping } = useSelector(
    (state) => state.checkout,
  );

  const [couponStatus, setCouponStatus] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [checkoutList, setCheckoutList] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("1");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle coupon application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCouponStatus(true);
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      setCouponStatus(false);
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCouponStatus(false);
      setCouponCode("");
    } catch (error) {
      console.error("Failed to remove coupon:", error);
    }
  };

  // Determine final address IDs based on checkbox states
  const getFinalAddressIds = () => {
    let shippingId = selectedShippingAddressId;
    let billingId = selectedBillingAddressId;

    // If "use same for billing" is checked, billing = shipping
    if (useSameAddressForBilling && selectedShippingAddressId) {
      billingId = selectedShippingAddressId;
    }
    // If "use same for shipping" is checked, shipping = billing
    if (useSameAddressForShipping && selectedBillingAddressId) {
      shippingId = selectedBillingAddressId;
    }

    return { shippingId, billingId };
  };

  const handlePlaceOrder = () => {
    const { shippingId, billingId } = getFinalAddressIds();

    console.log(shippingId);
    console.log(billingId);

    // Validate shipping address is selected
    if (!shippingId) {
      // If billing is selected but "use same for shipping" is not checked
      if (selectedBillingAddressId && !useSameAddressForShipping) {
        toast.error("Please select a shipping address or check 'Use Same Address For Shipping' in billing section");
      } else {
        toast.error("Please select a shipping address");
      }
      return;
    }

    // Validate billing address is selected
    if (!billingId) {
      // If shipping is selected but "use same for billing" is not checked
      if (selectedShippingAddressId && !useSameAddressForBilling) {
        toast.error("Please select a billing address or check 'Use Same Address For Billing' in shipping section");
      } else {
        toast.error("Please select a billing address");
      }
      return;
    }

    console.log("Placing order with:", {
      cartId,
      shippingAddressId: shippingId,
      billingAddressId: billingId,
      paymentMethod: selectedPaymentMethod,
    });

    toast.success("Order placed successfully!");
    // TODO: Call place order API with these values
  };

  // Check if order can be placed
  const { shippingId, billingId } = getFinalAddressIds();
  const canPlaceOrder = termsAccepted && shippingId && billingId;

  return (
    <>
      <div className="w-full lg:w-[320px] xl:w-[460px] 2xl:w-[540px] 3xl:w-[668px]">
        {/* Order Summary */}
        <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-[4px] p-3 sm:p-4 xl:px-7 2xl:px-8 xl:py-4 2xl:py-6 mb-2 xl:mb-4">
          <Text as="div" size="text3" className="text-[#808080] mb-1 xl:mb-2 2xl:mb-3">
            {totalItems} Items
          </Text>
          <button
            onClick={() => setCheckoutList((prev) => !prev)}
            className="text-[10px] 2xl:text-[12px] leading-none font-light truncate text-black mb-2 xl:mb-2.5 flex hover:underline"
          >
            Show Details <ChevronDown className={cn("size-3 transition", checkoutList && "rotate-180")} />
          </button>

          {/* Cart Items List */}
          <div
            className={cn(
              "w-full bg-white rounded-[4px] border border-[#e0e0e0] p-1 xl:p-2 transition duration-300 ease-in-out",
              checkoutList ? "h-auto block" : "h-0 hidden",
            )}
          >
            {products?.map((item, index) => (
              <div key={"checkout-item-" + index} className="group w-full flex flex-wrap items-center py-0.5">
                <div className="w-[30px] xl:w-[30px] 2xl:w-[40px] aspect-3/4 rounded-[4px] bg-white border border-gray-100 ">
                  <Image
                    src={item?.media_path}
                    alt={item?.media?.title}
                    width={168}
                    height={168}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="w-[calc(100%-30px)] sm:w-[calc(100%-35px)] xl:w-[calc(100%-30px)] 2xl:w-[calc(100%-40px)] px-1 sm:px-1 xl:px-1.5 flex justify-between gap-x-1 items-center">
                  <div className="w-[calc(100%-50px)]">
                    <Text
                      as="div"
                      size="none"
                      className="text-[10px] 2xl:text-[12px] leading-none truncate leading-none text-[#282828] mb-0.5 xl:mb-1"
                    >
                      {item?.title} x {item?.quantity}
                    </Text>
                    <Text as="div" size="none" className="text-[8px] 2xl:text-[10px] leading-none font-light truncate text-[#808080]">
                      {item?.slug}
                    </Text>
                  </div>
                  <div className="w-[50px]">
                    <Text as="div" size="text3" className="font-normal text-[#282828]">
                      {item?.price}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <Text
            as="div"
            size="text3"
            className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
          >
            <span>Subtotal ({itemsCount})</span>
            {subTotal}
          </Text>
          <Text
            as="div"
            size="text3"
            className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
          >
            <span>Shipping Charge</span>
            {"Free"}
          </Text>

          {/* Coupon Code Section */}
          <div className="w-full mb-2 xl:mb-3 2xl:mb-4">
            <div className="w-full bg-[#eee] p-1 xl:p-2 rounded-[4px] flex gap-1.5">
              <Input
                type="text"
                placeholder="Have a coupon code?"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={couponStatus}
                className={
                  "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1 flex-1"
                }
              />
              <Button
                variant={"black"}
                disabled={!couponCode.trim() || couponStatus}
                onClick={handleApplyCoupon}
                className="min-w-[60px] sm:min-w-[60px] xl:min-w-[80px] 2xl:min-w-[100px] h-[35px] lg:h-[35px] 2xl:h-[45px] 3xl:h-[45px] "
              >
                {"Add"}
              </Button>
            </div>
            {couponStatus && couponCode && (
              <div className="flex justify-between gap-2 my-1">
                <Text as="div" size="none" className="text-[10px] 2xl:text-[12px] leading-normal font-normal text-[#8e8e8e]">
                  '{couponCode}' Coupon Applied
                </Text>
                <button
                  className="text-[10px] 2xl:text-[12px] leading-normal font-normal text-black hover:underline cursor-pointer hover:text-red-600"
                  onClick={handleRemoveCoupon}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Total Price */}
          <Text as="div" size="text3" className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 flex justify-between max-sm:font-semibold">
            <span>
              Total Price
              <br />
              <span className="text-[8px] 2xl:text-[10px] font-light text-[#808080]">Inc Tax</span>
            </span>
            {subTotal}
          </Text>
        </div>

        {/* Payment Methods */}
        <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-[4px] p-3 sm:p-4 xl:py-4 2xl:py-6 xl:px-7 2xl:px-8 mb-2 xl:mb-4">
          <RadioGroup
            dir={locale === "ar" ? "rtl" : "ltr"}
            value={selectedPaymentMethod}
            onValueChange={setSelectedPaymentMethod}
            className={"grid-cols-1 3xs:grid-cols-2"}
          >
            {paymentMethods?.map((method, idx) => (
              <div key={"paymentMethods" + idx} className="w-full">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={"payment" + method?.id} id={"payment" + method?.id} />
                  <Label
                    htmlFor={"payment" + method?.id}
                    className={"text-[11px] lg:text-[10px] 2xl:text-[14px] 3xl:text-[16px] leading-tight font-light text-[#282828] cursor-pointer"}
                  >
                    {method?.name}
                  </Label>
                </div>
                <Text
                  as="div"
                  size="none"
                  className="text-[8px] lg:text-[9px] 2xl:text-[14px] leading-tight font-light text-[#808080] mt-1 xl:mt-2.5"
                >
                  {method?.description}
                </Text>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Privacy Policy */}
        <Text as="div" size="text3" className="leading-tight text-[#808080] [&_a]:underline mb-2 xl:mb-4">
          Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in
          our <Link href="/en/privacy-policy">Privacy Policy</Link>
        </Text>

        {/* Terms and Conditions */}
        <div className="flex items-center gap-3 mb-2 xl:mb-4">
          <Checkbox id="agree" checked={termsAccepted} onCheckedChange={setTermsAccepted} />
          <Label htmlFor="agree">
            <Text as="span" size="text3" className="leading-tight text-[#282828] [&_a]:underline">
              I have read and agree to the website <Link href="/en/terms-and-conditions">Terms and Conditions *</Link>
            </Text>
          </Label>
        </div>

        {/* Place Order Button - Desktop */}
        <MediaQuery minWidth={640}>
          <Button variant={"black"} disabled={!canPlaceOrder} onClick={handlePlaceOrder} className="min-w-full mt-2">
            {"Place Order"}
          </Button>
        </MediaQuery>
      </div>
    </>
  );
};

export default OrderSummary;
