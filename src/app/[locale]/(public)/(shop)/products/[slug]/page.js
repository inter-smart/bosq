import ProductDetailCopy from "@/components/blocks/product/product-detail copy";
import ProductHero from "@/components/blocks/product/product-hero";
import ProductSimilar from "@/components/blocks/product/product-similar";
import { getMetaData } from "@/lib/api/metaApi";
import { ProductData } from "@/lib/api/products/ResourcesApi";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData(`product-${slug}`, locale, `products/${slug}`);

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

export default async function ProductDetailPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { locale, slug } = resolvedParams;

  const variantSku = resolvedSearchParams?.sku || null;
  const model = resolvedSearchParams?.model || null;

  // Extract all attr_* params from the URL (e.g., attr_pattern=striped, attr_color=blue)
  const attributeFilters = {};
  Object.entries(resolvedSearchParams || {}).forEach(([key, value]) => {
    if (key.startsWith("attr_") && value) {
      const attrSlug = key.replace("attr_", "");
      attributeFilters[attrSlug] = value;
    }
  });

  const { data, error } = await ProductData.getProductDetailsBySlug(
    variantSku,
    model,
    attributeFilters,
  );

  if (error || !data) {
    return notFound();
  }

  const heroSlug = locale === "en" ? data?.product?.title : data?.product?.title_ar;

  const slugify = data?.product?.title
    ? locale === "en"
      ? data?.product?.title
      : data?.product?.title_ar
    : slug;
  return (
    <>
      <ProductHero locale={locale} data={data?.product} slug={heroSlug} type="product" />
      <ProductDetailCopy
        locale={locale}
        initialData={data?.initialVariant}
        productData={data?.product}
        productSlug={slug}
        boughtTogetherItems={data?.boughtTogetherVariants}
      />
      {data?.similarVariants?.length > 0 && <ProductSimilar locale={locale} data={data?.similarVariants} />}
    </>
  );
}
