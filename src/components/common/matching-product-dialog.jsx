"use client";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heading } from "../utils/heading";
import { Text } from "../utils/text";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import parse from "html-react-parser";
import FrequentlyBoughtCard from "../blocks/product/frequently-bought-card";
import Image from "@/components/utils/custom-image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addBundle, addToCartTogether, fetchCart } from "@/store/slices/cartSlice";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { setShippingCharge, setSelectedShippingAddress, setSelectedBillingAddress } from "@/store/slices/checkoutSlice";

export default function MatchingProductDialog({ children, locale, data }) {
  const t = useTranslations("checkout");


  const [frequentlyEmblaRef, frequentlyEmblaApi] = useEmblaCarousel({ loop: false, align: "start", direction: locale === "ar" ? "rtl" : "ltr" }, [
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  ]);

  const products = data?.items || [];
  const dispatch = useDispatch();
  const router = useRouter();

  // All items checked by default
  const [selectedIds, setSelectedIds] = useState(() => new Set(products.map((p) => p.id)));

  useEffect(() => {
    setSelectedIds(new Set(products.map((p) => p.id)));
  }, [data]);

  const toggleItem = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const { totalItems, totalPrice } = useMemo(() => {
    const selected = products.filter((p) => selectedIds.has(p.id));
    return {
      totalItems: selected.length,
      totalPrice: selected.reduce((sum, p) => sum + parseFloat(p.price || 0), 0),
    };
  }, [selectedIds, products]);

  const addToCart = async () => {
    try {
      const cartData = await dispatch(
        addBundle({
          variant_ids: Array.from(selectedIds),
        }),
      ).unwrap();

      const { updatedCharge } = cartData || {};

      if (updatedCharge !== undefined) dispatch(setShippingCharge(updatedCharge));

      // Reset address selections so checkout auto-selects the default address
      dispatch(setSelectedShippingAddress(null));
      dispatch(setSelectedBillingAddress(null));

      toast.success(locale === "en" ? "Items added to cart successfully" : "تم إضافة المنتجات إلى السلة بنجاح");
      dispatch(fetchCart());
      router.refresh();
    } catch (error) {
      if (error?.requiresLogin) {
        router.push(`/${locale}/login`);
        toast.error(locale == "en" ? error?.message?.en : error?.message?.ar || "Failed to add item to cart");
      } else {
        toast.error(locale == "en" ? error?.en : error?.ar || "Failed to add item to cart");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className={"sm:max-w-[576px] xl:max-w-[768px] 2xl:max-w-[920px] 3xl:max-w-[1100px] gap-0 px-0"}>
        <div className="w-full relative z-0">
          <DialogHeader className={"mb-2 xl:mb-4 2xl:mb-7"}>
            <DialogTitle asChild>
              <Heading as="h2" size="heading2" className="font-normal text-center text-black mb-0.5 xl:mb-1">
                {t("matching_products")}
                <span
                  className={cn(
                    "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                    locale === "ar" ? "-translate-x-1 xl:-translate-x-2 " : "translate-x-1 xl:translate-x-2 ",
                  )}
                />
              </Heading>
            </DialogTitle>
            <DialogDescription asChild>
              <Text as="div" size="text1" className="text-center text-[#282828]">
                {t("save_more")}
              </Text>
            </DialogDescription>
          </DialogHeader>

          <hr />
          <div className="w-full px-8 xl:px-15 2xl:px-20">
            <div className="w-full my-5 xl:my-8 2xl:my-10">
              <div className="overflow-hidden" ref={frequentlyEmblaRef}>
                <div className="flex touch-pan-y touch-pinch-zoom -mx-2 sm:-mx-4 xl:-mx-7 2xl:-mx-8 *:px-2 sm:*:px-4 xl:*:px-7 2xl:*:px-8">
                  {data?.items?.map((item, index) => (
                    <div
                      key={"frequentlyBought" + index}
                      className="flex-[0_0_176px] sm:flex-[0_0_33.333%] lg:flex-[0_0_33.333%] min-w-0 select-none relative z-0"
                    >
                      <FrequentlyBoughtCard product={item} locale={locale} selected={selectedIds.has(item.id)} onToggle={() => toggleItem(item.id)} />
                      {index !== data?.items?.length - 1 && (
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

            <hr className="mb-4 xl:mb-6 2xl:mb-8" />

            <div className="flex justify-between items-center gap-2 mb-4 xl:mb-6 2xl:mb-8">
              <div>
                <Heading
                  as="div"
                  size="none"
                  className="text-[10px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light truncate text-[#bbbcbc] mb-0.5"
                >
                  Total ({totalItems} {totalItems === 1 ? (locale === "en" ? "item" : "منتج") : locale === "en" ? "items" : "منتجات"})
                </Heading>
                <Text as="div" size="text2" className="font-medium text-[#282828]">
                  AED {totalPrice.toFixed(2)}
                </Text>
              </div>
              <div>
                <Button
                  variant={"black"}
                  className="min-w-[100px] xl:min-w-[120px] 2xl:min-w-[160px] mx-auto"
                  disabled={totalItems === 0}
                  onClick={addToCart}
                >
                  <Image src={"/images/icon-cart.svg"} alt={"icon-cart"} width={15} height={15} className="w-[15px]" quality={90} />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          <DialogClose asChild>
            <Button
              variant="none"
              size="none"
              className={cn("block fixed z-1 top-4 xl:top-5", locale === "ar" ? "mr-auto left-4 xl:left-5" : "ml-auto right-4 xl:right-5")}
            >
              <X className="size-5 sm:size-4 2xl:size-5 text-black" />
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
