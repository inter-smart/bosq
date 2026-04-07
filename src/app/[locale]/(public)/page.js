import { notFound } from "next/navigation";
import { getHomeData } from "@/lib/api/home";
import { getMetaData } from "@/lib/api/metaApi";
import HomeClient from "@/components/clients/HomeClient";

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

  if (error) {
    notFound();
  }

  const isEN = locale === "en";

  return <HomeClient data={data} locale={locale} isEN={isEN} />;
}
