import ProductCard from "@/components/blocks/product/product-card";
import ProductListPagination from "./Pagination";
import ProductListFilters from "./Filters";

export default function ProductList({ filters, locale, products, pagination }) {
  const isEn = locale === "en";

  return (
    <section className="w-full block py-[15px_30px] xl:py-[20px_60px] 2xl:py-[30px_100px]">
      <div className="container max-sm:bg-white max-sm:py-2 max-sm:px-4 max-sm:shadow-sm max-sm:sticky top-0 left-0 right-0 z-1 max-sm:mb-2">
        {/* Filters and Sort Section */}
        <div className="flex flex-row justify-between items-center gap-4 sm:mb-1.5 2xl:mb-3">
          <ProductListFilters filterData={filters} isEn={isEn} />
        </div>
      </div>
      <div className="container">
        <div className="flex flex-wrap -mx-3 sm:-mx-2 xl:-mx-5 2xl:-mx-8 [&>*]:p-3 sm:[&>*]:p-2 xl:[&>*]:p-5 2xl:[&>*]:p-8">
          {products?.map((item) => (
            <div key={item.id} className="w-full 2xs:w-1/2 sm:w-1/2 md:w-1/3">
              <ProductCard isEn={isEn} product={item} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {(!products || products.length === 0) && (
          <div className="text-center py-16 xl:py-20">
            <p className="text-gray-500 text-lg mb-4">{isEn ? "No results found" : "لم يتم العثور على منتجات"}</p>
          </div>
        )}

        {/* Bottom Section with Pagination */}
        {products && products.length > 0 && <ProductListPagination pagination={pagination} isEn={isEn} />}
      </div>
    </section>
  );
}
