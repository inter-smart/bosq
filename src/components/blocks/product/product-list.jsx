"use client";
import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectIcon } from "@radix-ui/react-select";
import dynamic from "next/dynamic";
import ProductCard from "@/components/blocks/product/product-card";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

const FILTER_OPTIONS = {
  categories: ["Office Chair"],
  subCategories: [
    "Task Chairs",
    "Leather Chairs",
    "Meeting Chairs",
    "Visitors Chairs",
    "Ergonomic Chairs",
  ],
  sectors: ["Corporate", "Healthcare", "Education", "Hospitality"],
  priceRanges: [
    { label: "Under AED 300", min: 0, max: 300 },
    { label: "AED 300 - 500", min: 300, max: 500 },
    { label: "AED 500 - 700", min: 500, max: 700 },
    { label: "Above AED 700", min: 700, max: Infinity },
  ],
  colors: ["Black", "White", "Gray", "Brown"],
  patterns: ["Solid", "Mesh", "Leather"],
};

const ITEMS_PER_PAGE = 12;

const accordionTriggerStyle = cn(
  "text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-4 sm:[&>svg]:w-4 [&>svg]:aspect-square [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-0.5 [&[data-state=open]>svg]:bg-black [&[data-state=open]>svg]:text-white"
);

const sortByOptions = [
  { value: "default", label: "Default" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "name-a-z", label: "Name: A to Z" },
  { value: "name-z-a", label: "Name: Z to A" },
];

export default function ProductList({ data, locale }) {
  const products = data?.product || [];

  // UI States
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Applied Filter States
  const [filters, setFilters] = useState({
    categories: [],
    subCategories: [],
    sectors: [],
    priceRanges: [],
    colors: [],
    patterns: [],
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
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
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
      colors: [],
      patterns: [],
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

  // Clear temp filters in sheet
  const clearTempFilters = useCallback(() => {
    setTempFilters({
      categories: [],
      subCategories: [],
      sectors: [],
      priceRanges: [],
      colors: [],
      patterns: [],
    });
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    // Apply sub-category filter
    if (filters.subCategories.length > 0) {
      filtered = filtered.filter((p) =>
        p.productType?.some((type) => filters.subCategories.includes(type))
      );
    }

    // Apply sector filter (assuming products have sector property)
    if (filters.sectors.length > 0) {
      filtered = filtered.filter((p) => filters.sectors.includes(p.sector));
    }

    // Apply price range filter
    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter((p) => {
        return filters.priceRanges.some((rangeLabel) => {
          const range = FILTER_OPTIONS.priceRanges.find(
            (r) => r.label === rangeLabel
          );
          return range && p.price >= range.min && p.price < range.max;
        });
      });
    }

    // Apply color filter (assuming products have color property)
    if (filters.colors.length > 0) {
      filtered = filtered.filter((p) => filters.colors.includes(p.color));
    }

    // Apply pattern filter (assuming products have pattern property)
    if (filters.patterns.length > 0) {
      filtered = filtered.filter((p) => filters.patterns.includes(p.pattern));
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Pagination helpers
  const goToPage = useCallback(
    (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages]
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
  const activeFilterCount = Object.values(filters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

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
                  <Image
                    src="/images/icon-filter.svg"
                    alt="Filter"
                    width={20}
                    height={20}
                    className="w-[10px] xl:w-[15px] block"
                  />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="text-[8px] sm:text-[10px] leading-normal bg-black text-white px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent
                side={locale === "ar" ? "right" : "left"}
                showCloseButton={false}
                className={
                  "max-w-[320px] sm:max-w-[320px] xl:max-w-[340px] 2xl:max-w-[468px]"
                }
              >
                <SheetHeader className="min-h-(--header-y) border-b border-[#eee] px-4 sm:px-7 justify-center">
                  <SheetTitle>Filters</SheetTitle>
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
                    {/* Categories */}
                    <AccordionItem value="item-1" className="py-2 sm:py-3">
                      <AccordionTrigger className={accordionTriggerStyle}>
                        Categories
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="flex flex-col gap-2 sm:gap-4">
                          {FILTER_OPTIONS.categories.map((cat) => (
                            <div key={cat} className="flex items-center gap-2">
                              <Checkbox
                                id={`cat-${cat}`}
                                checked={tempFilters.categories.includes(cat)}
                                onCheckedChange={() =>
                                  toggleTempFilter("categories", cat)
                                }
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`cat-${cat}`}
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                              >
                                {cat}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Sub Categories */}
                    <AccordionItem value="item-2" className="py-2 sm:py-3">
                      <AccordionTrigger className={accordionTriggerStyle}>
                        Sub Categories
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="flex flex-col gap-2 sm:gap-4">
                          {FILTER_OPTIONS.subCategories.map((subCat) => (
                            <div
                              key={subCat}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`subcat-${subCat}`}
                                checked={tempFilters.subCategories.includes(
                                  subCat
                                )}
                                onCheckedChange={() =>
                                  toggleTempFilter("subCategories", subCat)
                                }
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`subcat-${subCat}`}
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                              >
                                {subCat}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Sectors */}
                    <AccordionItem value="item-3" className="py-2 sm:py-3">
                      <AccordionTrigger className={accordionTriggerStyle}>
                        Sectors
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="flex flex-col gap-2 sm:gap-4">
                          {FILTER_OPTIONS.sectors.map((sector) => (
                            <div
                              key={sector}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`sector-${sector}`}
                                checked={tempFilters.sectors.includes(sector)}
                                onCheckedChange={() =>
                                  toggleTempFilter("sectors", sector)
                                }
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`sector-${sector}`}
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                              >
                                {sector}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Price Range */}
                    <AccordionItem value="item-4" className="py-2 sm:py-3">
                      <AccordionTrigger className={accordionTriggerStyle}>
                        Price Range
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="flex flex-col gap-2 sm:gap-4">
                          {FILTER_OPTIONS.priceRanges.map((range) => (
                            <div
                              key={range.label}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`price-${range.label}`}
                                checked={tempFilters.priceRanges.includes(
                                  range.label
                                )}
                                onCheckedChange={() =>
                                  toggleTempFilter("priceRanges", range.label)
                                }
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`price-${range.label}`}
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                              >
                                {range.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Color Option */}
                    <AccordionItem value="item-5" className="py-2 sm:py-3">
                      <AccordionTrigger className={accordionTriggerStyle}>
                        Color
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="flex flex-col gap-2 sm:gap-4">
                          {FILTER_OPTIONS.colors.map((color) => (
                            <div
                              key={color}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`color-${color}`}
                                checked={tempFilters.colors.includes(color)}
                                onCheckedChange={() =>
                                  toggleTempFilter("colors", color)
                                }
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`color-${color}`}
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                              >
                                {color}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Pattern */}
                    <AccordionItem value="item-6" className="py-2 sm:py-3">
                      <AccordionTrigger className={accordionTriggerStyle}>
                        Pattern
                      </AccordionTrigger>
                      <AccordionContent className="p-2">
                        <div className="flex flex-col gap-2 sm:gap-4">
                          {FILTER_OPTIONS.patterns.map((pattern) => (
                            <div
                              key={pattern}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`pattern-${pattern}`}
                                checked={tempFilters.patterns.includes(pattern)}
                                onCheckedChange={() =>
                                  toggleTempFilter("patterns", pattern)
                                }
                                className="rounded-none"
                              />
                              <Label
                                htmlFor={`pattern-${pattern}`}
                                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] cursor-pointer"
                              >
                                {pattern}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <SheetFooter className="flex flex-row justify-between gap-2">
                  <Button
                    onClick={clearTempFilters}
                    variant="white"
                    className="min-w-[100px] sm:min-w-[45%]"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={applyFilters}
                    variant="black"
                    className="min-w-[100px] sm:min-w-[45%]"
                  >
                    Apply Filters
                  </Button>
                </SheetFooter>
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

            <MediaQuery minWidth={640}>
              {/* Active Filter Pills */}
              {filters.categories.map((cat) => (
                <FilterPill
                  key={`cat-${cat}`}
                  label={`Category: ${cat}`}
                  onRemove={() => removeFilter("categories", cat)}
                />
              ))}
              {filters.subCategories.map((subCat) => (
                <FilterPill
                  key={`subcat-${subCat}`}
                  label={`Sub: ${subCat}`}
                  onRemove={() => removeFilter("subCategories", subCat)}
                />
              ))}
              {filters.sectors.map((sector) => (
                <FilterPill
                  key={`sector-${sector}`}
                  label={`Sector: ${sector}`}
                  onRemove={() => removeFilter("sectors", sector)}
                />
              ))}
              {filters.priceRanges.map((range) => (
                <FilterPill
                  key={`price-${range}`}
                  label={range}
                  onRemove={() => removeFilter("priceRanges", range)}
                />
              ))}
              {filters.colors.map((color) => (
                <FilterPill
                  key={`color-${color}`}
                  label={`Color: ${color}`}
                  onRemove={() => removeFilter("colors", color)}
                />
              ))}
              {filters.patterns.map((pattern) => (
                <FilterPill
                  key={`pattern-${pattern}`}
                  label={`Pattern: ${pattern}`}
                  onRemove={() => removeFilter("patterns", pattern)}
                />
              ))}
              {/* Clear All Button */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-normal text-[#282828] hover:text-[#f17423] underline"
                >
                  Clear Filters
                </button>
              )}
            </MediaQuery>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 2xl:gap-2">
            <span className="text-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-tight font-medium text-black">
              Sort by:
            </span>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="text-[10px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-tight font-medium truncate text-black w-[80px] sm:w-[110px] 2xl:w-[130px] border-none bg-transparent p-0 [&>svg]:hidden focus-visible:ring-0 rounded-none shadow-none">
                <SelectValue placeholder="Default" />

                {/* Custom Dropdown Icon */}
                <SelectIcon>
                  <Image
                    src="/images/icon-dropdown.svg"
                    alt="Dropdown"
                    width={20}
                    height={20}
                    className="w-[10px] xl:w-[15px] block"
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
          {currentProducts.map((item) => (
            <div key={item.id} className="w-full 2xs:w-1/2 sm:w-1/2 md:w-1/3">
              <ProductCard product={item} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16 xl:py-20">
            <p className="text-gray-500 text-lg mb-4">No products found</p>
            <button
              onClick={clearAllFilters}
              className="text-sm px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Bottom Section with Pagination */}
        {filteredAndSortedProducts.length > 0 && (
          <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-5 xl:mt-10 2xl:mt-16">
            <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal text-[#bbb]">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredAndSortedProducts.length)} of{" "}
              {filteredAndSortedProducts.length} products
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
                        className={cn(
                          "cursor-pointer",
                          currentPage === 1 && "pointer-events-none opacity-50"
                        )}
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
                        className={cn(
                          "cursor-pointer",
                          currentPage === totalPages &&
                            "pointer-events-none opacity-50"
                        )}
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
