import ProductHero from "@/components/blocks/product/product-hero";
import SustainabilityInfo from "@/components/blocks/sustainability/sustainability-info";
import { getSustainabilityData, sustainabilityData } from "@/lib/api/CMS/basicGet";
import { notFound } from "next/navigation";



export default async function SustainabilityPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getSustainabilityData();

  if (error) {
    notFound();
  }

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
      <ProductHero locale={locale} data={heroData} slug={"Sustainability"} />
      <SustainabilityInfo locale={locale} bannerData={bannerData} sectionData={sectionData} sustainabilityList={sustainabilityData?.sections} />
    </>
  );
}
