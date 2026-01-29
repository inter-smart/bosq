"use client";
import { useState, useCallback, useRef } from "react";

import ProductCard from "@/components/blocks/product/product-card";
import ProductListPagination from "./Pagination";
import ProductListFilters from "./Filters";
import { ProductData } from "@/lib/api/products/ResourcesApi";

export default function ProductList({ filters, locale, initialProducts, initialPagination }) {
  const isEn = locale === "en";

  const [products, setProducts] = useState(initialProducts);
  const [pagination, setPagination] = useState(initialPagination);
  const [isLoading, setIsLoading] = useState(false);

  // Track if initial load has happened to avoid duplicate fetch
  const isInitialMount = useRef(true);

  // Fetch products based on filter parameters
  const fetchProducts = useCallback(async (filterParams) => {
    const { categories, subCategories, sectors, priceRanges, sortBy, page } = filterParams;

    // Skip fetch if no filters and it's the initial mount (we have server data)
    const hasFilters =
      categories?.length > 0 || subCategories?.length > 0 || sectors?.length > 0 || priceRanges?.length > 0 || sortBy !== "default" || page > 1;

    if (isInitialMount.current && !hasFilters) {
      isInitialMount.current = false;
      return;
    }
    isInitialMount.current = false;

    try {
      setIsLoading(true);
      const params = new URLSearchParams();

      // Add array filters (IDs)
      if (categories?.length > 0) {
        params.append("categories", categories.join(","));
      }
      if (subCategories?.length > 0) {
        params.append("subCategories", subCategories.join(","));
      }
      if (sectors?.length > 0) {
        params.append("sectors", sectors.join(","));
      }
      if (priceRanges?.length > 0) {
        // Send price ranges as min-max pairs
        const priceParams = priceRanges.map((range) => `${range.min}-${range.max === Infinity ? "max" : range.max}`);
        params.append("priceRanges", priceParams.join(","));
      }

      // Add sort
      if (sortBy && sortBy !== "default") {
        params.append("sortBy", sortBy);
      }

      // Add pagination
      if (page && page > 1) {
        params.append("page", page.toString());
      }

      const { data, error } = await ProductData.getProductList(params.toString());
      if (error) {
        console.error("Error fetching products:", error);
        return;
      }
      setProducts(data?.products || []);
      setPagination(data?.pagination || { total: 0, page: 1, limit: 12, totalPages: 0 });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Called by Filters component when URL params change
  const handleFiltersChange = useCallback(
    (filterParams) => {
      fetchProducts(filterParams);
    },
    [fetchProducts],
  );

  return (
    <section className="w-full block py-[15px_30px] xl:py-[20px_60px] 2xl:py-[30px_100px]">
      <div className="container max-sm:bg-white max-sm:py-2 max-sm:px-4 max-sm:shadow-sm max-sm:sticky top-0 left-0 right-0 z-1 max-sm:mb-2">
        {/* Filters and Sort Section */}
        <div className="flex flex-row justify-between items-center gap-4 sm:mb-1.5 2xl:mb-3">
          <ProductListFilters filterData={filters} isEn={isEn} onFiltersChange={handleFiltersChange} />
        </div>
      </div>
      <div className="container">
        <div
          className={`flex flex-wrap -mx-3 sm:-mx-2 xl:-mx-5 2xl:-mx-8 [&>*]:p-3 sm:[&>*]:p-2 xl:[&>*]:p-5 2xl:[&>*]:p-8 transition-opacity duration-300 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
        >
          {products.map((item) => (
            <div key={item.id} className="w-full 2xs:w-1/2 sm:w-1/2 md:w-1/3">
              <ProductCard isEn={isEn} product={item} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-16 xl:py-20">
            <p className="text-gray-500 text-lg mb-4">{isEn ? "No results found" : "لم يتم العثور على منتجات"}</p>
          </div>
        )}

        {/* Bottom Section with Pagination */}
        {products.length > 0 && <ProductListPagination pagination={pagination} isEn={isEn} />}
      </div>
    </section>
  );
}
