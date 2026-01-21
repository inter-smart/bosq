import BlogHero from "@/components/blocks/blog/blog-hero";
import BlogList from "@/components/blocks/blog/blog-list";
import { getBlogsData } from "@/lib/api/blog";
import { getMetaData } from "@/lib/api/metaApi";
import { notFound } from "next/navigation";
import NotFound from "../not-found/page";



export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("blogs", locale);

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


export default async function BlogsPage({params}) {
  const resolvedParams = await params;
  const {locale} = resolvedParams;

  let page = 1;
  let limit = 6;

  const { data, error } = await getBlogsData.getCmsData({ page, limit });

  if(error){
    NotFound()
  }

  const { heroData, blogData } = data;

  return (
    <>
      <BlogHero locale={locale} data={heroData} slug={"Blogs"} />
      <BlogList locale={locale} initialData={blogData} limit={limit} />
    </>
  );
}