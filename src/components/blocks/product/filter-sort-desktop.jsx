"use client";

import { useState, useEffect, useCallback } from "react";
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
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectIcon } from "@radix-ui/react-select";

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

// ============ MAIN COMPONENT SETUP ============
export function useFiltersAndSort() {
  // UI States
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");

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

  // Count active filters
  const activeFilterCount = Object.values(filters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return {
    isSheetOpen,
    setIsSheetOpen,
    isMobileSortOpen,
    setIsMobileSortOpen,
    sortBy,
    setSortBy,
    filters,
    tempFilters,
    toggleTempFilter,
    applyFilters,
    clearAllFilters,
    removeFilter,
    clearTempFilters,
    activeFilterCount,
  };
}

// ============ DESKTOP FILTER SHEET ============
export function DesktopFilterSheet({
  isSheetOpen,
  setIsSheetOpen,
  tempFilters,
  toggleTempFilter,
  clearTempFilters,
  applyFilters,
  locale,
}) {
  return (
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
          <span>Filters</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="min-h-(--header-y) border-b border-[#eee] px-7 justify-center">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription className="sr-only">
            Select your preferences
          </SheetDescription>
        </SheetHeader>

        <div className="w-full sm:max-w-md min-h-[calc(100vh-240px)] overflow-y-scroll px-5">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {/* Categories */}
            <AccordionItem value="item-1" className="py-3">
              <AccordionTrigger className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-1">
                Categories
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-col gap-4">
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
            <AccordionItem value="item-2" className="py-3">
              <AccordionTrigger className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-1">
                Sub Categories
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-col gap-4">
                  {FILTER_OPTIONS.subCategories.map((subCat) => (
                    <div key={subCat} className="flex items-center gap-2">
                      <Checkbox
                        id={`subcat-${subCat}`}
                        checked={tempFilters.subCategories.includes(subCat)}
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
            <AccordionItem value="item-3" className="py-3">
              <AccordionTrigger className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-1">
                Sectors
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-col gap-4">
                  {FILTER_OPTIONS.sectors.map((sector) => (
                    <div key={sector} className="flex items-center gap-2">
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
            <AccordionItem value="item-4" className="py-3">
              <AccordionTrigger className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-1">
                Price Range
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-col gap-4">
                  {FILTER_OPTIONS.priceRanges.map((range) => (
                    <div key={range.label} className="flex items-center gap-2">
                      <Checkbox
                        id={`price-${range.label}`}
                        checked={tempFilters.priceRanges.includes(range.label)}
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
            <AccordionItem value="item-5" className="py-3">
              <AccordionTrigger className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-1">
                Color
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-col gap-4">
                  {FILTER_OPTIONS.colors.map((color) => (
                    <div key={color} className="flex items-center gap-2">
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
            <AccordionItem value="item-6" className="py-3">
              <AccordionTrigger className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-medium text-black p-2 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:bg-[#e9e9e9] [&>svg]:rounded-full [&>svg]:p-1">
                Pattern
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <div className="flex flex-col gap-4">
                  {FILTER_OPTIONS.patterns.map((pattern) => (
                    <div key={pattern} className="flex items-center gap-2">
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
  );
}

// ============ DESKTOP SORT DROPDOWN ============
export function DesktopSortDropdown({ sortBy, setSortBy }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-tight font-medium text-black">
        Sort by:
      </span>
      <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
        <SelectTrigger className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-tight font-medium truncate text-black w-[100px] 2xl:w-[168px] border-none bg-transparent p-0 [&>svg]:hidden focus-visible:ring-0 rounded-none shadow-none">
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
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="name-a-z">Name: A to Z</SelectItem>
            <SelectItem value="name-z-a">Name: Z to A</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

// ============ FILTER PILL COMPONENT ============
export function FilterPill({ label, onRemove }) {
  return (
    <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-light text-[#282828] flex gap-x-2 px-3 py-2 bg-gray-100 rounded-full">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:scale-105 transition-transform duration-300"
        aria-label="Remove filter"
      >
        <X className="size-2 xl:size-4 text-gray-600" />
      </button>
    </div>
  );
}
