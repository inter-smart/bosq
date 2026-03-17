"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ChairSlider from "./ChairSlider";

export default function ChairsListing({ data, locale = "en" }) {
  const isEn = locale === "en";

  if (!data) return null;

  const products = data?.product || data?.products || [];
  if (!products.length) return null;

  const description = isEn ? data?.description : data?.description_ar;
  const features = (isEn ? data?.features : data?.features_ar) || [];
  const ctaLabel = isEn ? data?.cta?.label : data?.cta?.label_ar;
  const ctaHref = data?.cta?.href || "#";

  const heroImage = data?.heroImage || "/images/officerchair-hero.jpg";
  const heroTitle = isEn ? data?.heroTitle : data?.heroTitle_ar;

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
            <p className="text-white text-2xl sm:text-3xl font-light flex items-center gap-2">
              {heroTitle || "Task Chairs"}
              <span className="h-2.5 w-2.5 rounded-full bg-[#f17423]" />
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-7 lg:gap-12">

          {/* LEFT */}
          <div className="w-full lg:w-[552px] shrink-0 space-y-4">
            {description && (
              <p className="text-sm sm:text-base text-[#282828]">
                {description}
              </p>
            )}

            {features.length > 0 && (
              <ul className="space-y-2 text-sm sm:text-base text-[#282828]">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#282828]" />
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

          {/* RIGHT (empty for now) */}
          <div className="w-full lg:w-[calc(100%-552px)]" >
            <ChairSlider locale={locale} data={products} />
          </div>
        </div>
      </div>
    </section>
  );
}