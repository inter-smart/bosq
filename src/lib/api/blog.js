import { apiClient, sendError, sendSuccess } from "./client";

export const getBlogsData = {
  getCmsData: async () => {
    try {
      const data = await apiClient(`/api/frontend/blogs`);
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
