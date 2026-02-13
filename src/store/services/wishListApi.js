import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include", // important for auth cookies
  }),
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    // ===============================
    // GET WISHLIST PRODUCTS
    // ===============================
    getWishlist: builder.query({
      query: () => "/api/frontend/wish-list",
      providesTags: ["Wishlist"],
    }),

    // ===============================
    // ADD TO WISHLIST
    // ===============================
    toggleWishlist: builder.mutation({
      query: (variantId) => ({
        url: "/api/frontend/wish-list",
        method: "POST",
        body: { variantId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});


export const {
  useGetWishlistQuery,
  useToggleWishlistMutation,
} = wishlistApi;
