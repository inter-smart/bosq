import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/api/baseQueryWithReauth";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: ({ payment_type, address, type, coupon_code }) => ({
        url: `/api/frontend/orders/place`,
        method: "POST",
        body: {
          payment_type,
          address,
          type,
          coupon_code,
        },
      }),
      transformErrorResponse: (response) => {
        const message = response?.data?.message;
        const errorCode = response?.data?.error_code;

        let result;
        if (!message) {
          result = { en: "Failed to place order", ar: "فشل في تقديم الطلب" };
        } else if (typeof message === "string") {
          result = { en: message, ar: message };
        } else {
          result = { ...message };
        }

        if (errorCode) result.error_code = errorCode;
        return result;
      },
    }),

    applyCoupon: builder.mutation({
      query: ({ coupon_code, cart_type }) => ({
        url: `/api/frontend/checkout/apply-coupon`,
        method: "POST",
        body: {
          coupon_code,
          cart_type,
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
      query: ({ coupon_code, cart_type }) => ({
        url: `/api/frontend/checkout/remove-coupon`,
        method: "POST",
        body: {
          coupon_code,
          cart_type,
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

    returnOrder: builder.mutation({
      query: ({ orderId, formData }) => ({
        url: `/api/frontend/orders/${orderId}/return`,
        method: "POST",
        body: formData,
        formData: true,
      }),
      transformErrorResponse: (response) => {
        const message = response?.data?.message;
        if (!message) return { en: "Failed to submit return request", ar: "فشل في تقديم طلب الإرجاع" };
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
  useReturnOrderMutation,
} = orderApi;
