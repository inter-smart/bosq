import dynamic from "next/dynamic";
import HomeHero from "@/components/blocks/home/home-hero"; // keep SSR for SEO

import { notFound } from "next/navigation";
import { getHomeData } from "@/lib/api/home";
import { getMetaData } from "@/lib/api/metaApi";

const HomeAbout = dynamic(() => import("@/components/blocks/home/home-about"));
const HomeFeatured = dynamic(
  () => import("@/components/blocks/home/home-featured"),
);
const HomeJourney = dynamic(
  () => import("@/components/blocks/home/home-journey"),
);
const HomeProject = dynamic(
  () => import("@/components/blocks/home/home-project"),
);
const HomeCalculator = dynamic(
  () => import("@/components/blocks/home/home-calculator"),
);
const HomeFind = dynamic(() => import("@/components/blocks/home/home-find"));
const HomeBrand = dynamic(() => import("@/components/blocks/home/home-brand"));
const HomeEnquiry = dynamic(
  () => import("@/components/blocks/home/home-enquiry"),
);

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.locale;

  const {
    title,
    description,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  } = await getMetaData("home", lang);

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

export default async function HomePage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await getHomeData.getCmsData();

  if (error) {
    notFound();
  }

  const {
    sliders,
    aboutSection,
    journeySection,
    featuredSection,
    projectSection,
    smartSpaceSection,
    fitsSection,
    brandsSection,
    formSection,
    enquiryDropdowns,
    state
  } = data;

  const isEN = locale === "en";

  return (
    <>
      <HomeHero locale={locale} data={sliders} />
      <HomeAbout locale={locale} data={aboutSection} state={state} dropdownData={enquiryDropdowns} />
      <HomeFeatured locale={locale} data={featuredSection} />
      <HomeJourney locale={locale} data={journeySection} isEN={isEN} />
      <HomeProject locale={locale} data={projectSection} isEN={isEN} />
      <HomeCalculator
        locale={locale}
        smartSpaceSection={smartSpaceSection}
        isEN={isEN}
      />
      <HomeFind locale={locale} data={fitsSection} isEN={isEN} />
      {brandsSection?.list.length > 0 && (
        <HomeBrand locale={locale} data={brandsSection} isEN={isEN} />
      )}
      <HomeEnquiry locale={locale} data={formSection} isEN={isEN} />
    </>
  );
}
