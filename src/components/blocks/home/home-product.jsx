"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "@/components/utils/embla-carousel-arrow-button";

export default function HomeProduct({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start" },
    [
      // Autoplay({ delay: 3000, stopOnInteraction: true }),
    ]
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="w-full h-auto block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[80px]">
      <div className="container">
        <Heading
          as="h1"
          size="heading1"
          className="line-clamp-2 text-black mb-2 xl:mb-4 2xl:mb-6"
        >
          {parse(data?.title)}
          <span className="text-[#f17423]">.</span>
        </Heading>
        <div className="w-full max-w-full relative z-0">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y touch-pinch-zoom -mx-1">
              {data?.product?.map((item, index) => (
                <div
                  key={"product" + index}
                  className="flex-[0_0_25%] min-w-0 px-1 select-none"
                >
                  <div className="w-full h-auto block">
                    <div className="w-full aspect-440/576 overflow-hidden mb-3 xl:mb-7">
                      <Image
                        src={item?.media?.path}
                        alt={item?.media?.alt}
                        width={308}
                        height={517}
                        className="w-full h-full object-cover hover:scale-110 transition duration-300"
                      />
                    </div>
                    <div className="w-full">
                      <Heading
                        as="div"
                        size="heading3"
                        className="font-normal capitalize text-[#282828]"
                      >
                        {parse(item?.name)}
                      </Heading>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="absolute z-1 top-1/2 left-3 -translate-y-1/2 disabled:opacity-50"
          >
            <Image
              src="/images/icon-embla-prev.svg"
              alt="arrow prev"
              width={16}
              height={32}
            />
          </PrevButton>
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="absolute z-1 top-1/2 right-3 -translate-y-1/2 disabled:opacity-50"
          >
            <Image
              src="/images/icon-embla-next.svg"
              alt="arrow next"
              width={16}
              height={32}
            />
          </NextButton>
        </div>
      </div>
    </section>
  );
}
