import ProductDetailCopy from "@/components/blocks/product/product-detail copy";
import ProductHero from "@/components/blocks/product/product-hero";
import ProductSimilar from "@/components/blocks/product/product-similar";
import DynamicMeta from "@/components/common/DynamicMeta";
import { getMetaData, getProductMetaData } from "@/lib/api/metaApi";
import { ProductData } from "@/lib/api/products/ResourcesApi";
import { parseMetaTags, sanitizeMetadata } from "@/lib/helper";
import { notFound } from "next/navigation";

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { locale, slug } = resolvedParams;

  const variantSku = resolvedSearchParams?.sku || null;
  const model = resolvedSearchParams?.model || null;

  const attributeFilters = {};
  Object.entries(resolvedSearchParams || {}).forEach(([key, value]) => {
    if (key.startsWith("attr_") && value) {
      const attrSlug = key.replace("attr_", "");
      attributeFilters[attrSlug] = value;
    }
  });

  const queryString = new URLSearchParams(resolvedSearchParams).toString();
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/products/${slug}${queryString ? `?${queryString}` : ""}`;

  const metaData = await getProductMetaData(locale, currentUrl, slug, variantSku, model, attributeFilters);

  const { title, description, keywords, twitter, openGraph, alternates, other } = metaData;

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

  const attributeFilters = {};
  Object.entries(resolvedSearchParams || {}).forEach(([key, value]) => {
    if (key.startsWith("attr_") && value) {
      const attrSlug = key.replace("attr_", "");
      attributeFilters[attrSlug] = value;
    }
  });

  const { data, error } = await ProductData.getProductDetailsBySlug(slug, variantSku, model, attributeFilters);

  const otherMeta = data?.metaData;

  let structuredData = [];
  let lineScripts = [];

  if (otherMeta) {
    const parsedMeta = parseMetaTags(locale == "en" ? otherMeta?.other_meta : otherMeta?.other_meta_ar) || {};
    const { scripts = [], inlineScripts = [] } = sanitizeMetadata(parsedMeta);
    structuredData = scripts.length ? scripts : [];
    lineScripts = inlineScripts.length ? inlineScripts : [];
  }

  if (error || !data) {
    return notFound();
  }

  const heroSlug = locale === "en" ? data?.product?.title : data?.product?.title_ar;

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
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
