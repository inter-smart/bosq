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

    cancelOrder: builder.mutation({
      query: ({ orderId }) => ({
        url: `/api/frontend/orders/${orderId}/cancel`,
        method: "PUT",
      }),
      transformErrorResponse: (response) => {
        const message = response?.data?.message;

        if (!message) {
          return { en: "Failed to cancel order", ar: "فشل في إلغاء الطلب" };
        }

        if (typeof message === "string") {
          return { en: message, ar: message };
        }

        return message;
      },
    }),

    reorderOrder: builder.mutation({
      query: ({ orderId }) => ({
        url: `/api/frontend/orders/${orderId}/reorder`,
        method: "POST",
      }),
      transformErrorResponse: (response) => {
        const message = response?.data?.message;

        if (!message) {
          return { en: "Failed to reorder", ar: "فشل في إعادة الطلب" };
        }

        if (typeof message === "string") {
          return { en: message, ar: message };
        }

        return message;
      },
    }),

    initiatePayment: builder.mutation({
      query: ({ orderId, locale }) => ({
        url: `/api/frontend/orders/${orderId}/initiate-payment?locale=${locale || "en"}`,
        method: "POST",
      }),
      transformErrorResponse: (response) => {
        const message = response?.data?.message;
        if (!message) return { en: "Failed to initiate payment", ar: "فشل في بدء الدفع" };
        if (typeof message === "string") return { en: message, ar: message };
        return message;
      },
    }),

    getPaymentStatus: builder.query({
      query: ({ orderId }) => ({
        url: `/api/frontend/orders/${orderId}/payment-status`,
      }),
      transformErrorResponse: (response) => {
        const message = response?.data?.message;
        if (!message) return { en: "Failed to get payment status", ar: "فشل في الحصول على حالة الدفع" };
        if (typeof message === "string") return { en: message, ar: message };
        return message;
      },
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useApplyCouponMutation,
  useRemoveCouponMutation,
  useCancelOrderMutation,
  useReorderOrderMutation,
  useInitiatePaymentMutation,
  useGetPaymentStatusQuery,
} = orderApi;
