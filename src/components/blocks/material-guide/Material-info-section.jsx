import Image from "next/image";
import { Heading } from "@/components/utils/heading";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";


export default function MaterialInfoSection({ data, locale }) {
    return (
        <section className="w-full h-auto block">
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
                    <div className="w-full xl:max-w-1/2 py-[60px] xl:py-[80px] 2xl:py-[100px]">
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
            <div className="container">
                <div className="w-full h-auto block">
                    {data?.items?.map((item) => (
                        <div
                            key={item?.id}
                            className="w-full h-auto block"
                        >
                            <Heading
                                as="h2"
                                size="heading1"
                                className="line-clamp-2 text-black mb-2 xl:mb-4 2xl:mb-6"
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
                            <div className="w-full h-auto block">
                                {item?.info_list?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`[--width:760px] w-full h-auto mb-[160px] last:mb-0 flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                                    >
                                        <div className={`w-[calc(100%-var(--width))] [--gap:125px] ${index % 2 === 0 ? "pr-[var(--gap)]" : "pl-[var(--gap)]"}`}>
                                            {item?.title && (
                                                <Heading
                                                    as="h2"
                                                    size="heading6"
                                                    className="text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
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
                                                    &nbsp;
                                                </Heading>
                                            )}
                                            {item?.description && (
                                                <div
                                                    dir={locale === "ar" ? "rtl" : "ltr"}
                                                    className={cn("typography [&_ul]:pl-0 [&_li]:pl-[20px] [&_li]:list-none [&_li]:relative [&_li]:z-0 [&_li::before]:content-[''] [&_li::before]:absolute [&_li::before]:z-1 [&_li::before]:inset-[0_auto_0_0] [&_li::before]:w-[10px] [&_li::before]:h-auto [&_li::before]:aspect-[10/5] [&_li::before]:bg-[url('/images/li-before-arrow.svg')] [&_li::before]:bg-no-repeat [&_li::before]:bg-contain] [&_span]:font-medium", "[--text-color:#282828]")}
                                                >
                                                    {parse(item?.description)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-[var(--width)]">
                                            <div className="w-full h-full min-h-[190px] max-h-[630] overflow-hidden block">
                                                <Image
                                                    src={item?.media?.path}
                                                    alt={item?.media?.alt}
                                                    width={760}
                                                    height={630}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
