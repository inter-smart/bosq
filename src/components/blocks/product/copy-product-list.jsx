"use client";

import dynamic from "next/dynamic";
const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });

// Import all the components from both files
import {
  useFiltersAndSort,
  DesktopFilterSheet,
  DesktopSortDropdown,
  FilterPill,
} from "./filter-sort-desktop.jsx";

import { MobileFilterSortBar } from "./filter-sort-mobile.jsx";

export default function ProductList({ data, locale }) {
  const {
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
  } = useFiltersAndSort();

  // Your existing product filtering and sorting logic here...

  return (
    <section className="w-full block py-[15px_30px] xl:py-[30px_60px] 2xl:py-[40px_100px]">
      <div className="container">
        {/* DESKTOP VERSION */}
        <MediaQuery minWidth={640}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 2xl:mb-6">
            <div className="flex flex-wrap items-center gap-2 xl:gap-3 2xl:gap-4">
              <DesktopFilterSheet
                isSheetOpen={isSheetOpen}
                setIsSheetOpen={setIsSheetOpen}
                tempFilters={tempFilters}
                toggleTempFilter={toggleTempFilter}
                clearTempFilters={clearTempFilters}
                applyFilters={applyFilters}
                locale={locale}
              />

              {/* Active Filter Pills */}
              {filters.categories.map((cat) => (
                <FilterPill
                  key={`cat-${cat}`}
                  label={`Category: ${cat}`}
                  onRemove={() => removeFilter("categories", cat)}
                />
              ))}
              {/* Add other filter pills similarly... */}

              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[12px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[14px] leading-none font-normal text-black hover:text-[#f17423] underline"
                >
                  Clear All
                </button>
              )}
            </div>

            <DesktopSortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </MediaQuery>
      </div>

      <div className="container">
        {/* Products Grid */}
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
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
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

      {/* MOBILE VERSION */}
      <MediaQuery maxWidth={639}>
        <MobileFilterSortBar
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          isMobileSortOpen={isMobileSortOpen}
          setIsMobileSortOpen={setIsMobileSortOpen}
          tempFilters={tempFilters}
          toggleTempFilter={toggleTempFilter}
          clearTempFilters={clearTempFilters}
          applyFilters={applyFilters}
          activeFilterCount={activeFilterCount}
          sortBy={sortBy}
          setSortBy={setSortBy}
          locale={locale}
        />
      </MediaQuery>
    </section>
  );
}
