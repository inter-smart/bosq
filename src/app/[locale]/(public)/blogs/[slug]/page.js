import BlogInfo from "@/components/blocks/blog/blog-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getBlogsData } from "@/lib/api/blog";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../../not-found/page";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData(`blog-${slug}`, locale, `blogs/${slug}`);

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

export default async function BlogDetailPage({ params }) {
const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  const slugData = locale === "en"? "Blog" : "تفاصيل المقالة";

  const {data, error} = await getBlogsData.getBlogDetailsData(slug);

if (!data || error) {
  return <NotFound />;
}


  const { heroData, blogData, popularBlogData, relatedBlogData } = data;

  return (
    <>
      <ProductHero locale={locale} data={heroData} slug={slugData} link={"/blogs"} />
      <BlogInfo
        locale={locale}
        data={blogData}
        popularData={popularBlogData}
        relatedData={relatedBlogData}
      />
    </>
  );
}