import { apiClient, sendError, sendSuccess } from "./client";

export const getAboutData = {
  getCmsData: async () => {
    try {
      const {data} = await apiClient(`/api/frontend/about`);
      
      return sendSuccess(data);
    } catch (error) {
      return sendError(error);
    }
  },
};
