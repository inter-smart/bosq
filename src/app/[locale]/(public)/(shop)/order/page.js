import CheckoutResponse from "@/components/blocks/checkout/checkout-response";
import CheckoutResponseTest from "@/components/blocks/checkout/checkOutResp";

export default async function OrderStatus({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedParams.locale;

  const ref = resolvedSearchParams.ref || null;

  // return <CheckoutResponse orderRef={ref} locale={locale} />;
  return <CheckoutResponseTest locale={locale} />;
}
