import { Heading } from "@/components/utils/heading";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";

export default function ProjectSolution({ locale, data }) {

  const isEN = locale === "en";

  return (
    <section className="w-full block py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[80px] bg-[#f4f4f4]">
      <div className="container">
        <div className="w-full h-auto block">
          <div
            className={cn(
              "w-full max-w-[220px] sm:max-w-[42%] overflow-hidden mb-3 xl:mb-5",
              "sm:float-right sm:ml-15 xl:ml-24 2xl:ml-28 3xl:ml-48 sm:mr-0"
            )}
          >
            <Image
              src={data?.media?.path ?? "/images/placeholder.jpg"}
              alt={isEN? data?.media?.alt : data?.media?.alt_ar}
              width={768}
              height={468}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
            <Heading
              as="h2"
              size="heading1"
              className="text-[#282828] pt-1 xl:pt-2 2xl:pt-4 mb-2 xl:mb-3 2xl:mb-5"
            >
              {parse(isEN?data?.title:data?.title_ar)}
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
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              className={cn("typography", "[--text-color:#282828]")}
            >
              {parse(isEN?data?.description:data?.description_ar)}
            </div>
          <div className="clear-both" />
        </div>
      </div>
    </section>
  );
}
