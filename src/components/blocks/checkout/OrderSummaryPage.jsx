import { checkoutData } from "@/lib/api/checkOut/checkOutApi";
import OrderSummary from "./OrderSummary";

const OrderSummaryPage = async ({ locale, type }) => {
  const { data, error } = await checkoutData.getCartSummary(type);

  console.log(data);

  if (error) {
    console.error("Cart summary fetch failed:", error);
  }

  const products = data?.items || [];
  const cartId = data?.id || null;
  const subTotal = data?.sub_total || 0;
  const grandTotal = data?.grand_total || 0;
  const itemsCount = data?.item_count || 0;
  const totalItems = data?.items?.length;
  const couponStatus = data?.applied_coupon_code || null;
  const discountTotal = data?.discount_total || "0.00";
  const couponDiscountType = data?.coupon_discount_type || null;
  const couponDiscountValue = data?.coupon_discount_value || null;
  const deliveryCharge = data?.overall_delivery_charge || "0.00";


  return (
    <OrderSummary
      products={products}
      cartId={cartId}
      subTotal={subTotal}
      grandTotal={grandTotal}
      itemsCount={itemsCount}
      totalItems={totalItems}
      couponStatus={couponStatus}
      initialDiscountTotal={discountTotal}
      initialCouponDiscountType={couponDiscountType}
      initialCouponDiscountValue={couponDiscountValue}
      deliveryCharge={deliveryCharge}
      locale={locale}
      type={type}
    />
  );
};

export default OrderSummaryPage;
