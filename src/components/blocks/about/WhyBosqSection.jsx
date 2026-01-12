import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Text } from "@/components/utils/text";
import { Heading } from "@/components/utils/heading";

export default function WhyBosqSection({ data, locale }) {

    const isEn = locale === "en";

    return (
        <section className="w-full h-auto py-[40px_50px] sm:py-[50px_70px] lg:py-[60px_90px] 2xl:py-[80px_110px] 3xl:py-[100px_135px] bg-[#F4F4F4] block">
            <div className="container">
                <div className="w-full h-auto mb-7 sm:mb-10 lg:mb-15 2xl:mb-18 3xl:mb-25">
                    <Heading
                        as="h1"
                        size="heading1"
                        className="leading-tight text-[#282828] mb-2 sm:mb-3 lg:mb-4"
                    >
                        {parse(isEn? data?.title : data?.title_ar)}
                        <span
                            className={cn(
                                "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                                locale === "ar"
                                    ? "-translate-x-1 xl:-translate-x-2 "
                                    : "translate-x-1 xl:translate-x-2 "
                            )}
                        />
                    </Heading>
                    <Text
                        as="div"
                        size="text1"
                        className="font-light text-[#282828]"
                    >
                        {parse(isEn? data?.description: data?.description_ar)}
                    </Text>
                </div>
                <div className="w-full h-auto block">
                    {data?.bosqList?.map((item) => (
                        <div
                            key={item?.id}
                            className="w-full h-full mb-8 sm:mb-10 lg:mb-15 xl:mb-18 2xl:mb-22 3xl:mb-28 last:mb-0 block"
                        >
                            <div className={cn("w-full h-auto flex flex-wrap items-center", item?.id % 2 === 0 && "flex-row-reverse")}>
                                <div className={cn("w-full lg:w-1/2 max-lg:mb-5",
                                    locale === "ar"
                                        ? item?.id % 2 === 0 ? "lg:pr-12 2xl:pr-15 3xl:pr-20" : "lg:pl-12 2xl:pl-15 3xl:pl-20"
                                        : item?.id % 2 === 0 ? "lg:pl-12 2xl:pl-15 3xl:pl-20" : "lg:pr-12 2xl:pr-15 3xl:pr-20"
                                )}>
                                    <div className="w-full h-auto aspect-[1.951] overflow-hidden block">
                                        <Image
                                            src={item?.media.path}
                                            alt={isEn? item?.media.alt: item?.media.alt_ar}
                                            width={810}
                                            height={420}
                                            className="w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-in-out"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <div className="w-full h-auto mb-4 sm:mb-5 lg:mb-6 3xl:mb-8">
                                        <div className="w-8 sm:w-10 2xl:w-12.5 3xl:w-15 h-auto aspect-square mb-3 sm:mb-4 lg:mb-5 3xl:mb-6.5 overflow-hidden flex items-center justify-center">
                                            <Image
                                                src={item?.icon?.path}
                                                alt={isEn? item?.icon?.alt: item?.icon?.alt_ar}
                                                width={60}
                                                height={60}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="text-[16px] 2xl:text-[20px] 3xl:text-[25px] leading-[1.2] font-normal text-[#282828] mb-2">{isEn? item?.title: item?.title_ar}</div>
                                        <div className="txet-[13px] 2xl:txet-[15px] 3xl:txet-[18px] leading-[1.2] font-normal text-[#282828]">{isEn? item?.caption: item?.caption_ar}</div>
                                    </div>
                                    <div
                                        dir={locale === "ar" ? "rtl" : "ltr"}
                                        className={cn("typography sm:[&_p,li]:text-[13px] 2xl:[&_p,li]:text-[15px] 3xl:[&_p,li]:text-[18px] [&_p,li]:leading-[1.8] lg:[&_li]:mb-2 2xl:[&_li]:mb-3 3xl:[&_li]:mb-5 2xl:[&_p]:mb-5 3xl:[&_p]:mb-8", "[--text-color:#282828]", locale === "ar" ? "[&_ul]:pr-4 sm:[&_ul]:pr-5 pl-0" : "[&_ul]:pl-4 sm:[&_ul]:pl-5"
                                        )}
                                    >
                                        {parse(isEn? item?.description: item?.description_ar)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}
