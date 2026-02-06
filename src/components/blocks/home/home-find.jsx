"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Suspense, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeFind({ data, locale, isEN }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: false, align: "start", direction: !isEN? "rtl" : "ltr" },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[50px] 2xl:py-[70px] bg-[#f4f4f4] rounded-[15px] xl:rounded-[30px] overflow-hidden relative z-0">
      <div className="container max-sm:px-0">
        <div className="max-w-full xl:max-w-[1120px] 2xl:max-w-[1320px] 3xl:max-w-[1700px] mx-auto">
          <div className="flex flex-wrap sm:items-center">
            <div className="w-full sm:w-[220px] xl:w-[280px] 2xl:w-[420px] 3xl:w-[468px] max-sm:mb-4 max-sm:px-4">
              <div className="w-full xl:max-w-[70%]">
                <Heading
                  as="h2"
                  size="heading1"
                  className="line-clamp-2 text-black mb-2 xl:mb-3 2xl:mb-5"
                >
                  {parse(!isEN? data?.title_ar : data?.title)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                      !isEN
                        ? "-translate-x-1 xl:-translate-x-2 "
                        : "translate-x-1 xl:translate-x-2 "
                    )}
                  />
                </Heading>
                <Text
                  as="div"
                  size="text1"
                  className="line-clamp-6 font-light text-black mb-4 xl:mb-6 2xl:mb-6"
                >
                  {parse(!isEN? data?.description_ar : data?.description)}
                </Text>
                <Button
                  variant={"white"}
                  className="bg-white min-w-[100px] sm:min-w-[120px] xl:min-w-[135px] 2xl:min-w-[160px]"
                  asChild
                >
                  <Link href={`${locale}/projects`}>{!isEN? data?.button?.label_ar: data?.button?.label}</Link>
                </Button>
              </div>
            </div>

            <div
              className={cn(
                "w-full sm:w-[calc(100%-220px)] xl:w-[calc(100%-280px)] 2xl:w-[calc(100%-420px)] 3xl:w-[calc(100%-468px)] ",
                !isEN
                  ? "max-sm:[mask-image:linear-gradient(to_left,white_0%,white_98%,transparent_100%)] max-sm:pr-4"
                  : "max-sm:[mask-image:linear-gradient(to_right,white_0%,white_98%,transparent_100%)] max-sm:pl-4"
              )}
            >
              <div className="w-full max-w-full">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex touch-pan-y touch-pinch-zoom -mx-0.5 sm:-mx-1 xl:-mx-3">
                    {data?.projects?.map((item, index) => {
                      return (
                        <div
                          key={"project" + index}
                          className={cn(
                            "flex-[0_0_220px] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 p-0.5 sm:p-1 xl:p-3 select-none transition-all duration-600 sm:nth-[even]:[&>div]:flex-col-reverse max-sm:[&>div]:flex-col-reverse"
                          )}
                        >
                          <Suspense fallback={<FindCard />}>
                            <div
                              className={cn(
                                "w-full h-auto flex flex-col justify-between gap-y-1.5 xl:gap-y-3 bg-none p-2 sm:p-2 xl:p-3 2xl:p-4 transition-all duration-600 max-sm:bg-white",
                                activeIndex === index &&
                                  "bg-white shadow-[0px_0px_15px_0_rgba(0,0,0,0.1)]"
                              )}
                              onMouseEnter={() => setActiveIndex(index)}
                            >
                              <div className="w-full py-1.5 xl:py-3.5">
                                <Heading
                                  as="div"
                                  size="heading2"
                                  className="font-light capitalize text-[#282828] mb-2 xl:mb-3"
                                >
                                  {parse(!isEN? item?.title_ar : item?.title )}
                                  <span
                                    className={cn(
                                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                                      !isEN
                                        ? "-translate-x-1 xl:-translate-x-2 "
                                        : "translate-x-1 xl:translate-x-2 "
                                    )}
                                  />
                                </Heading>
                                <Text
                                  as="div"
                                  size="text1"
                                  className="line-clamp-6 leading-normal font-light text-black mb-3 xl:mb-5 2xl:mb-6"
                                >
                                  {parse(!isEN? item?.description_ar : item?.description)}
                                </Text>
                                <Button
                                  variant={
                                    activeIndex === index ? "black" : "white"
                                  }
                                  className={cn(
                                    " min-w-[90px] sm:min-w-[100px] xl:min-w-[110px] 2xl:min-w-36 transition duration-400",
                                    activeIndex !== index && "bg-white"
                                  )}
                                  asChild
                                >
                                  <Link href={`${locale}/${item?.button?.link}`}>
                                    {!isEN? item?.button?.label_ar : item?.button?.label}
                                  </Link>
                                </Button>
                              </div>
                              <div className="w-full aspect-[3/4] xl:aspect-[22/30] overflow-hidden">
                                <Image
                                  src={item?.media?.path}
                                  alt={!isEN? item?.media?.alt_ar : item?.media?.alt}
                                  width={350}
                                  height={440}
                                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                                />
                              </div>
                            </div>
                          </Suspense>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FindCard() {
  return (
    <div
      className={cn(
        "w-full h-auto flex flex-col justify-between gap-y-1.5 xl:gap-y-3 bg-none p-2 sm:p-2 xl:p-3 2xl:p-4"
      )}
    >
      <div className="w-full py-1.5 xl:py-3.5">
        <Skeleton className="h-4 w-[250px] bg-white mb-1" />
        <Skeleton className="h-4 w-[250px] bg-white mb-1" />
        <Skeleton className="h-10 max-w-[90px] sm:max-w-[100px] xl:max-w-[110px] 2xl:max-w-36  bg-white mb-1" />
      </div>
      <Skeleton className="w-full aspect-[3/4] xl:aspect-[22/30] overflow-hidden bg-white" />
    </div>
  );
}
