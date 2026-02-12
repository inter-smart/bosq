import { sendError, sendSuccess } from "./api";
import { apiClient } from "./client";

export const getWarrantyPolicyCms = {
  getCmsData: async () => {
    try {
      const data = await apiClient(`/api/frontend/warranty-policy`);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
