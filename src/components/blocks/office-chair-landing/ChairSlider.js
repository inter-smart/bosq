"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
import ProductCard from "../product/product-card";

import { NextButton, PrevButton, usePrevNextButtons } from "@/components/utils/embla-carousel-arrow-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ChairSlider({ locale, data }) {
    const products = data || data?.products;

    const t = useTranslations("cart");
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", direction: locale === "ar" ? "rtl" : "ltr" }, [
        Autoplay({ delay: 5000, stopOnInteraction: true }),
    ]);

    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between items-center gap-4 mb-2 xl:mb-4 2xl:mb-6">
                {products?.length > 3 && (
                    <div className="flex gap-x-2.5 2xl:gap-x-3 xl:mt-3">
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="disabled:opacity-50 not-disabled:hover:scale-110">
                            <ChevronLeft className={cn("size-3 2xl:size-5 text-[#282828]", locale === "ar" && "rotate-180")} />
                        </PrevButton>
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className="disabled:opacity-50 not-disabled:hover:scale-110">
                            <ChevronRight className={cn("size-3 2xl:size-5 text-[#282828]", locale === "ar" && "rotate-180")} />
                        </NextButton>
                    </div>
                )}
            </div>
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
    );
}
