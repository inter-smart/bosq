"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const ProductChooseDesign = ({ children, data, locale, onOpenChange, models, currentModelId, onModelChange, isModelLoading, currentModelSlug }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedModelId, setSelectedModelId] = useState(currentModelId);

  // Get design options from the selected model's attributes (temporary selection in sheet)
  const selectedModel = useMemo(() => models?.find((model) => model.id === selectedModelId), [models, selectedModelId]);
  const designOptions = selectedModel?.attributes || [];

  // Sync selectedModelId when currentModelId changes (external changes)
  useEffect(() => {
    setSelectedModelId(currentModelId);
  }, [currentModelId]);

  // Auto-fill selected filters based on data.attributes
  useEffect(() => {
    if (data?.attributes) {
      const initialFilters = {};
      data.attributes.forEach((attr) => {
        // Auto-select all values for each attribute from data
        initialFilters[attr.slug] = attr.values.map((v) => v.slug);
      });
      setSelectedFilters(initialFilters);
    }
  }, [data]);

  // Handle model click in the sheet (temporary selection)
  const handleModelClick = useCallback((model) => {
    setSelectedModelId(model.id);
  }, []);

  const handleCheckboxChange = (attributeSlug, valueSlug, isChecked) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[attributeSlug] || [];

      if (isChecked) {
        // Add the value if checked
        return {
          ...prev,
          [attributeSlug]: [...currentValues, valueSlug],
        };
      } else {
        // Remove the value if unchecked
        return {
          ...prev,
          [attributeSlug]: currentValues.filter((v) => v !== valueSlug),
        };
      }
    });
  };

  // Find the best matching model based on selected filters
  const findMatchingModel = useCallback(() => {
    if (!models || models.length === 0) return null;

    // Get the selected attribute value slugs as a flat set for matching
    const selectedValueSlugs = new Set();
    Object.values(selectedFilters).forEach((valueSlugs) => {
      valueSlugs.forEach((slug) => selectedValueSlugs.add(slug));
    });

    // If no filters selected, use the selected model from the sheet
    if (selectedValueSlugs.size === 0) {
      return selectedModel;
    }

    // Find a model that best matches the selected filter values
    let bestMatch = selectedModel;
    let bestMatchScore = 0;

    for (const model of models) {
      if (!model.attributes) continue;

      let matchScore = 0;
      let totalValues = 0;

      model.attributes.forEach((attr) => {
        attr.values?.forEach((val) => {
          totalValues++;
          if (selectedValueSlugs.has(val.slug)) {
            matchScore++;
          }
        });
      });

      // Calculate match percentage
      const matchPercentage = totalValues > 0 ? matchScore / totalValues : 0;

      if (matchPercentage > bestMatchScore) {
        bestMatchScore = matchPercentage;
        bestMatch = model;
      }
    }

    return bestMatch;
  }, [models, selectedFilters, selectedModel]);

  const handleApplyFilters = useCallback(() => {
    // Get the matching model based on selected filters
    const matchingModel = findMatchingModel();

    if (matchingModel && matchingModel.slug) {
      // Build URL search params
      const params = new URLSearchParams();

      // Set initial_fetch to false
      params.set("initial_fetch", "false");

      // Add model slug
      params.set("model", matchingModel.slug);

      // Add selected attributes in the format attr_[attributeSlug]=value1,value2
      Object.entries(selectedFilters).forEach(([attributeSlug, valueSlugs]) => {
        if (valueSlugs && valueSlugs.length > 0) {
          params.set(`attr_${attributeSlug}`, valueSlugs.join(","));
        }
      });

      // Navigate to the new URL with query params
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(newUrl);
    } else if (matchingModel) {
      // If no slug but model exists, use the onModelChange callback
      onModelChange?.(matchingModel);
    }

    // Close the sheet
    setIsSheetOpen(false);
    onOpenChange?.(false);
  }, [findMatchingModel, pathname, router, onModelChange, onOpenChange, selectedFilters]);

  // Clear all selected filters (reset to all values selected)
  const handleClearFilters = useCallback(() => {
    if (selectedModel?.attributes) {
      const resetFilters = {};
      selectedModel.attributes.forEach((attr) => {
        resetFilters[attr.slug] = attr.values.map((v) => v.slug);
      });
      setSelectedFilters(resetFilters);
    } else {
      setSelectedFilters({});
    }
    // Reset to current model
    setSelectedModelId(currentModelId);
  }, [selectedModel, currentModelId]);

  const sheetAccordionTriggerStyle = cn(
    "text-[12px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:invert-100",
  );

  return (
    <Sheet
      dir={locale === "ar" ? "rtl" : "ltr"}
      open={isSheetOpen}
      onOpenChange={(open) => {
        setIsSheetOpen(open);
        onOpenChange?.(open);
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
                          selectedModelId === item?.id ? "border-[#282828]" : "border-white",
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
            ) : (
              designOptions?.map((attribute, attrIndex) => (
                <AccordionItem key={attribute.id} value={`item-${attrIndex + 2}`} className="py-2 sm:py-3">
                  <AccordionTrigger className={sheetAccordionTriggerStyle}>{locale === "ar" ? attribute.name_ar : attribute.name}</AccordionTrigger>
                  <AccordionContent className="p-2">
                    <div className="flex flex-col gap-2 sm:gap-4">
                      {attribute.values?.map((option) => (
                        <div key={option.id} className="flex items-center gap-2">
                          <Checkbox
                            id={`${attribute.slug}-${option.slug}`}
                            checked={selectedFilters[attribute.slug]?.includes(option.slug)}
                            onCheckedChange={(checked) => handleCheckboxChange(attribute.slug, option.slug, checked)}
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
              ))
            )}
          </Accordion>
        </div>

        <SheetFooter className="flex flex-row justify-between gap-2">
          <Button onClick={handleClearFilters} variant="white" className="min-w-[100px] sm:min-w-[45%]">
            {locale === "ar" ? "مسح" : "Clear"}
          </Button>
          <Button onClick={handleApplyFilters} variant="black" className="min-w-[100px] sm:min-w-[45%]">
            {locale === "ar" ? "تطبيق" : "Apply Filters"}
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
