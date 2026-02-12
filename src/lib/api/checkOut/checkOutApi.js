import { fetchApi, sendError, sendSuccess } from "../server-client";

export const checkoutData = {
  getCartSummary: async () => {
    try {
      const data = await fetchApi(`/api/frontend/checkout/cart-summary`, {}, true);

      console.log(data);

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
