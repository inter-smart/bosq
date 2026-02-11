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
import { useGetAddressesQuery } from "@/store/services/addressApi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/utils/heading";
import { usePlaceOrderMutation } from "@/store/services/orderApi";
import { useRouter } from "next/navigation";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

const paymentMethods = [
  {
    id: 1,
    slug: "cod",
    name: "Cash On Delivery (COD)",
    description: "Pay by card or another accepted payment method",
  },
  {
    id: 2,
    slug: "online",
    name: "Pay Online",
    description: "You will be redirected to payment gateway.",
  },
];

const OrderSummary = ({ products, cartId, subTotal, itemsCount, totalItems, locale }) => {
  // Get selected addresses from Redux
  const { selectedShippingAddressId, selectedBillingAddressId, useSameAddressForBilling, useSameAddressForShipping } = useSelector(
    (state) => state.checkout,
  );

  const [placeOrder] = usePlaceOrderMutation();

  const router = useRouter();

  const [couponStatus, setCouponStatus] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [checkoutList, setCheckoutList] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Fetch addresses to display in confirmation dialog
  const { data: addressData } = useGetAddressesQuery();
  const allShippingAddresses = addressData?.data?.shipping || [];
  const allBillingAddresses = addressData?.data?.billing || [];

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

  // Find address details by ID from both lists
  const findAddress = (id) => {
    return [...allShippingAddresses, ...allBillingAddresses].find((addr) => addr.id === id) || null;
  };

  // Get the selected payment method label
  const getSelectedPaymentLabel = () => {
    const method = paymentMethods.find((m) => m.slug === selectedPaymentMethod);
    return method?.name || "Unknown";
  };

  const handlePlaceOrder = () => {
    const { shippingId, billingId } = getFinalAddressIds();

    // Validate shipping address is selected
    if (!shippingId) {
      if (selectedBillingAddressId && !useSameAddressForShipping) {
        toast.error("Please select a shipping address or check 'Use Same Address For Shipping' in billing section");
      } else {
        toast.error("Please select a shipping address");
      }
      return;
    }

    // Validate billing address is selected
    if (!billingId) {
      if (selectedShippingAddressId && !useSameAddressForBilling) {
        toast.error("Please select a billing address or check 'Use Same Address For Billing' in shipping section");
      } else {
        toast.error("Please select a billing address");
      }
      return;
    }

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const confirmPlaceOrder = async () => {
    const { shippingId, billingId } = getFinalAddressIds();

    const address = {
      billing: billingId,
      shipping: shippingId,
    };

    console.log("Placing order with:", {
      cartId,
      shippingAddressId: shippingId,
      billingAddressId: billingId,
      paymentMethod: selectedPaymentMethod,
    });

    try {
      const orderData = await placeOrder({
        address,
        payment_type: selectedPaymentMethod,
      }).unwrap();

      const orderId = orderData.data?.orderId;

      console.log("Placed order with ID:", orderData);

      setShowConfirmDialog(false);
      router.push(`/order/success?orderId=${orderId}`);
    } catch (error) {
      console.log("error", error);
      toast.error(error || "Failed to place order");
    }
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
                      AED {item?.line_total}
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
                  <RadioGroupItem value={method?.slug} id={method?.slug} />
                  <Label
                    htmlFor={method?.slug}
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

      {/* Order Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="xl:max-w-[520px] 2xl:max-w-[600px] gap-0 p-5 xl:p-6 2xl:p-8">
          <AlertDialogHeader className="mb-3 xl:mb-4">
            <AlertDialogTitle className="text-[14px] xl:text-[16px] 2xl:text-[18px] font-semibold text-[#282828]">
              Confirm Your Order
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[11px] xl:text-[12px] 2xl:text-[14px] text-[#808080]">
              Please review your order details before confirming.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-3 xl:space-y-4 mb-4 xl:mb-5">
            {/* Payment Method */}
            <div className="bg-[#f4f4f4] rounded-[4px] p-3 xl:p-4">
              <Heading as="div" size="heading5" className="font-medium text-[#282828] mb-1">
                Payment Method
              </Heading>
              <Text as="div" size="text3" className="text-[#282828]">
                {getSelectedPaymentLabel()}
              </Text>
            </div>

            {/* Shipping Address */}
            {(() => {
              const { shippingId, billingId } = getFinalAddressIds();
              const shippingAddr = findAddress(shippingId);
              const billingAddr = findAddress(billingId);
              const isSameAddress = shippingId === billingId;

              return (
                <>
                  <div className="bg-[#f4f4f4] rounded-[4px] p-3 xl:p-4">
                    <Heading as="div" size="heading5" className="font-medium text-[#282828] mb-1">
                      Shipping Address
                      {isSameAddress && <span className="text-[10px] xl:text-[11px] font-light text-[#808080] ml-2">(Same as Billing)</span>}
                    </Heading>
                    {shippingAddr ? (
                      <div>
                        <Text as="div" size="text3" className="font-medium text-[#282828]">
                          {shippingAddr.full_name || shippingAddr.name}
                        </Text>
                        <Text as="div" size="text3" className="text-[#606060]">
                          {shippingAddr.street_address || shippingAddr.address_line_1}
                          {(shippingAddr.apartment || shippingAddr.address_line_2) && `, ${shippingAddr.apartment || shippingAddr.address_line_2}`}
                        </Text>
                        <Text as="div" size="text3" className="text-[#606060]">
                          {shippingAddr.phone}
                        </Text>
                      </div>
                    ) : (
                      <Text as="div" size="text3" className="text-[#808080]">
                        No address selected
                      </Text>
                    )}
                  </div>

                  {/* Billing Address - only show separately if different */}
                  {!isSameAddress && (
                    <div className="bg-[#f4f4f4] rounded-[4px] p-3 xl:p-4">
                      <Heading as="div" size="heading5" className="font-medium text-[#282828] mb-1">
                        Billing Address
                      </Heading>
                      {billingAddr ? (
                        <div>
                          <Text as="div" size="text3" className="font-medium text-[#282828]">
                            {billingAddr.full_name || billingAddr.name}
                          </Text>
                          <Text as="div" size="text3" className="text-[#606060]">
                            {billingAddr.street_address || billingAddr.address_line_1}
                            {(billingAddr.apartment || billingAddr.address_line_2) && `, ${billingAddr.apartment || billingAddr.address_line_2}`}
                          </Text>
                          <Text as="div" size="text3" className="text-[#606060]">
                            {billingAddr.phone}
                          </Text>
                        </div>
                      ) : (
                        <Text as="div" size="text3" className="text-[#808080]">
                          No address selected
                        </Text>
                      )}
                    </div>
                  )}

                  {/* Order Total */}
                  <div className="flex justify-between items-center pt-2 border-t border-[#e0e0e0]">
                    <Text as="div" size="text3" className="font-medium text-[#282828]">
                      Total Amount
                    </Text>
                    <Text as="div" size="text3" className="font-semibold text-[#282828]">
                      {subTotal}
                    </Text>
                  </div>
                </>
              );
            })()}
          </div>

          <AlertDialogFooter className="flex-row justify-end gap-2 sm:space-x-0">
            <AlertDialogCancel className="mt-0 px-4 py-2 h-auto text-sm font-medium border border-gray-300 hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPlaceOrder}
              className="mt-0 px-6 py-2 h-auto text-sm font-medium bg-black hover:bg-black/90 text-white border-0"
            >
              Confirm Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderSummary;
