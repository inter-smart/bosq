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
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const { useGetWishlistQuery, useToggleWishlistMutation } = wishlistApi;
