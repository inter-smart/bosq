import FaqInfo from "@/components/blocks/faq/faq-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getFaqData } from "@/lib/api/CMS/basicGet";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../not-found";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("faqs", locale);

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

export default async function FaqsPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getFaqData();

  if (error) {
    <NotFound />
  }


  const { heroData, faqData, moreFaq } = data;

  return (
    <>
      <ProductHero locale={locale} data={heroData} slug={"FAQ"} />
      <FaqInfo locale={locale} data={faqData} moreFaq={moreFaq} />
    </>
  );
}
