import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
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
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
