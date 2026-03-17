import ProductHero from "@/components/blocks/product/product-hero";
import SustainabilityInfo from "@/components/blocks/sustainability/sustainability-info";
import { getSustainabilityData, sustainabilityData } from "@/lib/api/CMS/basicGet";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../not-found";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("sustainability", locale, "sustainability");

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

export default async function SustainabilityPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getSustainabilityData();


  if (!data || error) {
    return <NotFound />
  }

  const slug = locale === "en" ? "sustainability" : "الاستدامة";

  const { heroData, sustainabilityData } = data;
  const bannerData = sustainabilityData?.media;
  const sectionData = {
    title: sustainabilityData?.title,
    title_ar: sustainabilityData?.title_ar,
    description: sustainabilityData?.description,
    description_ar: sustainabilityData?.description_ar,
    media: sustainabilityData?.section_media,
  };

  return (
    <>
      <ProductHero locale={locale} data={heroData} slug={slug} />
      <SustainabilityInfo locale={locale} bannerData={bannerData} sectionData={sectionData} sustainabilityList={sustainabilityData?.sections} />
    </>
  );
}
