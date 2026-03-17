import { sendError, sendSuccess } from "./api";
import { apiClient } from "./client";

export const getReturnPolicyCms = {
  getCmsData: async () => {
    try {
      const data = await apiClient(`/api/frontend/return-policy`);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
