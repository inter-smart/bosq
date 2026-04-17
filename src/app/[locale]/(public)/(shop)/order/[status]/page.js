import OrderSuccess from "@/components/blocks/checkout/OrderSuccess";

export default async function OrderStatus({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams.locale;

  const ref = resolvedSearchParams.orderId || null;
  const status = resolvedParams.status || null;

  return <OrderSuccess status={status} orderRef={ref} locale={locale} />;
}
