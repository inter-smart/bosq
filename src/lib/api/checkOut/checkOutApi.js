import { sendError, sendSuccess } from "../api";
import { fetchApi } from "../server";

export const checkoutData = {
  getCartSummary: async (type = null) => {
    let url = "/api/frontend/checkout/cart-summary";

    type && (url = `/api/frontend/checkout/cart-buynow`);

    console.log("fetching with url", url);

    try {
      const data = await fetchApi(url, {}, true);

      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
