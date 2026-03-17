"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedShippingAddressId: null,
  selectedBillingAddressId: null,
  useSameAddressForBilling: false,
  useSameAddressForShipping: false,
  isCheckOutAllowed: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setIsCheckoutAllowed: (state, action) => {
      state.isCheckOutAllowed = action.payload;
    },

    setSelectedShippingAddress: (state, action) => {
      state.selectedShippingAddressId = action.payload;
      // If using same address for billing, sync billing with shipping
      if (state.useSameAddressForBilling) {
        state.selectedBillingAddressId = action.payload;
      }
    },
    setSelectedBillingAddress: (state, action) => {
      state.selectedBillingAddressId = action.payload;
      // If using same address for shipping, sync shipping with billing
      if (state.useSameAddressForShipping) {
        state.selectedShippingAddressId = action.payload;
      }
    },
    setUseSameAddressForBilling: (state, action) => {
      state.useSameAddressForBilling = action.payload;
      // If toggling to use same address, sync billing with shipping
      if (action.payload && state.selectedShippingAddressId) {
        state.selectedBillingAddressId = state.selectedShippingAddressId;
      }
      // If enabling "same for billing", disable "same for shipping" to avoid conflict
      if (action.payload) {
        state.useSameAddressForShipping = false;
      }
    },
    setUseSameAddressForShipping: (state, action) => {
      state.useSameAddressForShipping = action.payload;
      // If toggling to use same address, sync shipping with billing
      if (action.payload && state.selectedBillingAddressId) {
        state.selectedShippingAddressId = state.selectedBillingAddressId;
      }
      // If enabling "same for shipping", disable "same for billing" to avoid conflict
      if (action.payload) {
        state.useSameAddressForBilling = false;
      }
    },
    resetCheckout: (state) => {
      state.selectedShippingAddressId = null;
      state.selectedBillingAddressId = null;
      state.useSameAddressForBilling = false;
      state.useSameAddressForShipping = false;
    },
  },
});

export const {
  setSelectedShippingAddress,
  setSelectedBillingAddress,
  setUseSameAddressForBilling,
  setUseSameAddressForShipping,
  resetCheckout,
  setIsCheckoutAllowed,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
