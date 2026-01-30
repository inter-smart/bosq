"use client";

import React, { useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, Loader2 } from "lucide-react";

const ProductChooseDesign = ({ children, data, locale, onOpenChange, models, currentModelId, designOptions, onModelChange, isModelLoading }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleModelClick = (model) => {
    onModelChange?.(model);
  };

  const sheetAccordionTriggerStyle = cn(
    "text-[12px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:invert-100",
  );

  return (
    <Sheet
      dir={locale === "ar" ? "rtl" : "ltr"}
      open={isSheetOpen}
      onOpenChange={(open) => {
        setIsSheetOpen(open);
        onOpenChange?.(open); // notify parent
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={locale === "ar" ? "left" : "right"}
        showCloseButton={false}
        className={"max-w-[320px] sm:max-w-[320px] xl:max-w-[340px] 2xl:max-w-[468px] gap-0"}
      >
        <SheetHeader className="min-h-(--header-y) border-b border-[#eee] px-4 sm:px-7 justify-center">
          <SheetTitle>{data?.title}</SheetTitle>
          <SheetDescription className="sr-only">Select your preferences</SheetDescription>
        </SheetHeader>

        <div className="w-full min-h-[calc(100dvh-(var(--header-y)+77px))] overflow-y-scroll px-2 sm:px-5">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            {/* Model */}
            <AccordionItem value="item-1" className="py-2 sm:py-3">
              <AccordionTrigger className={sheetAccordionTriggerStyle}>Model</AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-wrap">
                  {models?.map((item, index) => (
                    <div key={"chooseDesign" + index} className="w-1/2">
                      <div
                        className={cn(
                          "w-full h-full border rounded-[6px] p-1 2xl:p-2 cursor-pointer",
                          currentModelId === item?.id ? "border-[#282828]" : "border-white",
                        )}
                        onClick={() => handleModelClick(item)}
                      >
                        <Image
                          src={item?.media_path || "/images/placeholder.jpg"}
                          alt={item?.title}
                          width={75}
                          height={85}
                          className="w-[40px] xl:w-[45px] 2xl:w-[70px] aspect-[75/85] mx-auto mb-1 2xl:mb-1.5 block"
                        />
                        <div className="text-[8px] 2xl:text-[12px] leading-normal font-normal text-center text-[#282828] ">{item?.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* Dynamic Attributes */}
            {isModelLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              </div>
            ) : designOptions?.map((attribute, attrIndex) => (
              <AccordionItem key={attribute.id} value={`item-${attrIndex + 2}`} className="py-2 sm:py-3">
                <AccordionTrigger className={sheetAccordionTriggerStyle}>
                  {locale === "ar" ? attribute.name_ar : attribute.name}
                </AccordionTrigger>
                <AccordionContent className="p-2">
                  <div className="flex flex-col gap-2 sm:gap-4">
                    {attribute.values?.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`${attribute.slug}-${option.slug}`}
                          onCheckedChange={null}
                          className="rounded-none"
                        />
                        <Label
                          htmlFor={`${attribute.slug}-${option.slug}`}
                          className="text-[12px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                        >
                          {locale === "ar" ? option.value_ar : option.value}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <SheetFooter className="flex flex-row justify-between">
          <Button onClick={null} variant="black" className="min-w-full">
            Apply Filters
          </Button>
        </SheetFooter>
        <SheetClose
          className={cn(
            "w-14 h-(--header-y) bg-white border-b border-[#eee] absolute z-1 top-0 rounded-none! flex items-center justify-center",
            locale === "ar" ? "left-0" : "right-0",
          )}
          asChild
        >
          <Button variant="none" size="none">
            <X className="size-5 text-black" />
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default ProductChooseDesign;
