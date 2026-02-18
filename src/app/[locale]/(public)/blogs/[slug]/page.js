import BlogInfo from "@/components/blocks/blog/blog-info";
import ProductHero from "@/components/blocks/product/product-hero";
import { getBlogsData } from "@/lib/api/blog";
import { parseOtherMeta } from "@/lib/helper";
import { DefaultOgImage } from "@/lib/api/constants";
import NotFound from "../../not-found";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frontend/blog-details?slug=${slug}`);

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Parse JSON response
    const data = await response.json();

    const isEN = locale === "en";
    const metadata = data?.data?.metaData;
    console.log("data:", metadata);

    const t = await getTranslations("blog");

    if (!metadata) {
      return {
        title: t("not_found_title"),
        description: t("not_found_description"),
      };
    }

    const { meta_title, meta_description, meta_keywords, other_meta, meta_title_ar, meta_description_ar, meta_keywords_ar, other_meta_ar } = metadata;

    // Select language-specific metadata
    const title = isEN ? meta_title : meta_title_ar;
    const description = isEN ? meta_description : meta_description_ar;
    const keywords = isEN ? meta_keywords : meta_keywords_ar;

    // Use blog's own image or fallback
    const ogImage = DefaultOgImage;
    const { other } = isEN ? parseOtherMeta(other_meta) : parseOtherMeta(other_meta_ar);

    return {
      title: title || t("default_meta_title"),
      description: description || t("default_meta_description"),
      keywords: keywords || "",

      openGraph: {
        title: title || t("default_meta_title"),
        description: description || t("default_meta_description"),
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: t("image_alt"),
          },
        ],
        type: "article",
        publishedTime: data?.blogData?.publishedAt || undefined,
        authors: undefined,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${slug}`,
        locale: isEN ? "en_US" : "ar_AR",
      },

      twitter: {
        card: "summary_large_image",
        title: title || t("default_meta_title"),
        description: description || t("default_meta_description"),
        images: [ogImage],
      },

      other: {
        ...other,
      },

      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog/${slug}`,
        languages: {
          en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/blog/${slug}`,
          ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar/blog/${slug}`,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    const t = await getTranslations("blog");
    return {
      title: t("not_found_title"),
      description: t("not_found_description"),
    };
  }
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const locale = resolvedParams.locale;

  const t = await getTranslations("blog");

  const slugData = t("breadcrumb");

  const { data, error } = await getBlogsData.getBlogDetailsData(slug);

  if (!data || error) {
    return <NotFound />;
  }

  const { heroData, blogData, popularBlogData, relatedBlogData } = data;

  return (
    <>
      <ProductHero locale={locale} data={heroData} slug={slugData} link={"/blogs"} />
      <BlogInfo locale={locale} data={blogData} popularData={popularBlogData} relatedData={relatedBlogData} />
    </>
  );
}
