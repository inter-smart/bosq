"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { useEffect, useRef, useState } from "react";
import CartCard from "./cart-card";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartCount,
  selectCartSubtotal,
  selectCartGrandTotal,
  selectCartIsLoading,
  selectCartIsUpdating,
  selectCartDiscountTotal,
  selectAppliedCoupon,
} from "@/store/selectors/cart/selectors";
import { fetchCart } from "@/store/slices/cartSlice";
import CartEmpty from "./cart-empty";
import ProductSimilar from "@/components/blocks/product/product-similar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useValidateCartMutation } from "@/store/services/commonApi";
import { toast } from "sonner";
import { setIsCheckoutAllowed } from "@/store/slices/checkoutSlice";
import { useTranslations } from "next-intl";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

export default function CartList({ locale, similarProducts }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [validateCart, { isLoading: isValidating }] = useValidateCartMutation();
  const isEn = locale === "en";
  const [invalidItemIds, setInvalidItemIds] = useState(new Set());
  const prevCartItemsRef = useRef(null);

  const t = useTranslations("cart");
  const tCommon = useTranslations("common");

  const cartItems = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartCount);
  const subtotal = useSelector(selectCartSubtotal);
  const couponApplied = useSelector(selectAppliedCoupon);
  const discountTotal = useSelector(selectCartDiscountTotal);
  const grandTotal = useSelector(selectCartGrandTotal);
  const isLoading = useSelector(selectCartIsLoading);
  const isUpdating = useSelector(selectCartIsUpdating);

  const isCartBlocked =
    cartItems.some((item) => item.is_sold_out) ||
    cartItems.some((item) => item.variant?.stock != null && item.variant.stock > 0 && item.quantity > item.variant.stock);

  // Fetch cart on mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Show error message redirected from checkout (e.g. stock validation failure)
  useEffect(() => {
    const pendingError = sessionStorage.getItem("bosq_cart_error");
    if (pendingError) {
      sessionStorage.removeItem("bosq_cart_error");
      toast.error(pendingError);
    }
  }, []);

  // Clear invalid badges when cart items change (quantity update or removal)
  useEffect(() => {
    if (prevCartItemsRef.current !== null && invalidItemIds.size > 0) {
      setInvalidItemIds(new Set());
    }
    prevCartItemsRef.current = cartItems;
  }, [cartItems]);

  // Show loading skeleton while fetching
  if (isLoading && cartItems.length === 0) {
    return <CartListSkeleton />;
  }

  // Show empty state if cart is empty
  if (!isLoading && cartItems.length === 0) {
    return <CartEmpty locale={locale} />;
  }

  const validateCheckout = async () => {
    try {
      const result = await validateCart().unwrap();

      if (result?.data?.is_valid === false) {
        const ids = new Set((result.data.invalid_items || []).map((i) => i.id));
        setInvalidItemIds(ids);
        toast.error(
          isEn ? "Some items in your cart are out of stock. Please update your cart." : "بعض المنتجات في سلتك غير متوفرة. يرجى تحديث السلة.",
        );
        return;
      }

      setInvalidItemIds(new Set());
      dispatch(setIsCheckoutAllowed(true));

      const encoded = btoa("allowed");
      router.push(`/${locale}/checkout?flow=${encoded}`);
    } catch (error) {
      toast.error(isEn ? error?.en : error?.ar || "Failed to validate cart");
    }
  };

  return (
    <section className="w-full block py-[15px_30px] xl:py-[20px_60px] 2xl:py-[30px_100px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-2.5 xl:-mx-8 2xl:-mx-10 [&>*]:p-2.5 xl:[&>*]:p-8 2xl:[&>*]:p-10">
          <div className="w-full lg:w-[calc(100%-320px)] xl:w-[calc(100%-460px)] 2xl:w-[calc(100%-540px)] 3xl:w-[calc(100%-668px)] max-sm:mb-2">
            <div className="flex flex-wrap -m-[5px] *:p-[5px]">
              {cartItems?.map((item, index) => (
                <div key={`cart-item-${item.id || index}`} className="w-full flex flex-wrap ">
                  <CartCard product={item} isEn={isEn} isValidationFailed={invalidItemIds.has(item.id)} />
                </div>
              ))}
            </div>
            <div className="mt-3 xl:mt-6">
              <Button variant={"link"} className={"h-auto! gap-1 has-[>svg]:px-0"} asChild>
                <Link href="/products">
                  <svg width="3" height="6" viewBox="0 0 3 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-2 block">
                    <path
                      d="M-0.000651243 2.6667C-0.000651246 2.7287 0.0210708 2.79076 0.0644594 2.83809L2.28667 5.26233C2.3735 5.35706 2.51411 5.35706 2.60089 5.26233C2.68767 5.1676 2.68772 5.01421 2.60089 4.91954L0.53579 2.6667L2.60089 0.413851C2.68772 0.319124 2.68772 0.16573 2.60089 0.071063C2.51406 -0.0236034 2.37345 -0.023664 2.28667 0.071063L0.0644594 2.4953C0.0210708 2.54264 -0.00065124 2.6047 -0.000651243 2.6667Z"
                      fill="#282828"
                    />
                  </svg>
                  {t("continue_shopping")}
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-[320px] xl:w-[460px] 2xl:w-[540px] 3xl:w-[668px]">
            <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-[4px] p-3 sm:p-4 xl:p-7 2xl:p-8 sticky top-[var(--header-y)] ">
              <Heading as="div" size="heading4" className="text-[#282828] mb-3 xl:mb-5 2xl:mb-8">
                {t("order_summary")}
              </Heading>
              <Text
                as="div"
                size="text3"
                className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
              >
                <span> {t("subtotal", { count: itemCount })}</span>
                AED {subtotal}
              </Text>

              {couponApplied && (
                <Text
                  as="div"
                  size="text3"
                  className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
                >
                  <span>Coupon Discount</span>
                  AED {discountTotal}
                </Text>
              )}
              <Text
                as="div"
                size="text3"
                className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 [&_span]:font-light [&_span]:text-[#808080] flex justify-between"
              >
                <span>{t("shipping_charge")}</span>
                {tCommon("free")}
              </Text>
              <hr />
              <Text as="div" size="text3" className="font-normal text-[#282828] my-2 xl:my-3 2xl:my-4 flex justify-between">
                <span>
                  {t("total_price")}
                  <br />
                  <span className="text-[8px] 2xl:text-[10px] font-light text-[#808080]">{tCommon("inc_tax")}</span>
                </span>
                AED {grandTotal}
              </Text>
              <MediaQuery minWidth={640}>
                {isCartBlocked && (
                  <Text as="div" size="text3" className="text-red-500 text-[11px] 2xl:text-[12px] font-normal text-center mb-2">
                    {isEn ? "Some items have stock issues. Please update your cart." : "بعض المنتجات تجاوزت الكمية المتاحة. يرجى تحديث السلة."}
                  </Text>
                )}
                <Button
                  variant={"black"}
                  disabled={isUpdating || isValidating || cartItems.length === 0 || isCartBlocked}
                  className="min-w-full mt-2"
                  asChild
                >
                  <div onClick={validateCheckout}>{isValidating ? `${t("validating")}` : isUpdating ? `${t("updating")}` : `${t("checkout")}`}</div>
                </Button>
              </MediaQuery>
            </div>
          </div>
        </div>
      </div>
      <MediaQuery maxWidth={639}>
        <hr />
        <div className="w-full py-1 px-4 pb-2 bg-white sticky z-1 bottom-0 left-0 right-0 shadow-[0px_-5px_10px_rgba(0,0,0,0.1)]">
          {isCartBlocked && (
            <Text as="div" size="text3" className="text-red-500 text-[11px] font-normal text-center pt-1 mb-1">
              {isEn ? "Some items have stock issues. Please update your cart." : "بعض المنتجات تجاوزت الكمية المتاحة. يرجى تحديث السلة."}
            </Text>
          )}
          <Button variant={"black"} disabled={isUpdating || isValidating || cartItems.length === 0 || isCartBlocked} className="min-w-full" asChild>
            <div onClick={validateCheckout}>{isValidating ? "Validating..." : isUpdating ? "Updating..." : `${t("checkout")}`}</div>
          </Button>
        </div>
      </MediaQuery>
      {similarProducts?.length > 0 && <ProductSimilar locale={locale} data={similarProducts} />}
    </section>
  );
}

function CartListSkeleton() {
  return (
    <section className="w-full block py-[15px_30px] xl:py-[20px_60px] 2xl:py-[30px_100px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-2.5 xl:-mx-8 2xl:-mx-10 [&>*]:p-2.5 xl:[&>*]:p-8 2xl:[&>*]:p-10">
          <div className="w-full lg:w-[calc(100%-320px)] xl:w-[calc(100%-460px)] 2xl:w-[calc(100%-540px)] 3xl:w-[calc(100%-668px)] max-sm:mb-2">
            <div className="flex flex-wrap -m-[5px] *:p-[5px]">
              {[1, 2, 3].map((i) => (
                <div key={`skeleton-${i}`} className="w-full flex flex-wrap p-[5px]">
                  <div className="w-full flex flex-wrap items-center p-3 sm:p-3 xl:p-5 2xl:p-6 border border-[#e9e9e9] rounded-lg">
                    <Skeleton className="w-[60px] sm:w-[100px] xl:w-[168px] 2xl:w-[200px] aspect-[168/186] rounded-lg max-sm:mb-3" />
                    <div className="w-full sm:w-[calc(100%-100px)] xl:w-[calc(100%-168px)] 2xl:w-[calc(100%-200px)] sm:px-2.5 xl:px-4 2xl:px-5">
                      <Skeleton className="w-1/2 h-3 mb-1 xl:mb-2" />
                      <Skeleton className="w-full h-4 mb-2 xl:mb-4" />
                      <div className="flex justify-between items-center gap-1 mb-2 sm:mb-3 xl:mb-4 2xl:mb-6">
                        <Skeleton className="w-1/2 h-3" />
                        <Skeleton className="w-[60px] xl:w-[60px] 2xl:w-20 h-[30px] lg:h-[30px] 2xl:h-10" />
                      </div>
                      <hr className="my-1 xl:mb-2 2xl:my-4" />
                      <Skeleton className="w-full h-4 mb-2 xl:mb-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[320px] xl:w-[460px] 2xl:w-[540px] 3xl:w-[668px]">
            <div className="w-full bg-[#f4f4f4] border border-[#e0e0e0] rounded-[4px] p-3 sm:p-4 xl:p-7 2xl:p-8">
              <Skeleton className="w-1/2 h-6 mb-3 xl:mb-5 2xl:mb-8" />
              <Skeleton className="w-full h-4 my-2 xl:my-3 2xl:my-4" />
              <Skeleton className="w-full h-4 my-2 xl:my-3 2xl:my-4" />
              <hr />
              <Skeleton className="w-full h-6 my-2 xl:my-3 2xl:my-4" />
              <Skeleton className="w-full h-10 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
