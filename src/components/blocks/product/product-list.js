"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Sheet,
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
import { Heading } from "@/components/utils/heading";
import { Text } from "@/components/utils/text";

import { motion } from "motion/react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data for demonstration
// const MOCK_PRODUCTS = [
//   {
//     id: 1,
//     name: "Kyro Mid Back Leather Executive Chair",
//     price: 458,
//     category: "Office Chair",
//     subCategory: "Leather Chairs",
//     sector: "Corporate",
//     color: "Black",
//     pattern: "Solid",
//     media: { path: "/api/placeholder/308/517", alt: "Chair 1" },
//   },
//   {
//     id: 2,
//     name: "Demos High Back Ergonomic Office Chair",
//     price: 458,
//     category: "Office Chair",
//     subCategory: "Ergonomic Chairs",
//     sector: "Healthcare",
//     color: "Black",
//     pattern: "Mesh",
//     media: { path: "/api/placeholder/308/517", alt: "Chair 2" },
//   },
//   {
//     id: 3,
//     name: "Orzo Mid Back Ergonomic Office Chair",
//     price: 358,
//     category: "Office Chair",
//     subCategory: "Task Chairs",
//     sector: "Education",
//     color: "Gray",
//     pattern: "Mesh",
//     media: { path: "/api/placeholder/308/517", alt: "Chair 3" },
//   },
//   {
//     id: 4,
//     name: "Executive Meeting Chair",
//     price: 558,
//     category: "Office Chair",
//     subCategory: "Meeting Chairs",
//     sector: "Corporate",
//     color: "White",
//     pattern: "Solid",
//     media: { path: "/api/placeholder/308/517", alt: "Chair 4" },
//   },
//   {
//     id: 5,
//     name: "Visitor Reception Chair",
//     price: 258,
//     category: "Office Chair",
//     subCategory: "Visitors Chairs",
//     sector: "Hospitality",
//     color: "Black",
//     pattern: "Solid",
//     media: { path: "/api/placeholder/308/517", alt: "Chair 5" },
//   },
//   {
//     id: 6,
//     name: "Premium Leather Executive",
//     price: 658,
//     category: "Office Chair",
//     subCategory: "Leather Chairs",
//     sector: "Corporate",
//     color: "Brown",
//     pattern: "Leather",
//     media: { path: "/api/placeholder/308/517", alt: "Chair 6" },
//   },
// ];

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

export default function ProductList({ data = { product: MOCK_PRODUCTS } }) {
  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPatterns, setSelectedPatterns] = useState([]);

  // Temporary filter states for sheet (apply on button click)
  const [tempCategories, setTempCategories] = useState([]);
  const [tempSubCategories, setTempSubCategories] = useState([]);
  const [tempSectors, setTempSectors] = useState([]);
  const [tempPriceRanges, setTempPriceRanges] = useState([]);
  const [tempColors, setTempColors] = useState([]);
  const [tempPatterns, setTempPatterns] = useState([]);

  // Initialize temp filters when sheet opens
  useEffect(() => {
    if (isSheetOpen) {
      setTempCategories([...selectedCategories]);
      setTempSubCategories([...selectedSubCategories]);
      setTempSectors([...selectedSectors]);
      setTempPriceRanges([...selectedPriceRanges]);
      setTempColors([...selectedColors]);
      setTempPatterns([...selectedPatterns]);
    }
  }, [isSheetOpen]);

  // Toggle filter helper
  const toggleFilter = (value, state, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Apply filters
  const applyFilters = () => {
    setSelectedCategories(tempCategories);
    setSelectedSubCategories(tempSubCategories);
    setSelectedSectors(tempSectors);
    setSelectedPriceRanges(tempPriceRanges);
    setSelectedColors(tempColors);
    setSelectedPatterns(tempPatterns);
    setIsSheetOpen(false);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedSectors([]);
    setSelectedPriceRanges([]);
    setSelectedColors([]);
    setSelectedPatterns([]);
    setTempCategories([]);
    setTempSubCategories([]);
    setTempSectors([]);
    setTempPriceRanges([]);
    setTempColors([]);
    setTempPatterns([]);
  };

  // Remove individual filter
  const removeFilter = (type, value) => {
    switch (type) {
      case "category":
        setSelectedCategories((prev) => prev.filter((item) => item !== value));
        break;
      case "subCategory":
        setSelectedSubCategories((prev) =>
          prev.filter((item) => item !== value)
        );
        break;
      case "sector":
        setSelectedSectors((prev) => prev.filter((item) => item !== value));
        break;
      case "priceRange":
        setSelectedPriceRanges((prev) => prev.filter((item) => item !== value));
        break;
      case "color":
        setSelectedColors((prev) => prev.filter((item) => item !== value));
        break;
      case "pattern":
        setSelectedPatterns((prev) => prev.filter((item) => item !== value));
        break;
    }
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...(data?.product || MOCK_PRODUCTS)];

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Apply sub-category filter
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedSubCategories.includes(p.subCategory)
      );
    }

    // Apply sector filter
    if (selectedSectors.length > 0) {
      filtered = filtered.filter((p) => selectedSectors.includes(p.sector));
    }

    // Apply price range filter
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((p) => {
        return selectedPriceRanges.some((rangeLabel) => {
          const range = FILTER_OPTIONS.priceRanges.find(
            (r) => r.label === rangeLabel
          );
          return range && p.price >= range.min && p.price < range.max;
        });
      });
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) => selectedColors.includes(p.color));
    }

    // Apply pattern filter
    if (selectedPatterns.length > 0) {
      filtered = filtered.filter((p) => selectedPatterns.includes(p.pattern));
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
        // default order
        break;
    }

    return filtered;
  }, [
    data,
    selectedCategories,
    selectedSubCategories,
    selectedSectors,
    selectedPriceRanges,
    selectedColors,
    selectedPatterns,
    sortBy,
  ]);

  // Count active filters
  const activeFilterCount =
    selectedCategories.length +
    selectedSubCategories.length +
    selectedSectors.length +
    selectedPriceRanges.length +
    selectedColors.length +
    selectedPatterns.length;

  return (
    <section className="w-full block py-[15px] xl:py-[30px]">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 xl:mb-10">
          <div className="flex flex-wrap items-center gap-2 xl:gap-3 2xl:gap-4">
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
                  <span className="">Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className={"border-b border-[#eee] p-5"}>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription className={"sr-only"}>
                    Select your preferences
                  </SheetDescription>
                </SheetHeader>

                <div className="w-full sm:max-w-md overflow-y-scroll px-5">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                  >
                    {/* Categories */}
                    <AccordionItem value="item-1" className={"py-3"}>
                      <AccordionTrigger className={"p-2"}>
                        Categories
                      </AccordionTrigger>
                      <AccordionContent className={"p-2"}>
                        <div className="flex flex-col gap-4">
                          {FILTER_OPTIONS.categories.map((cat) => (
                            <div
                              key={cat}
                              className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#666] flex items-center gap-2"
                            >
                              <Checkbox
                                id={`cat-${cat}`}
                                checked={tempCategories.includes(cat)}
                                onCheckedChange={() =>
                                  toggleFilter(
                                    cat,
                                    tempCategories,
                                    setTempCategories
                                  )
                                }
                                className={"rounded-none"}
                              />
                              <Label
                                htmlFor={`cat-${cat}`}
                                className="cursor-pointer"
                              >
                                {cat}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Sub Categories */}
                    <AccordionItem value="item-2" className={"py-3"}>
                      <AccordionTrigger className={"p-2"}>
                        Sub Categories
                      </AccordionTrigger>
                      <AccordionContent className={"p-2"}>
                        <div className="flex flex-col gap-4">
                          {FILTER_OPTIONS.subCategories.map((subCat) => (
                            <div
                              key={subCat}
                              className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#7e7e7e] flex items-center gap-2"
                            >
                              <Checkbox
                                id={`subcat-${subCat}`}
                                checked={tempSubCategories.includes(subCat)}
                                onCheckedChange={() =>
                                  toggleFilter(
                                    subCat,
                                    tempSubCategories,
                                    setTempSubCategories
                                  )
                                }
                                className={"rounded-none"}
                              />
                              <Label
                                htmlFor={`subcat-${subCat}`}
                                className="cursor-pointer"
                              >
                                {subCat}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Sectors */}
                    <AccordionItem value="item-3" className={"py-3"}>
                      <AccordionTrigger className={"p-2"}>
                        Sectors
                      </AccordionTrigger>
                      <AccordionContent className={"p-2"}>
                        <div className="flex flex-col gap-4">
                          {FILTER_OPTIONS.sectors.map((sector) => (
                            <div
                              key={sector}
                              className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#7e7e7e] flex items-center gap-2"
                            >
                              <Checkbox
                                id={`sector-${sector}`}
                                checked={tempSectors.includes(sector)}
                                onCheckedChange={() =>
                                  toggleFilter(
                                    sector,
                                    tempSectors,
                                    setTempSectors
                                  )
                                }
                                className={"rounded-none"}
                              />
                              <Label
                                htmlFor={`sector-${sector}`}
                                className="cursor-pointer"
                              >
                                {sector}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Price Range */}
                    <AccordionItem value="item-4" className={"py-3"}>
                      <AccordionTrigger className={"p-2"}>
                        Price Range
                      </AccordionTrigger>
                      <AccordionContent className={"p-2"}>
                        <div className="flex flex-col gap-4">
                          {FILTER_OPTIONS.priceRanges.map((range) => (
                            <div
                              key={range.label}
                              className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#7e7e7e] flex items-center gap-2"
                            >
                              <Checkbox
                                id={`price-${range.label}`}
                                checked={tempPriceRanges.includes(range.label)}
                                onCheckedChange={() =>
                                  toggleFilter(
                                    range.label,
                                    tempPriceRanges,
                                    setTempPriceRanges
                                  )
                                }
                                className={"rounded-none"}
                              />
                              <Label
                                htmlFor={`price-${range.label}`}
                                className="cursor-pointer"
                              >
                                {range.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Color Option */}
                    <AccordionItem value="item-5" className={"py-3"}>
                      <AccordionTrigger className={"p-2"}>
                        Color
                      </AccordionTrigger>
                      <AccordionContent className={"p-2"}>
                        <div className="flex flex-col gap-4">
                          {FILTER_OPTIONS.colors.map((color) => (
                            <div
                              key={color}
                              className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-light text-[#7e7e7e] flex items-center gap-2"
                            >
                              <Checkbox
                                id={`color-${color}`}
                                checked={tempColors.includes(color)}
                                onCheckedChange={() =>
                                  toggleFilter(color, tempColors, setTempColors)
                                }
                                className={"rounded-none"}
                              />
                              <Label
                                htmlFor={`color-${color}`}
                                className="cursor-pointer"
                              >
                                {color}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Pattern */}
                    <AccordionItem value="item-6" className={"py-3"}>
                      <AccordionTrigger className={"p-2"}>
                        Pattern
                      </AccordionTrigger>
                      <AccordionContent className={"p-2"}>
                        <div className="flex flex-col gap-4">
                          {FILTER_OPTIONS.patterns.map((pattern) => (
                            <div
                              key={pattern}
                              className="flex items-center gap-3"
                            >
                              <Checkbox
                                id={`pattern-${pattern}`}
                                checked={tempPatterns.includes(pattern)}
                                onCheckedChange={() =>
                                  toggleFilter(
                                    pattern,
                                    tempPatterns,
                                    setTempPatterns
                                  )
                                }
                              />
                              <Label
                                htmlFor={`pattern-${pattern}`}
                                className="cursor-pointer"
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

                <SheetFooter className="flex gap-2">
                  <button
                    onClick={() => {
                      setTempCategories([]);
                      setTempSubCategories([]);
                      setTempSectors([]);
                      setTempPriceRanges([]);
                      setTempColors([]);
                      setTempPatterns([]);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={applyFilters}
                    className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    Apply Filters
                  </button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Active Filter Pills */}
            {selectedCategories.map((cat) => (
              <FilterPill
                key={`cat-${cat}`}
                label={`Category: ${cat}`}
                onRemove={() => removeFilter("category", cat)}
              />
            ))}
            {selectedSubCategories.map((subCat) => (
              <FilterPill
                key={`subcat-${subCat}`}
                label={`Sub: ${subCat}`}
                onRemove={() => removeFilter("subCategory", subCat)}
              />
            ))}
            {selectedSectors.map((sector) => (
              <FilterPill
                key={`sector-${sector}`}
                label={`Sector: ${sector}`}
                onRemove={() => removeFilter("sector", sector)}
              />
            ))}
            {selectedPriceRanges.map((range) => (
              <FilterPill
                key={`price-${range}`}
                label={range}
                onRemove={() => removeFilter("priceRange", range)}
              />
            ))}
            {selectedColors.map((color) => (
              <FilterPill
                key={`color-${color}`}
                label={`Color: ${color}`}
                onRemove={() => removeFilter("color", color)}
              />
            ))}
            {selectedPatterns.map((pattern) => (
              <FilterPill
                key={`pattern-${pattern}`}
                label={`Pattern: ${pattern}`}
                onRemove={() => removeFilter("pattern", pattern)}
              />
            ))}

            {/* Clear All Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-normal text-black hover:text-[#f17423] underline"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-medium text-black">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className=""
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
            <Image
              src="/images/icon-dropdown.svg"
              alt="Filter"
              width={20}
              height={20}
              className="w-[10px] xl:w-[15px] block"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-2 xl:-mx-5 2xl:-mx-8 [&>*]:p-2 xl:[&>*]:p-5 2xl:[&>*]:p-8">
          {filteredAndSortedProducts.map((item, index) => (
            <div key={"product" + index} className="w-full sm:w-1/2 xl:w-1/3">
              <ProductCard product={item} />
            </div>
          ))}
        </div>

        {/* bottom */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-5 xl:mt-10 2xl:mt-16">
          <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal text-[#bbb]">
            Showing {filteredAndSortedProducts.length} of{" "}
            {(data?.product || MOCK_PRODUCTS).length} products
          </div>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No products found</p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterPill({ label, onRemove }) {
  return (
    <div className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-light text-[#282828] flex gap-x-2 px-3 py-2 bg-gray-100 rounded-full">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="hover:scale-105 transition-transform duration-300"
      >
        <X className="size-2 xl:size-4 text-gray-600" />
      </button>
    </div>
  );
}

function ProductCard({ product }) {
  const [wish, setWish] = useState(false);

  return (
    <div className="group w-full block">
      <div className="w-full aspect-[550/440] overflow-hidden rounded-[4px] border border-[#f4f4f4] mb-3 2xl:mb-4 bg-[#f4f4f4] relative z-0">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setWish(!wish)}
          className="absolute z-2 top-2 xl:top-4 right-2 xl:right-4"
        >
          <svg
            width="15"
            height="13"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.39062 2.03027C8.85818 0.419111 10.5094 0.0894194 11.749 0.544922C12.9908 1.00129 13.9263 2.28275 13.8955 4.12402C13.8676 5.78912 12.7686 7.51198 11.3096 9.04004C9.9379 10.4766 8.3011 11.6826 7.12598 12.4326C5.95106 11.6827 4.3155 10.4769 2.94434 9.04102C1.48523 7.51297 0.385558 5.78917 0.357422 4.12402C0.326449 2.28301 1.26218 1.00146 2.50391 0.544922C3.74349 0.0891915 5.39453 0.418918 6.8623 2.03027L7.12695 2.32031L7.39062 2.03027Z"
              fill={wish ? "black" : "none"}
              stroke="#282828"
              strokeWidth="1"
            />
          </svg>
        </motion.button>
        <Image
          src={product?.media?.path}
          alt={product?.media?.alt}
          width={550}
          height={440}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product?.hoverMedia && (
          <Image
            src={product?.hoverMedia?.path}
            alt={product?.hoverMedia?.alt}
            width={550}
            height={440}
            quality={100}
            className="w-full h-full object-cover absolute z-1 inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition duration-300"
          />
        )}
      </div>
      <div>
        <Heading
          as="div"
          size="none"
          className="text-[10px] xl:text-[8px] 2xl:text-[10px] 3xl:text-[12px] leading-normal font-light truncate text-[#bbbcbc] mb-1"
        >
          {product?.category}
        </Heading>
        <Heading
          as="div"
          size="none"
          className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828] mb-0.5"
        >
          {product?.name}
        </Heading>
        <Text
          as="div"
          size="none"
          className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-normal font-normal truncate text-[#282828] mb-3 xl:mb-4 2xl:mb-6"
        >
          AED {product?.price}{" "}
          <span className="text-[8px] 2xl:text-[10px] font-light text-[#bbbcbc] ">
            Inc Tax
          </span>
        </Text>
        <div className="flex gap-0.5 xl:gap-1">
          {product?.colorVariant?.slice(0, 3).map((color, index) => (
            <div
              key={"color" + index}
              className="w-2.5 h-2.5 rounded-full hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: color }}
            ></div>
          ))}
          {product?.colorVariant?.length > 3 && (
            <div className="text-[8px] 2xl:text-[10px] leading-none font-light text-[#28288]">
              + More
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
