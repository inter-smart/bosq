
"use client";
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
import { Button } from "@/components/ui/button";
import { X, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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

// ============ MOBILE FILTER SHEET ============
export function MobileFilterSheet({
  isSheetOpen,
  setIsSheetOpen,
  tempFilters,
  toggleTempFilter,
  clearTempFilters,
  applyFilters,
  activeFilterCount,
  locale,
}) {
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <button className="text-[12px] leading-none font-medium text-[#282828] flex items-center justify-center gap-x-2 p-4 w-full border-r border-gray-200">
          <Image
            src="/images/icon-filter.svg"
            alt="Filter"
            width={20}
            height={20}
            className="w-[14px] block"
          />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh]">
        <SheetHeader className="border-b border-[#eee] pb-4">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription className="sr-only">
            Select your filter preferences
          </SheetDescription>
        </SheetHeader>

        <div className="w-full h-[calc(90vh-180px)] overflow-y-auto py-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {/* Categories */}
            <AccordionItem value="item-1" className="border-b">
              <AccordionTrigger className="text-[14px] font-medium text-black py-4 hover:no-underline">
                Categories
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-col gap-3">
                  {FILTER_OPTIONS.categories.map((cat) => (
                    <div key={cat} className="flex items-center gap-3">
                      <Checkbox
                        id={`mobile-cat-${cat}`}
                        checked={tempFilters.categories.includes(cat)}
                        onCheckedChange={() =>
                          toggleTempFilter("categories", cat)
                        }
                        className="rounded-none"
                      />
                      <Label
                        htmlFor={`mobile-cat-${cat}`}
                        className="text-[14px] font-normal text-[#666] cursor-pointer"
                      >
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Sub Categories */}
            <AccordionItem value="item-2" className="border-b">
              <AccordionTrigger className="text-[14px] font-medium text-black py-4 hover:no-underline">
                Sub Categories
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-col gap-3">
                  {FILTER_OPTIONS.subCategories.map((subCat) => (
                    <div key={subCat} className="flex items-center gap-3">
                      <Checkbox
                        id={`mobile-subcat-${subCat}`}
                        checked={tempFilters.subCategories.includes(subCat)}
                        onCheckedChange={() =>
                          toggleTempFilter("subCategories", subCat)
                        }
                        className="rounded-none"
                      />
                      <Label
                        htmlFor={`mobile-subcat-${subCat}`}
                        className="text-[14px] font-normal text-[#666] cursor-pointer"
                      >
                        {subCat}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Sectors */}
            <AccordionItem value="item-3" className="border-b">
              <AccordionTrigger className="text-[14px] font-medium text-black py-4 hover:no-underline">
                Sectors
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-col gap-3">
                  {FILTER_OPTIONS.sectors.map((sector) => (
                    <div key={sector} className="flex items-center gap-3">
                      <Checkbox
                        id={`mobile-sector-${sector}`}
                        checked={tempFilters.sectors.includes(sector)}
                        onCheckedChange={() =>
                          toggleTempFilter("sectors", sector)
                        }
                        className="rounded-none"
                      />
                      <Label
                        htmlFor={`mobile-sector-${sector}`}
                        className="text-[14px] font-normal text-[#666] cursor-pointer"
                      >
                        {sector}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Price Range */}
            <AccordionItem value="item-4" className="border-b">
              <AccordionTrigger className="text-[14px] font-medium text-black py-4 hover:no-underline">
                Price Range
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-col gap-3">
                  {FILTER_OPTIONS.priceRanges.map((range) => (
                    <div key={range.label} className="flex items-center gap-3">
                      <Checkbox
                        id={`mobile-price-${range.label}`}
                        checked={tempFilters.priceRanges.includes(range.label)}
                        onCheckedChange={() =>
                          toggleTempFilter("priceRanges", range.label)
                        }
                        className="rounded-none"
                      />
                      <Label
                        htmlFor={`mobile-price-${range.label}`}
                        className="text-[14px] font-normal text-[#666] cursor-pointer"
                      >
                        {range.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Color */}
            <AccordionItem value="item-5" className="border-b">
              <AccordionTrigger className="text-[14px] font-medium text-black py-4 hover:no-underline">
                Color
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-col gap-3">
                  {FILTER_OPTIONS.colors.map((color) => (
                    <div key={color} className="flex items-center gap-3">
                      <Checkbox
                        id={`mobile-color-${color}`}
                        checked={tempFilters.colors.includes(color)}
                        onCheckedChange={() =>
                          toggleTempFilter("colors", color)
                        }
                        className="rounded-none"
                      />
                      <Label
                        htmlFor={`mobile-color-${color}`}
                        className="text-[14px] font-normal text-[#666] cursor-pointer"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Pattern */}
            <AccordionItem value="item-6" className="border-b">
              <AccordionTrigger className="text-[14px] font-medium text-black py-4 hover:no-underline">
                Pattern
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex flex-col gap-3">
                  {FILTER_OPTIONS.patterns.map((pattern) => (
                    <div key={pattern} className="flex items-center gap-3">
                      <Checkbox
                        id={`mobile-pattern-${pattern}`}
                        checked={tempFilters.patterns.includes(pattern)}
                        onCheckedChange={() =>
                          toggleTempFilter("patterns", pattern)
                        }
                        className="rounded-none"
                      />
                      <Label
                        htmlFor={`mobile-pattern-${pattern}`}
                        className="text-[14px] font-normal text-[#666] cursor-pointer"
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

        <SheetFooter className="border-t border-[#eee] pt-4 flex flex-row gap-3">
          <Button
            onClick={clearTempFilters}
            variant="outline"
            className="flex-1 h-12"
          >
            Clear
          </Button>
          <Button onClick={applyFilters} variant="default" className="flex-1 h-12 bg-black text-white">
            Apply Filters
          </Button>
        </SheetFooter>

        <SheetClose className="absolute right-4 top-4" asChild>
          <Button variant="ghost" size="icon">
            <X className="size-5" />
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

// ============ MOBILE SORT SHEET ============
export function MobileSortSheet({
  isMobileSortOpen,
  setIsMobileSortOpen,
  sortBy,
  setSortBy,
}) {
  const handleSortChange = (value) => {
    setSortBy(value);
    setIsMobileSortOpen(false);
  };

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "name-a-z", label: "Name: A to Z" },
    { value: "name-z-a", label: "Name: Z to A" },
  ];

  return (
    <Sheet open={isMobileSortOpen} onOpenChange={setIsMobileSortOpen}>
      <SheetTrigger asChild>
        <button className="text-[12px] leading-none font-medium text-[#282828] flex items-center justify-center gap-x-2 p-4 w-full">
          <Image
            src="/images/icon-dropdown.svg"
            alt="Sort"
            width={20}
            height={20}
            className="w-[10px] block"
          />
          <span>Sort by</span>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-auto">
        <SheetHeader className="border-b border-[#eee] pb-4">
          <SheetTitle>Sort By</SheetTitle>
          <SheetDescription className="sr-only">
            Choose sorting option
          </SheetDescription>
        </SheetHeader>

        <div className="py-4">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={cn(
                "w-full flex items-center justify-between py-4 px-2 text-left border-b border-gray-100 last:border-0",
                sortBy === option.value && "bg-gray-50"
              )}
            >
              <span
                className={cn(
                  "text-[14px]",
                  sortBy === option.value
                    ? "font-semibold text-black"
                    : "font-normal text-[#666]"
                )}
              >
                {option.label}
              </span>
              {sortBy === option.value && (
                <ChevronRight className="size-5 text-black" />
              )}
            </button>
          ))}
        </div>

        <SheetClose className="absolute right-4 top-4" asChild>
          <Button variant="ghost" size="icon">
            <X className="size-5" />
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

// ============ MOBILE STICKY BAR ============
export function MobileFilterSortBar({
  isSheetOpen,
  setIsSheetOpen,
  isMobileSortOpen,
  setIsMobileSortOpen,
  tempFilters,
  toggleTempFilter,
  clearTempFilters,
  applyFilters,
  activeFilterCount,
  sortBy,
  setSortBy,
  locale,
}) {
  return (
    <div className="flex sticky bottom-0 bg-white w-full border-t border-gray-200 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="w-1/2">
        <MobileFilterSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          tempFilters={tempFilters}
          toggleTempFilter={toggleTempFilter}
          clearTempFilters={clearTempFilters}
          applyFilters={applyFilters}
          activeFilterCount={activeFilterCount}
          locale={locale}
        />
      </div>
      <div className="w-1/2">
        <MobileSortSheet
          isMobileSortOpen={isMobileSortOpen}
          setIsMobileSortOpen={setIsMobileSortOpen}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>
    </div>
  );
}