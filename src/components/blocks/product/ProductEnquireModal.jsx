"use client";
import React, { useState } from "react";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/utils/heading";
import parse from "html-react-parser";
import ProductEnquiryForm from "@/components/form/product-enquiry-form";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Text } from "@/components/utils/text";

const ProductEnquireModal = ({ children, data, locale, productId }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet dir={locale === "ar" ? "rtl" : "ltr"} open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={locale === "ar" ? "left" : "right"}
        showCloseButton={false}
        className={"max-w-[320px] sm:max-w-[320px] xl:max-w-[340px] 2xl:max-w-[468px] gap-0"}
      >
        <SheetHeader className="min-h-(--header-y) border-b border-[#eee] px-4 sm:px-7 justify-center">
          <SheetTitle>{data?.title}</SheetTitle>
          <SheetDescription className="sr-only">{data?.subtitle}</SheetDescription>
        </SheetHeader>

        <div className="w-full min-h-[calc(100vh-(var(--header-y)+77px))] overflow-y-scroll px-4 sm:px-7">
          <Heading as="div" size="heading5" className="font-medium text-[#282828] mb-2 2xl:mb-3 mt-2.5 2xl:mt-4">
            {data?.subtitle}
          </Heading>
          <Text as="div" size="text3" className="text-[#282828] mb-2 2xl:mb-4">
            {parse(data?.description)}
          </Text>
          <ProductEnquiryForm locale={locale} productId={productId} onClose={() => setIsSheetOpen(false)} />
        </div>

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

export default ProductEnquireModal;
