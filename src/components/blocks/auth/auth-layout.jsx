import { Heading } from "@/components/utils/heading";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Text } from "@/components/utils/text";

export default function AuthLayout({
  locale,
  data,
  children,
  isApiData = true,
}) {
  const isEn = locale === "en";

  return (
    <section className="w-full block relative z-0">
      <div
        className={cn(
          "w-full lg:max-w-1/2 h-20 lg:h-full lg:absolute -z-1 inset-0  aspect-4/1 bg-black",
          locale === "ar" ? "right-auto" : "left-auto",
        )}
      >
        <Image
          src={data?.media?.path}
          alt={
            isApiData
              ? isEn
                ? data?.media?.alt
                : data?.media?.alt_ar
              : data?.media?.alt
          }
          width={960}
          height={1000}
          className="w-full h-full block object-cover max-lg:opacity-60"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          quality={90}
        />
      </div>
      <div className="container">
        <div className="lg:min-h-dvh flex flex-wrap items-center">
          <div className="w-full lg:w-1/2">
            <div
              className={cn(
                "w-full max-w-[368px] lg:max-w-[320px] xl:max-w-[410px] 2xl:max-w-[476px] 3xl:max-w-[576px] py-8 sm:py-10 lg:py-6 xl:py-14 2xl:py-20 max-xl:mx-auto",
                locale === "ar" ? "xl:mr-16 2xl:mr-18" : "xl:ml-16 2xl:ml-18",
              )}
            >
              <Heading
                as="h2"
                size="none"
                className="text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px] leading-normal tracking-tight font-light text-black mb-1 xl:mb-1.5 2xl:mb-2"
              >
                {parse(
                  isApiData
                    ? isEn
                      ? data?.title
                      : data?.title_ar
                    : data?.title,
                )}
                <span
                  className={cn(
                    "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                    locale === "ar"
                      ? "-translate-x-1 xl:-translate-x-2 "
                      : "translate-x-1 xl:translate-x-2 ",
                  )}
                />
              </Heading>

              {(data?.description && data?.description_ar) && (
                <Text
                  as="div"
                  size="text1"
                  className="line-clamp-4 font-light text-black mb-4 xl:mb-5 2xl:mb-7"
                >
                  {parse(
                    isApiData
                      ? isEn
                        ? data?.description
                        : data?.description_ar
                      : data?.description,
                  )}
                </Text>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
