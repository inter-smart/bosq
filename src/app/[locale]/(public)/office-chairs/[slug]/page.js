import ChairsListing from "@/components/blocks/office-chair-landing/ChairsListing";
import LandingHero from "@/components/blocks/office-chair-landing/LandingHero";
import { getOfficeChairsData } from "@/lib/api/CMS/basicGet";
import { notFound } from "next/navigation";


import { getTranslations } from "next-intl/server";
import { DefaultOgImage } from "@/lib/api/constants";
import { parseOtherMeta } from "@/lib/helper";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;




  try {
    const response = await fetch(
      `${process.env.API_URL}/api/frontend/office-chairs?slug=${slug}`,
    );

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Parse JSON response
    const { data } = await response.json();




    const isEN = locale === "en";
    const metadata = data?.data?.metaData;

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


    console.log("Metadata for office chair:", title)
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
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/office-chairs/${slug}`,
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
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/office-chairs/${slug}`,
        languages: {
          en: `${process.env.NEXT_PUBLIC_SITE_URL}/en/office-chairs/${slug}`,
          ar: `${process.env.NEXT_PUBLIC_SITE_URL}/ar/office-chairs/${slug}`,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
}



export default async function OfficeChairsPage({ params }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const response = await getOfficeChairsData(slug);
  const { data, error } = response?.data;

  if (!data || error) return notFound()

  return (
    <>
      <LandingHero data={data?.heroData} locale={locale} slug={slug} />
      {data?.listingData?.map((listing, index) => (
        <ChairsListing key={index} data={listing} locale={locale} />
      ))}
    </>
  );
}
