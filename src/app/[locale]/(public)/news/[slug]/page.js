import NewsInfo from "@/components/blocks/news/news-info";
import NewsViewTracker from "@/components/blocks/news/news-view-tracker";
import ProductHero from "@/components/blocks/product/product-hero";
import { getNewsData } from "@/lib/api/news";
import { parseOtherMeta } from "@/lib/helper";
import { DefaultOgImage } from "@/lib/api/constants";
import NotFound from "../../not-found";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frontend/news-details?slug=${slug}`,
    );

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Parse JSON response
    const data = await response.json();

    const isEN = locale === "en";
    const metadata = data?.data?.metaData;

    if (!metadata) {
      return {
        title: "",
        description: "The requested news post could not be found.",
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

    // Use news's own image or fallback
    const ogImage = DefaultOgImage;
    const { other } = isEN
      ? parseOtherMeta(other_meta)
      : parseOtherMeta(other_meta_ar);

    return {
      title: title || "News Post",
      description: description || "Read our latest news post",
      keywords: keywords || "",

      openGraph: {
        title: title || "News Post",
        description: description || "Read our latest news post",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: "News post image",
          },
        ],
        type: "article",
        publishedTime: data?.newsData?.publishedAt || undefined,
        authors: undefined,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/news/${slug}`,
        locale: isEN ? "en_US" : "ar_AR",
      },

      twitter: {
        card: "summary_large_image",
        title: title || "News Post",
        description: description || "Read our latest news post",
        images: [ogImage],
      },

      other: {
        ...other,
      },

      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/news/${slug}`,
        languages: {
          en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/news/${slug}`,
          ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar/news/${slug}`,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "News Not Found",
      description: "The requested news post could not be found.",
    };
  }
}

export default async function NewsDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const locale = resolvedParams.locale;

  const slugData = locale === "en" ? "News" : "تفاصيل المقالة";

  const { data, error } = await getNewsData.getNewsDetailsData(slug);

  if (!data || error) {
    return <NotFound />;
  }

  const { heroData, newsData, popularNewsData, relatedNewsData } = data;

  return (
    <>
      <NewsViewTracker slug={ slug} />
      <ProductHero
        locale={locale}
        data={heroData}
        slug={`${slug}`}
        type={"news"}
      />
      <NewsInfo
        locale={locale}
        data={newsData}
        popularData={popularNewsData}
        relatedData={relatedNewsData}
      />
    </>
  );
}
