"use client";
import { useMemo, useState, useEffect } from "react";
import Image from "@/components/utils/custom-image";
import Link from "next/link";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Fade from "embla-carousel-fade";

import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";

import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/components/utils/embla-carousel-arrow-button";
import { cn } from "@/lib/utils";
import { getExternalLink, getTarget } from "@/lib/helper";

export default function HomeHero({ data, locale }) {
  const isEn = locale === "en";
  const [emblaReady, setEmblaReady] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, direction: !isEn ? "rtl" : "ltr" },
    [
      Autoplay({ delay: 6000, stopOnInteraction: true, pauseOnHover: true }),
      Fade(),
    ],
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;
    setEmblaReady(true);
  }, [emblaApi]);

  const parsedSlides = useMemo(
    () =>
      data?.map((item) => ({
        ...item,
        parsedTitle: parse(isEn ? (item?.title ?? "") : (item?.title_ar ?? "")),
        parsedDesc: parse(
          isEn ? (item?.description ?? "") : (item?.description_ar ?? ""),
        ),
      })),
    [data, isEn],
  );

  return (
    <section className="w-full h-auto block bg-black relative z-0">
      <div className="w-full max-w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom">
            {parsedSlides?.map((item, index) => (
              <div
                key={"gallery" + index}
                className="flex-[0_0_100%] min-w-0 select-none relative z-0"
                style={!emblaReady && index === 0 ? { opacity: 1 } : undefined}
              >
                <div
                  className={cn(
                    "w-full h-full from-transparent to-black/40 absolute -z-1 inset-0 ",
                    !isEn ? "bg-linear-to-r" : "bg-linear-to-l",
                  )}
                />
                {item?.media_type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload={index === 0 ? "auto" : "none"} // lazy load others
                    // fetchPriority={index === 0 ? "high" : "auto"}
                    className="w-full h-full object-cover absolute -z-2 inset-0"
                  >
                    <source
                      src={
                        isEn
                          ? item?.media?.desktop?.path
                          : item?.media?.desktop?.path_ar
                      }
                      type="video/mp4"
                    />
                  </video>
                ) : item?.media?.mobile?.path ||
                  item?.media?.mobile?.path_ar ? (
                  <>
                    <div className="absolute -z-2 inset-0 sm:hidden">
                      <Image
                        src={
                          (isEn
                            ? item?.media?.mobile?.path
                            : item?.media?.mobile?.path_ar) ||
                          "/images/placeholder.png"
                        }
                        alt={
                          (isEn ? item?.media_alt : item?.media_alt_ar) ??
                          "slider image"
                        }
                        fill
                        // fetchPriority={index === 0 ? "high" : "auto"}
                        title={
                          (isEn ? item?.media_alt : item?.media_alt_ar) ??
                          "slider image"
                        }
                        sizes="100vw"
                        className="object-cover"
                        priority={index === 0}
                        quality={90}
                      />
                    </div>
                    <div className="absolute -z-2 inset-0 max-sm:hidden">
                      <Image
                        src={
                          (isEn
                            ? item?.media?.desktop?.path
                            : item?.media?.desktop?.path_ar) ||
                          "/images/placeholder.png"
                        }
                        alt={
                          (isEn ? item?.media_alt : item?.media_alt_ar) ??
                          "slider image"
                        }
                        title={
                          (isEn ? item?.media_alt : item?.media_alt_ar) ??
                          "slider image"
                        }
                        fill
                        sizes="(max-width: 1200px) 100vw, 80vw"
                        className="object-cover"
                        priority={index === 0}
                        quality={90}
                      />
                    </div>
                  </>
                ) : (
                  <div className="absolute -z-2 inset-0">
                    <Image
                      src={
                        (isEn
                          ? item?.media?.desktop?.path
                          : item?.media?.desktop?.path_ar) ||
                        "/images/placeholder.png"
                      }
                      alt={isEn ? item?.media_alt : item?.media_alt_ar}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 80vw"
                      className="object-cover"
                      priority={index === 0}
                      quality={90}
                    />
                  </div>
                )}

                <div className="container">
                  <div className="w-full h-[468px] sm:h-[576px] xl:h-screen min-h-[468px] sm:min-h-[468px] xl:min-h-[576px] 2xl:min-h-[768px] 3xl:min-h-[900px] flex items-center py-[calc(30px+var(--header-y))_30px] sm:py-[calc(40px+var(--header-y))_40px] xl:py-[calc(60px+var(--header-y))_60px] 2xl:py-[calc(80px+var(--header-y))_80px]">
                    <div className="w-full xl:max-w-1/2 max-lg:px-4">
                      <Heading
                        as="h1"
                        size="heading1"
                        className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-6"
                      >
                        {item.parsedTitle}
                        <span
                          className={cn(
                            "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                            !isEn
                              ? "-translate-x-1 xl:-translate-x-2 "
                              : "translate-x-1 xl:translate-x-2 ",
                          )}
                        />
                      </Heading>
                      <Text
                        as="div"
                        size="text1"
                        className="line-clamp-2 font-light text-white max-w-[80%] mb-4 xl:mb-7 2xl:mb-10"
                      >
                        {item.parsedDesc}
                      </Text>
                      <Button
                        variant={"white"}
                        className="min-w-[100px] sm:min-w-[120px] xl:min-w-[135px] 2xl:min-w-40"
                        asChild
                      >
                        {/* implement external url  */}
                        <Link
                          href={getExternalLink(item?.button?.link)}
                          target={getTarget(item?.button?.link)}
                        >
                          {isEn ? item?.button?.label : item?.button?.label_ar}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {data && data?.length > 1 && (
          <div>
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              className="w-[10px] xl:w-[12px] 2xl:w-[15px] absolute z-1 top-1/2 left-4 -translate-y-1/2 disabled:opacity-50 not-disabled:hover:scale-110"
            >
              <Image
                src="/images/icon-embla-prev.svg"
                alt="arrow prev"
                width={16}
                height={32}
                quality={90}
              />
            </PrevButton>
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              className="w-[10px] xl:w-[12px] 2xl:w-[15px] absolute z-1 top-1/2 right-4 -translate-y-1/2 disabled:opacity-50 not-disabled:hover:scale-110"
            >
              <Image
                src="/images/icon-embla-next.svg"
                alt="arrow next"
                width={16}
                height={32}
                quality={90}
              />
            </NextButton>
          </div>
        )}
      </div>
    </section>
  );
}
