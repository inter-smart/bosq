import { apiClient, sendError, sendSuccess } from "../client";

export const ProductData = {
  getFilterData: async () => {
    try {
      const data = await apiClient(`/api/frontend/common-actions/listing/filters`);

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  getProductInitialListing: async () => {
    try {
      const data = await apiClient(`/api/frontend/products/initial-product-list`);

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  getProductList: async (params) => {
    try {
      const data = await apiClient(`/api/frontend/products/product-listing?${params}`);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  getProductDetailsBySlug: async (slug) => {
    try {
      const data = await apiClient(`/api/frontend/products/product?slug=${slug}`);

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  getProductModelBySlug: async (slug) => {
    try {
      const data = await apiClient(`/api/frontend/products/product-model?slug=${slug}`);

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
