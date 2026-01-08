import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accordionTriggerStyle = cn(
  "text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-normal text-[#282828] py-4 sm:py-4 xl:py-5 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:invert-100"
);

export default function FaqInfo({ data, locale }) {
  return (
    <section className="w-full block py-[10px] sm:py-[15px] xl:py-[20px] 2xl:py-[30px]">
      <div className="w-full aspect-6/4 sm:aspect-1920/740 overflow-hidden flex items-center relative z-0">
        <picture className="absolute -z-2 inset-0 opacity-95">
          <source media="(max-width: 640px)" srcSet={data?.media?.mobilePath} />
          <Image
            src={data?.media?.desktopPath}
            alt={data?.media?.alt}
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
                  "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block ",
                  locale === "ar"
                    ? "-translate-x-1 xl:-translate-x-2 "
                    : "translate-x-1 xl:translate-x-2 "
                )}
              />
            </Heading>
          </div>
        </div>
      </div>
      <div className="w-full py-[40px_20px] sm:py-[60px_30px] xl:py-[80px_40px] 2xl:py-[100px_50px]">
        <div className="container">
          <div className="w-full lg:w-[768px] 2xl:w-[1120px]">
            {data?.generalFaq && (
              <div className="mb-8 xl:mb-14 2xl:mb-20">
                <Heading
                  as="h2"
                  size="none"
                  className="text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px] leading-normal tracking-tight font-light text-black mb-4 xl:mb-8 2xl:mb-10"
                >
                  {parse(data?.generalFaq?.title)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                      locale === "ar"
                        ? "-translate-x-1 xl:-translate-x-2 "
                        : "translate-x-1 xl:translate-x-2 "
                    )}
                  />
                </Heading>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  {data?.generalFaq?.items?.map((item, index) => (
                    <AccordionItem
                      key={"general-faq-" + index}
                      value={"item" + index}
                      className="last:border-b first:border-t"
                    >
                      <AccordionTrigger className={accordionTriggerStyle}>
                        {parse(item?.question)}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          dir={locale === "ar" ? "rtl" : "ltr"}
                          className={cn("typography", "[--text-color:#282828]")}
                        >
                          {parse(item?.answer)}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            {data?.paymentFaq && (
              <div className="mb-8 xl:mb-14 2xl:mb-20">
                <Heading
                  as="h2"
                  size="none"
                  className="text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px] leading-normal tracking-tight font-light text-black mb-4 xl:mb-8 2xl:mb-10"
                >
                  {parse(data?.paymentFaq?.title)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                      locale === "ar"
                        ? "-translate-x-1 xl:-translate-x-2 "
                        : "translate-x-1 xl:translate-x-2 "
                    )}
                  />
                </Heading>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  {data?.paymentFaq?.items?.map((item, index) => (
                    <AccordionItem
                      key={"general-faq-" + index}
                      value={"item" + index}
                      className="last:border-b first:border-t"
                    >
                      <AccordionTrigger className={accordionTriggerStyle}>
                        {parse(item?.question)}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          dir={locale === "ar" ? "rtl" : "ltr"}
                          className={cn("typography", "[--text-color:#282828]")}
                        >
                          {parse(item?.answer)}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            {data?.returnFaq && (
              <div className="mb-8 xl:mb-14 2xl:mb-20">
                <Heading
                  as="h2"
                  size="none"
                  className="text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px] leading-normal tracking-tight font-light text-black mb-4 xl:mb-8 2xl:mb-10"
                >
                  {parse(data?.returnFaq?.title)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                      locale === "ar"
                        ? "-translate-x-1 xl:-translate-x-2 "
                        : "translate-x-1 xl:translate-x-2 "
                    )}
                  />
                </Heading>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  {data?.returnFaq?.items?.map((item, index) => (
                    <AccordionItem
                      key={"general-faq-" + index}
                      value={"item" + index}
                      className="last:border-b first:border-t"
                    >
                      <AccordionTrigger className={accordionTriggerStyle}>
                        {parse(item?.question)}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          dir={locale === "ar" ? "rtl" : "ltr"}
                          className={cn("typography", "[--text-color:#282828]")}
                        >
                          {parse(item?.answer)}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            {data?.productFaq && (
              <div className="mb-8 xl:mb-14 2xl:mb-20">
                <Heading
                  as="h2"
                  size="none"
                  className="text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px] leading-normal tracking-tight font-light text-black mb-4 xl:mb-8 2xl:mb-10"
                >
                  {parse(data?.productFaq?.title)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                      locale === "ar"
                        ? "-translate-x-1 xl:-translate-x-2 "
                        : "translate-x-1 xl:translate-x-2 "
                    )}
                  />
                </Heading>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  {data?.productFaq?.items?.map((item, index) => (
                    <AccordionItem
                      key={"general-faq-" + index}
                      value={"item" + index}
                      className="last:border-b first:border-t"
                    >
                      <AccordionTrigger className={accordionTriggerStyle}>
                        {parse(item?.question)}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          dir={locale === "ar" ? "rtl" : "ltr"}
                          className={cn("typography", "[--text-color:#282828]")}
                        >
                          {parse(item?.answer)}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            {data?.warrantyFaq && (
              <div className="mb-8 xl:mb-14 2xl:mb-20">
                <Heading
                  as="h2"
                  size="none"
                  className="text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px] leading-normal tracking-tight font-light text-black mb-4 xl:mb-8 2xl:mb-10"
                >
                  {parse(data?.warrantyFaq?.title)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                      locale === "ar"
                        ? "-translate-x-1 xl:-translate-x-2 "
                        : "translate-x-1 xl:translate-x-2 "
                    )}
                  />
                </Heading>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  {data?.warrantyFaq?.items?.map((item, index) => (
                    <AccordionItem
                      key={"warranty-faq-" + index}
                      value={"item" + index}
                      className="last:border-b first:border-t"
                    >
                      <AccordionTrigger className={accordionTriggerStyle}>
                        {parse(item?.question)}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          dir={locale === "ar" ? "rtl" : "ltr"}
                          className={cn("typography", "[--text-color:#282828]")}
                        >
                          {parse(item?.answer)}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
            {data?.moreFaq && (
              <div className="mb-8 xl:mb-14 2xl:mb-20">
                <Heading
                  as="h2"
                  size="none"
                  className="text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px] leading-normal tracking-tight font-light text-black mb-4 xl:mb-8 2xl:mb-10"
                >
                  {parse(data?.moreFaq?.title)}
                  <span
                    className={cn(
                      "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block translate-x-1 xl:translate-x-2 ",
                      locale === "ar"
                        ? "-translate-x-1 xl:-translate-x-2 "
                        : "translate-x-1 xl:translate-x-2 "
                    )}
                  />
                </Heading>
                <div
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className={cn("typography", "[--text-color:#282828]")}
                >
                  {parse(data?.moreFaq?.description)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
