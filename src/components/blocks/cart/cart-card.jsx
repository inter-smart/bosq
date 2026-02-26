"use client";
import Image from "next/image";
import { Heading } from "../../utils/heading";
import { Text } from "../../utils/text";
import Link from "next/link";
import { Suspense, useState, useEffect, useCallback } from "react";
import { Skeleton } from "../../ui/skeleton";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartItem } from "@/store/slices/cartSlice";
import { selectCartIsUpdating } from "@/store/selectors/cart/selectors";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function CartCard({ product, isEn }) {
  const dispatch = useDispatch();
  const isUpdating = useSelector(selectCartIsUpdating);
  const [quantity, setQuantity] = useState(product?.quantity || 1);
  const [isRemoving, setIsRemoving] = useState(false);

  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const tToast = useTranslations("toast");
  // Sync local quantity with product quantity from Redux
  useEffect(() => {
    setQuantity(product?.quantity || 1);
  }, [product?.quantity]);

  const stock = product?.variant?.stock;

  // Debounced update to avoid too many API calls
  const updateQuantity = useCallback(
    async (newQuantity) => {
      if (newQuantity !== product?.quantity && newQuantity >= 1) {
        try {
          await dispatch(
            updateCartItem({
              itemId: product.id,
              quantity: newQuantity,
              variant_id: product.variant_id,
            }),
          ).unwrap();
          toast.success(`${tToast("quantity_updated")} `);
        } catch (error) {
          setQuantity(product?.quantity);
          toast.error(isEn ? error?.en : error?.ar || "Failed to add item to cart");
        }
      }
    },
    [dispatch, product?.id, product?.variant_id, product?.quantity],
  );

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await dispatch(removeFromCart({ itemId: product.id })).unwrap();
      toast.success(`${tToast("item_removed")}`);
    } catch (error) {
      toast.error(`${tToast("item_remove_failed")}`);
    }
  };

  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateQuantity(newQty);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      updateQuantity(newQty);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/, "");
    const numValue = value === "" ? 1 : parseInt(value);
    setQuantity(numValue);
  };

  const handleBlur = () => {
    if (quantity !== product?.quantity && quantity >= 1) {
      updateQuantity(quantity);
    }
  };

  // Get image from product data - handle both old and new data structure
  const productImage = product?.media_path || product?.variant?.media_path || product?.image;
  const productTitle = product?.product?.title || product?.title;
  const productTitleAr = product?.product?.title_ar || product?.title_ar;
  const designTitle = product?.design_title || product?.desgin_title;
  const designTitleAr = product?.design_title_ar || product?.desgin_title_ar;
  const productPrice = product?.price;
  const isProductOutOfStock = product?.is_sold_out;
  const productUrl = `/${isEn ? "en" : "ar"}/products/${product?.base_slug}${product?.query_params}`;

  return (
    <Suspense fallback={<CartCardSkeleton />}>
      <div className="group w-full flex flex-wrap items-center border border-[#e9e9e9] rounded-[4px] p-3 sm:p-3 xl:p-5 2xl:p-6 hover:shadow-sm transition-shadow ">
        <div className="w-[60px] sm:w-[100px] xl:w-[150px] 2xl:w-[200px] aspect-[168/186] rounded-lg bg-white border border-gray-100 sm:border-white max-sm:mb-3 relative z-0">
          {isProductOutOfStock && (
            <div className="w-full h-full bg-[#f4f4f4]/90 flex items-center justify-center absolute z-2 inset-0">
              <Button
                variant={"black"}
                disabled={true}
                className="min-w-[100px] xl:min-w-[120px] 2xl:min-w-[200px] disabled:opacity-100 rounded-[2px] m-auto"
              >
                Out of Stock
              </Button>
            </div>
          )}
          {productImage && (
            <Image
              src={productImage}
              alt={productTitle || "product"}
              width={168}
              height={168}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              quality={90}
            />
          )}
        </div>
        <div className="w-full sm:w-[calc(100%-100px)] xl:w-[calc(100%-150px)] 2xl:w-[calc(100%-200px)] sm:px-2.5 xl:px-4 2xl:px-5">
          <Heading as="div" size="heading3" className="truncate text-[#282828] mb-1 xl:mb-2 max-lg:font-medium">
            <Link href={`${productUrl}`}>{isEn ? productTitle : productTitleAr}</Link>
          </Heading>
          <Text as="div" size="text3" className="leading-tight truncate text-[#282828] mb-2 xl:mb-4">
            {isEn ? designTitle : designTitleAr}
          </Text>
          <div className="flex justify-between items-center gap-1 mb-2 sm:mb-3 xl:mb-4 2xl:mb-6">
            <Text as="div" size="text3" className="font-normal text-[#282828]">
              <Link href={`${productUrl}`}>
                AED {productPrice} <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc]">{tCommon("inc_tax")}</span>
              </Link>
            </Text>
            <div className="w-[60px] xl:w-[60px] 2xl:w-[80px] h-[30px] lg:h-[30px] 2xl:h-[40px] flex items-center rounded-[6px] overflow-hidden bg-white border border-[#dedede]">
              <input
                type="text"
                value={quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isUpdating}
                className="text-[11px] 2xl:text-[12px] leading-none font-normal text-center text-black w-8/10 overflow-hidden focus:outline-none disabled:opacity-50"
              />

              <div className="w-4/10 flex flex-col align-center justify-center">
                {/* ✅ Increment (UP) */}
                <button
                  onClick={handleIncrement}
                  className="transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdating || isProductOutOfStock}
                >
                  <ChevronUp className="size-2.5 text-black" />
                </button>

                {/* ✅ Decrement (DOWN) */}
                <button
                  onClick={handleDecrement}
                  className="transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1 || isUpdating || isProductOutOfStock}
                >
                  <ChevronDown className="size-2.5 text-black" />
                </button>
              </div>
            </div>
          </div>
          <hr className="my-1 xl:mb-2 2xl:my-4" />
          <div className="flex justify-between gap-1">
            <Text as="div" size="text3" className="font-medium text-[#282828]">
              {t("line_total")}: AED {product?.line_total || (parseFloat(productPrice) * quantity).toFixed(2)}
            </Text>
            <Button
              variant={"button"}
              onClick={handleRemove}
              disabled={isUpdating || isRemoving}
              className={
                "not-hover:opacity-60 h-auto! has-[>svg]:px-0 transition hover:filter-[brightness(0)_saturate(100%)_invert(31%)_sepia(86%)_saturate(6865%)_hue-rotate(354deg)_brightness(100%)_contrast(128%)] disabled:opacity-50"
              }
            >
              {isRemoving ? `${t("removing")}...` : tCommon("remove")}
              <Image src={"/images/icon-delete.svg"} alt="icon-delete" width={8} height={8} className="w-2 sm:w-3 block" quality={90} />
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

function CartCardSkeleton() {
  return (
    <div className="w-full flex flex-wrap items-center p-3 sm:p-3 xl:p-5 2xl:p-6 border border-[#e9e9e9] rounded-lg">
      <Skeleton className="w-[60px] sm:w-[100px] xl:w-[168px] 2xl:w-[200px] aspect-168/186 rounded-lg max-sm:mb-3" />
      <div className="w-full sm:w-[calc(100%-100px)] xl:w-[calc(100%-168px)] 2xl:w-[calc(100%-200px)] sm:px-2.5 xl:px-4 2xl:px-5">
        <Skeleton className="w-1/2 h-3 mb-1  xl:mb-2 " />
        <Skeleton className="w-full h-4 mb-2 xl:mb-4" />
        <div className="flex justify-between items-center gap-1 mb-2 sm:mb-3 xl:mb-4 2xl:mb-6">
          <Skeleton className="w-1/2 h-3 " />
          <Skeleton className="w-[60px] xl:w-[60px] 2xl:w-20 h-[30px] lg:h-[30px] 2xl:h-10" />
        </div>
        <hr className="my-1 xl:mb-2 2xl:my-4" />
        <Skeleton className="w-full h-4 mb-2 xl:mb-4" />
      </div>
    </div>
  );
}
