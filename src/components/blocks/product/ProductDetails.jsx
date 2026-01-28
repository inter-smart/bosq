"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
const Lightbox = dynamic(() => import("yet-another-react-lightbox"));
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { cn } from "@/lib/utils";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import parse from "html-react-parser";

const accordionTriggerStyle = cn(
  "text-[12px] 2xl:text-[14px] 3xl:text-[18px] leading-normal font-normal text-[#282828] py-4 sm:py-4 xl:py-5 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:invert-100",
);

const ProductDetails = ({ data, locale, setIndexProject, setOpenProject, openProject, indexProject }) => {
  const faqs = data?.faqs || [];
  const projects = data?.project_images || [];
  const additionalInfo = data?.additional_details || "";
  const details = data?.details || "";

  return (
    <div className="w-full mt-10 xl:mt-20">
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <hr />
        <AccordionItem value="item-1">
          <AccordionTrigger className={accordionTriggerStyle}>Product Details</AccordionTrigger>
          <AccordionContent className="sm:px-2">
            <div dir={locale === "ar" ? "rtl" : "ltr"} className="typography flex flex-wrap justify-between">
              <div className="xl:max-w-[540px] 2xl:max-w-[650px] 3xl:max-w-[820px]">{parse(details?.details)}</div>
              <div className="xl:max-w-[468px] 2xl:max-w-[576px] 3xl:max-w-[700px] border border-[#e9e9e9] rounded-lg px-2.5 xl:px-5 2xl:px-7.5 py-1 xl:py-2.5 2xl:py-4">
                {parse(details?.details_points)}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <hr />
        {projects?.length > 0 && (
          <>
            <AccordionItem value="item-2">
              <AccordionTrigger className={accordionTriggerStyle}>Projects</AccordionTrigger>
              <AccordionContent className="sm:p-2">
                <div className="flex flex-wrap -mx-0.5 *:p-0.5 mt-4 mb-4 xl:mb-6 2xl:mb-10">
                  {projects?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setIndexProject(index);
                        setOpenProject(true);
                      }}
                      className="h-[100px] xs:h-[120px] sm:h-[200px] xl:h-[240px] 2xl:h-[300px] 3xl:h-[376px] nth-[1]:w-35/100 nth-[2]:w-25/100 nth-[3]:w-40/100 nth-[4]:w-20/100 nth-[5]:w-20/100 nth-[6]:w-40/100 nth-[7]:w-20/100"
                    >
                      <div className="w-full h-full overflow-hidden">
                        <Image
                          src={item?.media_path || "/images/placeholder.jpg"}
                          alt={item?.media_alt || "Project Image"}
                          width={576}
                          height={376}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  ))}

                  <Lightbox
                    open={openProject}
                    close={() => setOpenProject(false)}
                    index={indexProject}
                    slides={projects?.map((src) => ({
                      src: src.media_path,
                    }))}
                    animation={{ fade: 0 }}
                    controller={{
                      closeOnPullDown: true,
                      closeOnBackdropClick: true,
                    }}
                    plugins={[Thumbnails]}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <hr />
          </>
        )}
        <AccordionItem value="item-3">
          <AccordionTrigger className={accordionTriggerStyle}>Additional Information</AccordionTrigger>
          <AccordionContent className="sm:p-2">
            <div dir={locale === "ar" ? "rtl" : "ltr"} className="typography">
              {parse(additionalInfo)}
            </div>
          </AccordionContent>
        </AccordionItem>
        {faqs.length > 0 && (
          <>
            <hr />
            <AccordionItem value="item-4">
              <AccordionTrigger className={accordionTriggerStyle}>FAQ</AccordionTrigger>
              <AccordionContent className="sm:p-2">
                {faqs.map((faq, index) => (
                  <div key={"faq" + index} className="typography mb-4">
                    <h6>
                      Q{index}: {faq?.question}
                    </h6>
                    <p>{faq?.answer}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <hr />
          </>
        )}
      </Accordion>
    </div>
  );
};

export default ProductDetails;
