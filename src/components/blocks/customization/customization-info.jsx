import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";
import { Text } from "@/components/utils/text";
import RequestEnquiryForm from "@/components/form/request-enquiry-form";
import RecaptchaProvider from "@/app/[locale]/(public)/CaptchaWrapper";

export default function CustomizationInfo({
  data,
  customizationFeatures,
  customizationProcess,
  customizationOptions,
  requestCustomQuote,
  states,
  locale,
  dropdownData
}) {
  const isEn = locale === "en";

  return (
    <section className="w-full block">
      <div className="w-full aspect-6/4 relative z-0 sm:aspect-1920/740 overflow-hidden flex items-center mt-[10px] sm:mt-[15px] xl:mt-[20px] 2xl:mt-[30px] relative z-0">
        {data?.media?.media_type === "video" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover absolute z-0 inset-0"
          >
            <source src={data?.media?.desktopPath} type="video/mp4" />
          </video>
        ) : (
          <picture className="absolute -z-2 inset-0 opacity-95">
            <source
              media="(max-width: 640px)"
              srcSet={data?.media?.mobilePath}
            />
            <Image
              src={data?.media?.desktopPath}
              alt={isEn ? data?.media?.media_alt : data?.media?.media_alt_ar}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
              className="-z-2 object-cover"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
            />
          </picture>
        )}
        <div className="container relative z-10">
          <div className="w-full sm:max-w-1/2 xl:max-w-[468px] 2xl:max-w-[576px] 2xl:max-w-[676px] py-[60px] xl:py-[80px] 2xl:py-[100px]">
            <Heading
              as="h1"
              size="heading1"
              className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-6"
            >
              {parse(isEn ? data?.title : data?.title_ar)}
              <span
                className={cn(
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block",
                  locale === "ar"
                    ? "-translate-x-1 xl:-translate-x-2 "
                    : "translate-x-1 xl:translate-x-2 ",
                )}
              />
            </Heading>
            <Text as="div" size="text1" className="text-white">
              {parse(isEn ? data?.description : data?.description_ar)}
            </Text>
          </div>
        </div>
      </div>

      {/* CUSTOMIZATION_FEATURES */}

      {customizationFeatures?.length > 0 && (
        <div className="w-full py-[30px] sm:py-[40px] xl:py-[50px] 2xl:py-[70px]">
          <div className="container xl:px-20 2xl:px-24 3xl:px-28">
            <div className="flex flex-wrap justify-center -mx-2 sm:-mx-4 xl:-mx-10 2xl:-mx-18 [&>*]:p-2 sm:[&>*]:p-4 xl:[&>*]:p-10 2xl:[&>*]:p-18">
              {customizationFeatures?.map((item, index) => (
                <div
                  key={"customization-info-" + index}
                  className={cn("w-full 2xs:w-1/2 sm:w-1/3 lg:w-1/4")}
                >
                  <div className="w-full">
                    <Image
                      src={item?.media?.media_path}
                      alt={
                        isEn
                          ? item?.media?.media_alt
                          : item?.media?.media_alt_ar
                      }
                      width={45}
                      height={45}
                      className="w-[30px] lg:w-[45px] 2xl:w-[65px] mx-auto hover:scale-105 transition duration-300 mb-2 xl:mb-3 2xl:mb-4"
                    />
                    <Heading
                      as="h4"
                      size="heading4"
                      className="text-center font-normal text-[#282828] mb-1 xl:mb-1.5 2xl:mb-2"
                    >
                      {isEn ? item?.title : item?.title_ar}
                    </Heading>
                    <Text
                      as="div"
                      size="text1"
                      className="lg:text-[12px] 2xl:text-[12px] 3xl:text-[16px] text-center text-black"
                    >
                      {parse(isEn ? item?.description : item?.description_ar)}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMIZATION_PROCESS */}
      <div className="w-full bg-[#f4f4f4] py-[40px_30px] sm:py-[60px_40px] xl:py-[100px_60px] 2xl:py-[140px_100px]">
        <div className="container">
          <div className={cn("w-full h-auto")}>
            <div
              className={cn(
                "w-full max-w-[220px] sm:max-w-[46%] aspect-54/41 overflow-hidden mb-3 xl:mb-5",
                "sm:float-right sm:ml-20 xl:ml-34 2xl:ml-42 3xl:ml-52 sm:mr-0",
              )}
            >
              <Image
                src={customizationProcess?.media?.path}
                alt={
                  isEn
                    ? customizationProcess?.media?.alt
                    : customizationProcess?.media?.alt_ar
                }
                width={768}
                height={468}
                className="w-full h-full object-cover hover:scale-105 transition duration-300 "
              />
            </div>
            {(customizationProcess?.title ||
              customizationProcess?.title_ar) && (
              <Heading as="h2" size="heading1" className="text-[#282828]">
                {parse(
                  isEn
                    ? customizationProcess?.title
                    : customizationProcess?.title_ar
                )}
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
            {(customizationProcess?.description ||
              customizationProcess?.description_ar) && (
              <div
                dir={locale === "ar" ? "rtl" : "ltr"}
                className={cn(
                  "typography mb-6 xl:mb-7 2xl:mb-14",
                  "[--text-color:#282828]",
                )}
              >
                {parse(
                  isEn
                    ? customizationProcess?.description
                    : customizationProcess?.description_ar
                )}
              </div>
            )}
            {customizationProcess?.items?.map((item, index) => (
              <div key={"customizationProcess-info-" + index}>
                <div
                  className={cn(
                    "flex gap-2 xl:gap-3 2xl:gap-4 mb-4 xl:mb-5 2xl:mb-10",
                  )}
                >
                  <div>
                    <Text
                      as="div"
                      size="text1"
                      className="font-medium text-[#b7b7b7] w-8 xl:w-10 2xl:w-14 aspect-square border border-[#b7b7b7] flex items-center justify-center rounded-full"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Text>
                  </div>
                  <div className="flex-1">
                    <Text
                      as="div"
                      size="text2"
                      className="font-normal text-black mb-1"
                    >
                      {parse(isEn ? item?.title : item?.title_ar)}
                    </Text>
                    <Text as="div" size="text1" className="text-black">
                      {parse(isEn ? item?.description : item?.description_ar)}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
            <div className="clear-both" />
          </div>
        </div>
      </div>

      {/* CUSTOMIZATION_OPTIONS */}
      <div className="w-full pt-[40px] sm:pt-[60px] xl:pt-[75px] 2xl:pt-[110px]">
        <div className="container">
          <div className="w-full h-auto flex flex-wrap mb-5 sm:mb-10 xl:mb-14 2xl:mb-20">
            <div className="w-full sm:max-w-[54%]">
              <Heading
                as="h1"
                size="heading1"
                className="text-[#282828] mb-1 sm:mb-2 xl:mb-4 2xl:mb-6"
              >
                {parse(
                  isEn
                    ? customizationOptions?.title
                    : customizationOptions?.title_ar
                )}
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
                    ? customizationOptions?.description
                    : customizationOptions?.description_ar
                )}
              </div>
            </div>
          </div>
          {customizationOptions?.items?.map((item, index) => (
            <div
              key={"privacy-info-" + index}
              className={cn("w-full h-auto mb-10 sm:mb-15 xl:mb-24 2xl:mb-30")}
            >
              <div
                className={cn(
                  "w-full max-w-[220px] sm:max-w-[46%] aspect-55/26 overflow-hidden mb-3 xl:mb-5",
                  index % 2 === 0
                    ? "sm:float-left sm:mr-15 xl:mr-24 2xl:mr-28 3xl:mr-36 sm:ml-0"
                    : "sm:float-right sm:ml-15 xl:ml-24 2xl:ml-28 3xl:ml-36 sm:mr-0",
                )}
              >
                <Image
                  src={item?.media?.media_path}
                  alt={
                    isEn ? item?.media?.media_alt : item?.media?.media_alt_ar
                  }
                  width={768}
                  height={468}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300 "
                />
              </div>
              {(item?.title || item?.title_ar) && (
                <Heading
                  as="h2"
                  size="heading1"
                  className="text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
                >
                  {parse(isEn ? item?.title : item?.title_ar)}
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
              {(item?.description || item?.description_ar) && (
                <div
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className={cn(
                    "typography [--text-color:#282828]",
                    index % 2 === 1
                      ? "[&_ul>li]:list-outside"
                      : "[&_ul>li]:list-inside",
                  )}
                >
                  {parse(isEn ? item?.description : item?.description_ar)}
                </div>
              )}
              <div className="clear-both" />
            </div>
          ))}
        </div>
      </div>

      {/* REQUEST_CUSTOM_QUOTE */}
      <div className="w-full bg-[#f4f4f4] py-[40px_30px] sm:py-[60px_40px] xl:py-[100px_60px] 2xl:py-[140px_100px]">
        <div className="container">
          <div className="w-full h-auto flex flex-wrap mb-2 sm:mb-4 xl:mb-8 2xl:mb-14">
            <div className="w-full lg:max-w-[54%]">
              <Heading
                as="h1"
                size="heading1"
                className="text-[#282828] mb-1 xl:mb-2 2xl:mb-4"
              >
                {parse(
                  isEn
                    ? requestCustomQuote?.title
                    : requestCustomQuote?.title_ar
                )}
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
                    ? requestCustomQuote?.description
                    : requestCustomQuote?.description_ar
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-auto flex flex-wrap gap-6 sm:gap-12 xl:gap-18 2xl:gap-30">
            <div className="flex-1">
              <RecaptchaProvider>
              <RequestEnquiryForm states={states} locale={locale} dropdownData={dropdownData} />
              </RecaptchaProvider>
            </div>
            <div className="w-full lg:max-w-[46%]">
              <div className="w-full aspect-75/52 overflow-hidden">
                <Image
                  src={requestCustomQuote?.media?.path}
                  alt={
                    isEn
                      ? requestCustomQuote?.media?.alt
                      : requestCustomQuote?.media?.alt_ar
                  }
                  width={768}
                  height={520}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
