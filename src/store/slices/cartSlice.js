"use client";

import {
  fetchCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
  mergeCartAPI,
  buyNowAPI,
  addToCartTogetherAPI,
  addBundleAPI,
} from "@/lib/api/cart/cartApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUser } from "./authSlice";


// Async Thunks

// Fetch cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState, rejectWithValue }) => {
  try {
    const res = await fetchCartAPI();

    return res;
  } catch (error) {
    return rejectWithValue(
      error || {
        en: "Failed to add item to cart",
        ar: "فشل في إضافة المنتج إلى السلة",
      },
    );
  }
});

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product_id, variant_id, isAuthenticated, quantity = 1 }, { dispatch, rejectWithValue }) => {
    try {
      const data = await addToCartAPI({
        product_id,
        variant_id,
        quantity,
        isAuthenticated,
      });

      return data;
    } catch (error) {


      if (error?.requiresLogin) {
        dispatch(logoutUser());
        return rejectWithValue({
          message: error?.message || {
            en: "Failed to add item to cart",
            ar: "فشل في إضافة المنتج إلى السلة",
          },
          requiresLogin: error?.requiresLogin,
        });
      } else {
        return rejectWithValue(
          error || {
            en: "Failed to add items to cart",
            ar: "فشل في إضافة المنتجات إلى السلة",
          },
        );
      }
    }
  },
);
export const addToCartTogether = createAsyncThunk(
  "cart/addToCartTogether",
  async ({ variant_ids, isAuthenticated }, { dispatch, rejectWithValue }) => {
    try {
      const data = await addToCartTogetherAPI({
        variant_ids,
        isAuthenticated,
      });


      return data;
    } catch (error) {

      if (error?.requiresLogin) {
        dispatch(logoutUser());
        return rejectWithValue({
          message: error?.message || {
            en: "Failed to add item to cart",
            ar: "فشل في إضافة المنتج إلى السلة",
          },
          requiresLogin: error?.requiresLogin,
        });
      } else {
        return rejectWithValue(
          error || {
            en: "Failed to add items to cart",
            ar: "فشل في إضافة المنتجات إلى السلة",
          },
        );
      }
    }
  },
);

export const addBundle = createAsyncThunk(
  "cart/addBundle",
  async ({ variant_ids, isAuthenticated }, { dispatch, rejectWithValue }) => {
    try {
      const data = await addBundleAPI({
        variant_ids,
        isAuthenticated,
      });


      return data;
    } catch (error) {

      if (error?.requiresLogin) {
        dispatch(logoutUser());
        return rejectWithValue({
          message: error?.message || {
            en: "Failed to add item to cart",
            ar: "فشل في إضافة المنتج إلى السلة",
          },
          requiresLogin: error?.requiresLogin,
        });
      } else {
        return rejectWithValue(
          error || {
            en: "Failed to add items to cart",
            ar: "فشل في إضافة المنتجات إلى السلة",
          },
        );
      }
    }
  }
);

export const buyNow = createAsyncThunk("cart/buyNow", async ({ product_id, variant_id, isAuthenticated, quantity = 1 }, { dispatch, rejectWithValue }) => {
  try {
    const data = await buyNowAPI({
      product_id,
      variant_id,
      quantity,
      isAuthenticated,
    });

    return data;
  } catch (error) {

    if (error?.requiresLogin) {
      dispatch(logoutUser());
      return rejectWithValue({
        message: error?.message || {
          en: "Failed to buy item",
          ar: "فشل في شراء المنتج",
        },
        requiresLogin: error?.requiresLogin,
      });

    } else {
      return rejectWithValue(
        error || {
          en: "Failed to buy item",
          ar: "فشل في شراء المنتج",
        },
      );
    }


  }
});

// Update cart item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ itemId, quantity, variant_id, isAuthenticated }, { dispatch, rejectWithValue }) => {
    try {
      const res = await updateCartItemAPI({
        itemId,
        quantity,
        variant_id,
        isAuthenticated,
      });

      return res;
    } catch (error) {


      if (error?.requiresLogin) {
        dispatch(logoutUser());
        return rejectWithValue({
          message: error?.message || {
            en: "Failed to add item to cart",
            ar: "فشل في إضافة المنتج إلى السلة",
          },
          requiresLogin: error?.requiresLogin,
        });
      } else {
        return rejectWithValue(
          error || {
            en: "Failed to add item to cart",
            ar: "فشل في إضافة المنتج إلى السلة",
          },
        );
      }
    }
  },
);

// Remove item from cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ itemId, isAuthenticated }, { dispatch, rejectWithValue }) => {
  try {
    const data = await removeCartItemAPI({
      itemId,
      isAuthenticated,
    });

    return data;
  } catch (error) {
    if (error?.requiresLogin) {
      dispatch(logoutUser());
      return rejectWithValue({
        message: error?.message || {
          en: "Failed to remove item from cart",
          ar: "فشل في إزالة المنتج من السلة",
        },
        requiresLogin: error?.requiresLogin,
      });
    } else {
      return rejectWithValue(
        error || {
          en: "Failed to remove item from cart",
          ar: "فشل في إزالة المنتج من السلة",
        },
      );
    }
  }
});

// Clear cart
export const clearCart = createAsyncThunk("cart/clearCart", async (_, { dispatch, rejectWithValue }) => {
  try {
    const data = await clearCartAPI();

    return data;
  } catch (error) {
    if (error?.requiresLogin) {
      dispatch(logoutUser());
      return rejectWithValue({
        message: error?.message || {
          en: "Failed to clear cart",
          ar: "فشل في إفراغ السلة",
        },
        requiresLogin: error?.requiresLogin,
      });
    } else {
      return rejectWithValue(
        error || {
          en: "Failed to clear cart",
          ar: "فشل في إفراغ السلة",
        },
      );
    }
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
  shipping_charge: 0,
  items_charges: [],
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
          state.shipping_charge = action.payload.shipping_charge || 0;
          state.items_charges = action.payload.items_charges || [];
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
        state.error = action.payload?.message || action?.payload || "Failed to add item to cart";
      })

      // Add to cart together
      .addCase(addToCartTogether.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(addToCartTogether.fulfilled, (state, action) => {
        state.isUpdating = false;
        if (action.payload?.items) {
          state.items = action.payload.items || [];
          state.subtotal = action.payload.subtotal || "0.00";
          state.discount_total = action.payload.discount_total || "0.00";
          state.tax_total = action.payload.tax_total || "0.00";
          state.grand_total = action.payload.grand_total || "0.00";
          state.item_count = action.payload.item_count || 0;
          state.applied_coupon_code = action.payload.applied_coupon_code || null;
        }
      })
      .addCase(addToCartTogether.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload?.message || action?.payload || "Failed to add items to cart";
      })

      // Add bundle to cart
      .addCase(addBundle.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(addBundle.fulfilled, (state, action) => {
        state.isUpdating = false;
        if (action.payload?.items) {
          state.items = action.payload.items || [];
          state.subtotal = action.payload.subtotal || "0.00";
          state.discount_total = action.payload.discount_total || "0.00";
          state.tax_total = action.payload.tax_total || "0.00";
          state.grand_total = action.payload.grand_total || "0.00";
          state.item_count = action.payload.item_count || 0;
          state.applied_coupon_code = action.payload.applied_coupon_code || null;
        }
      })
      .addCase(addBundle.rejected, (state, action) => {
        console.log("ADD BUNDLE REJECTED", action.payload);
        state.isUpdating = false;
        state.error = action.payload?.message || action?.payload || "Failed to add items to cart";
      })

      // Buy now

      .addCase(buyNow.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(buyNow.fulfilled, (state, action) => {
        state.isUpdating = false;
      })
      .addCase(buyNow.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload?.message || action?.payload || "Failed to buy item";
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
          state.shipping_charge = action.payload.shipping_charge || 0;
          state.items_charges = action.payload.items_charges || [];
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload?.message || action?.payload || "Failed to update cart item";
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
          state.shipping_charge = action.payload.shipping_charge || 0;
          state.items_charges = action.payload.items_charges || [];
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        console.log("CART REMOVE ERROR", action.payload);
        state.isUpdating = false;
        state.error = action.payload?.message || action?.payload || "Failed to remove item from cart";
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
