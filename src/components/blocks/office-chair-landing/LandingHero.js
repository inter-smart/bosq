import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";

export default function LandingHero({ data, locale, slug }) {
  const isEn = locale === "en";

  return (
    <section className="w-full pt-[calc(var(--header-y)_+_20px)] sm:pt-[calc(var(--header-y)_+_10px)] relative">
      <div className="container mb-3 xl:mb-5 2xl:mb-8">
        <Breadcrumb className="mb-1 xl:mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={isEn ? "/en" : "/ar"}>
                {isEn ? "Home" : "الرئيسية"}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            {slug && (
              <BreadcrumbItem>
                <BreadcrumbPage className={"capitalize"}>{slug}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        {(isEn ? data?.title : data?.title_ar) && (
          <Heading as="h2" size="heading1" className="line-clamp-2 text-black">
            {parse(isEn ? data?.title : data?.title_ar)}
            <span
              className={cn(
                "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2",
                !isEn
                  ? "-translate-x-1 xl:-translate-x-2"
                  : "translate-x-1 xl:translate-x-2",
              )}
            />
          </Heading>
        )}
      </div>

      <div className="w-full aspect-1920/740 overflow-hidden flex items-center relative z-0">
        <div className="absolute w-[80%] h-full left-0 top-0 -z-1 bg-gradient-to-l from-black/0 to-black"></div>
        {data?.media?.type === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute -z-2 inset-0"
          >
            <source
              src={isEn ? data?.media?.path : data?.media_ar?.path}
              type="video/mp4"
            />
          </video>
        ) : (
          <picture className="absolute -z-2 inset-0">
            <source
              media="(max-width: 640px)"
              srcSet={
                isEn ? data?.media?.mobile?.path : data?.media_ar?.mobile?.path
              }
            />
            <Image
              src={
                isEn
                  ? data?.media?.desktop?.path
                  : data?.media_ar?.desktop?.path
              }
              alt={
                isEn
                  ? data?.media?.desktop?.alt
                  : data?.media_ar?.desktop?.alt_ar
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
              className="-z-2 object-cover"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              priority
              quality={90}
            />
          </picture>
        )}

        <div className="container">
          <div className="w-full xl:max-w-1/2 py-[40px] xl:py-[60px] 2xl:py-[80px]">
            <Heading
              as="h1"
              size="heading1"
              className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-6"
            >
              {parse(isEn ? data?.heroTitle : data?.heroTitle_ar)}
              <span
                className={cn(
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                  locale === "ar"
                    ? "-translate-x-1 xl:-translate-x-2 "
                    : "translate-x-1 xl:translate-x-2 ",
                )}
              />
            </Heading>
            {(isEn ? data?.heroDescription : data?.heroDescription_ar) && (
              <Text
                as="div"
                size="text1"
                className="line-clamp-4 font-light text-white max-w-[72%] "
              >
                {parse(isEn ? data?.heroDescription : data?.heroDescription_ar)}
              </Text>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
