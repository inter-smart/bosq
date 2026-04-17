import { sendError, sendSuccess } from "./api";
import { apiClient } from "./client";

export const getHomeData = {
  getCmsData: async () => {
    try {
      const data = await apiClient(`/api/frontend/home`);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
