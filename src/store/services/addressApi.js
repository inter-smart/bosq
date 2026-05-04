// services/addressApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/api/baseQueryWithReauth";

/**
 * ✅ Reusable Error Formatter
 */
const formatErrorMessage = (response, fallback) => {
  const message = response?.data?.message;

  if (!message) return fallback;

  if (typeof message === "string") {
    return { en: message, ar: message };
  }

  if (typeof message === "object" && message !== null) {
    return {
      en: message.en || fallback.en,
      ar: message.ar || fallback.ar,
    };
  }

  return fallback;
};

/**
 * ✅ Centralized Error Messages
 */
const ERROR_MESSAGES = {
  FETCH: {
    en: "Unable to fetch addresses. Please try again.",
    ar: "تعذر تحميل العناوين. يرجى المحاولة مرة أخرى.",
  },
  ADD: {
    en: "Failed to add address. Please check your details and try again.",
    ar: "فشل في إضافة العنوان. يرجى التحقق من البيانات والمحاولة مرة أخرى.",
  },
  UPDATE: {
    en: "Failed to update address. Please try again.",
    ar: "فشل في تحديث العنوان. يرجى المحاولة مرة أخرى.",
  },
  DELETE: {
    en: "Failed to delete address. Please try again.",
    ar: "فشل في حذف العنوان. يرجى المحاولة مرة أخرى.",
  },
  SET_DEFAULT: {
    en: "Failed to set default address. Please try again.",
    ar: "فشل في تعيين العنوان الافتراضي. يرجى المحاولة مرة أخرى.",
  },
};

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Address"],

  endpoints: (builder) => ({
    /**
     * 📥 Get Addresses
     */
    getAddresses: builder.query({
      query: () => "/api/frontend/checkout/cart-addresss",
      providesTags: ["Address"],
      keepUnusedDataFor: 0,

      transformErrorResponse: (response) => {
        return formatErrorMessage(response, ERROR_MESSAGES.FETCH);
      },
    }),

    /**
     * ➕ Add Address
     */
    addAddress: builder.mutation({
      query: ({ values }) => ({
        url: `/api/frontend/address`,
        method: "POST",
        body: values,
      }),

      transformErrorResponse: (response) => {
        return formatErrorMessage(response, ERROR_MESSAGES.ADD);
      },

      invalidatesTags: (result, error) => (error ? [] : ["Address"]),
    }),

    /**
     * ✏️ Update Address
     */
    updateAddress: builder.mutation({
      query: ({ id, values }) => ({
        url: `/api/frontend/address/${id}`,
        method: "PUT",
        body: values,
      }),

      transformErrorResponse: (response) => {
        return formatErrorMessage(response, ERROR_MESSAGES.UPDATE);
      },

      invalidatesTags: (result, error) => (error ? [] : ["Address"]),
    }),

    /**
     * ⭐ Set Default Address
     */
    updateDefaultAddress: builder.mutation({
      query: ({ id, addressType, isAuthenticated }) => ({
        url: `/api/frontend/address/${id}/default`,
        method: "PUT",
        body: {
          addressType,
          isAuthenticated,
        },
      }),

      transformErrorResponse: (response) => {
        return formatErrorMessage(response, ERROR_MESSAGES.SET_DEFAULT);
      },

      invalidatesTags: (result, error) => (error ? [] : ["Address"]),
    }),

    /**
     * 🗑 Delete Address
     */
    deleteAddress: builder.mutation({
      query: ({ id, addressType, isAuthenticated }) => ({
        url: `/api/frontend/address/${id}`,
        method: "DELETE",
        body: {
          addressType,
          isAuthenticated,
        },
      }),

      transformErrorResponse: (response) => {
        console.error("Delete address error response:", response);
        return formatErrorMessage(response, ERROR_MESSAGES.DELETE);
      },

      invalidatesTags: (result, error) => (error ? [] : ["Address"]),
    }),
  }),
});

export const { useGetAddressesQuery, useAddAddressMutation, useUpdateAddressMutation, useUpdateDefaultAddressMutation, useDeleteAddressMutation } =
  addressApi;
