"use client";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";

import { motion } from "motion/react";

export default function SustainabilityInfo({
  sectionData,
  bannerData,
  sustainabilityList,
  locale,
}) {
  const isEn = locale === "en";

  const desktopBannerSrc =
    !isEn && bannerData?.desktop?.path_ar
      ? bannerData.desktop.path_ar
      : bannerData?.desktop?.path;

  const mobileBannerSrc =
    !isEn && bannerData?.mobile?.path_ar
      ? bannerData.mobile.path_ar
      : bannerData?.mobile?.path;

  return (
    <section className="w-full block">
      <div className="w-full aspect-6/4 sm:aspect-1920/740 overflow-hidden flex items-center mt-[10px] sm:mt-[15px] xl:mt-[20px] 2xl:mt-[30px] relative z-0">
        {/* add video */}
        {bannerData?.desktop?.type === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute z-0 inset-0"
          >
            <source src={bannerData?.desktop?.path} type="video/mp4" />
          </video>
        ) : (
          <picture className="absolute -z-2 inset-0 opacity-95">
            <source
              media="(max-width: 640px)"
              srcSet={mobileBannerSrc}
            />
            <Image
              src={desktopBannerSrc}
              alt={
                isEn ? bannerData?.desktop?.alt : bannerData?.desktop?.alt_ar
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
              className="-z-2 object-cover"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              quality={90}
            />
          </picture>
        )}
      </div>

      <div className="w-full pt-[40px] sm:pt-[60px] xl:pt-[75px] 2xl:pt-[110px]">
        <div className="w-full h-auto block">
          <div className="container">
            <div className="flex flex-wrap mb-4 sm:mb-6 xl:mb-10 2xl:mb-12">
              <div className="w-full sm:max-w-[50%]">
                <Heading
                  as="h1"
                  size="heading1"
                  className="text-[#282828] mb-1 sm:mb-2 xl:mb-4 2xl:mb-6"
                >
                  {parse(isEn ? sectionData?.title : sectionData?.title_ar)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block",
                      locale === "ar"
                        ? "-translate-x-1 xl:-translate-x-2 "
                        : "translate-x-1 xl:translate-x-2 ",
                    )}
                  />
                </Heading>
              </div>
              <div className={cn("flex-1")}>
                <div
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className={cn("typography", "[--text-color:#282828]")}
                >
                  {parse(
                    isEn
                      ? sectionData?.description
                      : sectionData?.description_ar,
                  )}
                </div>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              className={cn(
                "w-full aspect-6/4 sm:aspect-1780/768 overflow-hidden",
              )}
            >
              <Image
                src={sectionData?.media?.path}
                alt={
                  isEn ? sectionData?.media?.alt : sectionData?.media?.alt_ar
                }
                width={1780}
                height={768}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                quality={90}
              />
            </motion.div>
          </div>
        </div>
        {sustainabilityList?.map((item, index) => (
          <div
            key={"sustainability-list-" + index}
            className={cn(
              "w-full h-auto py-10 sm:py-15 xl:py-24 2xl:py-30",
              index === 1 && "bg-[#f4f4f4]",
              index === 4 && "bg-[#f4f4f4]",
            )}
          >
            <div className="container xl:px-16 2xl:px-24 3xl:px-28">
              <div className="w-full h-auto block">
                <div
                  className={cn(
                    "w-full max-w-[220px] sm:max-w-[42%] overflow-hidden mb-3 xl:mb-5",
                    index === 2
                      ? "sm:float-left sm:mr-15 xl:mr-24 2xl:mr-28 3xl:mr-48 sm:ml-0"
                      : index === 3
                        ? "sm:float-right sm:ml-15 xl:ml-24 2xl:ml-28 3xl:ml-48 sm:mr-0"
                        : index === 4
                          ? "sm:float-left sm:mr-15 xl:mr-24 2xl:mr-28 3xl:mr-48 sm:ml-0"
                          : index % 2 != 0
                            ? "sm:float-left sm:mr-15 xl:mr-24 2xl:mr-28 3xl:mr-48 sm:ml-0"
                            : "sm:float-right sm:ml-15 xl:ml-24 2xl:ml-28 3xl:ml-80 sm:mr-0",
                  )}
                >
                  <Image
                    src={item?.media?.path}
                    alt={isEn ? item?.media?.alt : item?.media?.alt}
                    width={768}
                    height={468}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    quality={90}
                  />
                </div>
                {item?.title && (
                  <Heading
                    as="h2"
                    size="heading1"
                    className="text-[#282828] pt-1 xl:pt-2 2xl:pt-4 mb-2 xl:mb-3 2xl:mb-5"
                  >
                    {isEn ? item?.title : item?.title_ar}
                    <span
                      className={cn(
                        "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                        locale === "ar"
                          ? "-translate-x-1 xl:-translate-x-2 "
                          : "translate-x-1 xl:translate-x-2 ",
                      )}
                    />
                    &nbsp;
                  </Heading>
                )}
                {item?.description && (
                  <div
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    className={cn("typography", "[--text-color:#282828]")}
                  >
                    {parse(isEn ? item?.description : item?.description_ar)}
                  </div>
                )}
                <div className="clear-both" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
