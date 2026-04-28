import BlogInfo from "@/components/blocks/blog/blog-info";
import BlogViewTracker from "@/components/blocks/blog/blog-view-tracker";
import ProductHero from "@/components/blocks/product/product-hero";
import { getBlogsData } from "@/lib/api/blog";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../../not-found";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;

  const [metaResult, detailResult] = await Promise.all([
    getMetaData(`blog-${slug}`, locale, `blogs/${slug}`),
    getBlogsData.getBlogDetailsData(slug),
  ]);

  const {
    title: metaTitle,
    description: metaDescription,
    keywords,
    twitter,
    openGraph,
    alternates,
    other,
  } = metaResult;

  const heroData = detailResult?.data?.heroData;
  const blogData = detailResult?.data?.blogData;

  const title = heroData?.title || metaTitle;
  const description =
    heroData?.description ||
    (blogData?.description
      ? blogData.description.replace(/<[^>]+>/g, "").slice(0, 160)
      : metaDescription);

  const ogImage =
    blogData?.media?.desktop_path ||
    blogData?.media?.mobile_path ||
    openGraph?.images?.[0]?.url;

  return {
    title,
    description,
    keywords,
    twitter: {
      ...twitter,
      title: twitter?.title === metaTitle ? title : twitter?.title,
      description:
        twitter?.description === metaDescription ? description : twitter?.description,
      images: ogImage ? [ogImage] : twitter?.images,
    },
    openGraph: {
      ...openGraph,
      title: openGraph?.title === metaTitle ? title : openGraph?.title,
      description:
        openGraph?.description === metaDescription ? description : openGraph?.description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : openGraph?.images,
      type: "article",
      publishedTime: blogData?.publishedAt || undefined,
    },
    alternates: {
      ...alternates,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/blogs/${slug}`,
        ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar/blogs/${slug}`,
      },
    },
    other,
  };
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const locale = resolvedParams.locale;

  const { data, error } = await getBlogsData.getBlogDetailsData(slug);

  if (!data || error) {
    return <NotFound params={{ locale }} />;
  }

  const { heroData, blogData, popularBlogData, relatedBlogData } = data;

  return (
    <>
      <BlogViewTracker slug={slug} />
      <ProductHero
        locale={locale}
        data={heroData}
        slug={`${slug}`}
        type="blog"
      />
      <BlogInfo
        locale={locale}
        data={blogData}
        popularData={popularBlogData}
        relatedData={relatedBlogData}
      />
    </>
  );
}
