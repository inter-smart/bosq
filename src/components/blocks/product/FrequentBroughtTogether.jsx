"use client";

import React, { useState, useMemo } from "react";
import cn from "clsx";
import Image from "@/components/utils/custom-image";
import FrequentlyBoughtCard from "./frequently-bought-card";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addToCartTogether, fetchCart } from "@/store/slices/cartSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const FrequentBroughtTogether = ({ data, frequentlyEmblaRef, locale }) => {
  // data = { products: [...], totalItems: N, totalPrice: N }
  const products = data?.products || [];
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // All items checked by default
  const [selectedIds, setSelectedIds] = useState(() => new Set(products.map((p) => p.id)));

  const toggleItem = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToCart = async () => {
    try {
      const result = await dispatch(
        addToCartTogether({
          variant_ids: Array.from(selectedIds),
          isAuthenticated,
        }),
      ).unwrap();
      dispatch(fetchCart());
      const skipped = result?.skipped_variant_ids ?? [];
      const total = selectedIds.size;
      if (skipped.length > 0 && skipped.length === total) {
        toast.error(locale === "en" ? "All selected items are out of stock." : "جميع المنتجات المحددة غير متوفرة في المخزون.");
      } else if (skipped.length > 0) {
        toast.warning(locale === "en" ? "Some items are out of stock and were not added to your cart." : "بعض المنتجات غير متوفرة في المخزون ولم تُضف إلى سلة التسوق.");
      } else {
        toast.success(locale === "en" ? "Items added to cart successfully" : "تم إضافة المنتجات إلى السلة بنجاح");
      }
    } catch (error) {
      if (error.requiresLogin) {
        router.push(`/${locale}/login`);
        toast.error(locale === "en" ? error?.message?.en : error?.message?.ar || "Failed to add item to cart");
      } else {
        toast.error(locale === "en" ? error?.en : error?.ar || "Failed to add item to cart");
      }
    }
  };

  const { totalItems, totalPrice } = useMemo(() => {
    const selected = products.filter((p) => selectedIds.has(p.id));
    return {
      totalItems: selected.length,
      totalPrice: selected.reduce((sum, p) => sum + parseFloat(p.price || 0), 0),
    };
  }, [selectedIds, products]);

  if (products.length === 0) return null;

  return (
    <>
      <div
        className={cn(
          locale === "ar"
            ? "max-sm:mask-[linear-gradient(to_left,white_0%,white_98%,transparent_100%)] max-sm:pl-0 max-sm:-ml-4"
            : "max-sm:mask-[linear-gradient(to_right,white_0%,white_98%,transparent_100%)] max-sm:pr-0 max-sm:-mr-4",
        )}
      >
        <div className="w-full max-w-full mb-3 sm:mb-4 2xl:mb-6">
          <div className="overflow-hidden" ref={frequentlyEmblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom -mx-2 sm:-mx-4 xl:-mx-7 2xl:-mx-8 *:px-2 sm:*:px-4 xl:*:px-7 2xl:*:px-8">
              {products.map((item, index) => (
                <div key={item?.id} className="flex-[0_0_176px] sm:flex-[0_0_33.333%] lg:flex-[0_0_50%] min-w-0 select-none relative z-0">
                  <FrequentlyBoughtCard product={item} locale={locale} selected={selectedIds.has(item.id)} onToggle={() => toggleItem(item.id)} />

                  {index !== products.length - 1 && (
                    <Image
                      src={"/images/icon-plus.svg"}
                      alt={"icon-plus"}
                      width={12}
                      height={12}
                      className={cn(
                        "w-[8px] xl:w-[10px] 2xl:w-[12px]",
                        "absolute top-1/2 -translate-y-1/2",
                        locale === "ar" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
                      )}
                      quality={90}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-2 sm:my-2 2xl:my-3 mx-[-5px]" />
      <div className="flex justify-between items-center gap-2">
        <div>
          <Heading
            as="div"
            size="none"
            className="text-[10px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light truncate text-[#bbbcbc] mb-0.5"
          >
            {locale === "en" ? `Total (${totalItems} ${totalItems === 1 ? "item" : "items"})` : `الإجمالي (${totalItems} ${totalItems === 1 ? "عنصر" : "عناصر"})`}
          </Heading>
          <Text
            as="div"
            size="none"
            className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-bold truncate text-[#282828]"
          >
            AED {totalPrice.toFixed(2)}
          </Text>
        </div>
        <div>
          <Button
            variant={"black"}
            onClick={addToCart}
            className="min-w-[100px] xl:min-w-[120px] 2xl:min-w-[160px] mx-auto"
            disabled={totalItems === 0}
          >
            <Image src={"/images/icon-cart.svg"} alt={"icon-cart"} width={15} height={15} className="w-[15px]" quality={90} />
            {locale === "en" ? "Add to Cart" : "أضف إلى السلة"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FrequentBroughtTogether;
