import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Text } from "@/components/utils/text";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";  

export default function AboutBannerSection({ data, locale }) {
    return (
        <section className="w-full h-auto lg:py-[20px_35px] 3xl:py-[30px_50px] block"> 
            <div className="w-full aspect-6/5 sm:aspect-1920/740 overflow-hidden flex items-center relative z-0">
                {data?.media?.type === "image" ? ( 
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
                ) : (
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover absolute -z-2 inset-0">
                        <source src={data?.media?.path} type="video/mp4" />
                    </video>
                )}
                <div className="container">
                    <div className="w-full xl:max-w-1/2 py-15 xl:py-20 2xl:py-25">
                        <Heading
                            as="h1"
                            size="heading1"
                            className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-7.5"
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
                        <Text
                            as="div"
                            size="text1"
                            className="line-clamp-2 font-light text-white max-w-[80%] mb-4 xl:mb-7 2xl:mb-10"
                        >
                            {parse(data?.description)}
                        </Text>
                        <Button
                            variant={"white"}
                            className="min-w-0 px-7"
                            asChild
                        >
                            <Link href={data?.button?.link}>
                                {data?.button?.label}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
