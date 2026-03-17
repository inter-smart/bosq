"use client";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import { cn } from "@/lib/utils";

export default function HomeBrand({ data, locale, isEN }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      direction: !isEN ? "rtl" : "ltr",
    },
    [ClassNames(), Autoplay({ delay: 1500, stopOnInteraction: true })]
  );

  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px_60px] xl:py-[60px_100px] 2xl:py-[80px_120px] overflow-hidden">
      <div className="container">
        <Heading
          as="h2"
          size="heading1"
          className="line-clamp-2 text-black mb-4 xl:mb-8 2xl:mb-10"
        >
          {parse(!isEN ? data?.title_ar : data?.title)}
          <span
            className={cn(
              "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
              !isEN
                ? "-translate-x-1 xl:-translate-x-2 "
                : "translate-x-1 xl:translate-x-2 "
            )}
          />
        </Heading>
      </div>
      <div
        className={cn(
          "container",
          !isEN
            ? "max-sm:mask-[linear-gradient(to_left,white_0%,white_90%,transparent_100%)] max-sm:pl-0"
            : "max-sm:mask-[linear-gradient(to_right,white_0%,white_90%,transparent_100%)] max-sm:pr-0"
        )}
      >
        <div className="w-full max-w-full xl:max-w-[1040px] 2xl:max-w-[1260px] 3xl:max-w-[1620px] mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-center touch-pan-y touch-pinch-zoom -mx-3 xl:-mx-6 2xl:-mx-8">
              {data?.list?.map((item, index) => (
                <div
                  key={"brand" + index}
                  className={cn(
                    "flex-[0_0_20%] sm:flex-[0_0_14.285%] min-w-0 px-3 xl:px-6 2xl:px-8 select-none transition",
                    "not-[.is-in-view]:opacity-50 not-[.is-in-view]:scale-80"
                  )}
                >
                  <div className="w-full aspect-160/55">
                    <Image
                      src={item?.media?.path}
                      alt={!isEN ? item?.media?.alt_ar : item?.media?.alt}
                      width={160}
                      height={65}
                      className="w-full h-full object-contain block"
                      quality={90}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
