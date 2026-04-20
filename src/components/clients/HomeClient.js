"use client";
import dynamic from "next/dynamic";
const HomeAbout = dynamic(() => import("@/components/blocks/home/home-about"), { ssr: true });
const HomeFeatured = dynamic(() => import("@/components/blocks/home/home-featured"));
const HomeJourney = dynamic(() => import("@/components/blocks/home/home-journey"));
const HomeProject = dynamic(() => import("@/components/blocks/home/home-project"));
const HomeCalculator = dynamic(() => import("@/components/blocks/home/home-calculator"));
const HomeFind = dynamic(() => import("@/components/blocks/home/home-find"));
const HomeBrand = dynamic(() => import("@/components/blocks/home/home-brand"));
const HomeEnquiry = dynamic(() => import("@/components/blocks/home/home-enquiry"));

export default function HomeClient({ data, locale }) {
  const {
    aboutSection,
    journeySection,
    featuredSection,
    projectSection,
    smartSpaceSection,
    fitsSection,
    brandsSection,
    formSection,
    enquiryDropdowns,
    state,
  } = data;

  const isEN = locale === "en";

  return (
    <>
      <HomeAbout locale={locale} data={aboutSection} state={state} dropdownData={enquiryDropdowns} />

      {featuredSection?.list.length > 0 && <HomeFeatured locale={locale} data={featuredSection} />}
      <HomeJourney locale={locale} data={journeySection} isEN={isEN} />

      {projectSection?.list.length > 0 && <HomeProject locale={locale} data={projectSection} isEN={isEN} />}

      {smartSpaceSection?.list.length > 0 && <HomeCalculator locale={locale} smartSpaceSection={smartSpaceSection} isEN={isEN} />}

      {fitsSection?.projects.length > 0 && <HomeFind locale={locale} data={fitsSection} isEN={isEN} />}
      {brandsSection?.list.length > 0 && <HomeBrand locale={locale} data={brandsSection} isEN={isEN} />}
      <HomeEnquiry locale={locale} data={formSection} isEN={isEN} />
    </>
  );
}
