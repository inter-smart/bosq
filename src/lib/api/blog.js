import { apiClient, sendError, sendSuccess } from "./client";

export const getBlogsData = {
  getCmsData: async ({page, limit}) => {
    try {
      const {data} = await apiClient(`/api/frontend/blogs?page=${page}&limit=${limit}`);
      
      console.log(data)
      return sendSuccess(data);
    } catch (error) {
      return sendError(error);
    }
  },
};
