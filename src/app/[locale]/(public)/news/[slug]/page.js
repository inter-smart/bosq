import NewsInfo from "@/components/blocks/news/news-info";
import NewsViewTracker from "@/components/blocks/news/news-view-tracker";
import ProductHero from "@/components/blocks/product/product-hero";
import { getNewsData } from "@/lib/api/news";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../../not-found";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;

  const [metaResult, detailResult] = await Promise.all([
    getMetaData(`news-${slug}`, locale, `news/${slug}`),
    getNewsData.getNewsDetailsData(slug),
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
  const newsData = detailResult?.data?.newsData;

  const title = heroData?.title || metaTitle;
  const description =
    heroData?.description ||
    (newsData?.description
      ? newsData.description.replace(/<[^>]+>/g, "").slice(0, 160)
      : metaDescription);

  const ogImage =
    newsData?.media?.desktop_path ||
    newsData?.media?.mobile_path ||
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
      publishedTime: newsData?.publishedAt || undefined,
    },
    alternates: {
      ...alternates,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/news/${slug}`,
        ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar/news/${slug}`,
      },
    },
    other,
  };
}

export default async function NewsDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const locale = resolvedParams.locale;

  const slugData = locale === "en" ? "News" : "تفاصيل المقالة";

  const { data, error } = await getNewsData.getNewsDetailsData(slug);

  if (!data || error) {
    return <NotFound params={{ locale }} />;
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
