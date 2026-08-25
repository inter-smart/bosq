"use client";

import React, { useState, useEffect, useMemo, useCallback, useTransition } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "@/components/utils/custom-image";
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
  const [isPending, startTransition] = useTransition();

  const isEn = locale === "en";

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [models, setModels] = useState([]);
  const [isModelLoading, setIsModelLoading] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({});
  const [initialFilters, setInitialFilters] = useState({});
  const [selectedModelId, setSelectedModelId] = useState(currentModelId);

  const isModelChanged = selectedModelId !== currentModelId;

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
      } finally {
        setIsModelLoading(false);
      }
    };

    fetchModels();
  }, [productSlug]);

  /* ----------------------------------------
   * Selected model
   * -------------------------------------- */
  const selectedModel = useMemo(() => models?.find((m) => String(m.id) === String(selectedModelId)), [models, selectedModelId]);

  const designOptions = selectedModel?.attributes || [];

  /* ----------------------------------------
   * Sync selected model when external changes
   * -------------------------------------- */
  useEffect(() => {
    if (currentModelId !== undefined && currentModelId !== null) {
      setSelectedModelId(currentModelId);
    }
  }, [currentModelId]);

  /* ----------------------------------------
   * Auto-fill filters from initial data
   * -------------------------------------- */
  useEffect(() => {
    if (!data) return;

    const filters = {};
    // Try both attributes and attribute_values (API returns attribute_values in initialVariant)
    const sourceAttributes = data.attributes || [];
    const attributeValues = data.attribute_values || [];

    if (sourceAttributes.length > 0) {
      sourceAttributes.forEach((attr) => {
        if (attr.values?.length) {
          filters[attr.slug] = attr.values[0].slug;
        }
      });
    } else if (attributeValues.length > 0) {
      attributeValues.forEach((val) => {
        if (val.attribute?.slug) {
          filters[val.attribute.slug] = val.slug;
        }
      });
    }

    if (Object.keys(filters).length > 0) {
      setSelectedFilters(filters);
      setInitialFilters(filters);
    }
  }, [data]);

  /* ----------------------------------------
   * Resolve a clicked attribute value to the closest real variant
   * combination, based on the model's variant_lookups. Every value
   * stays clickable; if the click would otherwise produce a
   * non-existent combination, the other attributes silently snap
   * to the nearest variant that still honors the clicked value,
   * preferring to keep as many of the current selections as possible.
   * -------------------------------------- */
  const resolveVariantForChange = useCallback(
    (attributeSlug, valueSlug) => {
      const candidates = (selectedModel?.variant_lookups || []).filter((lookup) => lookup.attributes?.[attributeSlug] === valueSlug);
      if (candidates.length === 0) return null;

      let best = candidates[0];
      let bestScore = -1;
      for (const candidate of candidates) {
        const score = Object.entries(selectedFilters).filter(
          ([slug, val]) => slug === attributeSlug || candidate.attributes?.[slug] === val,
        ).length;
        if (score > bestScore) {
          best = candidate;
          bestScore = score;
        }
      }
      return best;
    },
    [selectedModel, selectedFilters],
  );

  /* ----------------------------------------
   * Apply a filter/model selection immediately by pushing the
   * shareable URL (?model=slug&attr_x=y...). Wrapped in a
   * transition so the sheet can show a pending state and avoid
   * racing overlapping navigations from rapid clicks.
   * -------------------------------------- */
  const navigateWithFilters = useCallback(
    (filters, modelSlug) => {
      const params = new URLSearchParams();

      if (modelSlug) {
        params.set("model", modelSlug);
      }

      Object.entries(filters).forEach(([attributeSlug, valueSlug]) => {
        if (valueSlug) {
          params.set(`attr_${attributeSlug}`, valueSlug);
        }
      });

      const newUrl = `${pathname}?${params.toString()}`;

      startTransition(() => {
        router.push(newUrl, { scroll: false });
      });
    },
    [pathname, router],
  );

  /* ----------------------------------------
   * Handlers
   * -------------------------------------- */
  const handleModelClick = useCallback(
    (model) => {
      if (isPending || String(model.id) === String(selectedModelId)) return;

      setSelectedModelId(model.id);

      // Default to the model's first real variant so switching models
      // always resolves to an actual product, no attribute picks needed.
      const defaultVariant = model.variant_lookups?.[0];
      const defaultFilters = defaultVariant?.attributes || {};

      setSelectedFilters(defaultFilters);
      navigateWithFilters(defaultFilters, model.slug);
    },
    [isPending, selectedModelId, navigateWithFilters],
  );

  const handleRadioChange = (attributeSlug, valueSlug) => {
    if (isPending) return;

    const resolved = resolveVariantForChange(attributeSlug, valueSlug);
    if (!resolved) return;

    setSelectedFilters(resolved.attributes);
    navigateWithFilters(resolved.attributes, selectedModel?.slug);
  };

  const handleClearFilters = useCallback(() => {
    const originalModel = models.find((m) => String(m.id) === String(currentModelId)) || selectedModel;

    let resetFilters = {};

    if (originalModel?.attributes) {
      originalModel.attributes.forEach((attr) => {
        if (attr.values?.length) {
          resetFilters[attr.slug] = attr.values[0].slug;
        }
      });
    }

    // Prefer the originally-selected combination if we have one.
    if (Object.keys(initialFilters).length > 0) {
      resetFilters = initialFilters;
    }

    setSelectedFilters(resetFilters);
    setSelectedModelId(currentModelId);
    navigateWithFilters(resetFilters, originalModel?.slug);
  }, [models, selectedModel, currentModelId, initialFilters, navigateWithFilters]);

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
          <SheetTitle>{isEn ? "Choose Your Design" : "اختر تصميمك"}</SheetTitle>
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
                            String(selectedModelId) === String(item.id) ? "border-[#282828]" : "border-white",
                            isPending && "opacity-50 pointer-events-none",
                          )}
                          onClick={() => handleModelClick(item)}
                        >
                          <Image
                            src={item.media_path || "/images/placeholder.jpg"}
                            alt={item.title}
                            width={75}
                            height={85}
                            className="w-[40px] xl:w-[45px] 2xl:w-[70px] aspect-[75/85] mx-auto mb-1 block"
                            quality={90}
                          />
                          <div className="text-[8px] 2xl:text-[12px] text-center">{isEn ? item.title : item.title_ar}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Attributes */}
            {designOptions?.length === 0 && !isModelLoading && (
              <div className="text-[12px] xl:text-[14px] leading-normal font-light text-[#808080] py-6 px-4 text-center">
                No attributes found in choose your design section
              </div>
            )}
            {designOptions?.map((attribute, index) => (
              <AccordionItem key={attribute.id} value={`item-${index + 2}`} className="py-2 sm:py-3">
                <AccordionTrigger className={sheetAccordionTriggerStyle}>{locale === "ar" ? attribute.name_ar : attribute.name}</AccordionTrigger>

                <AccordionContent className="p-2">
                  <RadioGroup value={selectedFilters[attribute.slug] || ""} className="flex flex-col gap-2 sm:gap-4">
                    {attribute.values?.map((option) => (
                      <div
                        key={option.id}
                        className={cn("flex items-center gap-2", isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer")}
                        onClick={() => !isPending && handleRadioChange(attribute.slug, option.slug)}
                      >
                        <RadioGroupItem
                          value={option.slug}
                          variant="checkbox"
                          checked={selectedFilters[attribute.slug] === option.slug}
                          disabled={isPending}
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
