import CheckoutResponse from "@/components/blocks/checkout/checkout-response";
import { notFound } from "next/navigation";

export default async function OrderStatus({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { status } = resolvedParams;
  const locale = resolvedParams.locale;

  const allowedStatus = ["success", "failed"];
  if (!allowedStatus.includes(status)) {
    return notFound();
  }

  const orderId = resolvedSearchParams.orderId || null;
  console.log("Order Status Page - SearchParams:", resolvedSearchParams);
  console.log("Order Status Page - OrderID extracted:", orderId);

  return <CheckoutResponse orderStatus={status} locale={locale} orderId={orderId} />;
}
