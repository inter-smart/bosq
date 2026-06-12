import ProductHero from "@/components/blocks/product/product-hero";
import JourneySection from "@/components/blocks/about/JourneySection";
import WhyBosqSection from "@/components/blocks/about/WhyBosqSection";
import AboutBannerSection from "@/components/blocks/about/AboutBannerSection";
import TestimonialSection from "@/components/blocks/about/TestimonialSection";
import ClinetSection from "@/components/blocks/about/ClinetSection";
import NewsSection from "@/components/blocks/about/NewsSection";
import { getAboutData } from "@/lib/api/about";
import { getMetaData } from "@/lib/api/metaApi";
import { notFound } from "next/navigation";



export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("about", locale);

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


export default async function AboutPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const slug = locale === "en" ? "About Us" : "معلومات عنا";
  const { data, error } = await getAboutData.getCmsData();

  if (error || !data) {
    return notFound();
  }

  const {
    heroData,
    aboutBannerData,
    journeyData,
    whyBosqData,
    testimonialData,
    clientData,
    newsData,
  } = data;

  return (
    <>
      <ProductHero locale={locale} data={heroData} slug={slug} />
      <AboutBannerSection locale={locale} data={aboutBannerData} />
      <JourneySection locale={locale} data={journeyData} />
      {whyBosqData?.bosqList?.length > 0 && (
        <WhyBosqSection locale={locale} data={whyBosqData} />
      )}
      {testimonialData?.list?.length > 0 && (
        <TestimonialSection locale={locale} data={testimonialData} />
      )}
      {clientData?.list?.length > 0 && (
        <ClinetSection locale={locale} data={clientData} />
      )}
      {newsData?.list?.length > 0 && (
        <NewsSection locale={locale} data={newsData} />
      )}
    </>
  );
}
