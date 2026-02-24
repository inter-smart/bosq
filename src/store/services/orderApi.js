import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: ({ payment_type, address, type }) => ({
        url: `/api/frontend/orders/place`,
        method: "POST",
        body: {
          payment_type,
          address,
          type,
        },
      }),
      transformErrorResponse: (response) => {
        const message = response?.data?.message;

        if (!message) {
          return { en: "Failed to place order", ar: "فشل في تقديم الطلب" };
        }

        if (typeof message === "string") {
          return { en: message, ar: message };
        }

        return message;
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
        const message = response?.data?.message;

        if (!message) {
          return { en: "Failed to apply coupon", ar: "فشل في تطبيق الكوبون" };
        }

        if (typeof message === "string") {
          return { en: message, ar: message };
        }

        return message;
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
        const message = response?.data?.message;

        if (!message) {
          return { en: "Failed to remove coupon", ar: "فشل في إزالة الكوبون" };
        }

        if (typeof message === "string") {
          return { en: message, ar: message };
        }

        return message;
      },
    }),
  }),
});

export const { usePlaceOrderMutation, useApplyCouponMutation, useRemoveCouponMutation } = orderApi;
