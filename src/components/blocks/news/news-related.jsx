"use client";
import { Heading } from "@/components/utils/heading";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import NewsCard from "./news-card";

export default function NewsRelated({ locale, data,  }) {
  const isEn = locale === "en";
  const [emblaRef] = useEmblaCarousel(
    { loop: false, align: "start", direction: locale === "ar" ? "rtl" : "ltr" },
    [Autoplay({ delay: 3000, stopOnInteraction: true })],
  );

  return (
    <div className="w-full pt-[40px] sm:pt-[60px] xl:pt-[90px] 2xl:pt-[100px]">
      <Heading
        as="h2"
        size="heading1"
        className="line-clamp-2 text-black mb-2 xl:mb-3 2xl:mb-4"
      >
        {parse( isEn ? data?.title: data?.title_ar)}
        <span
          className={cn(
            "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
            locale === "ar"
              ? "-translate-x-1 xl:-translate-x-2 "
              : "translate-x-1 xl:translate-x-2 ",
          )}
        />
      </Heading>
      <div className="w-full max-w-full relative z-0 ">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom -mx-1 sm:-mx-2 xl:-mx-3 2xl:-mx-5 *:p-1 sm:*:p-2 xl:*:p-3 2xl:*:p-5">
            {data?.list?.map((item, index) => (
              <div
                key={"news" + index}
                className="flex-[0_0_50%] min-w-0 select-none"
              >
                <NewsCard locale={locale} data={item} isEn={isEn} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
