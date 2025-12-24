"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function OrderDetailsModal({ locale, children }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <Sheet
      dir={locale === "ar" ? "rtl" : "ltr"}
      open={isSheetOpen}
      onOpenChange={setIsSheetOpen}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side={locale === "ar" ? "left" : "right"}
        className={
          "max-w-[320px] sm:max-w-[320px] xl:max-w-[340px] 2xl:max-w-[468px]"
        }
      >
        <SheetHeader className="min-h-(--header-y) border-b border-[#eee] px-4 sm:px-7 justify-center">
          <SheetTitle>Enquire Now</SheetTitle>
          <SheetDescription className="sr-only">
            Select your preferences
          </SheetDescription>
        </SheetHeader>

        <div className="w-full min-h-[calc(100vh-var(--header-y))] overflow-y-scroll px-2 sm:px-5">
          <Heading
            as="div"
            size="heading5"
            className="font-normal text-[#282828] mb-2 2xl:mb-3 mt-2.5 2xl:mt-4"
          >
            Bulk Orders & Customisation Available!
          </Heading>
          <Text as="div" size="text3" className="text-[#282828] mb-2 2xl:mb-4">
            {parse(
              "<p>Need 10 or 100 chairs? Want them in your brand colours or a unique design? No problem.Just tell us what you need below!</p>"
            )}
          </Text>
        </div>

        {/* <SheetFooter className="flex flex-row justify-between">
          <Button onClick={null} variant="black" className="min-w-full">
            Submit Now
          </Button>
        </SheetFooter> */}

        <SheetClose
          className={cn(
            "w-14 h-(--header-y) bg-white border-b border-[#eee] absolute z-1 top-0 rounded-none! flex items-center justify-center",
            locale === "ar" ? "left-0" : "right-0"
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
}
