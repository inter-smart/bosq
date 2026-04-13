import CustomizationInfo from "@/components/blocks/customization/customization-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getCustomizationCms } from "@/lib/api/customization";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../not-found";


export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("customization", locale);

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


export default async function CustomizationPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const slug = locale === "en"? "Customize Your Chair" : "تخصيص الكرسي الخاص بك";

  const {data, error} = await getCustomizationCms.getCmsData();




    if (error) {
      <NotFound />
    }



  const { heroData, customizationData, FeaturesSection, processSection, optionsSection,requestCustomQuote, states, enquiryDropdowns  } = data;


  return (
    <>
      <ProductHero
        locale={locale}
        data={heroData}
        slug={slug}
      />
      <CustomizationInfo
        locale={locale}
        data={customizationData}
        customizationFeatures={FeaturesSection}
        customizationProcess={processSection}
        customizationOptions={optionsSection}
        states={states}
        dropdownData={enquiryDropdowns}
        requestCustomQuote={requestCustomQuote}
      />
    </>
  );
}

