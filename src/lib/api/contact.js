import { apiClient, sendError, sendSuccess } from "./client";

export const getContactData = {
  getCmsData: async () => {
    try {
      const data = await apiClient(`/api/frontend/contact`);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
