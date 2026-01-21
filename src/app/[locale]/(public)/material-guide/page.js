import MaterialInfoSection from "@/components/blocks/material-guide/Material-info-section";
import ProductHero from "@/components/blocks/product/product-hero";
import {getMaterialData}  from "@/lib/api/CMS/basicGet";
import NotFound from "../not-found/page";
import { getMetaData } from "@/lib/api/metaApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("material-guide", locale);

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

export default async function MaterialGuidePage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  const {data} = await getMaterialData();
  const { heroData, materialsInfo, extraMaterialsInfo } = data;


  if(!data){
    <NotFound />
  }


  return (
    <>
      <ProductHero
        locale={locale}
        data={heroData}
        slug={"Material Guide"}
      />
      <MaterialInfoSection
        locale={locale}
        data={materialsInfo}
        extraMaterialsInfo={extraMaterialsInfo}
      />
    </>
  );
}

