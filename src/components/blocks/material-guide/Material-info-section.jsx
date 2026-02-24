import Image from "next/image";
import { Heading } from "@/components/utils/heading";
import parse from "html-react-parser";
import { cn } from "@/lib/utils";

export default function MaterialInfoSection({
  data,
  locale,
  extraMaterialsInfo,
  isEn,
}) {
  const itemcount = data.items.length;
  console.log("count", itemcount);

  return (
    <section className="w-full h-auto pt-2.5 sm:pt-3.75 xl:pt-5 2xl:pt-7.5 block">
      <div className="w-full aspect-6/5 sm:aspect-1920/740 overflow-hidden flex items-center relative z-0">
        <picture className="absolute -z-2 inset-0 opacity-95">
          <source media="(max-width: 640px)" srcSet={data?.media?.mobilePath} />
          <Image
            src={data?.media?.desktopPath}
            alt={isEn ? data?.media?.media_alt : data?.media?.media_alt_ar}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw"
            className="-z-2 object-cover"
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
            quality={90}
          />
        </picture>
        <div className="container">
          <div className="w-full xl:max-w-1/2 py-15 xl:py-20 2xl:py-25">
            <Heading
              as="h1"
              size="heading1"
              className="line-clamp-4 leading-tight text-white mb-2 xl:mb-4 2xl:mb-6"
            >
              {parse(isEn ? data?.title : data?.title_ar)}
              <span
                className={cn(
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                  !isEn
                    ? "-translate-x-1 xl:-translate-x-2 "
                    : "translate-x-1 xl:translate-x-2 ",
                )}
              />
            </Heading>
          </div>
        </div>
      </div>

      <div className="w-full h-auto block">
        {data?.items?.map((item, indaexCount) => (
          <div
            key={item?.id}
            className={`[--padding:40px] sm:[--padding:50px] lg:[--padding:60px] 2xl:[--padding:80px] 3xl:[--padding:100px] w-full h-auto py-[40px] sm:py-[60px] lg:py-[100px] 2xl:py-[120px] 3xl:py-[150px] first:pt-[var(--padding)] last:pb-[var(--padding)] block ${indaexCount % 2 !== 0 ? "bg-white" : "bg-[#F4F4F4]"} `}
          >
            <div className="container">
              {item?.title && (
                <Heading
                  as="h2"
                  size="heading1"
                  className="line-clamp-2 text-black mb-[30px] sm:mb-[40px] lg:mb-[50px] 2xl:mb-[60px] 3xl:mb-[80px]"
                >
                  {parse(isEn ? item?.title : item?.title_ar)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                      !isEn
                        ? "-translate-x-1 xl:-translate-x-2 "
                        : "translate-x-1 xl:translate-x-2 ",
                    )}
                  />
                </Heading>
              )}

              <div className="w-full h-auto block">
                {item?.info_list?.map((item, index) => (
                  <div
                    key={index}
                    className={`group [--width:100%] md:[--width:380px] lg:[--width:510px] 2xl:[--width:610px] 3xl:[--width:760px] md:[--gap:40px] lg:[--gap:50px] xl:[--gap:80px] 2xl:[--gap:100px] 3xl:[--gap:125px] w-full h-auto mb-[30px] sm:mb-[50px] md:mb-[60px] lg:mb-[80px] xl:mb-[100px] 2xl:mb-[125px] 3xl:mb-[160px] last:mb-0 flex flex-wrap ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div
                      className={cn(
                        "w-[var(--width)] md:w-[calc(100%-var(--width))] max-sm:mb-[15px] max-md:mb-[25px]",
                        !isEn
                          ? index % 2 === 0
                            ? "pl-[var(--gap)]"
                            : "pr-[var(--gap)]"
                          : index % 2 === 0
                            ? "pr-[var(--gap)]"
                            : "pl-[var(--gap)]",
                      )}
                    >
                      {(item?.title || item?.title_ar) && (
                        <Heading
                          as="h2"
                          size="heading6"
                          className="text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
                        >
                          {parse(isEn ? item?.title : item?.title_ar)}
                          <span
                            className={cn(
                              "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                              !isEn
                                ? "-translate-x-1 xl:-translate-x-2 "
                                : "translate-x-1 xl:translate-x-2 ",
                            )}
                          />
                          &nbsp;
                        </Heading>
                      )}
                      <div
                        dir={!isEn ? "rtl" : "ltr"}
                        className={cn(
                          "typography 2xl:[&_li,p]:text-[15px] 3xl:[&_li,p]:text-[18px] [&_li,p]:leading-[1.7] [&_ul]:pl-0 [&_ul]:my-[20px] 2xl:[&_ul]:my-[30px] [&_li]:mb-[15px] sm:[&_li]:mb-[20px] 2xl:[&_li]:mb-[30px] [&_li]:list-none [&_li]:relative [&_li]:z-0 [&_li::before]:content-[''] [&_li::before]:absolute [&_li::before]:z-1 [&_li::before]:w-[6px] 2xl:[&_li::before]:w-[8px] [&_li::before]:h-auto [&_li::before]:aspect-[10/5] [&_li::before]:bg-[url('/images/li-before-arrow.svg')] [&_li::before]:bg-no-repeat [&_li::before]:bg-contain [&_span]:font-medium",
                          "[--text-color:#282828]",
                          !isEn
                            ? "[&_ul]:pr-0 [&_li]:pr-[15px] 2xl:[&_li]:pr-[20px] [&_li::before]:inset-[5.5px_0_0_auto] 2xl:[&_li::before]:inset-[6px_0_0_auto] 3xl:[&_li::before]:inset-[8px_0_0_auto] [&_li::before]:transform [&_li::before]:scale-x-[-1]"
                            : "[&_li]:pl-[15px] 2xl:[&_li]:pl-[20px] [&_li::before]:inset-[5.5px_auto_0_0] 2xl:[&_li::before]:inset-[6px_auto_0_0] 3xl:[&_li::before]:inset-[8px_auto_0_0]",
                        )}
                      >
                        {parse(isEn ? item?.description : item?.description_ar)}
                      </div>
                    </div>
                    <div className="w-[var(--width)]">
                      <div className="w-full h-full min-h-[190px] max-h-[720px] overflow-hidden block relative z-0">
                        <Image
                          src={item?.media?.path}
                          alt={isEn ? item?.media?.alt : item?.media?.alt_ar}
                          width={760}
                          height={630}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          quality={90}
                        />
                        {item?.icon && (
                          <div className="w-[40px] xl:w-[70px] 2xl:w-[90px] 3xl:w-[100px] h-auto aspect-square m-[10px] sm:m-[15px] 3xl:m-[20px] overflow-hidden absolute z-1 inset-[0_auto_auto_0] flex items-center justify-center">
                            <Image
                              src={item?.icon?.path}
                              alt={isEn ? item?.icon?.alt : item?.icon?.alt_ar}
                              width={115}
                              height={115}
                              className="w-full h-full object-contain"
                              quality={90}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-auto block">
        {extraMaterialsInfo?.map((item, index) => (
          <div
            key={item?.id}
            className={`[--padding:40px] sm:[--padding:50px] lg:[--padding:60px] 2xl:[--padding:80px] 3xl:[--padding:100px] w-full h-auto py-[40px] sm:py-[60px] lg:py-[100px] 2xl:py-[120px] 3xl:py-[150px] first:pt-[var(--padding)] last:pb-[var(--padding)] block ${(itemcount + index) % 2 !== 0 ? "bg-white" : "bg-[#F4F4F4]"} `}
          >
            <div className="container">
              {(item?.title || item?.title_ar) && (
                <Heading
                  as="h2"
                  size="heading1"
                  className="line-clamp-2 text-black mb-[30px] sm:mb-[40px] lg:mb-[50px] 2xl:mb-[60px] 3xl:mb-[80px]"
                >
                  {parse(isEn ? item?.title : item?.title_ar)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                      !isEn
                        ? "-translate-x-1 xl:-translate-x-2 "
                        : "translate-x-1 xl:translate-x-2 ",
                    )}
                  />
                </Heading>
              )}

              <div className="w-full h-auto block">
                {item?.info_list?.map((item, index) => (
                  <div
                    key={index}
                    className={`group [--width:100%] md:[--width:380px] lg:[--width:510px] 2xl:[--width:610px] 3xl:[--width:760px] md:[--gap:40px] lg:[--gap:50px] xl:[--gap:80px] 2xl:[--gap:100px] 3xl:[--gap:125px] w-full h-auto mb-[30px] sm:mb-[50px] md:mb-[60px] lg:mb-[80px] xl:mb-[100px] 2xl:mb-[125px] 3xl:mb-[160px] last:mb-0 flex flex-wrap ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div
                      className={cn(
                        "w-[var(--width)] md:w-[calc(100%-var(--width))] max-sm:mb-[15px] max-md:mb-[25px]",
                        !isEn
                          ? index % 2 === 0
                            ? "pl-[var(--gap)]"
                            : "pr-[var(--gap)]"
                          : index % 2 === 0
                            ? "pr-[var(--gap)]"
                            : "pl-[var(--gap)]",
                      )}
                    >
                      {(item?.title || item?.title_ar) && (
                        <Heading
                          as="h2"
                          size="heading6"
                          className="text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
                        >
                          {parse(isEn ? item?.title : item?.title_ar)}
                          <span
                            className={cn(
                              "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                              !isEn
                                ? "-translate-x-1 xl:-translate-x-2 "
                                : "translate-x-1 xl:translate-x-2 ",
                            )}
                          />
                          &nbsp;
                        </Heading>
                      )}
                      <div
                        dir={!isEn ? "rtl" : "ltr"}
                        className={cn(
                          "typography 2xl:[&_li,p]:text-[15px] 3xl:[&_li,p]:text-[18px] [&_li,p]:leading-[1.7] [&_ul]:pl-0 [&_ul]:my-[20px] 2xl:[&_ul]:my-[30px] [&_li]:mb-[15px] sm:[&_li]:mb-[20px] 2xl:[&_li]:mb-[30px] [&_li]:list-none [&_li]:relative [&_li]:z-0 [&_li::before]:content-[''] [&_li::before]:absolute [&_li::before]:z-1 [&_li::before]:w-[6px] 2xl:[&_li::before]:w-[8px] [&_li::before]:h-auto [&_li::before]:aspect-[10/5] [&_li::before]:bg-[url('/images/li-before-arrow.svg')] [&_li::before]:bg-no-repeat [&_li::before]:bg-contain [&_span]:font-medium",
                          "[--text-color:#282828]",
                          !isEn
                            ? "[&_ul]:pr-0 [&_li]:pr-[15px] 2xl:[&_li]:pr-[20px] [&_li::before]:inset-[5.5px_0_0_auto] 2xl:[&_li::before]:inset-[6px_0_0_auto] 3xl:[&_li::before]:inset-[8px_0_0_auto] [&_li::before]:transform [&_li::before]:scale-x-[-1]"
                            : "[&_li]:pl-[15px] 2xl:[&_li]:pl-[20px] [&_li::before]:inset-[5.5px_auto_0_0] 2xl:[&_li::before]:inset-[6px_auto_0_0] 3xl:[&_li::before]:inset-[8px_auto_0_0]",
                        )}
                      >
                        {parse(isEn ? item?.description : item?.description_ar)}
                      </div>
                    </div>
                    <div className="w-[var(--width)]">
                      <div className="w-full h-full min-h-[190px] max-h-[720px] overflow-hidden block relative z-0">
                        <Image
                          src={item?.media?.path}
                          alt={isEn ? item?.media?.alt : item?.media?.alt_ar}
                          width={760}
                          height={630}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          quality={90}
                        />
                        {item?.icon && (
                          <div className="w-[40px] xl:w-[70px] 2xl:w-[90px] 3xl:w-[100px] h-auto aspect-square m-[10px] sm:m-[15px] 3xl:m-[20px] overflow-hidden absolute z-1 inset-[0_auto_auto_0] flex items-center justify-center">
                            <Image
                              src={item?.icon?.path}
                              alt={isEn ? item?.icon?.alt : item?.icon?.alt_ar}
                              width={115}
                              height={115}
                              className="w-full h-full object-contain"
                              quality={90}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
