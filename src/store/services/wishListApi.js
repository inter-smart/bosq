import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/api/baseQueryWithReauth";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithReauth,
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
