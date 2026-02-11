import { apiClient, sendError, sendSuccess } from "./client";

export const getBlogsData = {
  getCmsData: async () => {
    try {
      const {data} = await apiClient(`/api/frontend/blogs`);
      
      return sendSuccess(data);
    } catch (error) {
      return sendError(error);
    }
  },

  getBlogList: async (page = 1, limit = 6) => {
    try {
      const { data } = await apiClient(`/api/frontend/blogs/blog-list?page=${page}&limit=${limit}`);
      return sendSuccess(data);
    } catch (error) {
      return sendError(error);
    }
  },

  getBlogDetailsData: async (slug) => {
    try {
      const {data} = await apiClient(`/api/frontend/blog-details?slug=${slug}`);
      return sendSuccess(data);
    } catch (error) {
      return sendError(error);
    }
  },
};


