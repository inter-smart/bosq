import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import Image from "next/image";
import React from "react";
import parse from "html-react-parser";
import Link from "next/link";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import ContactEnquiryForm from "@/components/form/contact-enquiry-form";

const ContactMap = dynamic(() => import("./contact-map"));

export default function ContactInfo({ locale, data }) {
  return (
    <section className="w-full block py-[10px_30px] xl:py-[10px_60px] 2xl:py-[15px_100px] relative z-0">
      <div className="container">
        <div className="flex flex-wrap -mx-2.5 xl:-mx-5 2xl:-mx-6 [&>*]:p-2.5 xl:[&>*]:p-5 2xl:[&>*]:p-6">
          <div className="w-full lg:w-1/2">
            <div className="w-full bg-[#f2f2f2] rounded-[4px] p-[15px] xl:p-10 2xl:p-[60px] max-xl:mb-6">
              <Heading
                as="h4"
                size="none"
                className="text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[26px] 2xl:text-[34px] 3xl:text-[40px] leading-tight font-light text-[#282828] mb-1.5 xl:mb-2.5 2xl:mb-4"
              >
                {data?.formData?.title}

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
                className="leading-tight text-[#282828] mb-2 xl:mb-4 2xl:mb-6"
              >
                {parse(data?.formData?.description)}
              </Text>
              <ContactEnquiryForm locale={locale} />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full max-xl:mb-6">
              <div className="w-full aspect-576/348 overflow-hidden rounded-[4px] bg-white block mb-2 xl:mb-3 2xl:mb-5">
                <Image
                  src={data?.media?.path}
                  alt={data?.media?.alt}
                  width={864}
                  height={522}
                  className="w-full h-full hover:scale-105 transition"
                />
              </div>
              <Heading
                as="h4"
                size="none"
                className="text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[26px] 2xl:text-[30px] 3xl:text-[36px] leading-tight font-light text-[#282828] mb-2 xl:mb-4 2xl:mb-6"
              >
                {data?.title}
              </Heading>
              <Text as="div" size="text1" className="text-[#282828]">
                {parse(data?.description)}
              </Text>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full h-full bg-[#f2f2f2] rounded-[4px] overflow-hidden">
              <ContactMap data={data?.map} />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="w-full bg-[#f2f2f2] border-1 border-[#dedede] rounded-[4px] p-[15px] xl:p-10 2xl:p-[60px] grid grid-cols-1 sm:grid-cols-2 gap-5 xl:gap-10">
              {data?.contactMethods?.map((item, index) => (
                <div key={"contactMethods" + index} className="w-full">
                  <Heading
                    as="h3"
                    size="heading3"
                    className="font-normal capitalize text-[#282828] mb-1.5 xl:mb-2 2xl:mb-3"
                  >
                    {item?.label}
                  </Heading>
                  {item?.value?.map((valueItem, idx) => {
                    const isEmail = item?.type === "email";
                    const isPhone = item?.type === "phone";

                    if (isEmail) {
                      return (
                        <div key={"valueItem" + idx}>
                          <Text
                            as="div"
                            size="text1"
                            className="text-[#282828] [&_a]:hover:underline [&_a]:hover:text-primary transition my-0.5"
                          >
                            <Link href={`mailto:${valueItem}`}>
                              {valueItem}
                            </Link>
                          </Text>
                        </div>
                      );
                    }

                    if (isPhone) {
                      return (
                        <div key={"valueItem" + idx}>
                          <Text
                            as="div"
                            size="text1"
                            className="text-[#282828] [&_a]:hover:underline [&_a]:hover:text-primary transition my-0.5"
                          >
                            <Link href={`tel:${valueItem.replace(/\s+/g, "")}`}>
                              {valueItem}
                            </Link>
                          </Text>
                        </div>
                      );
                    }

                    return (
                      <div key={"valueItem" + idx}>
                        <Text
                          as="div"
                          size="text1"
                          className="text-[#282828] hover:text-primary my-0.5"
                        >
                          {parse(valueItem)}
                        </Text>
                      </div>
                    );
                  })}
                </div>
              ))}

              {data?.socialMedia && (
                <div className="w-full">
                  <Heading
                    as="h3"
                    size="heading3"
                    className="font-normal capitalize text-[#282828] mb-2 xl:mb-3 2xl:mb-5"
                  >
                    social media
                  </Heading>
                  <div className="flex flex-wrap gap-x-2 xl:gap-x-3 2xl:gap-x-4">
                    {data?.socialMedia?.map((item, idx) => {
                      return (
                        <div key={"socialMedia" + idx}>
                          <a
                            href={item?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={item?.icon}
                              alt={item?.label}
                              width={12}
                              height={12}
                              className="w-3.5 aspect-square hover:scale-110 transition"
                            />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
