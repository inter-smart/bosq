import ChairsListing from "@/components/blocks/office-chair-landing/ChairsListing";
import LandingHero from "@/components/blocks/office-chair-landing/LandingHero";
import { getOfficeChairsData } from "@/lib/api/CMS/basicGet";
import { getMetaData } from "@/lib/api/metaApi";
import NotFound from "../../not-found";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const slug = resolvedParams.slug;

  const [metaResult, detailResult] = await Promise.all([
    getMetaData(`office-chair-${slug}`, locale, `office-chairs/${slug}`),
    getOfficeChairsData(slug),
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

  const heroData = detailResult?.data?.data?.heroData;

  const title = heroData?.title || metaTitle;
  const description =
    heroData?.description ||
    (heroData?.subTitle
      ? heroData.subTitle.replace(/<[^>]+>/g, "").slice(0, 160)
      : metaDescription);

  const ogImage =
    heroData?.media?.desktop_path ||
    heroData?.media?.mobile_path ||
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
      type: "website",
    },
    alternates: {
      ...alternates,
      languages: {
        en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/office-chairs/${slug}`,
        ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar/office-chairs/${slug}`,
      },
    },
    other,
  };
}




export default async function OfficeChairsPage({ params }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const response = await getOfficeChairsData(slug);
  const {data, error} = response?.data;

  if (!data|| error) return <NotFound params={{ locale }} />;

  return (
    <>
      <LandingHero data={data?.heroData} locale={locale} slug={slug} />
      {data?.listingData?.map((listing, index) => (
        <ChairsListing key={index} data={listing} locale={locale} />
      ))}
    </>
  );
}
