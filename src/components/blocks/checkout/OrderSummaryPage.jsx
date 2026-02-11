import { checkoutData } from "@/lib/api/checkOut/checkOutApi";
import { notFound } from "next/navigation";
import OrderSummary from "./OrderSummary";

const OrderSummaryPage = async ({ locale }) => {
  const { data, error } = await checkoutData.getCartSummary();

  if (error) {
    return notFound();
  }

  const products = data?.items || [];
  const cartId = data?.id || null;
  const subTotal = data?.sub_total || 0;
  const grandTotal = data?.grand_total || 0;
  const itemsCount = data?.item_count || 0;
  const totalItems = data?.items?.length;
  const couponStatus = data?.applied_coupon_code || null;

  return (
    <OrderSummary
      products={products}
      cartId={cartId}
      subTotal={subTotal}
      grandTotal={grandTotal}
      itemsCount={itemsCount}
      totalItems={totalItems}
      couponStatus={couponStatus}
      locale={locale}
    />
  );
};

export default OrderSummaryPage;
