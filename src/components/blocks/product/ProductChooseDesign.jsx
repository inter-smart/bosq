"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X, Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const ProductChooseDesign = ({
  children,
  data,
  locale,
  onOpenChange,
  currentModelId,
  productSlug, // 👈 NEW (e.g. "dining-table")
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [models, setModels] = useState([]);
  const [isModelLoading, setIsModelLoading] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({});
  const [initialFilters, setInitialFilters] = useState({});
  const [selectedModelId, setSelectedModelId] = useState(currentModelId);

  const isModelChanged = selectedModelId !== currentModelId;

  // Track if any filters have changed from initial values
  const isFiltersChanged = useMemo(() => {
    const initialKeys = Object.keys(initialFilters);
    const selectedKeys = Object.keys(selectedFilters);

    // If different number of keys, filters have changed
    if (initialKeys.length !== selectedKeys.length) return true;

    // Check if any value differs from initial
    return initialKeys.some((key) => selectedFilters[key] !== initialFilters[key]);
  }, [selectedFilters, initialFilters]);

  // Combined check: either model or filters have changed
  const hasAnyChanges = isModelChanged || isFiltersChanged;

  /* ----------------------------------------
   * Fetch models from API
   * -------------------------------------- */
  useEffect(() => {
    if (!productSlug) return;

    const fetchModels = async () => {
      try {
        setIsModelLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frontend/common-actions/product/choose-design?slug=${productSlug}`);
        const json = await res.json();



        setModels(json?.data?.models || []);
      } catch (error) {
        console.error("Failed to load design models", error);
      } finally {
        setIsModelLoading(false);
      }
    };

    fetchModels();
  }, [productSlug]);


  console.log("models", models);

  /* ----------------------------------------
   * Selected model
   * -------------------------------------- */
  const selectedModel = useMemo(() => models?.find((m) => m.id === selectedModelId), [models, selectedModelId]);

  const designOptions = selectedModel?.attributes || [];

  /* ----------------------------------------
   * Sync selected model when external changes
   * -------------------------------------- */
  useEffect(() => {
    setSelectedModelId(currentModelId);
  }, [currentModelId]);

  /* ----------------------------------------
   * Auto-fill filters from initial data
   * -------------------------------------- */
  useEffect(() => {
    if (!data?.attributes) return;

    const filters = {};
    data.attributes.forEach((attr) => {
      if (attr.values?.length) {
        filters[attr.slug] = attr.values[0].slug;
      }
    });

    setSelectedFilters(filters);
    setInitialFilters(filters); // Store initial state for comparison
  }, [data]);

  /* ----------------------------------------
   * Handlers
   * -------------------------------------- */
  const handleModelClick = useCallback((model) => {
    setSelectedModelId(model.id);
  }, []);

  const handleRadioChange = (attributeSlug, valueSlug) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [attributeSlug]: prev[attributeSlug] === valueSlug ? null : valueSlug,
    }));
  };

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams();

    isModelChanged && params.set("model", selectedModel?.slug);

    isFiltersChanged &&
      Object.entries(selectedFilters).forEach(([attributeSlug, valueSlug]) => {
        if (valueSlug) {
          params.set(`attr_${attributeSlug}`, valueSlug);
        }
      });

    const newUrl = `${pathname}?${params.toString()}`;

    console.log("Selected Filters:", selectedFilters);
    console.log("Initial Filters:", initialFilters);
    console.log("Is Model Changed:", isModelChanged);
    console.log("Is Filters Changed:", isFiltersChanged);
    console.log("Has Any Changes:", hasAnyChanges);
    console.log("New URL:", newUrl);

    router.push(newUrl);

    setIsSheetOpen(false);
    onOpenChange?.(false);
  }, [pathname, router, selectedFilters, initialFilters, selectedModel, isModelChanged, isFiltersChanged, hasAnyChanges, onOpenChange]);

  const handleClearFilters = useCallback(() => {
    if (selectedModel?.attributes) {
      const resetFilters = {};
      selectedModel.attributes.forEach((attr) => {
        if (attr.values?.length) {
          resetFilters[attr.slug] = attr.values[0].slug;
        }
      });
      setSelectedFilters(resetFilters);
    } else {
      setSelectedFilters({});
    }

    setSelectedModelId(currentModelId);
  }, [selectedModel, currentModelId]);

  /* ----------------------------------------
   * Styles
   * -------------------------------------- */
  const sheetAccordionTriggerStyle = cn(
    "text-[12px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:invert-100",
  );

  /* ----------------------------------------
   * Render
   * -------------------------------------- */
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
        className="max-w-[320px] sm:max-w-[320px] xl:max-w-[340px] 2xl:max-w-[468px] gap-0"
      >
        <SheetHeader className="min-h-(--header-y) border-b border-[#eee] px-4 sm:px-7 justify-center">
          <SheetTitle>Choose Your Design</SheetTitle>
          <SheetDescription className="sr-only">Select your preferences</SheetDescription>
        </SheetHeader>

        <div className="w-full min-h-[calc(100dvh-(var(--header-y)+77px))] overflow-y-scroll px-2 sm:px-5">
          <Accordion type="single" collapsible defaultValue="item-1">
            {/* Model */}
            <AccordionItem value="item-1" className="py-2 sm:py-3">
              <AccordionTrigger className={sheetAccordionTriggerStyle}>Model</AccordionTrigger>

              <AccordionContent className="p-2">
                {isModelLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                  </div>
                ) : (
                  <div className="flex flex-wrap">
                    {models?.map((item) => (
                      <div key={item.id} className="w-1/2">
                        <div
                          className={cn(
                            "w-full h-full border rounded-[6px] p-1 2xl:p-2 cursor-pointer select-none",
                            selectedModelId === item.id ? "border-[#282828]" : "border-white",
                          )}
                          onClick={() => handleModelClick(item)}
                        >
                          <Image
                            src={item.media_path || "/images/placeholder.jpg"}
                            alt={item.title}
                            width={75}
                            height={85}
                            className="w-[40px] xl:w-[45px] 2xl:w-[70px] aspect-[75/85] mx-auto mb-1 block"
                          />
                          <div className="text-[8px] 2xl:text-[12px] text-center">{item.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Attributes */}
            {designOptions?.map((attribute, index) => (
              <AccordionItem key={attribute.id} value={`item-${index + 2}`} className="py-2 sm:py-3">
                <AccordionTrigger className={sheetAccordionTriggerStyle}>{locale === "ar" ? attribute.name_ar : attribute.name}</AccordionTrigger>

                <AccordionContent className="p-2">
                  <RadioGroup value={selectedFilters[attribute.slug] || ""} className="flex flex-col gap-2 sm:gap-4">
                    {attribute.values?.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleRadioChange(attribute.slug, option.slug)}
                      >
                        <RadioGroupItem
                          value={option.slug}
                          variant="checkbox"
                          checked={selectedFilters[attribute.slug] === option.slug}
                          className="pointer-events-none"
                        />
                        <Label className="text-[12px] text-[#666]">{locale === "ar" ? option.value_ar : option.value}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <SheetFooter className="flex justify-between gap-2">
          <Button variant="black" onClick={handleApplyFilters} className="min-w-[45%]">
            {locale === "ar" ? "تطبيق" : "Apply Filters"}
          </Button>
        </SheetFooter>

        <SheetClose
          className={cn(
            "w-14 h-(--header-y) bg-white border-b border-[#eee] absolute top-0 flex items-center justify-center",
            locale === "ar" ? "left-0" : "right-0",
          )}
          asChild
        >
          <Button variant="none" size="none">
            <X className="size-5" />
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default ProductChooseDesign;
