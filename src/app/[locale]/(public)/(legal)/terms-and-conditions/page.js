import TermsFaqInfo from "@/components/blocks/legal/terms-faq-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getTermsCms } from "@/lib/api/termsAndConitions";


export default async function TermsPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const {data} = await getTermsCms.getCmsData();
  const { heroData, termsFaqData } = data;

  const slug = locale === "en"? "Terms & Conditions" : "الشروط والأحكام";

  const local_data = {
    heroData,
    termsFaqData,
  };

  return (
    <>
      <ProductHero
        locale={locale}
        data={local_data?.heroData}
        slug={slug}
      />
      <TermsFaqInfo locale={locale} data={local_data?.termsFaqData} />
    </>
  );
}
