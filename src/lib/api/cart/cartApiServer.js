import { sendError, sendSuccess } from "../api";
import { fetchApi } from "../server";

export const checkOutDataServer = {
  getSimilarProducts: async () => {
    const endpoint = "/api/frontend/cart/similar-products";
    try {
      const data = await fetchApi(endpoint, {}, true);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
