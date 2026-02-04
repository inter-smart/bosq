// Cart items
export const selectCartItems = (state) => state.cart.items;

// Cart item count (total quantity)
export const selectCartCount = (state) => state.cart.item_count;

// Cart totals
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartDiscountTotal = (state) => state.cart.discount_total;
export const selectCartTaxTotal = (state) => state.cart.tax_total;
export const selectCartGrandTotal = (state) => state.cart.grand_total;

// Applied coupon
export const selectAppliedCoupon = (state) => state.cart.applied_coupon_code;

// Loading states
export const selectCartIsLoading = (state) => state.cart.isLoading;
export const selectCartIsUpdating = (state) => state.cart.isUpdating;

// Error state
export const selectCartError = (state) => state.cart.error;

// Full cart state
export const selectCart = (state) => state.cart;
