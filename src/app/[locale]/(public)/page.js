import { getHomeData } from "@/lib/api/home";
import { getMetaData } from "@/lib/api/metaApi";
import HomeHero from "@/components/blocks/home/home-hero";
import HomeClient from "@/components/clients/HomeClient";
import { preload } from "react-dom";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.locale;

  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("home", lang);

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

  if (error || !data) {
    return notFound()
  }

  const isEN = locale === "en";

  // Preload LCP image for the first slider to reduce Resource Load Delay
  const firstSlider = data?.sliders?.[0];
  if (firstSlider && firstSlider.media_type !== "video") {
    const mobileSrc = isEN ? firstSlider?.media?.mobile?.path : firstSlider?.media?.mobile?.path_ar;
    const desktopSrc = isEN ? firstSlider?.media?.desktop?.path : firstSlider?.media?.desktop?.path_ar;

    if (mobileSrc) {
      preload(mobileSrc, { as: "image", fetchPriority: "high", media: "(max-width: 640px)" });
    }
    if (desktopSrc) {
      preload(desktopSrc, { as: "image", fetchPriority: "high", media: "(min-width: 641px)" });
    }
  }

  return (
    <>
      <HomeHero data={data.sliders} locale={locale} />
      <HomeClient data={data} locale={locale} isEN={isEN} />
    </>
  );
}
