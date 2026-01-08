import parse from "html-react-parser";

import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";

export default function ReturnInfo({ data, locale }) {
  return (
    <section className="w-full h-auto block pb-[30px] sm:pb-[40px] xl:pb-[60px] 2xl:pb-[100px]">
      <div className="container">
        <div className={cn("w-full h-auto")}>
          <div
            className={cn(
              "w-full max-w-[220px] sm:max-w-[44%] aspect-4/3 overflow-hidden mb-4 xl:mb-8",
              locale === "ar"
                ? "sm:float-left sm:mr-20 xl:mr-34 2xl:mr-42 3xl:mr-52 sm:ml-0"
                : "sm:float-right sm:ml-20 xl:ml-34 2xl:ml-42 3xl:ml-52 sm:mr-0"
            )}
          >
            <Image
              src={data?.media?.media_path}
              alt={data?.media?.media_alt}
              width={768}
              height={468}
              className="w-full h-full object-cover hover:scale-105 transition duration-300 "
            />
          </div>
          {data?.items?.map((item, index) => (
            <div key={"return-info-" + index}>
              {item?.title && (
                <Heading
                  as="h2"
                  size="heading1"
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
                  className={cn("typography", "[--text-color:#282828]")}
                >
                  {parse(item?.description)}
                </div>
              )}
            </div>
          ))}
          <div className="clear-both" />
        </div>
      </div>
    </section>
  );
}
