import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    credentials: "include",
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    validateCart: builder.mutation({
      query: () => "/api/frontend/checkout/validate-checkout",
      transformErrorResponse: (response) => {
        return response?.data?.message || "Failed to validate cart";
      },
    }),
  }),
});

export const { useValidateCartMutation } = commonApi;
