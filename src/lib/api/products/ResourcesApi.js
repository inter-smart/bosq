import { apiClient, sendError, sendSuccess } from "../client";

export const ProductData = {
  getFilterData: async () => {
    try {
      const data = await apiClient(
        `/api/frontend/common-actions/listing/filters`,
      );

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },


   getProductList : async (params) => {
    try {
        const data = await apiClient(`/api/frontend/products/product-listing?${params}`);
        return sendSuccess(data?.data);
    } catch (error) {
        return sendError(error);
    }
  },

};
