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
            <div className="w-full max-w-full h-fit px-[25px] lg:px-[35px] 2xl:px-[50px] relative z-0 ">
                <div className="w-full flex flex-row justify-between items-center gap-4 mb-2 xl:mb-4 2xl:mb-6 absolute left-0 top-[40%]">
                    {products?.length > 3 && (
                        <div className="w-full flex justify-between gap-x-2.5 2xl:gap-x-3 xl:mt-3">
                            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="disabled:opacity-50 not-disabled:hover:scale-110">
                                <ChevronLeft className={cn("size-5 2xl:size-6 text-[#282828]", locale === "ar" && "rotate-180")} />
                            </PrevButton>
                            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className="disabled:opacity-50 not-disabled:hover:scale-110">
                                <ChevronRight className={cn("size-5 2xl:size-6 text-[#282828]", locale === "ar" && "rotate-180")} />
                            </NextButton>
                        </div>
                    )}
                </div>
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex touch-pan-y touch-pinch-zoom -mx-1 sm:-mx-[5px] xl:-mx-[7.5px] 2xl:-mx-[10px] *:px-1 sm:*:px-[5px] xl:*:p-x-[7.5px] 2xl:*:px-[10px]">
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
