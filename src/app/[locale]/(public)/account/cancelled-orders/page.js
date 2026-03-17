import AccountCancelled from "@/components/blocks/account/account-cancelled";
import AccountLayout from "@/components/blocks/account/account-layout";
import ProductHero from "@/components/blocks/product/product-hero";
import { getMetaData } from "@/lib/api/metaApi";
import { ProfileData } from "@/lib/api/profile/profileApi";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const { title, description, keywords, twitter, openGraph, alternates, other } = await getMetaData("cancelledOrders", locale, "account/cancelled-orders");

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

  const { data } = await ProfileData.getOrders();
  const allOrders = data?.orders ?? [];

  const cancelledItems = allOrders
    .filter((order) => order.status?.toLowerCase() === "cancelled")
    .flatMap((order) =>
      (order.items ?? []).map((item) => ({
        order_id: order.id,
        order_number: order.order_id,
        name: locale === "ar" ? item.variant?.title_ar : item.variant?.title,
        quantity: item.quantity,
        formatted_total: item.line_total,
        formatted_cancelled_date: order.createdAt,
        cancelledReason: "",
        media: {
          path: item.variant?.media_path ?? "/images/cart-product-1.png",
          alt: item.variant?.title ?? "",
        },
        actions: { can_reorder: true },
      }))
    );

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
