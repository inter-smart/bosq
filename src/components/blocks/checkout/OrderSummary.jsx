"use client";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/utils/text";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { useApplyCouponMutation, useRemoveCouponMutation, usePlaceOrderMutation, useInitiatePaymentMutation } from "@/store/services/orderApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { resetCart } from "@/store/slices/cartSlice";
import { useTranslations } from "next-intl";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

const paymentMethods = [
  { id: 1, slug: "cod", nameKey: "cod", descKey: "cod_description" },
  // { id: 2, slug: "online", nameKey: "pay_online", descKey: "pay_online_description" },
];

const OrderSummary = ({
  products: initialProducts,
  cartId: initialCartId,
  subTotal: initialSubTotal,
  grandTotal: initialGrandTotal,
  itemsCount: initialItemsCount,
  totalItems: initialTotalItems,
  couponStatus: initialCouponStatus,
  initialDiscountTotal,
  initialCouponDiscountType,
  initialCouponDiscountValue,
  locale,
  type = "cart",
}) => {
  const dispatch = useDispatch();
  // Get selected addresses and checkout permission from Redux
  const { selectedShippingAddressId, selectedBillingAddressId, useSameAddressForBilling, useSameAddressForShipping } = useSelector(
    (state) => state.checkout,
  );

  const { user } = useAuth();

  const [placeOrder] = usePlaceOrderMutation();
  const [applyCoupon] = useApplyCouponMutation();
  const [removeCoupon] = useRemoveCouponMutation();
  const [initiatePayment] = useInitiatePaymentMutation();

  const t = useTranslations("cart");
  const tCheckout = useTranslations("checkout");
  const tCommon = useTranslations("common");

  const router = useRouter();
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow");

  const EXPECTED = btoa("allowed");
  const isAllowed = flow === EXPECTED;

  // Order summary state — initialized from server, updated by mutation results
  const [products, setProducts] = useState(initialProducts);
  const [cartId, setCartId] = useState(initialCartId);
  const [subTotal, setSubTotal] = useState(initialSubTotal);
  const [grandTotal, setGrandTotal] = useState(initialGrandTotal);
  const [itemsCount, setItemsCount] = useState(initialItemsCount);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [appliedCoupon, setAppliedCoupon] = useState(initialCouponStatus);
  const [discountTotal, setDiscountTotal] = useState(initialDiscountTotal ?? "0.00");
  const [couponDiscountType, setCouponDiscountType] = useState(initialCouponDiscountType ?? null);
  const [couponDiscountValue, setCouponDiscountValue] = useState(initialCouponDiscountValue ?? null);

  // Sync local state when server props update (e.g. after login → cart merge → navigation)
  useEffect(() => {
    setProducts(initialProducts ?? []);
    setCartId(initialCartId ?? null);
    setSubTotal(initialSubTotal ?? "0.00");
    setGrandTotal(initialGrandTotal ?? "0.00");
    setItemsCount(initialItemsCount ?? 0);
    setTotalItems(initialTotalItems ?? 0);
    setAppliedCoupon(initialCouponStatus ?? null);
    setDiscountTotal(initialDiscountTotal ?? "0.00");
    setCouponDiscountType(initialCouponDiscountType ?? null);
    setCouponDiscountValue(initialCouponDiscountValue ?? null);
  }, [
    initialProducts,
    initialCartId,
    initialSubTotal,
    initialGrandTotal,
    initialItemsCount,
    initialTotalItems,
    initialCouponStatus,
    initialDiscountTotal,
    initialCouponDiscountType,
    initialCouponDiscountValue,
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [checkoutList, setCheckoutList] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const tToast = useTranslations("toast");

  // Redirect if not allowed
  useEffect(() => {
    if (!isAllowed) {
      router.replace(`/${locale || "en"}/cart`);
    }
  }, [isAllowed, router, locale]);

  // Fetch addresses to display in confirmation dialog
  const { data: addressData } = useGetAddressesQuery();
  const allShippingAddresses = addressData?.data?.shipping || [];
  const allBillingAddresses = addressData?.data?.billing || [];

  // Update order summary state from mutation response data
  const updateSummaryFromResponse = (data) => {
    if (!data) return;
    if (data.items) setProducts(data.items);
    if (data.id) setCartId(data.id);
    if (data.sub_total !== undefined) setSubTotal(data.sub_total);
    if (data.grand_total !== undefined) setGrandTotal(data.grand_total);
    if (data.discount_total !== undefined) setDiscountTotal(data.discount_total);
    if (data.coupon_discount_type !== undefined) setCouponDiscountType(data.coupon_discount_type);
    if (data.coupon_discount_value !== undefined) setCouponDiscountValue(data.coupon_discount_value);
    if (data.item_count !== undefined) setItemsCount(data.item_count);
    if (data.items) setTotalItems(data.items.length);
    setAppliedCoupon(data.applied_coupon_code || null);
  };

  // Handle coupon application
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    try {
      const result = await applyCoupon({ coupon_code: couponCode }).unwrap();
      updateSummaryFromResponse(result?.data);
      toast.success(`${tToast("coupon_success")}`);
    } catch (error) {
      console.log("Apply coupon error:", error);
      toast.error(locale === "en" ? error?.en || "Failed to apply coupon" : error?.ar || "Failed to apply coupon");
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = async () => {
    try {
      const result = await removeCoupon({ coupon_code: appliedCoupon || couponCode }).unwrap();
      updateSummaryFromResponse(result?.data);
      setCouponCode("");
      toast.success(`${tToast("coupon_removed")}`);
    } catch (error) {
      toast.error(`${tToast("coupon_remove_failed")}`);
    }
  };

  // Determine final address IDs based on checkbox states
  const getFinalAddressIds = () => {
    let shippingId = selectedShippingAddressId;
    let billingId = selectedBillingAddressId;
    let isDifferent = !useSameAddressForBilling && !useSameAddressForShipping; // If either is true, addresses are the same

    // If "use same for billing" is checked, billing = shipping
    if (useSameAddressForBilling && selectedShippingAddressId) {
      billingId = selectedShippingAddressId;
      type = "billing";
    }
    // If "use same for shipping" is checked, shipping = billing
    if (useSameAddressForShipping && selectedBillingAddressId) {
      shippingId = selectedBillingAddressId;
    }

    return { shippingId, billingId, isDifferent };
  };

  // Find address details by ID from both lists
  const findAddress = (id) => {
    return [...allShippingAddresses, ...allBillingAddresses].find((addr) => addr.id === id) || null;
  };

  // Get the selected payment method label
  const getSelectedPaymentLabel = () => {
    const method = paymentMethods.find((m) => m.slug === selectedPaymentMethod);
    return method ? tCheckout(method.nameKey) : "";
  };

  const handlePlaceOrder = () => {
    const { shippingId, billingId, isDifferent } = getFinalAddressIds();

    console.log("ADDRESS", shippingId);
    console.log("ADDRESS", billingId);
    console.log("ADDRESS", isDifferent);

    if (isDifferent && shippingId == billingId) {
      toast.error(tToast("address_conflict"));
      return;
    }

    // Validate shipping address is selected
    if (!shippingId) {
      if (selectedBillingAddressId && !useSameAddressForShipping) {
        toast.error(tToast("select_shipping_or_same"));
      } else {
        toast.error(tToast("select_shipping_address"));
      }
      return;
    }

    // Validate billing address is selected
    if (!billingId) {
      if (selectedShippingAddressId && !useSameAddressForBilling) {
        toast.error(tToast("select_billing_or_same"));
      } else {
        toast.error(tToast("select_billing_address"));
      }
      return;
    }

    // Validate terms accepted
    if (!termsAccepted) {
      toast.error(tToast("accept_terms"));
      return;
    }

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const confirmPlaceOrder = async () => {
    const { shippingId, billingId, isDifferent } = getFinalAddressIds();

    console.log("ADDRESS", shippingId, billingId, isDifferent);

    return;

    const address = {
      billing: billingId,
      shipping: shippingId,
    };

    try {
      const orderData = await placeOrder({
        address,
        payment_type: selectedPaymentMethod,
        type: type || "cart",
      }).unwrap();

      const internalOrderId = orderData.data?.id;
      const orderCode = orderData.data?.order_id;
      const requiresPayment = orderData.data?.requires_payment;

      !type && dispatch(resetCart());
      setShowConfirmDialog(false);

      if (requiresPayment && selectedPaymentMethod === "online") {
        // Get payment URL from N-Genius and redirect the user there
        const paymentData = await initiatePayment({ orderId: internalOrderId, locale }).unwrap();
        const paymentUrl = paymentData.data?.payment_url;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          toast.error(tToast("order_failed"));
        }
      } else {
        // COD: go straight to success page
        router.push(`/${locale}/order/success?orderId=${orderCode}`);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error?.en || error || tToast("order_failed"));
    }
  };

  // Compute display values: for percentage coupons, derive from subTotal
  const displayDiscountTotal =
    couponDiscountType === "percentage" && couponDiscountValue
      ? ((parseFloat(subTotal) * parseFloat(couponDiscountValue)) / 100).toFixed(2)
      : discountTotal;

  const displayGrandTotal =
    couponDiscountType === "percentage" && couponDiscountValue
      ? (parseFloat(subTotal) - (parseFloat(subTotal) * parseFloat(couponDiscountValue)) / 100).toFixed(2)
      : grandTotal;

  // Check if order can be placed
  const { shippingId, billingId } = getFinalAddressIds();
  const canPlaceOrder = shippingId && billingId && termsAccepted;

  return (
    <>
      {isAllowed ? (
        <div className="w-full lg:w-[320px] xl:w-[460px] 2xl:w-[540px] 3xl:w-[668px]">
          {/* Order Summary */}

          <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-[4px] p-3 sm:p-4 xl:px-7 2xl:px-8 xl:py-4 2xl:py-6 mb-2 xl:mb-4">
            <Text as="div" size="text3" className="text-[#808080] mb-1 xl:mb-2 2xl:mb-3">
              {tCommon("items_count", { count: totalItems })}
            </Text>
            <button
              onClick={() => setCheckoutList((prev) => !prev)}
              className="text-[10px] 2xl:text-[12px] leading-none font-light truncate text-black mb-2 xl:mb-2.5 flex hover:underline"
            >
              {tCheckout("show_details")} <ChevronDown className={cn("size-3 transition", checkoutList && "rotate-180")} />
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
                      quality={90}
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
                        {tCommon("aed")} {item?.line_total}
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
              <span>{tCheckout("subtotal", { count: itemsCount })}</span>
              {subTotal}
            </Text>
            <Text
              as="div"
              size="text3"
              className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
            >
              <span>{t("shipping_charge")}</span>
              {tCommon("free")}
            </Text>

            {appliedCoupon && parseFloat(discountTotal) > 0 && (
              <Text
                as="div"
                size="text3"
                className="font-normal text-green-600 my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-green-500 flex justify-between"
              >
                <span>
                  {t("coupon_discount")}
                  {couponDiscountType === "percentage" && couponDiscountValue && <span className="ml-1">({parseFloat(couponDiscountValue)}%)</span>}
                </span>
                - {displayDiscountTotal}
              </Text>
            )}

            {/* Coupon Code Section */}
            {user && (
              <div className="w-full mb-2 xl:mb-3 2xl:mb-4">
                <div className="w-full bg-[#eee] p-1 xl:p-2 rounded-[4px] flex gap-1.5">
                  <Input
                    type="text"
                    placeholder={tCheckout("coupon_placeholder")}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    // disabled={!!appliedCoupon}
                    className={
                      "text-[12px] md:text-[12px] xl:text-[11px] 2xl:text-[14px] leading-none font-light text-black placeholder:text-[#aeaeae] h-[35px] 2xl:h-[45px] bg-white border-[#e9e9e9] rounded-[4px] px-[15px] focus-visible:ring-1 flex-1"
                    }
                  />
                  <Button
                    variant={"black"}
                    disabled={!couponCode.trim()}
                    onClick={handleApplyCoupon}
                    className="min-w-[60px] sm:min-w-[60px] xl:min-w-[80px] 2xl:min-w-[100px] h-[35px] lg:h-[35px] 2xl:h-[45px] 3xl:h-[45px] "
                  >
                    {tCommon("add")}
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between gap-2 my-1">
                    <Text as="div" size="none" className="text-[10px] 2xl:text-[12px] leading-normal font-normal text-[#8e8e8e]">
                      {tCheckout("coupon_applied", { code: appliedCoupon })}
                    </Text>
                    <button
                      className="text-[10px] 2xl:text-[12px] leading-normal font-normal text-black hover:underline cursor-pointer hover:text-red-600"
                      onClick={handleRemoveCoupon}
                    >
                      {tCommon("remove")}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Total Price */}
            <Text as="div" size="text3" className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 flex justify-between max-sm:font-semibold">
              <span>
                {t("total_price")}
                <br />
                <span className="text-[8px] 2xl:text-[10px] font-light text-[#808080]">{tCommon("inc_tax")}</span>
              </span>
              {displayGrandTotal}
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
                      {tCheckout(method.nameKey)}
                    </Label>
                  </div>
                  <Text
                    as="div"
                    size="none"
                    className="text-[8px] lg:text-[9px] 2xl:text-[14px] leading-tight font-light text-[#808080] mt-1 xl:mt-2.5"
                  >
                    {tCheckout(method.descKey)}
                  </Text>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Privacy Policy */}
          <Text as="div" size="text3" className="leading-tight text-[#808080] [&_a]:underline mb-2 xl:mb-4">
            {tCheckout("privacy_notice")} <Link href={`/${locale}/privacy-policy`}>{tCheckout("privacy_policy")}</Link>
          </Text>

          {/* Terms and Conditions */}
          <div className="flex items-center gap-3 mb-2 xl:mb-4">
            <Checkbox id="agree" checked={termsAccepted} onCheckedChange={setTermsAccepted} />
            <Label htmlFor="agree">
              <Text as="span" size="text3" className="leading-tight text-[#282828] [&_a]:underline">
                {tCheckout("terms_agree")} <Link href={`/${locale}/terms-and-conditions`}>{tCheckout("terms_and_conditions")}</Link>
              </Text>
            </Label>
          </div>

          {/* Place Order Button - Desktop */}
          <Button variant={"black"} onClick={handlePlaceOrder} className="min-w-full mt-2">
            {tCheckout("place_order")}
          </Button>
        </div>
      ) : (
        <div className="w-full lg:w-[320px] xl:w-[460px] 2xl:w-[540px] 3xl:w-[668px]">
          <Text as="div" size="text3" className="leading-tight text-[#808080] mb-2 xl:mb-4 [&_a]:underline">
            {tCheckout("session_unavailable")} <Link href={`/${locale}/cart`}>{tCheckout("go_back_to_cart")}</Link>
          </Text>
        </div>
      )}

      {/* Order Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="xl:max-w-[520px] 2xl:max-w-[600px] gap-0 p-5 xl:p-6 2xl:p-8">
          <AlertDialogHeader className="mb-3 xl:mb-4">
            <AlertDialogTitle className="text-[14px] xl:text-[16px] 2xl:text-[18px] font-semibold text-[#282828]">
              {tCheckout("confirm_title")}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[11px] xl:text-[12px] 2xl:text-[14px] text-[#808080]">
              {tCheckout("confirm_description")}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-3 xl:space-y-4 mb-4 xl:mb-5">
            {/* Payment Method */}
            <div className="bg-[#f4f4f4] rounded-[4px] p-3 xl:p-4">
              <Heading as="div" size="heading5" className="font-medium text-[#282828] mb-1">
                {tCheckout("payment_method")}
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
                      {tCheckout("shipping_address")}
                      {isSameAddress && (
                        <span className="text-[10px] xl:text-[11px] font-light text-[#808080] ml-2">{tCheckout("same_as_billing")}</span>
                      )}
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
                        {tCheckout("no_address_selected")}
                      </Text>
                    )}
                  </div>

                  {/* Billing Address - only show separately if different */}
                  {!isSameAddress && (
                    <div className="bg-[#f4f4f4] rounded-[4px] p-3 xl:p-4">
                      <Heading as="div" size="heading5" className="font-medium text-[#282828] mb-1">
                        {tCheckout("billing_address")}
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
                          {tCheckout("no_address_selected")}
                        </Text>
                      )}
                    </div>
                  )}

                  {/* Order Total */}
                  <div className="flex justify-between items-center pt-2 border-t border-[#e0e0e0]">
                    <Text as="div" size="text3" className="font-medium text-[#282828]">
                      {tCheckout("total_amount")}
                    </Text>
                    <Text as="div" size="text3" className="font-semibold text-[#282828]">
                      {displayGrandTotal}
                    </Text>
                  </div>
                </>
              );
            })()}
          </div>

          <AlertDialogFooter className="flex-row justify-end gap-2 sm:space-x-0">
            <AlertDialogCancel className="mt-0 px-4 py-2 h-auto text-sm font-medium border border-gray-300 hover:bg-gray-50">
              {tCommon("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPlaceOrder}
              className="mt-0 px-6 py-2 h-auto text-sm font-medium bg-black hover:bg-black/90 text-white border-0"
            >
              {tCheckout("confirm_order")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrderSummary;
