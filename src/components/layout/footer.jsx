"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import useMedia from "use-media";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  const isDesktop = useMedia({ minWidth: "640px" });

  if (!footerData) {
    return null; // or add a skeleton loader here
  }

  return (
    <footer className="w-full pt-[30px] sm:pt-[40px] xl:pt-[80px] 2xl:pt-[100px] bg-[#171717] overflow-hidden relative z-0">
      <div className="w-full h-px absolute z-1 inset-x-0 top-0 mx-auto bg-linear-to-r from-transparent via-primary to-transparent opacity-100" />
      <Image
        src="/images/footer-bg-1.png"
        alt="footer-bg-1"
        width={868}
        height={419}
        className="w-[376px] sm:w-[468px] xl:w-[576px] 2xl:w-[676px] 3xl:w-[868px] absolute -z-1 top-[30px] sm:top-[40px] xl:top-[80px] 2xl:top-[50px] 3xl:top-[60px] left-[6%] xl:left-[calc((100%-var(--container-xl))/2)] 2xl:left-[calc((100%-var(--container-2xl))/2)] 3xl:left-[calc((100%-var(--container-3xl))/2)] ml-4"
      />
      <div className="container">
        <div className="flex flex-wrap -mx-[15px] sm:-mx-[15px] xl:-mx-[20px] 2xl:-mx-[40px] [&>*]:p-[15px] sm:[&>*]:p-[15px] xl:[&>*]:p-[20px] 2xl:[&>*]:p-[40px]">
          {!isDesktop && (
            <CompanyInfoCard logoImage={logoImage} address={address} />
          )}

          {/* Navigation Sections */}
          {navigationSection.map((section, index) => (
            <div
              key={index}
              className="w-1/2 sm:sm:w-1/3 md:w-1/5 lg:w-[calc((100%-240px)/4)] xl:w-[calc((100%-276px)/4)] 2xl:w-[calc((100%-368px)/4)] 3xl:w-[calc((100%-476px)/4)]"
            >
              <div>
                <Heading
                  as="h6"
                  size="none"
                  className="text-[12px] sm:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-tight font-semibold text-primary mb-[10px] sm:mb-[15px] xl:mb-[20px] 2xl:mb-[30px]"
                >
                  {section?.title}
                </Heading>
                {section?.navItems?.map((item, index) => (
                  <div key={"navigation_item_list" + index}>
                    <Button
                      variant="link"
                      size="none"
                      animate={false}
                      asChild
                      className="text-[10px] sm:text-[10px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-none font-medium text-[#b9b9b9] transition [&>a]:hover:text-primary block my-[10px] xl:my-[15px] 2xl:my-[20px]"
                    >
                      <Link href={item?.link || "#"}>{item?.label}</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Office Location + Social Links */}
          <div className="w-1/2 sm:w-1/2 md:w-1/5 lg:w-[calc((100%-240px)/4)] xl:w-[calc((100%-276px)/4)] 2xl:w-[calc((100%-368px)/4)] 3xl:w-[calc((100%-476px)/4)]">
            <div className="w-full mb-[15px] xl:mb-[25px] 2xl:mb-[30px]">
              <Heading
                as="h6"
                size="none"
                className="text-[12px] sm:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-tight font-semibold text-primary mb-[10px] sm:mb-[15px] xl:mb-[20px] 2xl:mb-[30px]"
              >
                {officeLocation?.title}
              </Heading>
              {officeLocation?.officeItems?.map((loc, index) => (
                <div key={"office_location_item_list" + index}>
                  <Button
                    variant="link"
                    size="none"
                    animate={false}
                    asChild
                    className="text-[10px] sm:text-[10px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-none font-medium text-[#b9b9b9] transition [&>a]:hover:text-primary block my-[10px] xl:my-[15px] 2xl:my-[20px] justify-start"
                  >
                    {loc?.isExternal ? (
                      <a
                        href={loc?.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-x-[10px]"
                      >
                        {loc?.icon?.url && (
                          <Image
                            src={`${STRAPI_URL}${loc.icon.url}`}
                            alt={loc?.icon?.alternativeText || ""}
                            width={38}
                            height={24}
                            unoptimized
                            className="w-[20px] xl:w-[24px] 2xl:w-[35px]"
                          />
                        )}
                        {loc?.label}
                      </a>
                    ) : (
                      <Link
                        href={loc?.link || "#"}
                        className="flex items-center gap-x-[10px]"
                      >
                        {loc?.icon?.url && (
                          <Image
                            src={`${STRAPI_URL}${loc.icon.url}`}
                            alt={loc?.icon?.alternativeText || ""}
                            width={38}
                            height={24}
                            unoptimized
                            className="w-[20px] xl:w-[24px] 2xl:w-[35px]"
                          />
                        )}
                        {loc?.label}
                      </Link>
                    )}
                  </Button>
                </div>
              ))}
            </div>

            <div className="w-full">
              <Heading
                as="h6"
                className="text-[12px] sm:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-tight font-semibold text-primary mb-[5px] sm:mb-[5px] xl:mb-[10px] 2xl:mb-[15px]"
              >
                {socialLinks?.title}
              </Heading>
              <div className="flex flex-wrap items-center -mx-[4px] xl:-mx-[10px] 2xl:-mx-[14px] [&>*]:px-[4px] xl:[&>*]:px-[10px] 2xl:[&>*]:px-[14px]">
                {socialLinks?.itemList?.map((item, index) => (
                  <div key={"social_link_item_list" + index}>
                    <Button
                      variant="link"
                      size="none"
                      asChild
                      className="justify-start"
                    >
                      <a href={item?.link || "#"} target="_blank">
                        {item?.icon?.url && (
                          <Image
                            src={`${STRAPI_URL}${item?.icon?.url}`}
                            alt={item?.label}
                            width={15}
                            height={11}
                            unoptimized
                            className="w-[10px] xl:w-[12px] 2xl:w-[14px] 3xl:w-[20px] block hover:scale-110 transition"
                          />
                        )}
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isDesktop && (
            <CompanyInfoCard logoImage={logoImage} address={address} />
          )}
        </div>

        <div className="w-full my-[15px] sm:my-[30px] xl:my-[40px] 2xl:my-[60px]">
          <div className="text-[8px] sm:text-[8px] xl:text-[10px] 2xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-[#b9b9b9]">
            {parse(description)}
          </div>
        </div>
        <hr className="border-[#323232]" />

        <div className="flex flex-wrap justify-between py-[15px] xl:py-[20px] 2xl:py-[30px]">
          <div className="text-[10px] sm:text-[10px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-medium text-right text-[#b9b9b9] [&>span]:text-primary">
            {parse(copyright)}
          </div>
          <div className="text-[10px] sm:text-[10px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-medium text-right text-[#b9b9b9] [&>span]:text-primary">
            Designed By{" "}
            <a href="https://www.intersmartsolution.com/" target="_blank">
              <Image
                src="/icons/icon-intersmart.svg"
                alt="Intersmart"
                width={100}
                height={15}
                className="w-[70px] xl:w-[90px] 3xl:w-[100px] inline ml-1"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CompanyInfoCard({ logoImage, address }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/5 lg:w-[240px] xl:w-[276px] 2xl:w-[368px] 3xl:w-[476px]">
      <div className="w-[140px] sm:w-[120px] lg:w-[180px] xl:w-[200px] 2xl:w-[240px] 3xl:w-[300px] sm:ml-auto mb-[10px] xl:mb-[15px] 2xl:mb-[20px]">
        {logoImage && (
          <Link href="/">
            <Image
              src={`${STRAPI_URL}${logoImage?.url}`}
              alt={logoImage?.alternativeText || "Footer Logo"}
              width={200}
              height={80}
              className="w-full h-full"
            />
          </Link>
        )}
        <div className="text-[10px] sm:text-[10px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[16px] leading-normal font-medium sm:text-right text-[#b9b9b9] justify-start">
          {parse(address)}
        </div>
      </div>
    </div>
  );
}
