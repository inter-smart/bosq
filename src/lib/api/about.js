import { sendError, sendSuccess } from "./api";
import { apiClient } from "./client";

export const getAboutData = {
  getCmsData: async () => {
    try {
      const { data } = await apiClient(`/api/frontend/about`);

      return sendSuccess(data);
    } catch (error) {
      return sendError(error);
    }
  },
};
