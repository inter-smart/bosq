"use client";
import Image from "@/components/utils/custom-image";
import { Heading } from "../../utils/heading";
import { Text } from "../../utils/text";
import Link from "next/link";
import { Suspense, useState } from "react";
import { motion } from "motion/react";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToggleWishlistMutation, useGetWishlistQuery } from "@/store/services/wishListApi";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import LoginRequiredModal from "../../common/login-required-modal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
const colorVariant = ["#bababa", "#333333", "#8db600", "#ff0000", "#000000"];

export default function ProductCard({ product, isEn, locale = "en", onRemove }) {
  const productSlug = product?.base_slug || (product?.slug ? product.slug.replace(/^\/products\//, "") : "");
  const productUrl = `/${locale}/products/${productSlug}${product?.query_params || ""}`;

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted ?? false);
  const [prevWishlistKey, setPrevWishlistKey] = useState({ id: product?.id, val: product?.isWishlisted });
  if (prevWishlistKey.id !== product?.id || prevWishlistKey.val !== product?.isWishlisted) {
    setPrevWishlistKey({ id: product?.id, val: product?.isWishlisted });
    setIsWishlisted(product?.isWishlisted ?? false);
  }
  const [toggleWishlist] = useToggleWishlistMutation();

  const tToast = useTranslations("toast");
  const t = useTranslations("common");
  const tProduct = useTranslations("product");
  const handleWishlistClick = (e) => {
    e.stopPropagation();
    handleToggleWishlist(product?.variant_id || product?.id);
  };

  const goToProduct = () => {
    router.push(productUrl);
  };

  const handleToggleWishlist = async (id) => {
    if (!isAuthenticated) {
      router.push("/login?activity=wishlist");
      return;
    }
    // Optimistic update
    const prev = isWishlisted;
    setIsWishlisted(!prev);
    try {
      const result = await toggleWishlist(id).unwrap();
      const added = result?.data?.action === "added";
      setIsWishlisted(added);
      toast.success(added ? `${tToast("wishlist_success")}` : `${tToast("wishlist_removed")}`);
      if (!added) {
        onRemove?.(id);
      }
    } catch (error) {
      setIsWishlisted(prev);
      console.error("Wishlist toggle error:", error);
      // baseQueryWithReauth already shows a toast for session expiry — skip wishlist-specific error
      if (error?.error_code !== "SESSION_EXPIRED") {
        toast.error(`${tToast("wishlist_remove_failed")}`);
      } else {
        toast.error(isEn ? "Your session has expired. Please log in again." : "انتهت صلاحية الجلسة. الرجاء تسجيل الدخول مرة أخرى.");
      }
    }
  };

  return (
    <>
      <Suspense fallback={<ProductCardSkelton />}>
        <div className="group w-full block">
          <div
            onClick={goToProduct}
            className="w-full aspect-[550/440] overflow-hidden rounded-[4px] border border-[#f4f4f4] mb-3 2xl:mb-4 bg-[#f4f4f4] relative z-0"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleWishlistClick(e)}
              className="absolute z-2 top-2 xl:top-4 right-2 xl:right-4"
            >
              <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.39062 2.03027C8.85818 0.419111 10.5094 0.0894194 11.749 0.544922C12.9908 1.00129 13.9263 2.28275 13.8955 4.12402C13.8676 5.78912 12.7686 7.51198 11.3096 9.04004C9.9379 10.4766 8.3011 11.6826 7.12598 12.4326C5.95106 11.6827 4.3155 10.4769 2.94434 9.04102C1.48523 7.51297 0.385558 5.78917 0.357422 4.12402C0.326449 2.28301 1.26218 1.00146 2.50391 0.544922C3.74349 0.0891915 5.39453 0.418918 6.8623 2.03027L7.12695 2.32031L7.39062 2.03027Z"
                  fill={isWishlisted ? "black" : "none"}
                  stroke="#282828"
                  strokeWidth="1"
                />
              </svg>
            </motion.button>
            {(product?.stock == 0 || product?.isStock === false) && (
              <div className="w-full h-full bg-[#f4f4f4]/90 flex items-center justify-center absolute z-2 inset-0">
                <Button
                  variant={"black"}
                  disabled={true}
                  className="min-w-[100px] xl:min-w-[120px] 2xl:min-w-[200px] disabled:opacity-100 rounded-[2px] m-auto"
                >
                  {t("out_of_stock")}
                </Button>
              </div>
            )}
            <Image
              src={product?.media_path || product?.media?.path || "/images/placeholder.jpg"}
              alt={isEn ? product?.title || product?.name : product?.title_ar || product?.name_ar || product?.name || "test"}
              width={550}
              height={440}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              quality={90}
            />
            {(product?.hover_media_path || product?.hoverMedia?.path) && (
              <Image
                src={product?.hover_media_path || product?.hoverMedia?.path}
                alt={isEn ? product?.title || product?.name : product?.title_ar || product?.name_ar || product?.name}
                width={550}
                height={440}
                quality={100}
                className="w-full h-full object-cover absolute z-1 inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition duration-300"
              />
            )}
          </div>
          <div>
            <Heading
              as="h2"
              size="none"
              className="text-[10px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light truncate text-[#bbbcbc] mb-0.5"
            >
              <Link href={productUrl}>
                {(product?.categories || [{ name: product?.category, name_ar: product?.category_ar || product?.category }])
                  ?.map((cat) => (isEn ? cat?.name : cat?.name_ar))
                  .join(", ")}
              </Link>
            </Heading>
            <Heading
              as="div"
              size="none"
              className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828] mb-0.5"
            >
              <Link href={productUrl}>{isEn ? product?.title || product?.name : product?.title_ar || product?.name_ar || product?.name}</Link>
            </Heading>
            <Text
              as="div"
              size="none"
              className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828] mb-3 xl:mb-4 2xl:mb-6"
            >
              <Link href={productUrl}>
                AED {product?.price} <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc] ">{t("inc_tax")}</span>
              </Link>
            </Text>
            <div className="flex items-center gap-0.5 xl:gap-1">
              {(product?.hasMoreVariants ?? (product?.colorVariant && product.colorVariant.length > 0)) ? (
                <>
                  {(product?.colorVariant || colorVariant)?.slice(0, 3).map((color, index) => (
                    <Link
                      key={"color" + index}
                      href={productUrl}
                      className="w-2.5 h-2.5 rounded-full hover:scale-110 transition-transform duration-300 block"
                      style={{ backgroundColor: color }}
                    ></Link>
                  ))}
                  <div className="text-[8px] 2xl:text-[10px] leading-normal font-light text-[#28288] pt-0.5">
                    <Link href={productUrl}>{tProduct("more_colors")}</Link>
                  </div>
                </>
              ) : (
                <Link href={productUrl} className="text-[8px] 2xl:text-[10px] leading-normal font-light text-[#28288] hover:text-[#f17423]">
                  {t("view_product")}
                </Link>
              )}
            </div>
          </div>
        </div>
        <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} locale={locale} />
      </Suspense>
    </>
  );
}

function ProductCardSkelton() {
  return (
    <div className="group w-full block">
      <Skeleton className="w-full aspect-[550/440] mb-3 2xl:mb-4 " />
      <div>
        <Skeleton className="w-1/2 h-3 mb-1 " />
        <Skeleton className="w-full h-4 mb-1 " />
        <Skeleton className="w-full h-4 mb-3 xl:mb-4 2xl:mb-6 " />
        <div className="flex gap-0.5 xl:gap-1">
          {[1, 2, 3].map((index) => (
            <Skeleton key={"color" + index} className="w-2.5 h-2.5 rounded-full hover:scale-110 transition-transform duration-300"></Skeleton>
          ))}
        </div>
      </div>
    </div>
  );
}
