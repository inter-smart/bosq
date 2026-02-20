"use client";

import { fetchCartAPI, addToCartAPI, updateCartItemAPI, removeCartItemAPI, clearCartAPI, mergeCartAPI } from "@/lib/api/cart/cartApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunks

// Fetch cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState, rejectWithValue }) => {
  try {
    const res = await fetchCartAPI();

    return res;
  } catch (error) {
    return rejectWithValue(error.message || "Failed to fetch cart");
  }
});

// Add item to cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ product_id, variant_id, quantity = 1 }, { getState, rejectWithValue }) => {
  try {
    const data = await addToCartAPI({
      product_id,
      variant_id,
      quantity,
    });

    return data;
  } catch (error) {
    console.log("CART EROR", error);
    return rejectWithValue(error?.message || "Failed to add item to cart");
  }
});

// Update cart item quantity
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ itemId, quantity, variant_id }, { getState, rejectWithValue }) => {
  try {
    const res = await updateCartItemAPI({
      itemId,
      quantity,
      variant_id,
    });

    return res;
  } catch (error) {
    console.log("ERROR", error);
    return rejectWithValue(error.message || "Failed to update cart item");
  }
});

// Remove item from cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ itemId }, { getState, rejectWithValue }) => {
  try {
    const data = await removeCartItemAPI({
      itemId,
    });

    return data;
  } catch (error) {
    return rejectWithValue(error.message || "Failed to remove item from cart");
  }
});

// Clear cart
export const clearCart = createAsyncThunk("cart/clearCart", async (_, { getState, rejectWithValue }) => {
  try {
    const data = await clearCartAPI();

    return data;
  } catch (error) {
    return rejectWithValue(error.message || "Failed to clear cart");
  }
});

// Merge guest cart into user cart (call after login)
export const mergeGuestCart = createAsyncThunk("cart/mergeGuestCart", async (_, { rejectWithValue }) => {
  try {
    const data = await mergeCartAPI();

    return data;
  } catch (error) {
    return rejectWithValue(error.message || "Failed to merge cart");
  }
});

// Initial state
const initialState = {
  items: [],
  subtotal: "0.00",
  discount_total: "0.00",
  tax_total: "0.00",
  grand_total: "0.00",
  item_count: 0,
  applied_coupon_code: null,
  isLoading: false,
  isUpdating: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCart: (state) => {
      state.items = [];
      state.subtotal = "0.00";
      state.discount_total = "0.00";
      state.tax_total = "0.00";
      state.grand_total = "0.00";
      state.item_count = 0;
      state.applied_coupon_code = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.items = action.payload.items || [];
          state.subtotal = action.payload.subtotal || "0.00";
          state.discount_total = action.payload.discount_total || "0.00";
          state.tax_total = action.payload.tax_total || "0.00";
          state.grand_total = action.payload.grand_total || "0.00";
          state.item_count = action.payload.item_count || 0;
          state.applied_coupon_code = action.payload.applied_coupon_code || null;
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        console.log("CART EROR", action.payload);
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch cart";
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isUpdating = false;
        if (action.payload) {
          state.items = action.payload.items || [];
          state.subtotal = action.payload.subtotal || "0.00";
          state.discount_total = action.payload.discount_total || "0.00";
          state.tax_total = action.payload.tax_total || "0.00";
          state.grand_total = action.payload.grand_total || "0.00";
          state.item_count = action.payload.item_count || 0;
          state.applied_coupon_code = action.payload.applied_coupon_code || null;
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || "Failed to add item to cart";
      })

      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isUpdating = false;
        if (action.payload) {
          state.items = action.payload.items || [];
          state.subtotal = action.payload.subtotal || "0.00";
          state.discount_total = action.payload.discount_total || "0.00";
          state.tax_total = action.payload.tax_total || "0.00";
          state.grand_total = action.payload.grand_total || "0.00";
          state.item_count = action.payload.item_count || 0;
          state.applied_coupon_code = action.payload.applied_coupon_code || null;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || "Failed to update cart item";
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isUpdating = false;
        if (action.payload) {
          state.items = action.payload.items || [];
          state.subtotal = action.payload.subtotal || "0.00";
          state.discount_total = action.payload.discount_total || "0.00";
          state.tax_total = action.payload.tax_total || "0.00";
          state.grand_total = action.payload.grand_total || "0.00";
          state.item_count = action.payload.item_count || 0;
          state.applied_coupon_code = action.payload.applied_coupon_code || null;
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || "Failed to remove item from cart";
      })

      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.isUpdating = false;
        if (action.payload) {
          state.items = [];
          state.subtotal = "0.00";
          state.discount_total = "0.00";
          state.tax_total = "0.00";
          state.grand_total = "0.00";
          state.item_count = 0;
          state.applied_coupon_code = null;
        }
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || "Failed to clear cart";
      })

      // Merge guest cart
      .addCase(mergeGuestCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(mergeGuestCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.items = action.payload.items || [];
          state.subtotal = action.payload.subtotal || "0.00";
          state.discount_total = action.payload.discount_total || "0.00";
          state.tax_total = action.payload.tax_total || "0.00";
          state.grand_total = action.payload.grand_total || "0.00";
          state.item_count = action.payload.item_count || 0;
          state.applied_coupon_code = action.payload.applied_coupon_code || null;
        }
      })
      .addCase(mergeGuestCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to merge cart";
      });
  },
});

export const { clearError, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
