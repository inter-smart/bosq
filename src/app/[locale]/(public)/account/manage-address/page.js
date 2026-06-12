import AccountAddress from "@/components/blocks/account/account-address";
import AccountLayout from "@/components/blocks/account/account-layout";
import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";
import { ProfileData } from "@/lib/api/profile/profileApi";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData(
    "manageAddress",
    locale,
    "account/manage-address",
  );

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
    title: "Manage Address",
    title_ar: "إدارة العنوان",
    description: null,
  },
};

export default async function ManageAddressPage({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const { data, error } = await ProfileData.getAddress();

  if (!data || error) {
    return notFound();
  }

  const slug = locale === "en" ? "Manage Address" : "إدارة العنوان"

  return (
    <>
      <ProductHero locale={locale} data={local_data?.heroData} slug={slug} />
      <AccountLayout locale={locale}>
        <AccountAddress locale={locale} addressData={data?.address} />
      </AccountLayout>
    </>
  );
}
