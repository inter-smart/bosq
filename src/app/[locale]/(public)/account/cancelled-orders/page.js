import AccountCancelled from "@/components/blocks/account/account-cancelled";
import AccountLayout from "@/components/blocks/account/account-layout";
import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";
import { ProfileData } from "@/lib/api/profile/profileApi";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData(
    "cancelledOrders",
    locale,
    "account/cancelled-orders",
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

const heroData = {
  title: "My Profile",
  description: null,
};

export default async function CancelledOrdersPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const { data, error } = await ProfileData.getCancelledOrders();

  if (!data || error) {
    return notFound();
  }

  const allOrders = data?.orders ?? [];

  const cancelledItems = allOrders;

  console.log(cancelledItems);

  const slug = locale === "en" ? "Cancelled Orders" : "الطلبات الملغاة";

  return (
    <>
      <ProductHero locale={locale} data={heroData} slug={slug} />
      <AccountLayout locale={locale}>
        <AccountCancelled locale={locale} data={cancelledItems} />
      </AccountLayout>
    </>
  );
}
