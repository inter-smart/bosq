"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";

export default function ChairsListing({ data, locale = "en" }) {
  const isEn = locale === "en";

  const chairs = data?.coupons || [];
  const description = isEn ? data?.description : data?.description_ar;
  const features = (isEn ? data?.features : data?.features_ar) || [];
  const ctaLabel = isEn ? data?.cta?.label : data?.cta?.label_ar;
  const ctaHref = data?.cta?.href || "#";

  const heroImage = data?.heroImage || "/images/officerchair-hero.jpg";
  const heroTitle = isEn ? data?.heroTitle : data?.heroTitle_ar;

  const fallbackImage = "/images/officerchair-hero.jpg";

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    direction: locale === "ar" ? "rtl" : "ltr",
  });

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setPrevDisabled(!emblaApi.canScrollPrev());
      setNextDisabled(!emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!chairs.length) return null;

  return (
    <section className="w-full py-6 sm:py-8 lg:py-12 bg-white">
      <div className="container">

        {/* HERO */}
        <div className="w-full aspect-[1791/504] relative mb-8 overflow-hidden rounded-lg">
          <Image
            src={heroImage}
            alt={heroTitle || "Task Chairs"}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/0" />

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
            <p className="text-white text-2xl sm:text-3xl font-light tracking-wide flex items-center gap-2">
              {heroTitle || (isEn ? "Task Chairs" : "كراسي المهام")}
              <span className="h-2.5 w-2.5 rounded-full bg-[#f17423]" />
            </p>
          </div>
        </div>

        {/* CONTENT + SLIDER */}
        <div className="grid gap-7 lg:gap-12 lg:grid-cols-[minmax(320px,420px)_1fr] items-start">

          {/* LEFT CONTENT */}
          <div className="space-y-4 lg:space-y-5">

            {description && (
              <p className="text-sm sm:text-base text-[#282828] leading-relaxed">
                {description}
              </p>
            )}

            {features.length > 0 && (
              <ul className="space-y-2 text-sm sm:text-base text-[#282828]">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-[#f17423]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {ctaLabel && (
              <Button asChild variant="black">
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            )}

          </div>

          {/* SLIDER */}
          <div className="relative min-w-0">

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">

                {chairs.map((item) => {
                  const imageSrc = item?.chairImage || fallbackImage;

                  return (
                    <div
                      key={item?.id || item?.title}
                      className="flex-[0_0_260px] sm:flex-[0_0_280px] lg:flex-[0_0_300px] min-w-0 px-2"
                    >
                      <div className="flex flex-col h-full border border-[#e9e9e9] rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition">

                        <div className="relative h-[220px] bg-[#f7f7f7]">
                          <Image
                            src={imageSrc}
                            alt={item?.title || "Chair"}
                            fill
                            sizes="300px"
                            className="object-contain p-4"
                          />
                        </div>

                        <div className="p-4 flex flex-col gap-1 flex-1">

                          <p className="text-xs text-[#777] uppercase">
                            {isEn ? "Office Chair" : "كرسي مكتب"}
                          </p>

                          <h3 className="text-sm font-medium text-[#1e1e1e] line-clamp-2">
                            {isEn ? item?.title : item?.title_ar || item?.title}
                          </h3>

                          {item?.price && (
                            <p className="text-sm font-semibold text-[#000]">
                              {item.price}
                            </p>
                          )}

                          {item?.href && (
                            <Link
                              href={item.href}
                              className="text-[13px] text-[#6c6c6c] underline mt-1"
                            >
                              {isEn ? "View Product" : "عرض المنتج"}
                            </Link>
                          )}

                        </div>

                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* NAVIGATION */}
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1">

              <button
                onClick={scrollPrev}
                disabled={prevDisabled}
                className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white border rounded-full shadow disabled:opacity-40"
              >
                ‹
              </button>

              <button
                onClick={scrollNext}
                disabled={nextDisabled}
                className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-white border rounded-full shadow disabled:opacity-40"
              >
                ›
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}