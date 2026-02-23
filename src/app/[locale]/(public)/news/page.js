import NewsHero from "@/components/blocks/news/news-hero";
import NewsList from "@/components/blocks/news/news-list";
import { getNewsData } from "@/lib/api/news";
import { getMetaData } from "@/lib/api/metaApi";
import { notFound } from "next/navigation";
import NotFound from "../not-found";



export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("news", locale);

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


export default async function NewsPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { locale } = resolvedParams;
  const page = Number(resolvedSearchParams?.page) || 1;

  const [cmsResult, blogListResult] = await Promise.all([
    getNewsData.getCmsData(),
    getNewsData.getNewsList(page, 6),
  ]);

  if (cmsResult.error) {
    NotFound()
  }

  
  const slug = locale==="en" ? "News" : "أخبار";

  const { heroData } = cmsResult.data;
  const blogListData = blogListResult.data || { blog: [], pagination: {} };

  return (
    <>
      <NewsHero locale={locale} data={heroData} slug={slug} type={"news"} />
      <NewsList locale={locale} data={blogListData} />
    </>
  );
}