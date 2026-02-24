"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  DotButton,
  useDotButton,
} from "@/components/utils/embla-carousel-dot-button";

export default function NewsSection({ data, locale }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      axis: "x",
      align: "start",
      dragFree: false,
      containScroll: false,
      watchSlides: true,
      direction: locale === "ar" ? "rtl" : "ltr",
    },
    [
      Autoplay({
        delay: 2500,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <section id="news" className="w-full h-auto py-10 sm:py-20 lg:py-25 2xl:py-30 3xl:py-38 block">
      <div className="container">
        <div className="mb-5 lg:mb-7 2xl:mb-10 flex items-center">
          <div className="w-1/2">
            <Heading
              as="h1"
              size="heading1"
              className="leading-tight text-[#282828]"
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
          </div>
          <div className="w-1/2 flex justify-end">
            <Button
              variant={"black"}
              className="min-w-[100px] sm:min-w-[120px] xl:min-w-[135px] 2xl:min-w-40 mb-0"
              asChild
            >
              <Link href={"/news"}>
                {locale == "ar" ? "قراءة المزيد" : "View All"}
              </Link>
            </Button>
          </div>
        </div>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="select-none flex">
            {data?.list?.map((item) => (
              <div
                key={item?.id}
                className="flex-[0_0_100%] 3xs:flex-[0_0_46%] lg:flex-[0_0_28%] mr-5 sm:mr-15 lg:mr-20 xl:mr-23 2xl:mr-30 3xl:mr-35"
              >
                <Link
                  href={`/${locale}/news/${item?.slug}` || "/"}
                  target={item?.lnik?.target ? "_blank" : "_self"}
                  className="group w-full h-full block"
                >
                  <div className="w-full h-auto aspect-[500/440] mb-5 2xl:mb-7.5 overflow-hidden block">
                    <Image
                      src={item?.media?.path}
                      alt={item?.media?.alt}
                      width={500}
                      height={440}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      quality={90}
                    />
                  </div>
                  <div className="w-full h-auto">
                    <div className="[&_div]:text-[13px] lg:[&_div]:text-[14px] 2xl:[&_div]:text-[16px] 3xl:[&_div]:text-[18px] [&_div]:leading-[1.2] [&_div]:font-light [&_div]:text-[#B1B2B4] mb-2.5 2xl:mb-3.5 flex flex-wrap items-center gap-4">
                      <div
                        className={cn(
                          "relative z-0 before:content-[''] before:w-4.5 2xl:before:w-7 before:h-[2px] 2xl:before:h-[3px] before:my-auto before:bg-[#B1B2B4] before:absolute before:z-1",
                          locale === "ar"
                            ? "pr-7 2xl:pr-10 before:inset-[0_0_0_auto]"
                            : "pl-7 2xl:pl-10 before:inset-[0_auto_0_0]",
                        )}
                      >
                        {item?.name}
                      </div>
                      <div
                        className={cn(
                          "relative z-0 before:content-[''] before:w-1.5 2xl:before:w-2 before:h-1.5 2xl:before:h-2 before:my-auto before:bg-[#B1B2B4] before:rounded-full before:absolute before:z-1",
                          locale === "ar"
                            ? "pr-3 2xl:pr-5 before:inset-[0_0_0_auto]"
                            : "pl-3 2xl:pl-5 before:inset-[0_auto_0_0]",
                        )}
                      >
                        {item?.date}
                      </div>
                    </div>
                    <div
                      className={cn(
                        "text-[14px] sm:text-[16px] lg:text-[20px] 2xl:text-[24px] 3xl:text-[30px] leading-[1.4] font-light text-[#282828]",
                        locale === "ar" ? "xl:pr-7 2xl:pr-10" : "xl:pl-7 2xl:pl-10",
                      )}
                    >
                      {item?.title}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-15 xl:mt-20 gap-2 2xl:gap-3">
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
    </section>
  );
}
