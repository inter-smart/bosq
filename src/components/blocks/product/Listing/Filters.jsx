"use client";
import dynamic from "next/dynamic";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, Loader2 } from "lucide-react";
import Image from "@/components/utils/custom-image";
import { Button } from "@/components/ui/button";
import { SelectIcon } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";
import { PRICE_RANGES, sortByOptions, slugify } from "./searchParams";

const accordionTriggerStyle = cn(
  "text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:bg-black [&[data-state=open]>svg]:text-white capitalize",
);

// Base nuqs parsers (without dynamic attributes)
const baseFiltersParser = {
  category: parseAsArrayOf(parseAsString).withDefault([]),
  subcategory: parseAsArrayOf(parseAsString).withDefault([]),
  sector: parseAsArrayOf(parseAsString).withDefault([]),
  price: parseAsArrayOf(parseAsString).withDefault([]),
  sort: parseAsString.withDefault("default"),
  page: parseAsInteger.withDefault(1),
};

const ProductListFilters = ({ filterData, isEn }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Base nuqs state management
  const [queryState, setQueryState] = useQueryStates(baseFiltersParser, {
    history: "push",
    shallow: false,
    startTransition,
  });

  const { category, subcategory, sector, price, sort, page } = queryState;

  // Get current attribute values from URL
  const getAttributeValuesFromUrl = useCallback(
    (attrSlug) => {
      const paramValue = searchParams.get(`attr_${attrSlug}`);
      if (!paramValue) return [];
      return paramValue.split(",").filter(Boolean);
    },
    [searchParams],
  );

  // Slug <-> ID mapping utilities
  const slugMaps = useMemo(() => {
    const maps = {
      categorySlugToId: {},
      categoryIdToSlug: {},
      subcategorySlugToId: {},
      subcategoryIdToSlug: {},
      sectorSlugToId: {},
      sectorIdToSlug: {},
      attributeSlugToId: {},
      attributeIdToSlug: {},
    };

    filterData?.categories
      ?.filter((cat) => cat.parent_id === null)
      ?.forEach((cat) => {
        maps.categorySlugToId[cat.slug] = cat.id;
        maps.categoryIdToSlug[cat.id] = cat.slug;
      });

    filterData?.categories
      ?.filter((cat) => cat.parent_id !== null)
      ?.forEach((cat) => {
        maps.subcategorySlugToId[cat.slug] = cat.id;
        maps.subcategoryIdToSlug[cat.id] = cat.slug;
      });

    filterData?.sectors?.forEach((s) => {
      maps.sectorSlugToId[s.slug] = s.id;
      maps.sectorIdToSlug[s.id] = s.slug;
    });

    filterData?.attributes?.forEach((attr) => {
      maps.attributeSlugToId[attr.slug] = { attrId: attr.id, values: {} };
      maps.attributeIdToSlug[attr.id] = { name: attr.slug, values: {} };

      attr.values?.forEach((val) => {
        maps.attributeSlugToId[attr.slug].values[val.slug] = val.id;
        maps.attributeIdToSlug[attr.id].values[val.id] = val.slug;
      });
    });

    return maps;
  }, [filterData]);

  // Temporary Filter States (for sheet)
  const [tempFilters, setTempFilters] = useState({
    categories: [],
    subCategories: [],
    sectors: [],
    priceRanges: [],
    attributes: {},
  });

  // Sync temp filters when sheet opens
  useEffect(() => {
    if (isSheetOpen) {
      // Convert URL slugs to IDs for temp filters
      const attributesFromUrl = {};
      filterData?.attributes?.forEach((attr) => {
        const attrSlug = attr.slug;
        const valueSlugs = getAttributeValuesFromUrl(attrSlug);
        if (valueSlugs.length > 0) {
          const valueIds = valueSlugs
            .map(
              (valSlug) =>
                slugMaps.attributeSlugToId[attrSlug]?.values[valSlug],
            )
            .filter(Boolean);
          if (valueIds.length > 0) {
            attributesFromUrl[attr.id] = valueIds;
          }
        }
      });

      setTempFilters({
        categories: category
          .map((slug) => slugMaps.categorySlugToId[slug])
          .filter(Boolean),
        subCategories: subcategory
          .map((slug) => slugMaps.subcategorySlugToId[slug])
          .filter(Boolean),
        sectors: sector
          .map((slug) => slugMaps.sectorSlugToId[slug])
          .filter(Boolean),
        priceRanges: [...price],
        attributes: attributesFromUrl,
      });
    }
  }, [
    isSheetOpen,
    category,
    subcategory,
    sector,
    price,
    slugMaps,
    filterData,
    getAttributeValuesFromUrl,
  ]);

  // Helper functions to get display names
  const getCategoryNameBySlug = useCallback(
    (slug) => {
      const id = slugMaps.categorySlugToId[slug];
      const category = filterData?.categories?.find((c) => c.id === id);
      return isEn ? category?.name : category?.name_ar;
    },
    [filterData, slugMaps, isEn],
  );

  const getSubcategoryNameBySlug = useCallback(
    (slug) => {
      const id = slugMaps.subcategorySlugToId[slug];
      const subCategory = filterData?.categories?.find((c) => c.id === id);
      return isEn ? subCategory?.name : subCategory?.name_ar;
    },
    [filterData, slugMaps, isEn],
  );

  const getSectorNameBySlug = useCallback(
    (slug) => {
      const id = slugMaps.sectorSlugToId[slug];
      return filterData?.sectors?.find((s) => s.id === id)?.name;
    },
    [filterData, slugMaps],
  );

  const getPriceRangeLabel = useCallback(
    (key) => {
      const range = PRICE_RANGES.find((p) => p.key === key);
      return range ? (isEn ? range.label : range.label_ar) : key;
    },
    [isEn],
  );

  const getAttributeValueLabel = useCallback(
    (attrSlug, valSlug) => {
      const attr = filterData?.attributes?.find((a) => a.slug === attrSlug);
      const val = attr?.values?.find((v) => v.slug === valSlug);
      return val ? (isEn ? val.value : val.value_ar) : valSlug;    },
    [filterData, isEn],
  );

  const getAttributes = useMemo(
    () => filterData?.attributes || [],
    [filterData],
  );

  // Clear temp filters
  const clearTempFilters = useCallback(() => {
    setTempFilters({
      categories: [],
      subCategories: [],
      sectors: [],
      priceRanges: [],
      attributes: {},
    });
  }, []);

  // Toggle temp filter
  const toggleTempFilter = useCallback((filterType, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  }, []);

  // Toggle parent category — also clears its subcategories when deselected
  const toggleParentCategory = useCallback(
    (parentId) => {
      setTempFilters((prev) => {
        const isSelected = prev.categories.includes(parentId);
        if (isSelected) {
          const childIds =
            filterData?.categories
              ?.filter((c) => c.parent_id === parentId)
              .map((c) => c.id) || [];
          return {
            ...prev,
            categories: prev.categories.filter((id) => id !== parentId),
            subCategories: prev.subCategories.filter(
              (id) => !childIds.includes(id),
            ),
          };
        }
        return { ...prev, categories: [...prev.categories, parentId] };
      });
    },
    [filterData],
  );

  // Toggle attribute filter
  const toggleTempAttributeFilter = useCallback((attributeId, valueId) => {
    setTempFilters((prev) => {
      const currentValues = prev.attributes[attributeId] || [];
      const newValues = currentValues.includes(valueId)
        ? currentValues.filter((id) => id !== valueId)
        : [...currentValues, valueId];

      return {
        ...prev,
        attributes: {
          ...prev.attributes,
          [attributeId]: newValues,
        },
      };
    });
  }, []);

  // Remove individual filter
  const removeFilter = useCallback(
    (filterType, slug) => {
      const urlKey =
        filterType === "categories"
          ? "category"
          : filterType === "subCategories"
            ? "subcategory"
            : filterType === "sectors"
              ? "sector"
              : "price";

      if (filterType === "categories") {
        const parentId = slugMaps.categorySlugToId[slug];
        const childSlugs =
          filterData?.categories
            ?.filter((c) => c.parent_id === parentId)
            .map((c) => slugMaps.categoryIdToSlug[c.id])
            .filter(Boolean) || [];
        setQueryState((prev) => ({
          category: prev.category.filter((item) => item !== slug),
          subcategory: prev.subcategory.filter((s) => !childSlugs.includes(s)),
          page: 1,
        }));
      } else {
        setQueryState((prev) => ({
          [urlKey]: prev[urlKey].filter((item) => item !== slug),
          page: 1,
        }));
      }
    },
    [setQueryState, slugMaps, filterData],
  );

  // Remove attribute filter from URL
  const removeAttributeFilter = useCallback(
    (attrSlug, valueSlug) => {
      const currentValues = getAttributeValuesFromUrl(attrSlug);
      const newValues = currentValues.filter((v) => v !== valueSlug);

      // Build new URL with updated attribute
      const params = new URLSearchParams(searchParams.toString());
      if (newValues.length > 0) {
        params.set(`attr_${attrSlug}`, newValues.join(","));
      } else {
        params.delete(`attr_${attrSlug}`);
      }
      params.set("page", "1");

      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [searchParams, getAttributeValuesFromUrl, router],
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    // Build params without any filters
    startTransition(() => {
      router.push("?");
    });
  }, [router]);

  // Active filter count including attributes
  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += category.length;
    count += subcategory.length;
    count += sector.length;
    count += price.length;

    // Count attribute filters from URL
    filterData?.attributes?.forEach((attr) => {
      const values = getAttributeValuesFromUrl(attr.slug);
      count += values.length;
    });

    return count;
  }, [
    category,
    subcategory,
    sector,
    price,
    filterData,
    getAttributeValuesFromUrl,
  ]);

  // Get active attribute filters for display
  const activeAttributeFilters = useMemo(() => {
    const filters = [];
    filterData?.attributes?.forEach((attr) => {
      const values = getAttributeValuesFromUrl(attr.slug);
      values.forEach((valSlug) => {
        filters.push({
          attrSlug: attr.slug,
          valSlug,
          attrName: isEn ? attr.name : attr.name_ar,
          valLabel: getAttributeValueLabel(attr.slug, valSlug),
        });
      });
    });
    return filters;
  }, [filterData, getAttributeValuesFromUrl, isEn, getAttributeValueLabel]);

  // Apply filters (converts IDs to slugs, updates URL)
  const applyFilters = useCallback(() => {
    // If a parent category's subcategory is also selected, only the
    // subcategory should be sent as a filter — drop the redundant parent.
    const parentIdsWithSelectedChild = new Set(
      filterData?.categories
        ?.filter(
          (cat) =>
            cat.parent_id !== null &&
            tempFilters.subCategories.includes(cat.id),
        )
        .map((cat) => cat.parent_id),
    );

    const categorySlugs = tempFilters.categories
      .filter((id) => !parentIdsWithSelectedChild.has(id))
      .map((id) => slugMaps.categoryIdToSlug[id])
      .filter(Boolean);
    const subcategorySlugs = tempFilters.subCategories
      .map((id) => slugMaps.subcategoryIdToSlug[id])
      .filter(Boolean);
    const sectorSlugs = tempFilters.sectors
      .map((id) => slugMaps.sectorIdToSlug[id])
      .filter(Boolean);

    // Build URL params including attributes
    const params = new URLSearchParams();

    if (categorySlugs.length > 0) {
      params.set("category", categorySlugs.join(","));
    }
    if (subcategorySlugs.length > 0) {
      params.set("subcategory", subcategorySlugs.join(","));
    }
    if (sectorSlugs.length > 0) {
      params.set("sector", sectorSlugs.join(","));
    }
    if (tempFilters.priceRanges.length > 0) {
      params.set("price", tempFilters.priceRanges.join(","));
    }

    // Add attribute filters
    Object.entries(tempFilters.attributes).forEach(([attrId, valueIds]) => {
      if (valueIds.length > 0) {
        const attrSlug = slugMaps.attributeIdToSlug[attrId]?.name;
        if (attrSlug) {
          const valueSlugs = valueIds
            .map((valId) => slugMaps.attributeIdToSlug[attrId]?.values[valId])
            .filter(Boolean);
          if (valueSlugs.length > 0) {
            params.set(`attr_${attrSlug}`, valueSlugs.join(","));
          }
        }
      }
    });

    // Keep sort if not default
    if (sort !== "default") {
      params.set("sort", sort);
    }

    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
    setIsSheetOpen(false);
  }, [tempFilters, slugMaps, sort, router, filterData]);

  // Sort change handler
  const handleSortChange = useCallback(
    (value) => {
      setQueryState({ sort: value, page: 1 });
    },
    [setQueryState],
  );

  return (
    <div className="container max-sm:bg-white max-sm:py-2 max-sm:px-4 max-sm:shadow-sm max-sm:sticky top-0 left-0 right-0 z-1 max-sm:mb-2">
      {/* Loading indicator */}
      {isPending && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      )}

      {/* Filters and Sort Section */}
      <div className="flex flex-row justify-between items-center gap-4 sm:mb-1.5 2xl:mb-3">
        <div className="flex flex-wrap items-center gap-2 xl:gap-2 2xl:gap-3">
          {/* Filter Button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-medium text-[#282828] flex items-center gap-x-2">
                <Image
                  src="/images/icon-filter.svg"
                  alt="Filter"
                  width={20}
                  height={20}
                  className="w-[10px] xl:w-[15px] block"
                  quality={90}
                />
                <span>{isEn ? "Filters" : "المرشحات"}</span>
                {activeFilterCount > 0 && (
                  <span className="text-[8px] sm:text-[10px] leading-normal bg-black text-white px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent
              side={!isEn ? "right" : "left"}
              showCloseButton={false}
              className={
                "max-w-[320px] sm:max-w-[320px] xl:max-w-[340px] 2xl:max-w-[468px]"
              }
            >
              <SheetHeader className="min-h-(--header-y) border-b border-[#eee] px-4 sm:px-7 justify-center">
                <SheetTitle>{isEn ? "Filters" : "المرشحات"}</SheetTitle>
                <SheetDescription className="sr-only">
                  Select your preferences
                </SheetDescription>
              </SheetHeader>

              <div className="w-full min-h-[calc(100vh-240px)] overflow-y-scroll px-2 sm:px-5">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  {filterData?.categories?.length > 0 && (
                    <>
                      <AccordionItem value="item-1" className="py-2 sm:py-3">
                        <AccordionTrigger className={accordionTriggerStyle}>
                          {isEn ? "Categories" : "الاقسام"}
                        </AccordionTrigger>
                        <AccordionContent className="p-2">
                          <div className="flex flex-col gap-2 sm:gap-4">
                            {filterData?.categories
                              ?.filter((cat) => cat.parent_id === null)
                              ?.map((cat) => (
                                <div
                                  key={cat.id}
                                  className="flex items-center gap-2"
                                >
                                  <Checkbox
                                    id={`cat-${cat.id}`}
                                    checked={tempFilters.categories.includes(
                                      cat.id,
                                    )}
                                    onCheckedChange={() =>
                                      toggleParentCategory(cat.id)
                                    }
                                    className="rounded-none"
                                  />
                                  <Label
                                    htmlFor={`cat-${cat.id}`}
                                    className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                                  >
                                    {isEn ? cat.name : cat.name_ar}
                                  </Label>
                                </div>
                              ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      {(tempFilters.subCategories.length > 0 ||
                        (tempFilters.categories.length > 0 &&
                          filterData?.categories?.some(
                            (cat) =>
                              cat.parent_id !== null &&
                              tempFilters.categories.includes(cat.parent_id),
                          ))) && (
                        <AccordionItem value="item-2" className="py-2 sm:py-3">
                          <AccordionTrigger className={accordionTriggerStyle}>
                            {isEn ? "Sub Categories" : "الاقسام الفرعية"}
                          </AccordionTrigger>
                          <AccordionContent className="p-2">
                            <div className="flex flex-col gap-2 sm:gap-4">
                              {filterData?.categories
                                ?.filter(
                                  (cat) =>
                                    cat.parent_id !== null &&
                                    (tempFilters.categories.includes(
                                      cat.parent_id,
                                    ) ||
                                      tempFilters.subCategories.includes(
                                        cat.id,
                                      )),
                                )
                                ?.map((subCat) => (
                                  <div
                                    key={subCat.id}
                                    className="flex items-center gap-2"
                                  >
                                    <Checkbox
                                      id={`subcat-${subCat.id}`}
                                      checked={tempFilters.subCategories.includes(
                                        subCat.id,
                                      )}
                                      onCheckedChange={() =>
                                        toggleTempFilter(
                                          "subCategories",
                                          subCat.id,
                                        )
                                      }
                                      className="rounded-none"
                                    />
                                    <Label
                                      htmlFor={`subcat-${subCat.id}`}
                                      className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-light text-[#666] cursor-pointer"
                                    >
                                      {(() => {
                                        const parent =
                                          filterData?.categories?.find(
                                            (c) => c.id === subCat.parent_id,
                                          );
                                        const parentName = parent
                                          ? isEn
                                            ? parent.name
                                            : parent.name_ar
                                          : null;
                                        const subName = isEn
                                          ? subCat.name
                                          : subCat.name_ar;
                                        return parentName
                                          ? `${subName} - ${parentName}`
                                          : subName;
                                      })()}
                                    </Label>
                                  </div>
                                ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )}
                    </>
                  )}

                  {/* Sectors */}
                  {filterData?.sectors?.length > 0 && (
                    <AccordionItem value="item-3" className="py-2 sm:py-3">
                      <AccordionTrigger className={accordionTriggerStyle}>
                        {isEn ? "Sectors" : "القطاعات"}
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="flex flex-col gap-2 sm:gap-4">
                          {filterData?.sectors?.map((s) => (
                            <div key={s.id} className="flex items-center gap-2">
                              <Checkbox
                                id={`sector-${s.id}`}
                                checked={tempFilters.sectors.includes(s.id)}
                                onCheckedChange={() =>
                                  toggleTempFilter("sectors", s.id)
                                }
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`sector-${s.id}`}
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-light text-[#666] cursor-pointer"
                              >
                                {isEn ? s.name : s.name_ar}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Price Range */}
                  <AccordionItem value="item-4" className="py-2 sm:py-3">
                    <AccordionTrigger className={accordionTriggerStyle}>
                      {isEn ? "Price Range" : "نطاق السعر"}
                    </AccordionTrigger>
                    <AccordionContent className="p-2">
                      <div className="flex flex-col gap-2 sm:gap-4">
                        {PRICE_RANGES.map((range) => (
                          <div
                            key={range.key}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              id={`price-${range.key}`}
                              checked={tempFilters.priceRanges.includes(
                                range.key,
                              )}
                              onCheckedChange={() =>
                                toggleTempFilter("priceRanges", range.key)
                              }
                              className="rounded-none"
                            />
                            <Label
                              htmlFor={`price-${range.key}`}
                              className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-light text-[#666] cursor-pointer"
                            >
                              {isEn ? range.label : range.label_ar}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Dynamic Attributes */}
                  {getAttributes.map((attr) => (
                    <AccordionItem
                      key={attr.id}
                      value={`attr-${attr.id}`}
                      className="py-2 sm:py-3"
                    >
                      <AccordionTrigger className={accordionTriggerStyle}>
                        {isEn ? attr.name : attr.name_ar}
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="flex flex-col gap-2 sm:gap-4">
                          {attr.values?.map((val) => (
                            <div
                              key={val.id}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`attr-${attr.id}-${val.id}`}
                                checked={
                                  tempFilters.attributes[attr.id]?.includes(
                                    val.id,
                                  ) || false
                                }
                                onCheckedChange={() =>
                                  toggleTempAttributeFilter(attr.id, val.id)
                                }
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`attr-${attr.id}-${val.id}`}
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-light text-[#666] cursor-pointer"
                              >
                                {isEn ? val.value : val.value_ar}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <SheetFooter className="flex flex-row justify-between gap-2">
                <Button
                  onClick={clearTempFilters}
                  variant="white"
                  className="min-w-[100px] sm:min-w-[45%]"
                >
                  {isEn ? "Clear" : "واضح"}
                </Button>
                <Button
                  onClick={applyFilters}
                  variant="black"
                  className="min-w-[100px] sm:min-w-[45%]"
                >
                  {isEn ? "Apply Filters" : "تطبيق المرشحات"}
                </Button>
              </SheetFooter>
              <SheetClose
                className={cn(
                  "w-14 h-(--header-y) bg-white border-b border-[#eee] absolute z-1 top-0 rounded-none! flex items-center justify-center",
                  !isEn ? "left-0" : "right-0",
                )}
                asChild
              >
                <Button variant="none" size="none">
                  <X className="size-5 text-black" />
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>

          <MediaQuery minWidth={640}>
            {/* Active Filter Pills — grouped by type */}
            {category.length > 0 && (
              <GroupedFilterPill
                label={isEn ? "Category" : "فئة"}
                items={category.map((slug) => ({
                  key: slug,
                  displayName: getCategoryNameBySlug(slug) || slug,
                  onRemove: () => removeFilter("categories", slug),
                }))}
              />
            )}
            {subcategory.length > 0 && (
              <GroupedFilterPill
                label={isEn ? "Sub" : "فرعي"}
                items={subcategory.map((slug) => ({
                  key: slug,
                  displayName: getSubcategoryNameBySlug(slug) || slug,
                  onRemove: () => removeFilter("subCategories", slug),
                }))}
              />
            )}
            {sector.length > 0 && (
              <GroupedFilterPill
                label={isEn ? "Sector" : "قطاع"}
                items={sector.map((slug) => ({
                  key: slug,
                  displayName: getSectorNameBySlug(slug) || slug,
                  onRemove: () => removeFilter("sectors", slug),
                }))}
              />
            )}
            {price.length > 0 && (
              <GroupedFilterPill
                label={isEn ? "Price" : "السعر"}
                items={price.map((key) => ({
                  key,
                  displayName: getPriceRangeLabel(key),
                  onRemove: () => removeFilter("priceRanges", key),
                }))}
              />
            )}
            {/* Attribute Filter Pills — grouped per attribute */}
            {Object.entries(
              activeAttributeFilters.reduce((acc, f) => {
                if (!acc[f.attrSlug])
                  acc[f.attrSlug] = { attrName: f.attrName, values: [] };
                acc[f.attrSlug].values.push(f);
                return acc;
              }, {}),
            ).map(([attrSlug, { attrName, values }]) => (
              <GroupedFilterPill
                key={`attr-${attrSlug}`}
                label={attrName}
                items={values.map(({ valSlug, valLabel }) => ({
                  key: valSlug,
                  displayName: valLabel,
                  onRemove: () => removeAttributeFilter(attrSlug, valSlug),
                }))}
              />
            ))}
            {/* Clear All Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-normal text-[#282828] hover:text-[#f17423] underline"
              >
                {isEn ? "Clear Filters" : "مسح المرشحات"}
              </button>
            )}
          </MediaQuery>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1 2xl:gap-2">
          <span className="text-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-tight font-medium text-black">
            {isEn ? "Sort by" : "الترتيب حسب"}:
          </span>
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="text-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-tight font-medium truncate text-black w-[80px] sm:w-[110px] 2xl:w-[130px] border-none bg-transparent p-0 [&>svg]:hidden focus-visible:ring-0 rounded-none shadow-none">
              <SelectValue placeholder="Default" />
              <SelectIcon>
                <Image
                  src="/images/icon-dropdown.svg"
                  alt="Dropdown"
                  width={20}
                  height={20}
                  className="w-[10px] xl:w-[15px] block"
                  quality={90}
                />
              </SelectIcon>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortByOptions.map((option) => (
                  <SelectItem
                    className="text-[10px] sm:text-[12px] leading-tight font-medium text-black"
                    key={option.value}
                    value={option.value}
                  >
                    {isEn ? option.label : option.label_ar}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

function GroupedFilterPill({ label, items }) {
  return (
    <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-light text-[#282828] flex items-center bg-gray-100 rounded-full overflow-hidden">
      <span className="px-2.5 py-1.5 font-medium border-r border-gray-300 shrink-0">
        {label}
      </span>
      {items.map(({ key, displayName, onRemove }, i) => (
        <span
          key={key}
          className={cn(
            "flex items-center gap-x-1.5 px-2 py-1.5",
            i < items.length - 1 && "border-r border-gray-300",
          )}
        >
          <span>{displayName}</span>
          <button
            onClick={onRemove}
            className="hover:scale-105 transition-transform duration-300"
            aria-label="Remove filter"
          >
            <X className="size-2 xl:size-3.5 text-gray-600" />
          </button>
        </span>
      ))}
    </div>
  );
}

function FilterPill({ label, onRemove }) {
  return (
    <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-light text-[#282828] flex items-center gap-x-2 px-2.5 py-1 bg-gray-100 rounded-full">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:scale-105 transition-transform duration-300"
        aria-label="Remove filter"
      >
        <X className="size-2 xl:size-3.5 text-gray-600" />
      </button>
    </div>
  );
}

export default ProductListFilters;
