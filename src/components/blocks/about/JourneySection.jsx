"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Text } from "@/components/utils/text";
import { Heading } from "@/components/utils/heading";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function JourneySection({ data, locale }) {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: false,
      axis: "y",
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
      watchSlides: true,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  return (
    <section className="w-full h-auto py-[20px_40px] sm:py-[20px_50px] lg:py-[30px_70px] 2xl:py-[40px_80px] 3xl:py-[50px_100px] block">
      <div className="container">
        <div className="w-full h-auto flex flex-wrap items-center">
          <div className="w-full md:w-1/2 md:pr-10 lg:pr-12.5 2xl:pr-15 3xl:pr-20 mb-6 sm:mb-8 md:mb-0">
            <div className="w-full h-auto mb-6 sm:mb-8 lg:mb-10 xl:mb-12.5 3xl:mb-18">
              <Heading
                as="h1"
                size="heading1"
                className="leading-tight text-[#282828] mb-3 sm:mb-5 lg:mb-6.5 2xl:mb-7.5 3xl:mb-10"
              >
                {parse(data?.title)}
                <span
                  className={cn(
                    "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                    locale === "ar"
                      ? "-translate-x-1 xl:-translate-x-2 "
                      : "translate-x-1 xl:translate-x-2 ",
                  )}
                />
              </Heading>
              <Text as="div" size="text1" className="font-light text-[#282828]">
                {parse(data?.description)}
              </Text>
            </div>
            <div
              ref={emblaRef}
              className={cn(
                " overflow-hidden relative z-0 before:content-[''] before:w-8 2xl:before:w-10 before:h-50 2xl:before:h-59 before:bg-[url('/images/about-scale.svg')] before:bg-cover before:bg-no-repeat before:absolute before:z-1",
                locale === "ar"
                  ? "pr-12 2xl:pr-15 before:inset-[0_0_0_auto]"
                  : "pl-12 2xl:pl-15 before:inset-[0_auto_0_0]",
              )}
            >
              <div className="h-51 2xl:h-60 select-none flex flex-col">
                {data?.journey_list?.map((item) => (
                  <div
                    key={item?.id}
                    className="flex-[0_0_8%] mb-7.5 2xl:mb-9 last:!mb-0"
                  >
                    <div className="w-full h-full block">
                      <div className="text-[12px] sm:text-[13px] 2xl:text-[16px] 3xl:text-[18px] leading-[1] font-light text-[#282828] line-clamp-1">
                        {item?.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-50 md:h-80 lg:h-98 2xl:h-118 3xl:h-145 grid grid-cols-2 gap-2 sm:gap-4 lg:gap-5 2xl:gap-6 3xl:gap-7.5">
              <div className="max-md:h-50 grid grid-rows-2 gap-2 sm:gap-4 lg:gap-5 2xl:gap-6 3xl:gap-7.5">
                {data?.imageGrid_list?.slice(0, 2).map((item) => (
                  <div
                    key={item?.id}
                    className="group w-full h-auto overflow-hidden block"
                  >
                    <Image
                      src={item?.media?.path}
                      alt={item?.media?.alt}
                      width={415}
                      height={280}
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-400 ease-in-out"
                    />
                  </div>
                ))}
              </div>
              {data?.imageGrid_list?.slice(2, 3).map((item) => (
                <div
                  key={item?.id}
                  className="group w-full h-auto overflow-hidden block"
                >
                  <Image
                    src={item?.media?.path}
                    alt={item?.media?.alt}
                    width={435}
                    height={580}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-400 ease-in-out"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
