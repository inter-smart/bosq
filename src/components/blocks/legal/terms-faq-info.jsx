import parse from "html-react-parser";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/utils/heading";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accordionTriggerStyle = cn(
  "text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-normal text-[#282828] py-4 sm:py-4 xl:py-5 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:invert-100"
);

export default function TermsFaqInfo({ data, locale }) {

  const isEn = locale === "en";

  return (
    <section className="w-full block py-[20px] sm:py-[30px] xl:py-[40px] 2xl:py-[60px]">
      <div className="container">
        <div className="w-full lg:w-[740px] 2xl:w-[1120px]">
          <div className="mb-8 xl:mb-14 2xl:mb-20">
            <Heading
              as="h2"
              size="none"
              className="text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[26px] 2xl:text-[32px] 3xl:text-[40px] leading-normal tracking-tight font-light text-black mb-4 xl:mb-8 2xl:mb-10"
            >
              {parse(isEn? data?.title : data?.title_ar)}
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
              {data?.items?.map((item, index) => (
                <AccordionItem
                  key={"general-faq-" + index}
                  value={"item" + index}
                  className="last:border-b first:border-t"
                >
                  <AccordionTrigger className={accordionTriggerStyle}>
                    {parse(isEn? item?.question : item?.question_ar)}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      dir={locale === "ar" ? "rtl" : "ltr"}
                      className={cn("typography", "[--text-color:#282828]")}
                    >
                      {parse(isEn? item?.answer : item?.answer_ar)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
