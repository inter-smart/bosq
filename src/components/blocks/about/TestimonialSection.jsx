"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay';

export default function TestimonialSection({ data, locale }) {

    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            axis: 'y',
            align: "start",
            dragFree: false,
            containScroll: false,
            watchSlides: true
        },
        [
            Autoplay({
                delay: 2000,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
            }),
        ]
    )

    return (
        <section className="w-full h-auto py-25 block">
            <div className="container">
                <div className="w-full h-auto px-38 flex items-center">
                    <div className="w-148 h-auto aspect-square relative z-0">
                        <Heading
                            as="h1"
                            size="heading1"
                            className="leading-tight text-right text-[#282828] w-fit h-fit pt-10 m-auto mr-[50%] absolute z-1 inset-0"
                        >
                            {parse(data?.title)}
                            <span
                                className={cn(
                                    "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                                    locale === "ar"
                                        ? "-translate-x-1 xl:-translate-x-2 "
                                        : "translate-x-1 xl:translate-x-2 "
                                )}
                            />
                        </Heading>
                        <div className="w-full h-full absolute -z-1 inset-0 block">
                            <Image
                                src="/images/testimonial-overlay.svg"
                                alt="overlay"
                                width={590}
                                height={610}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                    <div ref={emblaRef}
                        className={cn("max-w-240 h-75 ml-auto translate-x-[-12%] overflow-hidden", locale === "ar" ? "" : "")}>
                        <div className="select-none flex flex-col">
                            {data?.testimonial_list?.map((item) => (
                                <div
                                    key={item?.id}
                                    className="flex-[0_0_100%] mb-5">
                                    <div className="w-full h-full block">
                                        <div className="text-[12px] sm:text-[13px] 2xl:text-[16px] 3xl:text-[18px] leading-[1] font-normal text-[#282828] mb-7.5">{item?.title}</div>
                                        <div className="text-[18px] leading-[1.8] font-light text-[#282828] mb-7.5">{item?.description}</div>
                                        <div className="text-[12px] sm:text-[13px] 2xl:text-[16px] 3xl:text-[18px] leading-[1] font-normal text-[#282828]">{item?.designation}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
