import { sendError, sendSuccess } from "../api";
import { apiClient } from "../client";

export const ProductDataClient = {
  getProductList: async (params) => {
    const endpoint = `/api/frontend/products/product-listing?${params}`;

    try {
      const data = await apiClient(endpoint);

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
