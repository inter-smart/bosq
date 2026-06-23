import AccountCoupons from "@/components/blocks/account/account-coupons";
import AccountLayout from "@/components/blocks/account/account-layout";
import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";
import { ProfileData } from "@/lib/api/profile/profileApi";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("coupons", locale, "account/coupons");

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

const local_data = {
  heroData: {
    title: "Coupons",
    title_ar: "الكوبونات",
    description: null,
  },
};

export default async function CouponsPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await ProfileData.getCoupons();

  if (!data || error) {
    return notFound();
  }

  return (
    <>
      <ProductHero locale={locale} data={local_data?.heroData} slug={locale === "en" ? "Coupons" : "الكوبونات"} />

      <AccountLayout locale={locale}>
        <AccountCoupons locale={locale} couponData={data?.coupons} />
      </AccountLayout>
    </>
  );
}
