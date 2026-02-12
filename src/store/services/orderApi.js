import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    credentials: "include",
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: ({ payment_type, address }) => ({
        url: `/api/frontend/orders/place`,
        method: "POST",
        body: {
          payment_type,
          address,
        },
      }),
      transformErrorResponse: (response) => {
        return response?.data?.message || "Failed to place order";
      },
    }),

    applyCoupon: builder.mutation({
      query: ({ coupon_code }) => ({
        url: `/api/frontend/checkout/apply-coupon`,
        method: "POST",
        body: {
          coupon_code,
        },
      }),
      transformErrorResponse: (response) => {
        return response?.data?.message || "Failed to apply coupon";
      },
    }),

    removeCoupon: builder.mutation({
      query: ({ coupon_code }) => ({
        url: `/api/frontend/checkout/remove-coupon`,
        method: "POST",
        body: {
          coupon_code,
        },
      }),
      transformErrorResponse: (response) => {
        return response?.data?.message || "Failed to remove coupon";
      },
    }),
  }),
});

export const { usePlaceOrderMutation, useApplyCouponMutation, useRemoveCouponMutation } = orderApi;
