import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";
import { ProductData } from "@/lib/api/products/ResourcesApi";
import ProductList from "@/components/blocks/product/Listing/ProductList";
import { searchParamsCache, buildApiParams, slugify, PRICE_RANGES } from "@/components/blocks/product/Listing/searchParams";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("products", locale, "products");

  return {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  };
}

const local_data = {
  heroData: {
    title: "Office Chairs",
    title_ar: "مقاعد المكتب",
    description: null,
  },
};

export default async function ProductsPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { locale } = resolvedParams;

  const slug = locale === "en" ? "Products" : "المنتجات";

  // Parse search params using nuqs cache
  const parsedParams = searchParamsCache.parse(resolvedSearchParams);

  // Fetch filter data first (needed for slug-to-ID mapping)
  const { data: filters } = await ProductData.getFilterData();

  // Check if any filters are applied
  const hasFilters =
    parsedParams.category.length > 0 ||
    parsedParams.subcategory.length > 0 ||
    parsedParams.sector.length > 0 ||
    parsedParams.price.length > 0 ||
    parsedParams.sort !== "default" ||
    parsedParams.page > 1 ||
    hasAttributeFilters(resolvedSearchParams);

  let products;

  if (hasFilters) {
    // Build API params including dynamic attribute filters
    const apiParams = buildApiParamsWithAttributes(parsedParams, resolvedSearchParams, filters);
    const { data } = await ProductData.getProductList(apiParams);
    products = data;
  } else {
    // No filters, use initial listing
    const { data } = await ProductData.getProductList();
    products = data;
  }

  const pagination = products?.pagination;
  const productList = products?.products;

  return (
    <>
      <ProductHero locale={locale} data={local_data?.heroData} slug={slug} />
      <ProductList locale={locale} pagination={pagination} products={productList} filters={filters} />
    </>
  );
}

// Check if any attribute filters exist in search params
function hasAttributeFilters(searchParams) {
  return Object.keys(searchParams).some((key) => key.startsWith("attr_"));
}

// Build API params with attribute filters
function buildApiParamsWithAttributes(parsedParams, rawSearchParams, filterData) {
  const { category, subcategory, sector, price, sort, page } = parsedParams;

  // Create slug to ID maps from filter data
  const categorySlugToId = {};
  const subcategorySlugToId = {};
  const sectorSlugToId = {};

  filterData?.categories
    ?.filter((cat) => cat.parent_id === null)
    ?.forEach((cat) => {
      categorySlugToId[slugify(cat.name)] = cat.id;
    });

  filterData?.categories
    ?.filter((cat) => cat.parent_id !== null)
    ?.forEach((cat) => {
      subcategorySlugToId[slugify(cat.name)] = cat.id;
    });

  filterData?.sectors?.forEach((s) => {
    sectorSlugToId[slugify(s.name)] = s.id;
  });

  // Convert slugs to IDs
  const categoryIds = category.map((slug) => categorySlugToId[slug]).filter(Boolean);
  const subcategoryIds = subcategory.map((slug) => subcategorySlugToId[slug]).filter(Boolean);
  const sectorIds = sector.map((slug) => sectorSlugToId[slug]).filter(Boolean);

  // Build URLSearchParams
  const params = new URLSearchParams();

  if (categoryIds.length > 0) {
    params.append("categories", categoryIds.join(","));
  }
  if (subcategoryIds.length > 0) {
    params.append("subCategories", subcategoryIds.join(","));
  }
  if (sectorIds.length > 0) {
    params.append("sectors", sectorIds.join(","));
  }
  if (price.length > 0) {
    const priceParams = price
      .map((key) => {
        const range = PRICE_RANGES.find((p) => p.key === key);
        if (!range) return null;
        return `${range.min}-${range.max === Infinity ? "max" : range.max}`;
      })
      .filter(Boolean);
    if (priceParams.length > 0) {
      params.append("priceRanges", priceParams.join(","));
    }
  }
  if (sort && sort !== "default") {
    params.append("sortBy", sort);
  }
  if (page && page > 1) {
    params.append("page", page.toString());
  }

  // Handle dynamic attribute filters (format: attr_[slug]=value1,value2)
  if (filterData?.attributes) {
    for (const attr of filterData.attributes) {
      const attrSlug = slugify(attr.name);
      const attrKey = `attr_${attrSlug}`;
      const attrValue = rawSearchParams[attrKey];

      if (attrValue) {
        // Create value slug to ID map
        const valueSlugToId = {};
        attr.values?.forEach((val) => {
          valueSlugToId[slugify(val.value)] = val.id;
        });

        // Convert value slugs to IDs
        const valueSlugs = Array.isArray(attrValue) ? attrValue : attrValue.split(",");
        const valueIds = valueSlugs.map((slug) => valueSlugToId[slug.trim()]).filter(Boolean);

        if (valueIds.length > 0) {
          params.append(`attributes[${attr.id}]`, valueIds.join(","));
        }
      }
    }
  }

  return params.toString();
}
