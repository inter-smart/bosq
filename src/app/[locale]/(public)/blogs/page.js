import BlogHero from "@/components/blocks/blog/blog-hero";
import BlogList from "@/components/blocks/blog/blog-list";
import { getBlogsData } from "@/lib/api/blog";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../not-found";



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


export default async function BlogsPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { locale } = resolvedParams;
  const page = Number(resolvedSearchParams?.page) || 1;

  const slug = locale === "en" ? "Blogs" : "المدونة";
  const [cmsResult, blogListResult] = await Promise.all([
    getBlogsData.getCmsData(),
    getBlogsData.getBlogList(page, 6),
  ]);

  if (cmsResult.error) {
    NotFound()
  }

  const { heroData } = cmsResult.data;
  const blogListData = blogListResult.data || { blog: [], pagination: {} };

  return (
    <>
      <BlogHero locale={locale} data={heroData} slug={slug} />
      <BlogList locale={locale} data={blogListData} />
    </>
  );
}