// app/[locale]/order-status/page.js
import CheckoutResponse from "@/components/blocks/checkout/checkout-response";

export default async function OrderStatus({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams.locale;

  const ref = resolvedSearchParams.ref || null;

  return <CheckoutResponse orderRef={ref} locale={locale} />;
}
