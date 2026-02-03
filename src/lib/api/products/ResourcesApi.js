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

  getProductDetailsBySlug: async (initialFetch, slug, variantSku = null, model = null, attributeFilters = {}) => {
    try {
      const params = new URLSearchParams({
        slug,
        initialFetch,
      });

      if (variantSku) params.append("variantSku", variantSku);
      if (model) params.append("model", model);

      // Append attribute filters (e.g., attr_pattern=striped becomes attr[pattern]=striped)
      Object.entries(attributeFilters).forEach(([attrSlug, valueSlug]) => {
        params.append(`attr[${attrSlug}]`, valueSlug);
      });

      console.log(params);

      const data = await apiClient(`/api/frontend/products/product?${params.toString()}`);

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

  getSearchSectionSections: async () => {
    try {
      const data = await apiClient(`/api/frontend/product-search/categories`);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
