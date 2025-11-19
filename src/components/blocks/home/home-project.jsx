"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import useEmblaCarousel from "embla-carousel-react";

import ClassNames from "embla-carousel-class-names";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DotButton,
  useDotButton,
} from "@/components/utils/embla-carousel-dot-button";

import Autoplay from "embla-carousel-autoplay";

export default function HomeProject({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start" },
    [ClassNames(), Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[80px]">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between mb-4 xl:mb-7 2xl:mb-8">
          <Heading as="h1" size="heading1" className="line-clamp-2 text-black">
            {parse(data?.title)}
            <span className="text-[#f17423]">.</span>
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
        <div className="w-full max-w-full relative z-0">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom -mx-1">
              {data?.product?.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={"product" + index}
                    className={cn(
                      "flex-[0_0_20%] min-w-0 px-1 select-none transition-all duration-600",
                      isActive && "flex-[0_0_60%]"
                    )}
                  >
                    <div
                      className="w-full h-[320px] sm:h-[368px] xl:h-[468px] 2xl:h-[576px] 3xl:h-[668px] bg-black overflow-hidden relative z-0"
                      onClick={() => setActiveIndex(index)}
                    >
                      <Image
                        src={item?.media?.path}
                        alt={item?.media?.alt}
                        width={308}
                        height={517}
                        className="w-full h-full object-cover absolute z-0 inset-0 hover:scale-110 opacity-80 transition duration-300"
                      />
                      <div
                        className={cn(
                          "w-full absolute z-0 inset-[20px] xl:inset-[40px] opacity-0 invisible translate-x-10 transition duration-500",
                          isActive && "opacity-100 visible translate-x-0"
                        )}
                      >
                        <Heading
                          as="div"
                          size="heading1"
                          className="font-light capitalize text-white mb-5"
                        >
                          {parse(item?.name)}
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
