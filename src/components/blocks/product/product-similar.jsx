"use client";
import { Heading } from "@/components/utils/heading";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
import ProductCard from "./product-card";

import { NextButton, PrevButton, usePrevNextButtons } from "@/components/utils/embla-carousel-arrow-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProductSimilar({ locale, data }) {
  const products = data || data?.products;

  const t = useTranslations("cart");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", direction: locale === "ar" ? "rtl" : "ltr" }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="w-full block py-[15px_30px] xl:py-[30px_60px] 2xl:py-[40px_100px]">
      <div className="container">
        <div className="flex flex-row justify-between items-center gap-4 mb-2 xl:mb-4 2xl:mb-6">
          <Heading as="h2" size="heading1" className="line-clamp-2 text-black">
            {t("similiar_products")}
            <span
              className={cn(
                "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                locale === "ar" ? "-translate-x-1 xl:-translate-x-2 " : "translate-x-1 xl:translate-x-2 ",
              )}
            />
          </Heading>

          <div className="flex gap-x-2.5 2xl:gap-x-3 xl:mt-3">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="disabled:opacity-50 not-disabled:hover:scale-110">
              <ChevronLeft className={cn("size-3 2xl:size-5 text-[#282828]", locale === "ar" && "rotate-180")} />
            </PrevButton>
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className="disabled:opacity-50 not-disabled:hover:scale-110">
              <ChevronRight className={cn("size-3 2xl:size-5 text-[#282828]", locale === "ar" && "rotate-180")} />
            </NextButton>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "container",
          locale === "ar"
            ? "max-sm:mask-[linear-gradient(to_left,white_0%,white_98%,transparent_100%)] max-sm:pl-0"
            : "max-sm:mask-[linear-gradient(to_right,white_0%,white_98%,transparent_100%)] max-sm:pr-0",
        )}
      >
        <div className="w-full max-w-full relative z-0 ">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom -mx-1 sm:-mx-2 xl:-mx-5 2xl:-mx-8 *:p-1 sm:*:p-2 xl:*:p-5 2xl:*:p-8">
              {products?.map((item, index) => (
                <div key={"product" + index} className="flex-[0_0_176px] sm:flex-[0_0_33.333%] min-w-0 select-none">
                  <ProductCard product={item} locale={locale} isEn={locale === "en"} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
