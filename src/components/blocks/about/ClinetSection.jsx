"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay';

export default function ClinetSection({ data, locale }) {

    const isEn = locale === "en";

    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            axis: 'x',
            align: "start",
            dragFree: true,
            containScroll: false,
            watchSlides: true,
            direction: locale === "ar" ? "rtl" : "ltr"
        },
        [
            Autoplay({
                delay: 2500,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
            }),
        ]
    )
    return (
        <section className="w-full h-auto py-10 sm:py-12 lg:py-17 2xl:py-20 bg-[#F4F4F4] block">
            <div className="container">
                <Heading
                    as="h1"
                    size="heading1"
                    className="leading-tight text-[#282828] mb-3 lg:mb-5"
                >
                    {parse(isEn?data?.title: data?.title_ar)}
                    <span
                        className={cn(
                            "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                            locale === "ar"
                                ? "-translate-x-1 xl:-translate-x-2 "
                                : "translate-x-1 xl:translate-x-2 "
                        )}
                    />
                </Heading>
                <div ref={emblaRef}
                    className="overflow-hidden">
                    <div className="w-full h-full select-none flex">
                        {data?.list?.reduce((acc, _, index, arr) => {
                            if (index % 2 === 0) acc.push(arr.slice(index, index + 2))
                            return acc
                        }, [])
                            .map((items, index) => (
                                <div
                                    key={index}
                                    className="flex-[0_0_50%] sm:flex-[0_0_25%] lg:flex-[0_0_16.67%]">
                                    <div className="grid grid-rows-2">
                                        {items.map((item) => (
                                            <div
                                                key={item?.id}
                                                className="w-full h-full p-[25px_20px] sm:p-[30px_40px] lg:p-[40px] 2xl:p-[40px_50px] 3xl:p-[55px_60px] border border-[#B1B2B4]/10 grayscale hover:grayscale-0 hover:bg-white transition duration-300">
                                                <div className="w-20 sm:w-25 2xl:w-30 3xl:w-40 h-auto aspect-[200/80] m-auto overflow-hidden flex items-center justify-center">
                                                    <Image
                                                        src={item?.media?.path}
                                                        alt={isEn? item?.media?.alt: item?.media?.alt_ar}
                                                        width={160}
                                                        height={70}
                                                        className="w-full h-full object-contain"
                                                      quality={90}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
