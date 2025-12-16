"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import { format } from "date-fns";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/components/utils/embla-carousel-arrow-button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogDetailHero({ data, locale, slug }) {
  let formattedDate = "";
  if (data?.publishedAt) {
    const date = new Date(data?.publishedAt);
    if (!isNaN(date)) {
      formattedDate = format(date, "dd MMMM yyyy");
    }
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      direction: locale === "ar" ? "rtl" : "ltr",
    },
    [Autoplay({ delay: 1500, stopOnInteraction: true }), Fade()]
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="w-full pt-[calc(var(--header-y)_+_20px)] sm:pt-[calc(var(--header-y)_+_10px)]">
      <div className="container mb-3 xl:mb-5 2xl:mb-8">
        <Breadcrumb className="mb-2 sm:mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            {slug && (
              <BreadcrumbItem>
                <BreadcrumbPage className={"capitalize"}>{slug}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        {data?.title && (
          <Heading as="h2" size="heading1" className="line-clamp-2 text-black">
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
        )}
      </div>

      <div className="w-full aspect-1920/740 overflow-hidden flex items-center relative z-0">
        <div className="w-full absolute -z-1 inset-0">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom">
              {data?.bannerMedia?.map((item, index) => (
                <div
                  key={"brand" + index}
                  className={cn(
                    "flex-[0_0_100%] min-w-0 select-none transition aspect-1920/740"
                  )}
                >
                  <picture className="absolute -z-2 inset-0">
                    <source
                      media="(max-width: 640px)"
                      srcSet={item?.mobile?.path}
                    />
                    <Image
                      src={item?.desktop?.path}
                      alt={item?.desktop?.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
                      className="-z-2 object-cover"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                      priority
                    />
                  </picture>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="disabled:opacity-50 not-disabled:hover:scale-110"
            >
              <span className="hidded sm:block">Previous </span>
              <ChevronLeft />
            </PrevButton>
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="disabled:opacity-50 not-disabled:hover:scale-110"
            >
              <span className="hidded sm:block">Next </span>
              <ChevronRight />
            </NextButton>
          </div>
        </div>

        <div className="container">
          <div className="w-full xl:max-w-1/2 py-[40px] xl:py-[60px] 2xl:py-[80px]">
            {formattedDate && (
              <Text
                as="div"
                size="text1"
                className="line-clamp-2 font-light text-white mb-2 xl:mb-3"
              >
                {formattedDate}
              </Text>
            )}
            <Heading
              as="h1"
              size="heading1"
              className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-6"
            >
              {parse(data?.heroTitle)}
              <span
                className={cn(
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                  locale === "ar"
                    ? "-translate-x-1 xl:-translate-x-2 "
                    : "translate-x-1 xl:translate-x-2 "
                )}
              />
            </Heading>
            {data?.heroDescription && (
              <Text
                as="div"
                size="text1"
                className="line-clamp-2 font-light text-white max-w-[80%] "
              >
                {parse(data?.heroDescription)}
              </Text>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
