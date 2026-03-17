import { sendError, sendSuccess } from "./api";
import { apiClient } from "./client";

export const getPolicyCms = {
  getCmsData: async () => {
    try {
      const data = await apiClient(`/api/frontend/privacy-policy`);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
