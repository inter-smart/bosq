import BlogInfo from "@/components/blocks/blog/blog-info";
import BlogViewTracker from "@/components/blocks/blog/blog-view-tracker";
import ProductHero from "@/components/blocks/product/product-hero";
import { getBlogsData } from "@/lib/api/blog";
import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";
import { DefaultOgImage } from "@/lib/api/constants";
import { parseOtherMeta } from "@/lib/helper";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  try {
    const response = await fetch(
      `${process.env.API_URL}/api/frontend/blog-details?slug=${slug}`,
    );

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Parse JSON response
    const { data } = await response.json();





    const isEN = locale === "en";
    const metadata = data?.metaData;

    const t = await getTranslations("common");

    if (!metadata) {
      return {
        title: t("not_found_title"),
        description: t("not_found_description"),
      };
    }

    const {
      meta_title,
      meta_description,
      meta_keywords,
      other_meta,
      meta_title_ar,
      meta_description_ar,
      meta_keywords_ar,
      other_meta_ar,
    } = metadata;

    // Select language-specific metadata
    const title = isEN ? meta_title : meta_title_ar;
    const description = isEN ? meta_description : meta_description_ar;
    const keywords = isEN ? meta_keywords : meta_keywords_ar;

    // Use blog's own image or fallback
    const ogImage = DefaultOgImage;
    const { other } = isEN
      ? parseOtherMeta(other_meta)
      : parseOtherMeta(other_meta_ar);


    return {
      title: title,
      description: description,
      keywords: keywords,

      openGraph: {
        title: title,
        description: description,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: t("image_alt"),
          },
        ],
        type: "article",
        authors: undefined,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog-details/${slug}`,
        locale: isEN ? "en_US" : "ar_AR",
      },

      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [ogImage],
      },

      other: {
        ...other,
      },

      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/blog-details/${slug}`,
        languages: {
          en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/blog-details/${slug}`,
          ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar/blog-details/${slug}`,
        },
      },
    };
  } catch (error) {
  }
}

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const locale = resolvedParams.locale;

  const { data, error } = await getBlogsData.getBlogDetailsData(slug);

  if (!data || error) {
    return notFound();
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
