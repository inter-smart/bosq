import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/api/baseQueryWithReauth";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    validateCart: builder.mutation({
      query: () => "/api/frontend/checkout/validate-checkout",
      transformErrorResponse: (response) => {
        const message = response?.data?.message;

        if (!message) {
          return { en: "Failed to validate cart", ar: "فشل في التحقق من السلة" };
        }

        if (typeof message === "string") {
          return { en: message, ar: message };
        }

        return message;
      },
    }),
  }),
});

export const { useValidateCartMutation } = commonApi;
