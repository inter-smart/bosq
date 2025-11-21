"use client";
import Image from "next/image";
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

const slideContentVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const titleVariants = {
  initial: {
    opacity: 0,
    y: -40,
    scale: 0.9,
    rotateX: -15,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const descriptionVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
};

const buttonContainerVariants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.4,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function HomeHero({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({ delay: 6000, stopOnInteraction: true, pauseOnHover: true }),
    Fade(),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="w-full h-auto block bg-black relative z-0">
      <div className="w-full max-w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom">
            {data?.map((item, index) => (
              <div
                key={"gallery" + index}
                className="flex-[0_0_100%] min-w-0 select-none relative z-0"
              >
                <div className="w-full h-full bg-linear-to-l from-transparent to-black/20 absolute -z-1 inset-0 " />
                {item?.media?.type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover absolute -z-2 inset-0"
                  >
                    <source src={item?.media?.path} type="video/mp4" />
                  </video>
                ) : (
                  <picture className="absolute -z-2 inset-0">
                    <source
                      media="(max-width: 640px)"
                      srcSet={item?.media?.mobile?.path}
                    />
                    <Image
                      src={item?.media?.desktop?.path}
                      alt={item?.media?.desktop?.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
                      className="-z-2"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                      priority={index === 0}
                    />
                  </picture>
                )}

                <div className="container">
                  <div className="w-full h-[520px] sm:h-[576px] xl:h-screen min-h-[520px] sm:min-h-[468px] xl:min-h-[576px] 2xl:min-h-[768px] 3xl:min-h-[900px] flex items-center py-[calc(30px+var(--header-y))_30px] sm:py-[calc(40px+var(--header-y))_40px] xl:py-[calc(60px+var(--header-y))_60px] 2xl:py-[calc(80px+var(--header-y))_80px]">
                    <div className="w-full xl:max-w-1/2">
                      <Heading
                        as="h1"
                        size="heading1"
                        className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-6"
                      >
                        {parse(item?.title)}
                        <span className="w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 " />
                      </Heading>
                      <Text
                        as="div"
                        size="text1"
                        className="line-clamp-2 font-light text-white max-w-[80%] mb-4 xl:mb-7 2xl:mb-10"
                      >
                        {parse(item?.description)}
                      </Text>
                      <Button
                        variant={"white"}
                        className="min-w-[100px] sm:min-w-[120px] xl:min-w-[135px] 2xl:min-w-40"
                        asChild
                      >
                        <Link href={item?.button?.link}>
                          {item?.button?.label}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="w-[10px] xl:w-[16px] absolute z-1 top-1/2 left-3 -translate-y-1/2 disabled:opacity-50 not-disabled:hover:scale-110"
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
          className="w-[10px] xl:w-[16px] absolute z-1 top-1/2 right-3 -translate-y-1/2 disabled:opacity-50 not-disabled:hover:scale-110"
        >
          <Image
            src="/images/icon-embla-next.svg"
            alt="arrow next"
            width={16}
            height={32}
          />
        </NextButton>
      </div>
    </section>
  );
}
