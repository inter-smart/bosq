"use client";
import Image from "@/components/utils/custom-image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";
import useEmblaCarousel from "embla-carousel-react";
import {
  DotButton,
  useDotButton,
} from "@/components/utils/embla-carousel-dot-button";
import { useState, useEffect } from "react";

export default function TestimonialSection({ data, locale }) {
    const isEn = locale === "en";
    const [axis, setAxis] = useState("y");
    useEffect(() => {
        const handleResize = () => {
            setAxis(window.innerWidth < 630 ? "x" : "y");
        };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    axis,
    align: "center",
    dragFree: false,
    containScroll: false,
    watchSlides: true,
    direction: locale === "ar" ? "rtl" : "ltr",
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <section className="w-full h-auto py-10 sm:py-20 lg:py-30 2xl:py-60 3xl:py-70 block">
      <div className="container">
        <div className="w-full h-auto lg:px-15 xl:px-25 2xl:px-30 3xl:px-38 flex items-center max-sm:flex-col relative z-0">
          <div
            className={cn(
              "w-50 sm:w-70 lg:w-100 2xl:w-118 3xl:w-148 h-auto aspect-square max-sm:mb-5 relative sm:absolute -z-1",
              locale === "ar"
                ? "lg:right-15 xl:right-25 2xl:right-30 3xl:right-38"
                : "lg:left-15 xl:left-25 2xl:left-30 3xl:left-38",
            )}
          >
            <Heading
              as="h1"
              size="heading1"
              className={cn(
                "leading-tight text-[#282828] w-fit h-fit pt-10 m-auto absolute z-1 inset-0",
                locale === "ar" ? "ml-[50%] text-left" : "mr-[50%] text-right",
              )}
            >
              {parse(isEn? data?.title: data?.title_ar)}
              <span
                className={cn(
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                //   locale === "ar"
                //     ? "-translate-x-1 xl:-translate-x-2 "
                //     : "translate-x-1 xl:translate-x-2 ",
                )}
              />
            </Heading>
            <div
              className={cn(
                "w-full h-full absolute -z-1 inset-0 block",
                locale === "ar" && "scale-x-[-1]",
              )}
            >
              <Image
                src="/images/testimonial-overlay.svg"
                alt="overlay"
                width={590}
                height={610}
                className="w-full h-full object-contain"
                quality={90}
              />
            </div>
          </div>
          <div
            ref={emblaRef}
            className={cn(
              "max-w-full sm:max-w-100 md:max-w-130 lg:max-w-140 xl:max-w-160 2xl:max-w-193 3xl:max-w-240 h-50 sm:h-70 lg:h-90 2xl:h-100 3xl:h-110 sm:mask-t-from-85% sm:mask-b-from-85% overflow-hidden",
              locale === "ar"
                ? "mr-auto sm:translate-x-[5%]"
                : "ml-auto sm:translate-x-[-5%]",
            )}
          >
            <div className="h-full select-none flex sm:flex-col">
              {data?.list?.map((item) => (
                <div
                  key={item?.id}
                  className="h-full flex-[0_0_100%] mb-5 flex flex-col justify-center"
                >
                  <div
                    className={cn(
                      "w-full h-full sm:h-50 lg:h-65 2xl:h-75 3xl:h-85 overflow-auto flex flex-col justify-start",
                      locale === "ar" ? "pl-5" : "pr-5",
                    )}
                  >
                    <div className="w-full h-auto my-auto">
                      <div className="text-[13px] 2xl:text-[16px] 3xl:text-[18px] leading-[1.4] font-normal text-[#282828] mb-3 sm:mb-5 2xl:mb-7.5">
                        {isEn? item?.title: item?.title_ar}
                      </div>
                      <div className="text-[11px] lg:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-[1.8] font-light text-[#282828] mb-3 sm:mb-5 2xl:mb-7.5">
                        {isEn? item?.description: item?.description_ar}
                      </div>
                      <div className="text-[13px] 2xl:text-[16px] 3xl:text-[18px] leading-[1.4] font-normal text-[#282828]">
                        {isEn? item?.name: item?.name_ar}, {isEn? item?.designation: item?.designation_ar}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex sm:flex-col max-sm:mt-10 sm:py-2 gap-2 2xl:gap-3">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn(
                  "w-2.25 2xl:w-3 h-2.25 2xl:h-3 bg-[#D9D9D9]",
                  index === selectedIndex && "bg-[#282828]",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
