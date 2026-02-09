"use client";
import { Heading } from "@/components/utils/heading";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import ProjectCard from "./project-card";

export default function ProjectSpecialized({ locale, data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start", direction: locale === "ar" ? "rtl" : "ltr" },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );
  
  const isEN = locale === "en";


  return (
    <section className="w-full block py-8 sm:py-15 xl:py-20 2xl:py-32">
      <div
        className={cn(
          "container",
          locale === "ar"
            ? "max-sm:mask-[linear-gradient(to_left,white_0%,white_98%,transparent_100%)] max-sm:pl-0"
            : "max-sm:mask-[linear-gradient(to_right,white_0%,white_98%,transparent_100%)] max-sm:pr-0"
        )}
      >
        <Heading
          as="h2"
          size="heading1"
          className="line-clamp-2 text-black mb-2 xl:mb-6 2xl:mb-10"
        >
          {parse(isEN? data?.title : data?.title_ar)}
          <span
            className={cn(
              "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
              locale === "ar"
                ? "-translate-x-1 xl:-translate-x-2 "
                : "translate-x-1 xl:translate-x-2 "
            )}
          />
        </Heading>
        <div className="w-full max-w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom -mx-1 sm:-mx-1.5 xl:-mx-2 2xl:-mx-2.5 *:p-1 sm:*:p-1.5 xl:*:p-2 2xl:*:p-2.5">
              {data?.items?.map((item, index) => (
                <div
                  key={"items" + index}
                  className="flex-[0_0_176px] sm:flex-[0_0_33.333%] min-w-0 select-none"
                >
                  <ProjectCard data={item} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
