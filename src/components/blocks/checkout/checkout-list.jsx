"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { useState } from "react";
import dynamic from "next/dynamic";
import SoftLoginForm from "@/components/form/soft-login-form";
import AddressForm from "@/components/form/address-form";
import Image from "next/image";
import { ChevronDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import CheckoutResponse from "./checkout-response";

import parse from "html-react-parser";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UpdateAddressForm from "@/components/form/update-address-form";
import MatchingProductDialog from "@/components/common/matching-product-dialog";

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

export default function CheckoutList({ locale, data }) {
  const [loading, setLoading] = useState(false);
  const [checkoutList, setCheckoutList] = useState(false);
  const [couponStatus, setCouponStatus] = useState(!!data?.coupon_code);
  const [couponCode, setCouponCode] = useState(data?.coupon_code || "");
  const [isAuth, setIsAuth] = useState(!!data?.customer);
  const [orderStatus, setOrderStatus] = useState(null);

  // Address management states
  const [showShippingAddressForm, setShowShippingAddressForm] = useState(false);
  const [showBillingAddressForm, setShowBillingAddressForm] = useState(false);
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("payment1");

  // Handle coupon application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setLoading(true);
    try {
      // API call to apply coupon
      // const response = await applyCouponAPI(couponCode);
      // if (response.success) {
      //   setCouponStatus(true);
      //   // Update cart totals from response
      // }

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCouponStatus(true);
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      setCouponStatus(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = async () => {
    setLoading(true);
    try {
      // API call to remove coupon
      // await removeCouponAPI();

      await new Promise((resolve) => setTimeout(resolve, 500));
      setCouponStatus(false);
      setCouponCode("");
    } catch (error) {
      console.error("Failed to remove coupon:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    // Validation
    if (!isAuth) {
      alert("Please login to continue");
      return;
    }

    if (!data?.shippingAddress?.items?.length && !showShippingAddressForm) {
      alert("Please add a shipping address");
      return;
    }

    if (
      !useSameAddress &&
      !data?.billingAddress?.items?.length &&
      !showBillingAddressForm
    ) {
      alert("Please add a billing address");
      return;
    }

    if (!termsAccepted) {
      alert("Please accept terms and conditions");
      return;
    }

    setLoading(true);
    try {
      // API call to place order
      // const response = await placeOrderAPI({
      //   paymentMethod: selectedPaymentMethod,
      //   shippingAddressId: selectedShippingAddressId,
      //   billingAddressId: useSameAddress ? selectedShippingAddressId : selectedBillingAddressId,
      //   couponCode: couponStatus ? couponCode : null
      // });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOrderStatus(true);

      // If payment method is online, redirect to payment gateway
      if (selectedPaymentMethod === "payment2") {
        // window.location.href = response.paymentGatewayUrl;
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      setOrderStatus(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-full block py-[10px_30px] xl:py-[15px_60px] 2xl:py-[20px_100px] relative z-0">
        <div className="container">
          <div className="flex flex-wrap -mx-2.5 xl:-mx-8 2xl:-mx-10 [&>*]:px-2.5 xl:[&>*]:px-8 2xl:[&>*]:px-10 [&>*]:py-3 xl:[&>*]:py-5 2xl:[&>*]:py-7">
            <div className="w-full">
              <MatchingProductDialog
                data={data?.frequentlyBought}
                locale={locale}
              >
                <div className="w-full border border-[#d4d4d4] flex justify-between p-2 xl:p-3 2xl:p-4">
                  <div className="flex items-center gap-2.5 2xl:gap-3">
                    <div className="text-white w-6 xl:w-8 2xl:w-10 aspect-square bg-black rounded-full flex justify-center items-center">
                      <Plus className="size-4" />
                    </div>
                    <div>
                      <Text
                        as="div"
                        size="text3"
                        className="font-medium text-[#282828]"
                      >
                        Add Complementary Items to Your Order?
                      </Text>
                      <Text
                        as="div"
                        size="text3"
                        className="text-[#282828] [&>a]:font-medium"
                      >
                        Save up to AED 110 with our curated bundles •{" "}
                        <Link href="#">Click to view options</Link>
                      </Text>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant={"black"}
                      disabled={false}
                      className="min-w-[100px] sm:min-w-[120px] xl:min-w-[140px] 2xl:min-w-[210px]"
                    >
                      View Bundles
                    </Button>
                  </div>
                </div>
              </MatchingProductDialog>
            </div>

            <div className="w-full lg:w-[calc(100%-320px)] xl:w-[calc(100%-460px)] 2xl:w-[calc(100%-540px)] 3xl:w-[calc(100%-668px)]">
              {/* Personal Information */}
              <div className="w-full h-auto block p-3 lg:p-4 xl:p-4 2xl:p-7 rounded-[4px] border border-[#e0e0e0] mb-1 xl:mb-2.5 2xl:mb-4">
                <Heading
                  as="h4"
                  size="heading4"
                  className="font-normal text-[#282828] mb-3 2xl:mb-4"
                >
                  Personal Information
                </Heading>
                {!isAuth ? (
                  <SoftLoginForm setIsAuth={setIsAuth} />
                ) : (
                  <div>
                    <Text
                      as="div"
                      size="text3"
                      className="font-normal text-[#282828] my-0.5 2xl:my-1 [&_span]:font-light [&_span]:text-[#808080]"
                    >
                      <span>Connected as</span>{" "}
                      {data?.customer?.first_name +
                        " " +
                        data?.customer?.last_name}
                      .
                    </Text>
                    <Text
                      as="div"
                      size="text3"
                      className="font-normal text-[#282828] my-0.5 2xl:my-1 [&_span]:font-light [&_span]:text-[#808080]"
                    >
                      <span>Not you?</span>{" "}
                      <div
                        className="inline hover:underline cursor-pointer"
                        onClick={() => setIsAuth(false)}
                      >
                        {" "}
                        Log out
                      </div>
                    </Text>
                  </div>
                )}
              </div>

              {/* Shipping Address Block */}
              <AddressBlock
                locale={locale}
                variant={"shipping"}
                data={data?.shippingAddress}
                useSameAddress={useSameAddress}
                setUseSameAddress={setUseSameAddress}
              />

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
                  onCancel={() => setShowShippingAddressForm(false)}
                  onSuccess={() => setShowShippingAddressForm(false)}
                />
              )}

              {/* Billing Address Block - Only show if checkbox is unchecked */}
              {!useSameAddress && (
                <>
                  <AddressBlock
                    locale={locale}
                    variant={"billing"}
                    data={data?.billingAddress}
                  />

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
                    <AddAddressBlock
                      locale={locale}
                      onCancel={() => setShowBillingAddressForm(false)}
                      onSuccess={() => setShowBillingAddressForm(false)}
                    />
                  )}
                </>
              )}

              {/* Order Status Response */}
              {orderStatus !== null && (
                <CheckoutResponse orderStatus={orderStatus} />
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-[320px] xl:w-[460px] 2xl:w-[540px] 3xl:w-[668px]">
              {/* Order Summary */}
              <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-[4px] p-3 sm:p-4 xl:px-7 2xl:px-8 xl:py-4 2xl:py-6 mb-2 xl:mb-4">
                <Text
                  as="div"
                  size="text3"
                  className="text-[#808080] mb-1 xl:mb-2 2xl:mb-3"
                >
                  {data?.items_count} Items
                </Text>
                <button
                  onClick={() => setCheckoutList((prev) => !prev)}
                  className="text-[10px] 2xl:text-[12px] leading-none font-light truncate text-black mb-2 xl:mb-2.5 flex hover:underline"
                >
                  Show Details{" "}
                  <ChevronDown
                    className={cn(
                      "size-3 transition",
                      checkoutList && "rotate-180"
                    )}
                  />
                </button>

                {/* Cart Items List */}
                <div
                  className={cn(
                    "w-full bg-white rounded-[4px] border border-[#e0e0e0] p-1 xl:p-2 transition duration-300 ease-in-out",
                    checkoutList ? "h-auto block" : "h-0 hidden"
                  )}
                >
                  {data?.items?.map((item, index) => (
                    <div
                      key={"checkout-item-" + index}
                      className="group w-full flex flex-wrap items-center py-0.5"
                    >
                      <div className="w-[30px] xl:w-[30px] 2xl:w-[40px] aspect-3/4 rounded-[4px] bg-white border border-gray-100 ">
                        <Image
                          src={item?.media?.path}
                          alt={item?.media?.alt}
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
                            {item?.name} x {item?.quantity}
                          </Text>
                          <Text
                            as="div"
                            size="none"
                            className="text-[8px] 2xl:text-[10px] leading-none font-light truncate text-[#808080]"
                          >
                            {item?.description}
                          </Text>
                        </div>
                        <div className="w-[50px]">
                          <Text
                            as="div"
                            size="text3"
                            className="font-normal text-[#282828]"
                          >
                            {item?.formatted_price}
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
                  <span>Subtotal ({data?.items_count})</span>
                  {data?.formatted_sub_total}
                </Text>
                <Text
                  as="div"
                  size="text3"
                  className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
                >
                  <span>Shipping Charge</span>
                  {data?.formatted_shipping_charge}
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
                      disabled={loading || !couponCode.trim() || couponStatus}
                      onClick={handleApplyCoupon}
                      className="min-w-[60px] sm:min-w-[60px] xl:min-w-[80px] 2xl:min-w-[100px] h-[35px] lg:h-[35px] 2xl:h-[45px] 3xl:h-[45px] "
                    >
                      {loading ? "Applying..." : "Add"}
                    </Button>
                  </div>
                  {couponStatus && couponCode && (
                    <div className="flex justify-between gap-2 my-1">
                      <Text
                        as="div"
                        size="none"
                        className="text-[10px] 2xl:text-[12px] leading-normal font-normal text-[#8e8e8e]"
                      >
                        '{couponCode}' Coupon Applied
                      </Text>
                      <button
                        className="text-[10px] 2xl:text-[12px] leading-normal font-normal text-black hover:underline cursor-pointer hover:text-red-600"
                        onClick={handleRemoveCoupon}
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Total Price */}
                <Text
                  as="div"
                  size="text3"
                  className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 flex justify-between max-sm:font-semibold"
                >
                  <span>
                    Total Price
                    <br />
                    <span className="text-[8px] 2xl:text-[10px] font-light text-[#808080]">
                      Inc Tax
                    </span>
                  </span>
                  {data?.formatted_grand_total}
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
                        <RadioGroupItem
                          value={"payment" + method?.id}
                          id={"payment" + method?.id}
                        />
                        <Label
                          htmlFor={"payment" + method?.id}
                          className={
                            "text-[11px] lg:text-[10px] 2xl:text-[14px] 3xl:text-[16px] leading-tight font-light text-[#282828] cursor-pointer"
                          }
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
              <Text
                as="div"
                size="text3"
                className="leading-tight text-[#808080] [&_a]:underline mb-2 xl:mb-4"
              >
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our{" "}
                <Link href="/en/privacy-policy">Privacy Policy</Link>
              </Text>

              {/* Terms and Conditions */}
              <div className="flex items-center gap-3 mb-2 xl:mb-4">
                <Checkbox
                  id="agree"
                  checked={termsAccepted}
                  onCheckedChange={setTermsAccepted}
                />
                <Label htmlFor="agree">
                  <Text
                    as="span"
                    size="text3"
                    className="leading-tight text-[#282828] [&_a]:underline"
                  >
                    I have read and agree to the website{" "}
                    <Link href="/en/terms-and-conditions">
                      Terms and Conditions *
                    </Link>
                  </Text>
                </Label>
              </div>

              {/* Place Order Button - Desktop */}
              <MediaQuery minWidth={640}>
                <Button
                  variant={"black"}
                  disabled={loading || !termsAccepted}
                  onClick={handlePlaceOrder}
                  className="min-w-full mt-2"
                >
                  {loading ? "Placing order..." : "Place Order"}
                </Button>
              </MediaQuery>
            </div>
          </div>
        </div>

        {/* Place Order Button - Mobile */}
        <MediaQuery maxWidth={639}>
          <hr />
          <div className="w-full py-1 px-4 pb-2 bg-white sticky z-1 bottom-0 left-0 right-0 shadow-[0px_-5px_10px_rgba(0,0,0,0.1)]">
            <Button
              variant={"black"}
              disabled={loading || !termsAccepted}
              onClick={handlePlaceOrder}
              className="min-w-full"
            >
              {loading ? "Placing order..." : "Place Order"}
            </Button>
          </div>
        </MediaQuery>
      </section>
    </>
  );
}

function AddressBlock({
  locale,
  variant,
  data,
  useSameAddress,
  setUseSameAddress,
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Sort addresses: default address first
  const sortedAddresses = data?.items
    ? [...data?.items].sort((a, b) => {
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
                className={
                  "border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                }
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
              <div
                key={"address-item-" + index}
                className="w-full sm:w-1/2 lg:w-1/2"
              >
                <div
                  onClick={() => handleAddressSelect(item.id)}
                  className={cn(
                    "w-full p-2.5 xl:p-3.5 2xl:p-5 transition hover:shadow-sm relative z-0",
                    locale === "ar"
                      ? "pr-10 xl:pr-12 2xl:pr-18"
                      : "pl-10 xl:pl-12 2xl:pl-18",
                    selectedAddressId === item.id
                      ? "bg-[#eaeaea]/60"
                      : "bg-[#eaeaea]/40"
                  )}
                >
                  {/* Selection Indicator */}
                  <div
                    className={cn(
                      "w-4 xl:w-4 2xl:w-5 aspect-square rounded-full border-3 bg-transparent absolute top-2.5 xl:top-3.5 2xl:top-5 transition-colors",
                      locale === "ar"
                        ? "right-3.5 xl:right-3.5 2xl:right-5"
                        : "left-3.5 xl:left-3.5 2xl:left-5",
                      selectedAddressId === item.id
                        ? "border-[#f17423]"
                        : "border-[#a1a1a1]",
                      item.is_default && "border-black"
                    )}
                  />

                  <Heading
                    as="div"
                    size="heading5"
                    className="font-medium text-[#282828] mb-1 xl:mb-2"
                  >
                    {item?.full_name}
                  </Heading>
                  <Text
                    as="div"
                    size="text3"
                    className="text-[#282828] mb-1 xl:mb-2"
                  >
                    {item?.address_line_1 && parse(item?.address_line_1)}
                    {item?.address_line_2 && ", "}
                    {item?.address_line_2 && parse(item?.address_line_2)}
                  </Text>
                  <Text
                    as="div"
                    size="text3"
                    className="font-medium text-[#282828] mb-2 xl:mb-2.5"
                  >
                    <a
                      href={`tel:${item?.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
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
                      <Image
                        src={"/images/icon-edit.svg"}
                        alt={"icon-edit"}
                        width={10}
                        height={10}
                        className="w-2 xl:w-2.5"
                      />
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
                      <Image
                        src={"/images/icon-delete.svg"}
                        alt={"icon-delete"}
                        width={10}
                        height={10}
                        className="w-2 xl:w-2.5"
                      />
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
      <AlertDialog
        dir={locale === "ar" ? "rtl" : "ltr"}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <AlertDialogContent
          className={"xl:max-w-[768px] 2xl:max-w-[840px] gap-0"}
        >
          <AlertDialogHeader
            className={"flex-row items-center justify-between mb-2 2xl:mb-4"}
          >
            <AlertDialogTitle className="text-[11px] lg:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-semibold text-[#282828]">
              Edit Address
            </AlertDialogTitle>
            <AlertDialogDescription className={"sr-only"}>
              Edit Address form.
            </AlertDialogDescription>
            <AlertDialogCancel
              className={"h-auto p-0 border-0 hover:bg-transparent"}
            >
              <X className="size-5 text-black" />
            </AlertDialogCancel>
          </AlertDialogHeader>

          <div className="max-h-[70vh] mask-[linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)] overflow-y-auto overflow-x-hidden">
            <UpdateAddressForm
              locale={locale}
              addressData={editingAddress}
              onSuccess={() => setIsEditDialogOpen(false)}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function AddAddressBlock({ locale, onCancel, onSuccess }) {
  return (
    <div className="w-full h-auto block p-3 lg:p-4 xl:p-4 2xl:p-7 rounded-[4px] border border-[#e0e0e0] mb-1 xl:mb-2.5 2xl:mb-4">
      <div className="flex justify-between items-center mb-3 xl:mb-5 2xl:mb-8">
        <Heading as="h4" size="heading4" className="font-normal text-[#282828]">
          Add New Address
        </Heading>
        {onCancel && (
          <Button
            variant={"ghost"}
            onClick={onCancel}
            className="h-auto p-1 hover:bg-gray-100"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
      <AddressForm locale={locale} onSuccess={onSuccess} />
    </div>
  );
}
