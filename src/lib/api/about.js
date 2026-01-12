import { apiClient, sendError, sendSuccess } from "./client";

export const getAboutData = {
  getCmsData: async () => {
    try {
      const {data} = await apiClient(`/api/frontend/about`);
      
      console.log(data)
      return sendSuccess(data);
    } catch (error) {
      return sendError(error);
    }
  },
};
