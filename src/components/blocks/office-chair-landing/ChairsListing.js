"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ChairSlider from "./ChairSlider";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";

export default function ChairsListing({ data, locale = "en" }) {
  const isEn = locale === "en";

  if (!data) return null;

  const products = data?.product || data?.products || [];
  if (!products.length) return null;

  const description = isEn ? data?.description : data?.description_ar;
  const features = (isEn ? data?.features : data?.features_ar) || [];
  const ctaLabel = isEn ? data?.cta?.label : data?.cta?.label_ar;
  const ctaHref = data?.cta?.href || "#";

  console.log("ctaLabel", ctaLabel)

  const heroImage = data?.heroImage || "/images/officerchair-hero.jpg";
  const heroTitle = isEn ? data?.heroTitle : data?.heroTitle_ar;

  return (
    <section className="w-full py-6 sm:py-[45px] xl:py-[55px] 2xl:py-[85px] bg-white">
      <div className="container">
        {/* HERO */}
        <div className="w-full max-sm:h-[250px] aspect-[1791/504] relative mb-8 overflow-hidden rounded-[4px]">
          <Image
            src={heroImage}
            alt={heroTitle || "Task Chairs"}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="absolute bottom-[20px] xl:bottom-[40px] 2xl:bottom-[60px] left-[15px] xl:left-[30px] 2xl:left-[40px]">
            <Heading
              as="h1"
              size="heading1"
              className="line-clamp-4 leading-tight text-white mb-0"
            >
              {parse(heroTitle || "Task Chairs")}
              <span
                className={cn(
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                  locale === "ar" ? "mr-1 xl:mr-2" : "ml-1 xl:ml-2",
                )}
              />
            </Heading>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-7 lg:gap-12 xl:gap-7 2xl:gap-20">
          {/* LEFT */}
          <div className="w-full lg:w-[425px] 2xl:w-[652px]">
            {description && (
              <div
                className={cn(
                  "typography sm:text-[13px] 2xl:text-[15px] 3xl:text-[18px] sm:[&_p,li]:text-[13px] 2xl:[&_p,li]:text-[15px] 3xl:[&_p,li]:text-[18px] [&_p,li]:leading-[1.8] lg:[&_li]:mb-2 2xl:[&_li]:mb-3 3xl:[&_li]:mb-5 2xl:[&_p]:mb-5 3xl:[&_p]:mb-8",
                )}
              >
                {parse(description)}
              </div>
            )}

            {features.length > 0 && (
              <div className="typography text-[#282828] [&_ul]:ml-[20px] [&_ul]:my-0 [&_li]:leading-[1.2] sm:[&_li]:text-[13px] 2xl:[&_li]:text-[15px] 3xl:[&_li]:text-[18px] [&_li]:mb-2 2xl:[&_li]:mb-3 3xl:[&_li]:mb-5 mt-4">
                <div>{parse(features)}</div>
              </div>
            )}

              <Button
                asChild
                variant="black"
                className="min-w-[120px] sm:min-w-[120px] xl:min-w-[145px] 2xl:min-w-[218px] mt-[15px] xl:mt-[20px] 2xl:mt-[35px]"
              >
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
          </div>

          {/* RIGHT (empty for now) */}
          <div className="w-full lg:w-[calc(100%-425px)] 2xl:w-[calc(100%-652px)]">
            <ChairSlider locale={locale} data={products} />
          </div>
        </div>
      </div>
    </section>
  );
}
