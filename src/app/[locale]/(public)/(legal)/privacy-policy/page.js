import PrivacyInfo from "@/components/blocks/legal/privacy-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getPolicyCms } from "@/lib/api/privacyPolicy";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../../../../not-found";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("privacy", locale, "privacy-policy");

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

export default async function PrivacyPolicyPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  const {data} = await getPolicyCms.getCmsData();


  if(!data) {
    return <NotFound params={params} />
  }

  const { heroData, privacyPolicyData } = data;
  const local_data = {
    heroData,
    privacyPolicyData,
  };

  const slug = locale === "en"? "Privacy Policy" : "سياسة الخصوصية";

  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={slug}
      />
      <PrivacyInfo locale={locale} data={local_data?.privacyPolicyData} />
    </>
  );
}
