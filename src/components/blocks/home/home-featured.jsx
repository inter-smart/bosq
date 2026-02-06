"use client";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";
import parse from "html-react-parser";
import useEmblaCarousel from "embla-carousel-react";
// import {
//   NextButton,
//   PrevButton,
//   usePrevNextButtons,
// } from "@/components/utils/embla-carousel-arrow-button";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function HomeFeatured({ data, locale }) {
  const isEN = locale === "en";
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start", direction: !isEN ? "rtl" : "ltr" },
    [Autoplay({ delay: 3000, stopOnInteraction: true })],
  );

  // const {
  //   prevBtnDisabled,
  //   nextBtnDisabled,
  //   onPrevButtonClick,
  //   onNextButtonClick,
  // } = usePrevNextButtons(emblaApi);

  
  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px_60px] xl:py-[60px_80px] 2xl:py-[80px_100px]">
      <div className="container">
        <Heading
          as="h2"
          size="heading1"
          className="line-clamp-2 text-black mb-2 xl:mb-4 2xl:mb-6"
        >
          {parse(!isEN ? data?.title_ar : data?.title)}
          <span
            className={cn(
              "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
              !isEN
                ? "-translate-x-1 xl:-translate-x-2 "
                : "translate-x-1 xl:translate-x-2 ",
            )}
          />
        </Heading>
      </div>
      <div
        className={cn(
          "container",
          !isEN
            ? "max-sm:mask-[linear-gradient(to_left,white_0%,white_98%,transparent_100%)] max-sm:pl-0"
            : "max-sm:mask-[linear-gradient(to_right,white_0%,white_98%,transparent_100%)] max-sm:pr-0",
        )}
      >
        <div className="w-full max-w-full relative z-0 ">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom -mx-1">
              {data?.list?.map((item, index) => (
                <div
                  key={"product" + index}
                  className="flex-[0_0_176px] sm:flex-[0_0_25%] min-w-0 px-1 select-none"
                >
                  <Suspense fallback={<FeaturedCard />}>
                    <Link
                      href={{
                        pathname: `/${locale}/products`,
                        query: {
                          subcategory: item?.slug,
                          page: 1,
                        },
                      }}
                      className="group w-full h-auto block"
                    >
                      <div className="w-full aspect-440/576 overflow-hidden mb-1 xl:mb-3 2xl:mb-5">
                        <Image
                          src={item?.media?.path}
                          alt={isEN?item?.media?.alt: item?.media?.alt_ar}
                          width={308}
                          height={517}
                          className="w-full h-full object-cover hover:scale-110 transition duration-300"
                        />
                      </div>
                      <div className="w-full">
                        <Heading
                          as="div"
                          size="heading3"
                          className="font-normal capitalize text-[#282828] flex items-center gap-2"
                        >
                          {parse(isEN? item?.name: item?.name_ar)}{" "}
                          <span className="w-6 xl:w-7 2xl:w-9 h-0.5 bg-[#f17423] opacity-0 -translate-x-5 transition group-hover:opacity-100 not group-hover:translate-x-0" />
                        </Heading>
                      </div>
                    </Link>
                  </Suspense>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard() {
  return (
    <div className="w-full h-auto block">
      <Skeleton className="w-full aspect-440/576 overflow-hidden mb-1 xl:mb-3 2xl:mb-5" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  );
}
