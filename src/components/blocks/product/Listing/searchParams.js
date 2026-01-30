import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server";

// Price ranges definition (shared)
export const PRICE_RANGES = [
  { key: "under-300", label: "Under AED 300", label_ar: "أقل من 300 درهم", min: 0, max: 300 },
  { key: "300-500", label: "AED 300 - 500", label_ar: "300 - 500 درهم", min: 300, max: 500 },
  { key: "500-700", label: "AED 500 - 700", label_ar: "500 - 700 درهم", min: 500, max: 700 },
  { key: "above-700", label: "Above AED 700", label_ar: "أكثر من 700 درهم", min: 700, max: Infinity },
];

// Sort options
export const sortByOptions = [
  { value: "default", label: "Default", label_ar: "الافتراضي" },
  { value: "price-low-high", label: "Price: Low to High", label_ar: "السعر: من الأقل إلى الأعلى" },
  { value: "price-high-low", label: "Price: High to Low", label_ar: "السعر: من الأعلى إلى الأقل" },
  { value: "name-a-z", label: "Name: A to Z", label_ar: "الاسم: أ إلى ي" },
  { value: "name-z-a", label: "Name: Z to A", label_ar: "الاسم: ي إلى أ" },
];

// Nuqs parsers - shared between server and client
export const productListingParsers = {
  category: parseAsArrayOf(parseAsString).withDefault([]),
  subcategory: parseAsArrayOf(parseAsString).withDefault([]),
  sector: parseAsArrayOf(parseAsString).withDefault([]),
  price: parseAsArrayOf(parseAsString).withDefault([]),
  sort: parseAsString.withDefault("default"),
  page: parseAsInteger.withDefault(1),
  // Dynamic attributes will be parsed separately
};

// Server-side search params cache
export const searchParamsCache = createSearchParamsCache(productListingParsers);

// Slugify utility - convert string to URL-friendly slug
export const slugify = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Build API params from parsed search params and filter data
export function buildApiParams(searchParams, filterData) {
  const { category, subcategory, sector, price, sort, page } = searchParams;

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
    params.append("priceRanges", priceParams.join(","));
  }
  if (sort && sort !== "default") {
    params.append("sortBy", sort);
  }
  if (page && page > 1) {
    params.append("page", page.toString());
  }

  // Parse attribute filters from searchParams (format: attr_[slug]=value1,value2)
  // This will be handled dynamically based on available attributes
  if (filterData?.attributes) {
    for (const attr of filterData.attributes) {
      const attrSlug = slugify(attr.name);
      const attrKey = `attr_${attrSlug}`;

      // Check if this attribute param exists in the raw search params
      // We need to handle this at the page level since createSearchParamsCache
      // doesn't support dynamic keys
    }
  }

  return params.toString();
}
