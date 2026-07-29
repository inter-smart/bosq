import { parseOtherMeta } from "@/lib/helper";
import { sendError, sendSuccess } from "../api";
import { fetchApi } from "../server";

export const ProductData = {
  getFilterData: async () => {
    const endpoint = `/api/frontend/common-actions/listing/filters`;
    try {
      const data = await fetchApi(endpoint, {}, false);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  getProductList: async (params) => {
    const endpoint = `/api/frontend/products/product-listing?${params}`;

    try {
      const data = await fetchApi(endpoint, {}, true);

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  getProductDetailsBySlug: async (slug, variantSku = null, model = null, attributeFilters = {}) => {
    try {
      const params = new URLSearchParams({
        slug,
      });

      if (variantSku) params.append("variantSku", variantSku);
      if (model) params.append("model", model);

      // Append attribute filters (e.g., attr_pattern=striped becomes attr[pattern]=striped)
      Object.entries(attributeFilters).forEach(([attrSlug, valueSlug]) => {
        params.append(`attr[${attrSlug}]`, valueSlug);
      });

      const data = await fetchApi(`/api/frontend/products/product?${params.toString()}`, {}, true);

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },

  // getProductModelBySlug: async (slug) => {
  //   const endpoint = `/api/frontend/products/product-model?slug=${slug}`;
  //   try {
  //     const data = await fetchApi(endpoint, {}, true);

  //     return sendSuccess(data?.data);
  //   } catch (error) {
  //     return sendError(error);
  //   }
  // },

  getSearchSectionSections: async () => {
    const endpoint = `/api/frontend/product-search/sections`;
    try {
      const data = await fetchApi(endpoint, {}, true);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
