import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";

export default function ErgonomicChairSection({ data, locale }) {
    return (
        <section className="w-full h-auto py-[10px_40px] sm:py-[10px_50px] lg:py-[20px_70px] 2xl:py-[30px_90px] block">
            <div className="w-full aspect-6/5 sm:aspect-1920/740 overflow-hidden flex items-center relative z-0">
                <picture className="absolute -z-2 inset-0 opacity-95">
                    <source
                        media="(max-width: 640px)"
                        srcSet={data?.media?.mobilePath}
                    />
                    <Image
                        src={data?.media?.desktopPath}
                        alt={data?.media?.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
                        className="-z-2 object-cover"
                        placeholder="blur"
                        blurDataURL="/images/placeholder.jpg"
                    />
                </picture>
                <div className="container">
                    <div className="w-full xl:max-w-1/2 py-15 xl:py-20 2xl:py-25">
                        <Heading
                            as="h1"
                            size="heading1"
                            className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-6"
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
                    </div>
                </div>
            </div>
            <div className="container pt-7 sm:pt-10 lg:pt-17 2xl:pt-20 3xl:pt-25">
                {data?.chair_info_list?.map((item) => (
                    <div
                        key={item.id}
                        className="w-full h-auto py-2.5 sm:py-5 lg:py-8 2xl:py-10 3xl:py-12 first:pt-0 last:pb-0 block"
                    >
                        <div className={cn("w-full h-auto md:[&>div]:px-5 2xl:[&>div]:px-7 md:-mx-5 2xl:-mx-7 flex flex-wrap md:flex-row items-center", item?.id % 2 === 0 && "md:flex-row-reverse")}>
                            <div className="w-full md:w-1/2 max-sm:mb-2.5 max-md:mb-5">
                                <div className="w-full h-auto py-7.5 bg-[#F4F4F4] relative z-0">
                                    <div className="w-35 sm:w-45 lg:w-52 2xl:w-65 3xl:w-80 h-auto aspect-square m-auto overflow-hidden block">
                                        <Image
                                            src={item?.media?.path || "/images/placeholder.jpg"}
                                            alt={item?.media?.alt || "ergonomic-chair-guide"}
                                            width={735}
                                            height={355}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className={cn("text-[35px] sm:text-[45px] lg:text-[65px] 2xl:text-[80px] 3xl:text-[100px] leading-1 font-bold text-[#282828] mx-8 lg:mx-12 2xl:mx-15 3xl:mx-20 opacity-[0.1] absolute z-1 inset-[0_auto_0_0] flex items-center", item?.id % 2 === 0 && "inset-[0_0_0_auto]")}>{String(item?.id).padStart(2, "0")}</div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="w-full h-auto">
                                    <Heading
                                        as="h2"
                                        size="heading1"
                                        className="line-clamp-2 text-black mb-4 sm:mb-5 2xl:mb-7.5 3xl:mb-8.5"
                                    >
                                        {parse(item?.title)}
                                        <span
                                            className={cn(
                                                "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                                                locale === "ar"
                                                    ? "-translate-x-1 xl:-translate-x-2 "
                                                    : "translate-x-1 xl:translate-x-2 "
                                            )}
                                        />
                                    </Heading>
                                    <div
                                        dir={locale === "ar" ? "rtl" : "ltr"}
                                        className={cn("typography", "[--text-color:#282828]",
                                        )}
                                    >
                                        {parse(item?.description)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
