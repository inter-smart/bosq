import ProductList from "@/components/blocks/product/product-list";
import SearchInput from "./search-input";

export default function SearchListing({ locale, data }) {
  return (
    <section className="w-full block pt-2.5 xl:pt-4 2xl:pt-5">
      <div className="container">
        <div className="w-full max-w-[300px] xl:max-w-[355px] 2xl:max-w-[420px]">
          <SearchInput locale={locale} />
        </div>
      </div>

      <ProductList locale={locale} data={data} />
    </section>
  );
}
