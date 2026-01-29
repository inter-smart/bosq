import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useMemo, useState } from "react";
const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SelectIcon } from "@radix-ui/react-select";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// ============ NUQS IMPORTS ============
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryStates } from "nuqs";

const sortByOptions = [
  { value: "default", label: "Default" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "name-a-z", label: "Name: A to Z" },
  { value: "name-z-a", label: "Name: Z to A" },
];

const PRICE_RANGES = [
  { key: "under-300", label: "Under AED 300", min: 0, max: 300 },
  { key: "300-500", label: "AED 300 - 500", min: 300, max: 500 },
  { key: "500-700", label: "AED 500 - 700", min: 500, max: 700 },
  { key: "above-700", label: "Above AED 700", min: 700, max: Infinity },
];

const accordionTriggerStyle = cn(
  "text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:bg-black [&[data-state=open]>svg]:text-white capitalize",
);

// ============ SLUG UTILITIES ============
// Convert any string to URL-friendly slug
const slugify = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single
};

// ============ NUQS PARSERS (Now using slugs/strings) ============
const filtersParser = {
  category: parseAsArrayOf(parseAsString).withDefault([]),
  subcategory: parseAsArrayOf(parseAsString).withDefault([]),
  sector: parseAsArrayOf(parseAsString).withDefault([]),
  price: parseAsArrayOf(parseAsString).withDefault([]),
  sort: parseAsString.withDefault("default"),
  page: parseAsInteger.withDefault(1),
};

const ProductListFilters = ({ filterData, isEn, onFiltersChange }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // ============ NUQS STATE MANAGEMENT ============
  const [queryState, setQueryState] = useQueryStates(filtersParser, {
    history: "push",
    shallow: false, // Allow Next.js to re-render on URL change
  });

  // Destructure for easier access
  const { category, subcategory, sector, price, sort, page } = queryState;

  // ============ SLUG <-> ID MAPPING UTILITIES ============
  const createSlugMaps = useCallback(() => {
    const maps = {
      categorySlugToId: {},
      categoryIdToSlug: {},
      subcategorySlugToId: {},
      subcategoryIdToSlug: {},
      sectorSlugToId: {},
      sectorIdToSlug: {},
      attributeSlugToId: {}, // { "color": { attrId: 1, values: { "red": 2, "blue": 3 } } }
      attributeIdToSlug: {}, // { 1: { name: "color", values: { 2: "red", 3: "blue" } } }
    };

    // Map categories (parent_id === null)
    filterData?.categories
      ?.filter((cat) => cat.parent_id === null)
      ?.forEach((cat) => {
        const slug = slugify(cat.name);
        maps.categorySlugToId[slug] = cat.id;
        maps.categoryIdToSlug[cat.id] = slug;
      });

    // Map subcategories (parent_id !== null)
    filterData?.categories
      ?.filter((cat) => cat.parent_id !== null)
      ?.forEach((cat) => {
        const slug = slugify(cat.name);
        maps.subcategorySlugToId[slug] = cat.id;
        maps.subcategoryIdToSlug[cat.id] = slug;
      });

    // Map sectors
    filterData?.sectors?.forEach((sector) => {
      const slug = slugify(sector.name);
      maps.sectorSlugToId[slug] = sector.id;
      maps.sectorIdToSlug[sector.id] = slug;
    });

    // Map attributes
    filterData?.attributes?.forEach((attr) => {
      const attrSlug = slugify(attr.name);
      maps.attributeSlugToId[attrSlug] = { attrId: attr.id, values: {} };
      maps.attributeIdToSlug[attr.id] = { name: attrSlug, values: {} };

      attr.values?.forEach((val) => {
        const valSlug = slugify(val.value);
        maps.attributeSlugToId[attrSlug].values[valSlug] = val.id;
        maps.attributeIdToSlug[attr.id].values[val.id] = valSlug;
      });
    });

    return maps;
  }, [filterData]);

  const slugMaps = useMemo(() => createSlugMaps(), [createSlugMaps]);

  // ============ CONVERT URL SLUGS TO IDS FOR API ============
  const getFiltersAsIds = useCallback(() => {
    return {
      categories: category.map((slug) => slugMaps.categorySlugToId[slug]).filter(Boolean),
      subCategories: subcategory.map((slug) => slugMaps.subcategorySlugToId[slug]).filter(Boolean),
      sectors: sector.map((slug) => slugMaps.sectorSlugToId[slug]).filter(Boolean),
      priceRanges: price.map((key) => PRICE_RANGES.find((p) => p.key === key)).filter(Boolean),
      attributes: {}, // Will be populated from dynamic attribute params
      sortBy: sort,
      page: page,
    };
  }, [category, subcategory, sector, price, sort, page, slugMaps]);

  // Temporary Filter States (for sheet) - uses IDs internally
  const [tempFilters, setTempFilters] = useState({
    categories: [],
    subCategories: [],
    sectors: [],
    priceRanges: [],
    attributes: {},
  });

  // Sync temp filters when sheet opens - convert URL slugs to IDs
  useEffect(() => {
    if (isSheetOpen) {
      setTempFilters({
        categories: category.map((slug) => slugMaps.categorySlugToId[slug]).filter(Boolean),
        subCategories: subcategory.map((slug) => slugMaps.subcategorySlugToId[slug]).filter(Boolean),
        sectors: sector.map((slug) => slugMaps.sectorSlugToId[slug]).filter(Boolean),
        priceRanges: [...price],
        attributes: {}, // TODO: Parse from URL if needed
      });
    }
  }, [isSheetOpen, category, subcategory, sector, price, slugMaps]);

  // Notify parent when URL filters change
  useEffect(() => {
    const filtersWithIds = getFiltersAsIds();
    onFiltersChange?.(filtersWithIds);
  }, [category, subcategory, sector, price, sort, page, getFiltersAsIds, onFiltersChange]);

  // Helper functions to get display names from IDs or slugs
  const getCategoryNameBySlug = useCallback(
    (slug) => {
      const id = slugMaps.categorySlugToId[slug];
      return filterData?.categories?.find((c) => c.id === id)?.name;
    },
    [filterData, slugMaps],
  );

  const getSubcategoryNameBySlug = useCallback(
    (slug) => {
      const id = slugMaps.subcategorySlugToId[slug];
      return filterData?.categories?.find((c) => c.id === id)?.name;
    },
    [filterData, slugMaps],
  );

  const getSectorNameBySlug = useCallback(
    (slug) => {
      const id = slugMaps.sectorSlugToId[slug];
      return filterData?.sectors?.find((s) => s.id === id)?.name;
    },
    [filterData, slugMaps],
  );

  const getPriceRangeLabel = useCallback((key) => PRICE_RANGES.find((p) => p.key === key)?.label, []);

  // Get other attributes
  const getAttributes = useMemo(() => filterData?.attributes || [], [filterData]);

  // ============ Clear temp filters ============
  const clearTempFilters = useCallback(() => {
    setTempFilters({
      categories: [],
      subCategories: [],
      sectors: [],
      priceRanges: [],
      attributes: {},
    });
  }, []);

  // ============ Toggle temp filter (uses IDs internally) ============
  const toggleTempFilter = useCallback((filterType, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value) ? prev[filterType].filter((item) => item !== value) : [...prev[filterType], value],
    }));
  }, []);

  // ============ Toggle attribute filter helper ============
  const toggleTempAttributeFilter = useCallback((attributeId, valueId) => {
    setTempFilters((prev) => {
      const currentValues = prev.attributes[attributeId] || [];
      const newValues = currentValues.includes(valueId) ? currentValues.filter((id) => id !== valueId) : [...currentValues, valueId];

      return {
        ...prev,
        attributes: {
          ...prev.attributes,
          [attributeId]: newValues,
        },
      };
    });
  }, []);

  // ============ Remove individual filter (updates URL with slugs) ============
  const removeFilter = useCallback(
    (filterType, slug) => {
      const urlKey = filterType === "categories" ? "category" : filterType === "subCategories" ? "subcategory" : filterType === "sectors" ? "sector" : "price";
      setQueryState((prev) => ({
        [urlKey]: prev[urlKey].filter((item) => item !== slug),
        page: 1, // Reset to page 1 when filters change
      }));
    },
    [setQueryState],
  );

  // ============ Clear all filters (updates URL) ============
  const clearAllFilters = useCallback(() => {
    setQueryState({
      category: [],
      subcategory: [],
      sector: [],
      price: [],
      sort: "default",
      page: 1,
    });
  }, [setQueryState]);

  // ============ Remove attribute filter (updates URL) ============
  // TODO: Implement when dynamic attributes are added to URL
  const removeAttributeFilter = useCallback((attrSlug, valueSlug) => {
    // Will be implemented when we add dynamic attribute URL params
    console.log("Remove attribute filter:", attrSlug, valueSlug);
  }, []);

  // ============ Active filter count ============
  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += category.length;
    count += subcategory.length;
    count += sector.length;
    count += price.length;
    // TODO: Add attribute count when implemented
    return count;
  }, [category, subcategory, sector, price]);

  // ============ Apply filters (converts IDs to slugs, updates URL) ============
  const applyFilters = useCallback(() => {
    // Convert IDs to slugs for URL
    const categorySlugs = tempFilters.categories.map((id) => slugMaps.categoryIdToSlug[id]).filter(Boolean);
    const subcategorySlugs = tempFilters.subCategories.map((id) => slugMaps.subcategoryIdToSlug[id]).filter(Boolean);
    const sectorSlugs = tempFilters.sectors.map((id) => slugMaps.sectorIdToSlug[id]).filter(Boolean);

    setQueryState({
      category: categorySlugs,
      subcategory: subcategorySlugs,
      sector: sectorSlugs,
      price: tempFilters.priceRanges,
      page: 1, // Reset to page 1 when applying new filters
    });
    setIsSheetOpen(false);
  }, [tempFilters, setQueryState, slugMaps]);

  // ============ Sort change handler (updates URL) ============
  const handleSortChange = useCallback(
    (value) => {
      setQueryState({ sort: value, page: 1 });
    },
    [setQueryState],
  );

  return (
    <div className="container max-sm:bg-white max-sm:py-2 max-sm:px-4 max-sm:shadow-sm max-sm:sticky top-0 left-0 right-0 z-1 max-sm:mb-2">
      {/* Filters and Sort Section */}
      <div className="flex flex-row justify-between items-center gap-4 sm:mb-1.5 2xl:mb-3">
        <div className="flex flex-wrap items-center gap-2 xl:gap-2 2xl:gap-3 ">
          {/* Filter Button */}

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-medium text-[#282828] flex items-center gap-x-2">
                <Image src="/images/icon-filter.svg" alt="Filter" width={20} height={20} className="w-[10px] xl:w-[15px] block" />
                <span>{isEn ? "Filters" : "المرشحات"}</span>
                {activeFilterCount > 0 && (
                  <span className="text-[8px] sm:text-[10px] leading-normal bg-black text-white px-2 py-0.5 rounded-full">{activeFilterCount}</span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent
              side={!isEn ? "right" : "left"}
              showCloseButton={false}
              className={"max-w-[320px] sm:max-w-[320px] xl:max-w-[340px] 2xl:max-w-[468px]"}
            >
              <SheetHeader className="min-h-(--header-y) border-b border-[#eee] px-4 sm:px-7 justify-center">
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription className="sr-only">Select your preferences</SheetDescription>
              </SheetHeader>

              <div className="w-full min-h-[calc(100vh-240px)] overflow-y-scroll px-2 sm:px-5">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  {/* Categories */}
                  <AccordionItem value="item-1" className="py-2 sm:py-3">
                    <AccordionTrigger className={accordionTriggerStyle}>{isEn ? "Categories" : "الاقسام"}</AccordionTrigger>
                    <AccordionContent className="p-2">
                      <div className="flex flex-col gap-2 sm:gap-4">
                        {filterData?.categories
                          ?.filter((cat) => cat.parent_id === null)
                          ?.map((cat) => (
                            <div key={cat.id} className="flex items-center gap-2">
                              <Checkbox
                                id={`cat-${cat.id}`}
                                checked={tempFilters.categories.includes(cat.id)}
                                onCheckedChange={() => toggleTempFilter("categories", cat.id)}
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

                  {/* Sub Categories */}
                  <AccordionItem value="item-2" className="py-2 sm:py-3">
                    <AccordionTrigger className={accordionTriggerStyle}>{isEn ? "Sub Categories" : "الاقسام الفرعية"}</AccordionTrigger>
                    <AccordionContent className="p-2">
                      <div className="flex flex-col gap-2 sm:gap-4">
                        {filterData?.categories
                          ?.filter((cat) => cat.parent_id !== null)
                          ?.map((subCat) => (
                            <div key={subCat.id} className="flex items-center gap-2">
                              <Checkbox
                                id={`subcat-${subCat.id}`}
                                checked={tempFilters.subCategories.includes(subCat.id)}
                                onCheckedChange={() => toggleTempFilter("subCategories", subCat.id)}
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`subcat-${subCat.id}`}
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                              >
                                {subCat.name}
                              </Label>
                            </div>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Sectors */}
                  <AccordionItem value="item-3" className="py-2 sm:py-3">
                    <AccordionTrigger className={accordionTriggerStyle}>Sectors</AccordionTrigger>
                    <AccordionContent className="p-2">
                      <div className="flex flex-col gap-2 sm:gap-4">
                        {filterData?.sectors?.map((sector) => (
                          <div key={sector.id} className="flex items-center gap-2">
                            <Checkbox
                              id={`sector-${sector.id}`}
                              checked={tempFilters.sectors.includes(sector.id)}
                              onCheckedChange={() => toggleTempFilter("sectors", sector.id)}
                              className="rounded-none"
                            />
                            <Label
                              htmlFor={`sector-${sector.id}`}
                              className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                            >
                              {sector.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Price Range */}
                  <AccordionItem value="item-4" className="py-2 sm:py-3">
                    <AccordionTrigger className={accordionTriggerStyle}>{isEn ? "Price Range" : "نطاق السعر"}</AccordionTrigger>
                    <AccordionContent className="p-2">
                      <div className="flex flex-col gap-2 sm:gap-4">
                        {PRICE_RANGES.map((range) => (
                          <div key={range.key} className="flex items-center gap-2">
                            <Checkbox
                              id={`price-${range.key}`}
                              checked={tempFilters.priceRanges.includes(range.key)}
                              onCheckedChange={() => toggleTempFilter("priceRanges", range.key)}
                              className="rounded-none"
                            />
                            <Label
                              htmlFor={`price-${range.key}`}
                              className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                            >
                              {isEn ? range.label : range.label_ar}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Other Attributes (dynamically rendered) */}
                  {getAttributes.map((attr) => (
                    <AccordionItem key={attr.id} value={`attr-${attr.id}`} className="py-2 sm:py-3">
                      <AccordionTrigger className={accordionTriggerStyle}>{isEn ? attr.name : attr.name_ar}</AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="flex flex-col gap-2 sm:gap-4">
                          {attr.values?.map((val) => (
                            <div key={val.id} className="flex items-center gap-2">
                              <Checkbox
                                id={`attr-${attr.id}-${val.id}`}
                                checked={tempFilters.attributes[attr.id]?.includes(val.id) || false}
                                onCheckedChange={() => toggleTempAttributeFilter(attr.id, val.id)}
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`attr-${attr.id}-${val.id}`}
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
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
                <Button onClick={clearTempFilters} variant="white" className="min-w-[100px] sm:min-w-[45%]">
                  {isEn ? "Clear" : "واضح"}
                </Button>
                <Button onClick={applyFilters} variant="black" className="min-w-[100px] sm:min-w-[45%]">
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
            {/* Active Filter Pills - Using slugs from URL */}
            {category.map((slug) => (
              <FilterPill
                key={`cat-${slug}`}
                label={`${isEn ? "Category" : "فئة"}: ${getCategoryNameBySlug(slug) || slug}`}
                onRemove={() => removeFilter("categories", slug)}
              />
            ))}
            {subcategory.map((slug) => (
              <FilterPill
                key={`subcat-${slug}`}
                label={`Sub: ${getSubcategoryNameBySlug(slug) || slug}`}
                onRemove={() => removeFilter("subCategories", slug)}
              />
            ))}
            {sector.map((slug) => (
              <FilterPill
                key={`sector-${slug}`}
                label={`Sector: ${getSectorNameBySlug(slug) || slug}`}
                onRemove={() => removeFilter("sectors", slug)}
              />
            ))}
            {price.map((key) => (
              <FilterPill key={`price-${key}`} label={getPriceRangeLabel(key) || key} onRemove={() => removeFilter("priceRanges", key)} />
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

              {/* Custom Dropdown Icon */}
              <SelectIcon>
                <Image src="/images/icon-dropdown.svg" alt="Dropdown" width={20} height={20} className="w-[10px] xl:w-[15px] block" />
              </SelectIcon>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {sortByOptions.map((option) => (
                  <SelectItem className="text-[10px] sm:text-[12px] leading-tight font-medium text-black" key={option.value} value={option.value}>
                    {option.label}
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

function FilterPill({ label, onRemove }) {
  return (
    <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-light text-[#282828] flex items-center gap-x-2 px-2.5 py-1 bg-gray-100 rounded-full">
      <span>{label}</span>
      <button onClick={onRemove} className="hover:scale-105 transition-transform duration-300" aria-label="Remove filter">
        <X className="size-2 xl:size-3.5 text-gray-600" />
      </button>
    </div>
  );
}

export default ProductListFilters;
