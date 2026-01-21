import ErgonomicChairSection from "@/components/blocks/ergonomic-chair-guide/ErgonomicChairSection";
import ProductHero from "@/components/blocks/product/product-hero";
import { getErgonomicChairData } from "@/lib/api/CMS/basicGet";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("ergonomic-chair-guide", locale);

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

export default async function ErgonomicChairPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getErgonomicChairData();

  if (error) {
    notFound();
  }

  const { heroData, ergonomicChairData } = data;

  return (
    <>
      <ProductHero locale={locale} data={heroData} slug={"Material Guide"} />
      <ErgonomicChairSection locale={locale} data={ergonomicChairData} />
    </>
  );
}
