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
    const endpoint = `/api/frontend/products/product-listing?${params}`;

    try {
      console.info("[ProductService:getProductList] Request", {
        endpoint,
        params,
        time: new Date().toISOString(),
      });

      const data = await apiClient(endpoint);

      console.info("[ProductService:getProductList] Success", {
        endpoint,
        count: data?.data?.length ?? 0,
      });

      return sendSuccess(data?.data);
    } catch (error) {
      console.error("[ProductService:getProductList] Error", {
        endpoint,
        params,
        message: error?.message,
        status: error?.response?.status,
        response: error?.response?.data,
      });

      return sendError(error);
    }
  },

  getProductDetailsBySlug: async (slug, base_slug, model) => {
    try {
      const data = await apiClient(`/api/frontend/products/product?slug=${slug}&base_slug=${base_slug || ""}&model_slug=${model || ""}`);

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
