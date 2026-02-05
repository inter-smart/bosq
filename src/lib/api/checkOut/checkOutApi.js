import { fetchApi, sendError, sendSuccess } from "../client";

export const checkoutData = {
  getCartSummary: async () => {
    try {
      const data = await fetchApi(`/api/frontend/checkout/cart-summary`, {}, true);

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
