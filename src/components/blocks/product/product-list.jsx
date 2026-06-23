"use client";
import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "@/components/utils/custom-image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectIcon } from "@radix-ui/react-select";
import dynamic from "next/dynamic";
import ProductCard from "@/components/blocks/product/product-card";
import { ProductDataClient } from "@/lib/api/products/ResourcesApiClient";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

const PRICE_RANGES = [
  { label: "Under AED 300", min: 0, max: 300 },
  { label: "AED 300 - 500", min: 300, max: 500 },
  { label: "AED 500 - 700", min: 500, max: 700 },
  { label: "Above AED 700", min: 700, max: Infinity },
];

const ITEMS_PER_PAGE = 12;

const accordionTriggerStyle = cn(
  "text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:bg-black [&[data-state=open]>svg]:text-white capitalize",
);

const sortByOptions = [
  { value: "default", label: "Default" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "name-a-z", label: "Name: A to Z" },
  { value: "name-z-a", label: "Name: Z to A" },
];

export default function ProductList({ data, locale, filterData }) {
  const isEn = locale === "en";

  // UI States
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, totalPages: 0 });
  // Applied Filter States (using IDs from backend)
  const [filters, setFilters] = useState({
    categories: [], // array of category IDs (parent_id === null)
    subCategories: [], // array of subcategory IDs (parent_id !== null)
    sectors: [], // array of sector IDs
    priceRanges: [], // array of price range labels (static)
    attributes: {}, // object: { [attributeId]: [valueId, ...] }
  });

  // Temporary Filter States (for sheet)
  const [tempFilters, setTempFilters] = useState({ ...filters });

  // Sync temp filters when sheet opens
  useEffect(() => {
    if (isSheetOpen) {
      setTempFilters({ ...filters });
    }
  }, [isSheetOpen, filters]);

  // Reset to page 1 when filters or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  // Toggle filter helper for temp filters
  const toggleTempFilter = useCallback((category, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value) ? prev[category].filter((item) => item !== value) : [...prev[category], value],
    }));
  }, []);

  // Toggle attribute filter helper
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

  // Apply filters from sheet
  const applyFilters = useCallback(() => {
    setFilters({ ...tempFilters });

    setIsSheetOpen(false);
  }, [tempFilters]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    const emptyFilters = {
      categories: [],
      subCategories: [],
      sectors: [],
      priceRanges: [],
      attributes: {},
    };
    setFilters(emptyFilters);
    setTempFilters(emptyFilters);
  }, []);

  // Remove individual filter
  const removeFilter = useCallback((category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  }, []);

  // Remove attribute filter
  const removeAttributeFilter = useCallback((attrId, valueId) => {
    setFilters((prev) => {
      const currentValues = prev.attributes[attrId] || [];
      const newValues = currentValues.filter((id) => id !== valueId);
      const newAttributes = { ...prev.attributes };

      if (newValues.length === 0) {
        delete newAttributes[attrId];
      } else {
        newAttributes[attrId] = newValues;
      }

      return {
        ...prev,
        attributes: newAttributes,
      };
    });
  }, []);

  // Clear temp filters in sheet
  const clearTempFilters = useCallback(() => {
    setTempFilters({
      categories: [],
      subCategories: [],
      sectors: [],
      priceRanges: [],
      attributes: {},
    });
  }, []);

  // Helper functions to get display names from IDs
  const getCategoryName = useCallback((id) => filterData?.categories?.find((c) => c.id === id)?.name, [filterData]);

  const getSectorName = useCallback((id) => filterData?.sectors?.find((s) => s.id === id)?.name, [filterData]);

  const getAttributeValueName = useCallback(
    (attrId, valueId) => {
      const attr = filterData?.attributes?.find((a) => a.id === attrId);
      return attr?.values?.find((v) => v.id === valueId)?.value;
    },
    [filterData],
  );

  const getAttributeName = useCallback((attrId) => filterData?.attributes?.find((a) => a.id === attrId)?.name, [filterData]);

  // Get other attributes
  const getAttributes = useMemo(() => filterData?.attributes || [], [filterData]);

  // Server handles filtering, sorting, and pagination
  // Use pagination from server response
  const totalPages = pagination.totalPages;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, pagination.total);

  // Pagination helpers
  const goToPage = useCallback(
    (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages],
  );

  const goToPrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  // Generate pagination items
  const getPaginationItems = useCallback(() => {
    const items = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1);
        items.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push(1);
        items.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push("ellipsis");
        items.push(totalPages);
      }
    }

    return items;
  }, [currentPage, totalPages]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    // Count array filters
    count += filters.categories.length;
    count += filters.subCategories.length;
    count += filters.sectors.length;
    count += filters.priceRanges.length;
    // Count attribute filters
    Object.values(filters.attributes || {}).forEach((values) => {
      count += values.length;
    });
    return count;
  }, [filters]);

  const fetchProducts = useCallback(async () => {
    try {
      // Build query params from filters
      const params = new URLSearchParams();

      if (filters.categories.length > 0) {
        params.append("categories", filters.categories.join(","));
      }
      if (filters.subCategories.length > 0) {
        params.append("subCategories", filters.subCategories.join(","));
      }
      if (filters.sectors.length > 0) {
        params.append("sectors", filters.sectors.join(","));
      }
      if (Object.keys(filters.attributes).length > 0) {
        params.append("attributes", JSON.stringify(filters.attributes));
      }
      if (sortBy && sortBy !== "default") {
        params.append("sortBy", sortBy);
      }
      params.append("page", currentPage.toString());
      params.append("limit", ITEMS_PER_PAGE.toString());

      const { data, error } = await ProductDataClient.getProductList(params.toString());
      setProducts(data?.products || []);
      setPagination(data?.pagination || { total: 0, page: 1, limit: 12, totalPages: 0 });
    } catch (error) {
    }
  }, [filters, sortBy, currentPage]);

  // fetch products
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="w-full block py-[15px_30px] xl:py-[20px_60px] 2xl:py-[30px_100px]">
      <div className="container max-sm:bg-white max-sm:py-2 max-sm:px-4 max-sm:shadow-sm max-sm:sticky top-0 left-0 right-0 z-1 max-sm:mb-2">
        {/* Filters and Sort Section */}
        <div className="flex flex-row justify-between items-center gap-4 sm:mb-1.5 2xl:mb-3">
          <div className="flex flex-wrap items-center gap-2 xl:gap-2 2xl:gap-3 ">
            {/* Filter Button */}

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-medium text-[#282828] flex items-center gap-x-2">
                  <Image src="/images/icon-filter.svg" alt="Filter" width={20} height={20} className="w-[10px] xl:w-[15px] block" quality={90} />
                  <span>{isEn ? "Filters" : "المرشحات"}</span>
                  {activeFilterCount > 0 && (
                    <span className="text-[8px] sm:text-[10px] leading-normal bg-black text-white px-2 py-0.5 rounded-full">{activeFilterCount}</span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent
                side={locale === "ar" ? "right" : "left"}
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
                            <div key={range.label} className="flex items-center gap-2">
                              <Checkbox
                                id={`price-${range.label}`}
                                checked={tempFilters.priceRanges.includes(range.label)}
                                onCheckedChange={() => toggleTempFilter("priceRanges", range.label)}
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`price-${range.label}`}
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

            <MediaQuery minWidth={640}>
              {/* Active Filter Pills */}
              {filters.categories.map((catId) => (
                <FilterPill
                  key={`cat-${catId}`}
                  label={`${isEn ? "Category" : "فئة"}: ${getCategoryName(catId)}`}
                  onRemove={() => removeFilter("categories", catId)}
                />
              ))}
              {filters.subCategories.map((subCatId) => (
                <FilterPill
                  key={`subcat-${subCatId}`}
                  label={`Sub: ${getCategoryName(subCatId)}`}
                  onRemove={() => removeFilter("subCategories", subCatId)}
                />
              ))}
              {filters.sectors.map((sectorId) => (
                <FilterPill
                  key={`sector-${sectorId}`}
                  label={`Sector: ${getSectorName(sectorId)}`}
                  onRemove={() => removeFilter("sectors", sectorId)}
                />
              ))}
              {filters.priceRanges.map((range) => (
                <FilterPill key={`price-${range}`} label={range} onRemove={() => removeFilter("priceRanges", range)} />
              ))}
              {/* Dynamic attribute filter pills */}
              {Object.entries(filters.attributes || {}).map(([attrId, valueIds]) =>
                valueIds.map((valueId) => (
                  <FilterPill
                    key={`attr-${attrId}-${valueId}`}
                    label={`${getAttributeName(parseInt(attrId))}: ${getAttributeValueName(parseInt(attrId), valueId)}`}
                    onRemove={() => removeAttributeFilter(parseInt(attrId), valueId)}
                  />
                )),
              )}
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
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="text-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-tight font-medium truncate text-black w-[80px] sm:w-[110px] 2xl:w-[130px] border-none bg-transparent p-0 [&>svg]:hidden focus-visible:ring-0 rounded-none shadow-none">
                <SelectValue placeholder="Default" />

                {/* Custom Dropdown Icon */}
                <SelectIcon>
                  <Image src="/images/icon-dropdown.svg" alt="Dropdown" width={20} height={20} className="w-[10px] xl:w-[15px] block" quality={90} />
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
      <div className="container">
        <div className="flex flex-wrap -mx-3 sm:-mx-2 xl:-mx-5 2xl:-mx-8 [&>*]:p-3 sm:[&>*]:p-2 xl:[&>*]:p-5 2xl:[&>*]:p-8">
          {products.map((item) => (
            <div key={item.id} className="w-full 2xs:w-1/2 sm:w-1/2 md:w-1/3">
              <ProductCard isEn={isEn} product={item} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {products.length === 0 && (
          <div className="text-center py-16 xl:py-20">
            <p className="text-gray-500 text-lg mb-4">{isEn ? "No results found" : "لم يتم العثور على منتجات"}</p>
            <button onClick={clearAllFilters} className="text-sm px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
              {isEn ? "Clear All Filters" : "مسح كافة عوامل التصفية"}
            </button>
          </div>
        )}

        {/* Bottom Section with Pagination */}
        {products.length > 0 && (
          <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-5 xl:mt-10 2xl:mt-16">
            <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal text-[#bbb]">
              Showing {startIndex + 1}-{Math.min(endIndex, pagination.total)} of {pagination.total} products
            </div>
            {totalPages > 1 && (
              <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={(e) => {
                          e.preventDefault();
                          goToPrevious();
                        }}
                        className={cn("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")}
                      />
                    </PaginationItem>
                    {getPaginationItems().map((item, index) => (
                      <PaginationItem key={index}>
                        {item === "ellipsis" ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(item);
                            }}
                            isActive={currentPage === item}
                            className="cursor-pointer"
                          >
                            {item}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          goToNext();
                        }}
                        className={cn("cursor-pointer", currentPage === totalPages && "pointer-events-none opacity-50")}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

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
