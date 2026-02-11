"use client";
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
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BlogRelated from "./blog-related";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

const navBtnStyle = cn(
  "text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-white flex items-center gap-0.5 disabled:opacity-50 not-disabled:hover:scale-110 transition cursor-pointer",
);

export default function BlogInfo({ data, popularData, relatedData, locale }) {
  let formattedDate = "";

  if (data?.publishedAt) {
    const date = new Date(data.publishedAt);

    if (!isNaN(date)) {
      formattedDate = format(date, "MMMM dd, yyyy");
    }
  }

  const isEn = locale === "en";

  const pathname = usePathname();

  const blogUrl = `${window.location.origin}${pathname}`;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      direction: isEn ? "ltr" : "rtl",
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true }), Fade()],
  );

  const shareLinkData = [
    {
      id: 1,
      name: "facebook",
      link: `https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`,
      media: {
        type: "image",
        path: "/images/share-fb.svg",
        alt: "share-fb",
      },
    },
    {
      id: 2,
      name: "instagram",
      link: "https://www.instagram.com/",
      media: {
        type: "image",
        path: "/images/share-insta.svg",
        alt: "share-insta",
      },
    },
    {
      id: 3,
      name: "linkedin",
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${blogUrl}`,
      media: {
        type: "image",
        path: "/images/share-linkedin.svg",
        alt: "share-linkedin",
      },
    },
  ];

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="w-full block py-[10px] sm:py-[15px] xl:py-[20px] 2xl:py-[30px]">
      <div className="w-full aspect-6/5 sm:aspect-1920/740 overflow-hidden flex items-center relative z-0">
        <div className="w-full absolute -z-1 inset-0">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom">
              {/* {data?.map((item, index) => ( */}
              <div
                className={cn(
                  "flex-[0_0_100%] min-w-0 select-none transition aspect-6/4 sm:aspect-1920/740 bg-black",
                )}
              >
                <picture className="absolute -z-2 inset-0 opacity-95">
                  <source
                    media="(max-width: 640px)"
                    srcSet={data?.media?.mobile?.path}
                  />
                  <Image
                    src={data?.media?.desktop?.path}
                    alt={data?.media?.desktop?.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
                    className="-z-2 object-cover"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                    priority
                  />
                </picture>
              </div>
              {/* ))} */}
            </div>
          </div>
          {/* <div className="flex gap-4 xl:gap-8 absolute z-0 bottom-5 sm:bottom-10 sm:right-[calc((100%-var(--container-sm))/2)] md:right-[calc((100%-var(--container-md))/2)] lg:right-[calc((100%-var(--container-lg))/2)] xl:right-[calc((100%-var(--container-xl))/2)] 2xl:right-[calc((100%-var(--container-2xl))/2)] 3xl:right-[calc((100%-var(--container-3xl))/2)] px-4">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className={navBtnStyle}
            >
              <ChevronLeft className={cn("size-3.5", !isEn && "rotate-180")} />
              <span className="hidded sm:block">Previous </span>
            </PrevButton>
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className={navBtnStyle}
            >
              <span className="hidded sm:block">Next </span>
              <ChevronRight className={cn("size-3.5", !isEn && "rotate-180")} />
            </NextButton>
          </div> */}
        </div>

        <div className="container">
          <div className="w-full xl:max-w-1/2 py-[60px] xl:py-[80px] 2xl:py-[100px]">
            {data?.publishedAt && (
              <Text
                as="div"
                size="text1"
                className="line-clamp-2 font-light text-white mb-2 xl:mb-3"
              >
                {data?.publishedAt}
              </Text>
            )}
            <Heading
              as="h1"
              size="heading1"
              className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-6"
            >
              {parse(isEn ? data?.title : data?.title_ar)}
              <span
                className={cn(
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                  locale === "ar"
                    ? "-translate-x-1 xl:-translate-x-2 "
                    : "translate-x-1 xl:translate-x-2 ",
                )}
              />
            </Heading>
          </div>
        </div>
      </div>
      <div className="w-full py-[15px] sm:py-[20px] xl:py-[30px] 2xl:py-[40px]">
        <div className="container">
          <div className="flex flex-wrap -mx-3 xl:-mx-7 2xl:-mx-9 [&>*]:p-3 xl:[&>*]:p-7 2xl:[&>*]:p-9">
            <div className="w-full lg:w-[calc(100%-368px)] 2xl:w-[calc(100%-540px)] max-lg:mb-5">
              <div dir={locale === "ar" ? "rtl" : "ltr"} className="typography">
                {parse(data?.description)}
              </div>
              <hr className="my-6 xl:my-7 2xl:my-8" />
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2 xl:gap-2 2xl:gap-3">
                    <div className="text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black">
                      {isEn ? "Share" : "يشارك"}
                    </div>
                    {shareLinkData?.map((item, index) => (
                      <div key={"share" + index}>
                        <Button
                          variant="link"
                          size="none"
                          className={"block"}
                          asChild
                        >
                          <a href={item?.link || "#"} target="_blank">
                            <Image
                              src={item?.media?.path}
                              alt={
                                isEn ? item?.media?.alt : item?.media?.alt_ar
                              }
                              width={10}
                              height={10}
                              unoptimized
                              className="w-[13px] xl:w-[13px] 2xl:w-[15px] aspect-square block hover:scale-110 transition"
                            />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex gap-4 xl:gap-8">
                    {data?.prevBlog && (
                      <Link href={`/${locale}/blogs/${data?.prevBlog}`}>
                        <PrevButton
                          onClick={onPrevButtonClick}
                          disabled={!data?.prevBlog}
                          className={cn(navBtnStyle, "text-black")}
                        >
                          <ChevronLeft
                            className={cn(
                              "size-3.5",
                              locale === "ar" && "rotate-180",
                            )}
                          />
                          <span className="hidded sm:block">Previous </span>
                        </PrevButton>
                      </Link>
                    )}
                    {data?.nextBlog && (
                      <Link href={`/${locale}/blogs/${data?.nextBlog}`}>
                        <NextButton
                          onClick={onNextButtonClick}
                          disabled={!data?.nextBlog}
                          className={cn(navBtnStyle, "text-black")}
                        >
                          <span className="hidded sm:block">Next </span>
                          <ChevronRight
                            className={cn(
                              "size-3.5",
                              locale === "ar" && "rotate-180",
                            )}
                          />
                        </NextButton>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {relatedData?.blog?.length > 0 && (
                <BlogRelated locale={locale} data={relatedData} />
              )}
            </div>
            <MediaQuery minWidth={1024}>
              <div className="w-full lg:w-[368px] 2xl:w-[420px]">
                <div className="w-full sticky top-[var(--header-y)]">
                  <Heading
                    as="h2"
                    size="heading2"
                    className="text-black mt-2.5 lg:mt-4 mb-5 xl:mb-7 3xl:mb-9"
                  >
                    {isEn ? popularData?.title : popularData?.title_ar}
                    <span
                      className={cn(
                        "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                        locale === "ar"
                          ? "-translate-x-1 xl:-translate-x-2 "
                          : "translate-x-1 xl:translate-x-2 ",
                      )}
                    />
                  </Heading>

                  {popularData?.blog?.map((item) => {
                    return (
                      <div key={item.id} className="w-full">
                        <Suspense fallback={<p>loading</p>}>
                          <div className="group w-full h-auto flex flex-wrap items-center sm:mb-4 xl:mb-6 3xl:mb-8">
                            <Link
                              href={item?.slug}
                              className="w-20 xl:w-[90px] 2xl:w-[140px] h-20 xl:h-[90px] 2xl:h-[140px] aspect-aquare overflow-hidden border border-gray-100 block"
                            >
                              <Image
                                src={
                                  item?.media?.path || "/images/placeholder.jpg"
                                }
                                alt={
                                  isEn ? item?.media?.alt : item?.media?.alt_ar
                                }
                                width={583}
                                height={290}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </Link>
                            <div
                              className={cn(
                                "flex-1 flex flex-col justify-between",
                                locale === "ar"
                                  ? "pr-3 2xl:pr-4"
                                  : "pl-3 2xl:pl-4",
                              )}
                            >
                              <Heading
                                as="div"
                                size="heading5"
                                className="leading-tight tracking-tight line-clamp-2 text-[#282828]  mb-2 xl:mb-3 2xl:mb-4 hover:underline"
                              >
                                <Link href={item?.slug}>
                                  {isEn ? item?.title : item?.title_ar}
                                </Link>
                              </Heading>
                              <Text
                                as="div"
                                size="text3"
                                className="truncate text-[#b1b3b4]"
                              >
                                {data?.publishedAt}
                              </Text>
                            </div>
                          </div>
                        </Suspense>
                      </div>
                    );
                  })}

                  {popularData?.blog?.length > 3 && (
                    <Button
                      variant="link"
                      size="none"
                      className={
                        "text-[12px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-black"
                      }
                      asChild
                    >
                      <Link href={`/${locale}/blogs`}>
                        {isEn ? "See all" : "شاهد الكل"}
                        <ChevronRight
                          className={cn(
                            "size-3.5",
                            locale === "ar" && "rotate-180",
                          )}
                        />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </MediaQuery>

            <MediaQuery maxWidth={1023}>
              <BlogRelated locale={locale} data={popularData} />
            </MediaQuery>
          </div>
        </div>
      </div>
    </section>
  );
}
