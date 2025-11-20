"use client";

import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Heading } from "../utils/heading";
import { Button } from "../ui/button";
import { Text } from "../utils/text";
// import useMedia from "use-media";

export default function Footer({ footerData, socialLinkData }) {
  // const isDesktop = useMedia({ minWidth: "640px" });
  const isDesktop = true;

  return (
    <footer className="w-full pt-[30px] sm:pt-[40px] xl:pt-[60px] 2xl:pt-[80px] bg-[#282828] overflow-hidden relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-[10px] sm:-mx-[15px] xl:-mx-[20px] 2xl:-mx-[30px] [&>*]:p-[10px] sm:[&>*]:p-[15px] xl:[&>*]:p-[20px] 2xl:[&>*]:p-[30px]">
          <div className="w-full sm:w-1/2 lg:w-[28%]">
            <Link
              href="/"
              className="w-[100px] xl:w-[120px] 2xl:w-[176px] block mb-2 xl:mb-4 2xl:mb-6"
            >
              <Image
                src={footerData?.logoWhiteUrl}
                alt={footerData?.name}
                width={145}
                height={42}
                unoptimized
                className="w-full h-full object-contain block"
              />
            </Link>

            <Text
              as="div"
              size="text1"
              className="text-white mb-3 xl:mb-5 2xl:mb-7"
            >
              {parse(footerData?.address)}
            </Text>

            <div className="flex flex-wrap items-center gap-x-[15px] xl:gap-x-[20px]">
              {socialLinkData?.map((item, index) => (
                <div key={"social_link" + index}>
                  <Button variant="link" size="none" asChild>
                    <a href={item?.link || "#"} target="_blank">
                      <Image
                        src={item?.media?.media_path}
                        alt={item?.media?.media_alt}
                        width={10}
                        height={10}
                        unoptimized
                        className="w-[13px] xl:w-[15px] aspect-square block hover:scale-110 transition"
                      />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 sm:sm:w-1/3 lg:w-[18%]">
            <div>
              <Heading
                as="h6"
                size="none"
                className="text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-normal text-white mb-4 xl:mb-7 2xl:mb-10"
              >
                Shop
              </Heading>
              {footerData?.shop_navigation?.map((item, index) => (
                <div key={"shop_navigation" + index}>
                  <Button
                    variant="link"
                    size="none"
                    className="text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-white transition [&>a]:hover:text-primary inline-block mb-1 xl:mb-2"
                    asChild
                  >
                    <Link href={item?.link || "#"}>{item?.label}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 sm:sm:w-1/3 lg:w-[18%]">
            <div>
              <Heading
                as="h6"
                size="none"
                className="text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-normal text-white mb-4 xl:mb-7 2xl:mb-10"
              >
                Quick links
              </Heading>
              {footerData?.quick_link_navigation?.map((item, index) => (
                <div key={"quick_link_navigation" + index}>
                  <Button
                    variant="link"
                    size="none"
                    className="text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-white transition [&>a]:hover:text-primary inline-block mb-1 xl:mb-2"
                    asChild
                  >
                    <Link href={item?.link || "#"}>{item?.label}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 sm:sm:w-1/3 lg:w-[36%]">
            <div>
              <Heading
                as="h6"
                size="none"
                className="text-[12px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-none font-normal text-white mb-4 xl:mb-7 2xl:mb-10"
              >
                Other links
              </Heading>
              <div className="flex flex-wrap">
                {footerData?.other_link_navigation?.map((item, index) => (
                  <div key={"other_link_navigation" + index} className="w-1/2">
                    <Button
                      variant="link"
                      size="none"
                      className="text-[12px] xl:text-[11px] 2xl:text-[14px] 3xl:text-[16px] leading-none font-light text-white transition [&>a]:hover:text-primary inline-block mb-1 xl:mb-2"
                      asChild
                    >
                      <Link href={item?.link || "#"}>{item?.label}</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="border-[#333] my-3 xl:my-6 2xl:my-8" />

        <div className="flex flex-wrap -mx-[10px] sm:-mx-[15px] xl:-mx-[20px] 2xl:-mx-[30px] [&>*]:p-[10px] sm:[&>*]:p-[15px] xl:[&>*]:p-[20px] 2xl:[&>*]:p-[30px]">
          <div className="w-full sm:w-1/2 lg:w-[28%]">
            <Text
              as="div"
              size="text1"
              className="text-white [&_span]:text-normal mb-3 xl:mb-5 2xl:mb-7"
            >
              <span>{footerData?.sale_enquiry?.title} :</span>
              Ph: {footerData?.sale_enquiry?.phone}
              Email: {footerData?.sale_enquiry?.email}
            </Text>
            <Text
              as="div"
              size="text1"
              className="text-white [&_span]:text-normal mb-3 xl:mb-5 2xl:mb-7"
            >
              <span>{footerData?.support_enquiry?.title} :</span>
              Ph: {footerData?.support_enquiry?.phone}
              Email: {footerData?.support_enquiry?.email}
            </Text>
          </div>
          <div className="w-full sm:w-1/2 lg:w-[28%]">
            <div className="flex flex-wrap">
              <Text
                as="div"
                size="text1"
                className="text-white mb-3 xl:mb-5 2xl:mb-7"
              >
                {footerData?.subscription_title}
              </Text>
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </div>

      </div>

      {/* <div className="w-full my-[15px] sm:my-[30px] xl:my-[40px] 2xl:my-[60px]">
          <div className="text-[8px] sm:text-[8px] xl:text-[10px] 2xl:text-[11px] 3xl:text-[12px] leading-normal font-normal text-[#b9b9b9]">
            {parse(description)}
          </div>
        </div>

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
        </div> */}
    </footer>
  );
}

function CompanyInfoCard({ logoImage, address }) {
  return (
    <div className="w-full sm:w-1/2 lg:w-[30%]">
      <div className="w-[140px] sm:w-[120px] lg:w-[180px] xl:w-[200px] 2xl:w-[240px] 3xl:w-[300px] sm:ml-auto mb-[10px] xl:mb-[15px] 2xl:mb-[20px]">
        {logoImage && (
          <Link href="/">
            <Image
              src={item?.media?.path}
              alt={item?.media?.alt}
              width={145}
              height={42}
              className="w-full h-full object-contain block"
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
