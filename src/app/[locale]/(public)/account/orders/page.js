import AccountLayout from "@/components/blocks/account/account-layout";
import AccountOrders from "@/components/blocks/account/account-orders";
import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";
import { ProfileData } from "@/lib/api/profile/profileApi";
import NotFound from "../../../../not-found";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("orders", locale, "account/orders");

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
    title: "My Profile",
    title_ar: "ملفي الشخصي",
    description: null,
  },
};

export default async function OrdersPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const { locale } = resolvedParams;
  const page = parseInt(resolvedSearch?.page) || 1;

  const { data, error } = await ProfileData.getOrders(page, 12);

  const slug = locale === "en" ? "My Orders" : "طلباتي";
  const orders = data?.orders;
  const pagination = data?.pagination;

  if (!data || error) {
    return <NotFound />;
  }
  return (
    <>
      <ProductHero locale={locale} data={local_data?.heroData} slug={slug} />
      <AccountLayout locale={locale}>
        <AccountOrders locale={locale} orders={orders} pagination={pagination} />
      </AccountLayout>
    </>
  );
}
