"use client";

import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import parse from "html-react-parser";

const local_data = {
  en: {
    title: "No products found",
    description: "<p>We couldn't find any products matching your search. Try adjusting your filters or go back to browse all products.</p>",
    ctaText: "Go Back",
  },
  ar: {
    title: "لم يتم العثور على منتجات",
    description: "<p>لم نتمكن من العثور على أي منتجات تطابق بحثك. حاول تعديل الفلاتر أو عد للتصفح من جديد.</p>",
    ctaText: "العودة",
  },
};

export default function NoProductFound({ params, data = local_data }) {
  const locale = params?.locale || "en";
  const content = data[locale] ?? data["en"];

  const handleGoBack = () => {
    window.history.go(-1);
    window.addEventListener(
      "pageshow",
      (e) => {
        if (e.persisted) {
          window.location.reload();
        }
      },
      { once: true },
    );
  };

  return (
    <div className="w-full mt-(--header-y) py-12 sm:py-20 xl:py-40 2xl:py-60">
      <div className="container">
        <div className="w-full max-w-[320px] sm:max-w-[368px] xl:max-w-[400px] 2xl:max-w-[600px] mx-auto flex flex-col">
          <Heading as="h2" size="heading1" className="text-center text-black mb-2 xl:mb-3">
            {parse(content?.title)}
            <span
              className={cn(
                "w-1.5 2xl:w-2 aspect-square rounded-full bg-[#f17423] inline-block",
                locale === "ar" ? "-translate-x-1 xl:-translate-x-2" : "translate-x-1 xl:translate-x-2",
              )}
            />
          </Heading>
          <Text as="div" size="text1" className="text-center text-[#282828] mb-4 xl:mb-6">
            {parse(content?.description)}
          </Text>
          <Button variant={"black"} disabled={false} className="min-w-[168px] xl:min-w-[190px] 2xl:min-w-[220px] mx-auto" onClick={handleGoBack}>
            {content?.ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
}
