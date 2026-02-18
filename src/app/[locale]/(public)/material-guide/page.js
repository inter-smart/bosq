import ProductHero from "@/components/blocks/product/product-hero";
import MaterialInfoSection from "@/components/blocks/material-guide/Material-info-section";
import { getMaterialData } from "@/lib/api/CMS/basicGet";
import NotFound from "../not-found";



export default async function MaterialGuidePage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data } = await getMaterialData();
  const { heroData, materialsInfo, extraMaterialsInfo } = data;

  const slug = locale === "en" ? "Material Guide" : "سياسة الخصوصية";

  const isEn = locale === "en";

  if (!data) {
    <NotFound />
  }


  return (
    <>
      <ProductHero
        locale={locale}
        data={heroData}
        slug={slug}
      />
      <MaterialInfoSection
        locale={locale}
        data={materialsInfo}
        extraMaterialsInfo={extraMaterialsInfo}
        isEn={isEn}
      />
    </>
  );
}