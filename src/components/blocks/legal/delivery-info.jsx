import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";
import { Text } from "@/components/utils/text";

export default function DeliveryInfo({ data, deliveryInfo, locale }) {
  return (
    <section className="w-full block py-[10px] sm:py-[15px] xl:py-[20px] 2xl:py-[30px]">
      <div className="w-full aspect-6/4 sm:aspect-1920/740 overflow-hidden flex items-center relative z-0">
        <picture className="absolute -z-2 inset-0 opacity-95">
          <source media="(max-width: 640px)" srcSet={data?.media?.mobilePath} />
          <Image
            src={data?.media?.desktopPath}
            alt={data?.media?.media_alt}
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
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block",
                  locale === "ar"
                    ? "-translate-x-1 xl:-translate-x-2 "
                    : "translate-x-1 xl:translate-x-2 "
                )}
              />
            </Heading>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#f4f4f4] py-[30px] sm:py-[40px] xl:py-[60px] 2xl:py-[100px]">
        <div className="container xl:px-20 2xl:px-24 3xl:px-28">
          <div className="flex flex-wrap items-center -mx-1 xl:-mx-4 2xl:-mx-6 [&>*]:p-1 xl:[&>*]:p-4 2xl:[&>*]:p-6">
            <div className="w-full sm:w-[200px] lg:w-[220px] xl:w-[280px] 2xl:w-[400px]">
              <div className="w-full max-w-[120px] xl:max-w-[168px] 2xl:max-w-[250px]">
                <Image
                  src={deliveryInfo?.media?.media_path}
                  alt={deliveryInfo?.media?.media_alt}
                  width={468}
                  height={783}
                  className="w-full h-auto block hover:scale-105 transition duration-300"
                />
              </div>
            </div>
            <div className="w-full sm:w-[calc(100%-200px)] lg:w-[calc(100%-220px)] xl:w-[calc(100%-280px)] 2xl:w-[calc(100%-400px)]">
              <Heading
                as="h2"
                size="heading1"
                className="text-[#282828] mb-3 xl:mb-4 2xl:mb-7"
              >
                {deliveryInfo?.title}
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
              <div className="flex items-center gap-x-2.5 xl:gap-x-5 mb-4 xl:mb-6 2xl:mb-8">
                <Text as="div" size="text1" className="font-medium text-black">
                  {parse(deliveryInfo?.description)}
                </Text>
                <span className="flex-1 h-[1px] bg-[#e9e9e9]" />
              </div>
              <div className="flex flex-wrap -mx-2 xl:-mx-2 2xl:-mx-2.5 [&>*]:p-2 xl:[&>*]:p-2 2xl:[&>*]:p-2.5">
                {deliveryInfo?.items?.map((item, index) => (
                  <div
                    key={"delivery-info-" + index}
                    className={cn(
                      "w-1/2 sm:w-1/3 lg:w-1/5 border-[#e0e0e0]",
                      locale === "ar"
                        ? "lg:not-last:border-l-[1px]"
                        : "lg:not-last:border-r-[1px]"
                    )}
                  >
                    <div className="w-full">
                      <Image
                        src={item?.media_path}
                        alt={item?.title}
                        width={45}
                        height={45}
                        className="w-[30px] lg:w-[45px] 2xl:w-[65px] mx-auto hover:scale-105 transition duration-300 mb-1 xl:mb-2 2xl:mb-3"
                      />
                      <Heading
                        as="h4"
                        size="heading4"
                        className="text-center text-[#282828] mb-1 xl:mb-2 2xl:mb-3"
                      >
                        {item?.title}
                      </Heading>
                      <Text
                        as="div"
                        size="text1"
                        className="lg:text-[12px] 2xl:text-[12px] 3xl:text-[16px] text-center text-black"
                      >
                        {parse(item?.description)}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pt-[40px] sm:pt-[60px] xl:pt-[75px] 2xl:pt-[110px]">
        <div className="container">
          {data?.items?.map((item, index) => (
            <div
              key={"privacy-info-" + index}
              className={cn("w-full h-auto mb-15 xl:mb-24 2xl:mb-30")}
            >
              <div
                className={cn(
                  "w-full max-w-[220px] sm:max-w-[46%] aspect-54/41 overflow-hidden mb-3 xl:mb-5",
                  index % 2 === 0
                    ? "sm:float-right sm:ml-20 xl:ml-34 2xl:ml-42 3xl:ml-52 sm:mr-0"
                    : "sm:float-left sm:mr-20 xl:mr-34 2xl:mr-42 3xl:mr-52 sm:ml-0"
                )}
              >
                <Image
                  src={item?.media?.media_path}
                  alt={item?.media?.media_alt}
                  width={768}
                  height={468}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300 "
                />
              </div>
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
              <div className="clear-both" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
