import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => headers,
  }),
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
