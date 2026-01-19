"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import Autoplay from "embla-carousel-autoplay";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DotButton,
  useDotButton,
} from "@/components/utils/embla-carousel-dot-button";

export default function HomeProject({ data, locale }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start", direction: locale === "ar" ? "rtl" : "ltr" },
    [ClassNames(), Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[80px]">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between mb-3 xl:mb-4 2xl:mb-6">
          <Heading as="h2" size="heading1" className="text-black">
            {parse(data?.title)}
            <span
              className={cn(
                "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                locale === "ar"
                  ? "-translate-x-1 xl:-translate-x-2 "
                  : "translate-x-1 xl:translate-x-2 "
              )}
            />
          </Heading>
          <div className="flex py-2 gap-1 xl:gap-3">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn(
                  "w-2 h-2 border border-[#8e8e90] bg-none rounded-full",
                  index === selectedIndex && "bg-[#f17423] border-[#f17423] "
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "container",
          locale === "ar"
            ? "max-sm:[mask-image:linear-gradient(to_left,white_0%,white_98%,transparent_100%)] max-sm:pl-0"
            : "max-sm:[mask-image:linear-gradient(to_right,white_0%,white_98%,transparent_100%)] max-sm:pr-0"
        )}
      >
        <div className="w-full max-w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom -mx-0.5 sm:-mx-1">
              {data?.project?.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={"product" + index}
                    className={cn(
                      "flex-[0_0_40px] sm:flex-[0_0_20%] min-w-0 px-0.5 sm:px-1 select-none transition-all duration-600",
                      isActive && "flex-[0_0_268px] sm:flex-[0_0_60%]"
                    )}
                  >
                    <div
                      className="w-full h-[268px] sm:h-[368px] xl:h-[468px] 2xl:h-[576px] 3xl:h-[668px] bg-black overflow-hidden relative z-0"
                      onClick={() => setActiveIndex(index)}
                    >
                      <div className={cn("w-full h-0.5 bg-[#f17423] absolute bottom-0 left-0 right-0 z-1 transition",
                        isActive ? "visible" : "invisible"
                      )} />
                      <Image
                        src={item?.media?.path}
                        alt={item?.media?.alt}
                        width={308}
                        height={517}
                        className="w-full h-full object-cover hover:scale-110 opacity-80 transition duration-300"
                      />
                      <div
                        className={cn(
                          "w-full absolute z-0 inset-0 p-[20px] xl:p-[40px] 2xl:p-[50px] opacity-0 invisible translate-x-10 transition duration-500",
                          isActive && "opacity-100 visible translate-x-0"
                        )}
                      >
                        <Heading
                          as="div"
                          size="heading1"
                          className="font-light capitalize text-white mb-5"
                        >
                          {parse(item?.title)}
                        </Heading>
                        <Button
                          variant={"white"}
                          className="min-w-[100px] sm:min-w-[120px] xl:min-w-[135px] 2xl:min-w-40"
                          asChild
                        >
                          <Link href={item?.button?.link}>
                            {item?.button?.label}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
