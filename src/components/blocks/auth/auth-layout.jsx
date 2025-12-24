import { Heading } from "@/components/utils/heading";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Text } from "@/components/utils/text";

export default function AuthLayout({ locale, data, children }) {
  return (
    <section className="w-full block relative z-0">
      <div className="w-full lg:max-w-1/2 h-20 lg:h-full lg:absolute -z-1 inset-0 left-auto aspect-4/1 bg-black">
        <Image
          src={data?.media?.path}
          alt={data?.media?.alt}
          width={960}
          height={1000}
          className="w-full h-full block object-cover max-lg:opacity-60"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
        />
      </div>
      <div className="container">
        <div className="lg:min-h-dvh flex flex-wrap items-center">
          <div className="w-full lg:w-1/2">
            <div className="w-full max-w-[368px] lg:max-w-[320px] xl:max-w-[400px] 2xl:max-w-[476px] 3xl:max-w-[576px] py-8 sm:py-10 lg:py-6 xl:py-14 2xl:py-20 max-xl:mx-auto">
              <Heading
                as="h2"
                size="none"
                className="text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px] leading-normal tracking-tight font-light text-black mb-1 xl:mb-2 2xl:mb-3"
              >
                {parse(data?.title)}
                <span
                  className={cn(
                    "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                    locale === "ar"
                      ? "-translate-x-1 xl:-translate-x-2 "
                      : "translate-x-1 xl:translate-x-2 "
                  )}
                />
              </Heading>
              <Text
                as="div"
                size="text1"
                className="line-clamp-4 font-light text-black mb-4 xl:mb-6 2xl:mb-8"
              >
                {parse(data?.description)}
              </Text>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
