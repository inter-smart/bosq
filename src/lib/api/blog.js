import { apiClient, sendError, sendSuccess } from "./client";

export const getBlogsData = {
  getCmsData: async ({page, limit}) => {
    try {
      const {data} = await apiClient(`/api/frontend/blogs?page=${page}&limit=${limit}`);
      
      return sendSuccess(data?.data);
    } catch (error) {
      return sendError(error);
    }
  },
};
