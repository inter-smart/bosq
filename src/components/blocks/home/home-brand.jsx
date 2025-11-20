"use client";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";
import parse from "html-react-parser";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import { cn } from "@/lib/utils";

export default function HomeBrand({ data }) {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "center" }, [
    ClassNames(),
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  ]);

  return (
    <section className="w-full h-auto block py-[30px_40px] sm:py-[40px_60px] xl:py-[60px_100px] 2xl:py-[80px_120px] overflow-hidden">
      <div className="container">
        <Heading
          as="h2"
          size="heading1"
          className="line-clamp-2 text-black mb-4 xl:mb-8 2xl:mb-10"
        >
          {parse(data?.title)}
          <span className="text-[#f17423]">.</span>
        </Heading>
        <div className="w-full max-w-full xl:max-w-[1040px] 2xl:max-w-[1260px] 3xl:max-w-[1620px] mx-auto">
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex items-center touch-pan-y touch-pinch-zoom -mx-3 xl:-mx-6">
              {data?.brand?.map((item, index) => (
                <div
                  key={"brand" + index}
                  className={cn(
                    "flex-[0_0_14.285%] min-w-0 px-3 sm:px-6 select-none transition",
                    "not-[.is-in-view]:opacity-50 not-[.is-in-view]:scale-80"
                  )}
                >
                  <div className="w-full aspect-160/55">
                    <Image
                      src={item?.media?.path}
                      alt={item?.media?.alt}
                      width={160}
                      height={65}
                      className="w-full h-full object-contain block"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
