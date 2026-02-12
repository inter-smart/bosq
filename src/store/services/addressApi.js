// services/addressApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    credentials: "include",
  }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: () => "/api/frontend/checkout/cart-addresss",
      providesTags: ["Address"],
    }),

    addAddress: builder.mutation({
      query: ({ values }) => ({
        url: `/api/frontend/address`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Address"],
    }),

    updateAddress: builder.mutation({
      query: ({ id, values }) => ({
        url: `/api/frontend/address/${id}`,
        method: "PUT",
        body: values,
      }),
      invalidatesTags: ["Address"], // 🔥 auto refetch
    }),

    updateDefaultAddress: builder.mutation({
      query: ({ id, addressType }) => ({
        url: `/api/frontend/address/${id}/default`,
        method: "PUT",
        body: {
          addressType,
        },
      }),
      invalidatesTags: ["Address"], // 🔥 auto refetch
    }),

    deleteAddress: builder.mutation({
      query: ({ id, addressType }) => ({
        url: `/api/frontend/address/${id}`,
        method: "DELETE",
        body: {
          addressType,
        },
      }),
      invalidatesTags: ["Address"], // 🔥 auto refetch
    }),
  }),
});

export const { useGetAddressesQuery, useUpdateAddressMutation, useDeleteAddressMutation, useAddAddressMutation, useUpdateDefaultAddressMutation } =
  addressApi;
