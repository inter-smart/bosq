import PaymentCallbackClient from "@/components/blocks/checkout/PaymentCallbackClient";

export default async function PaymentCallbackPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const locale = resolvedParams.locale;
  const orderId = resolvedSearchParams.orderId || null;

  return <PaymentCallbackClient locale={locale} orderId={orderId} />;
}
