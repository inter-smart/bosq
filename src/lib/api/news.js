import { apiClient, sendError, sendSuccess } from "./client";

export const getNewsData = {
  


  getCmsData: async () => {
    try {
      const {data} = await apiClient(`/api/frontend/news`);
      
      return sendSuccess(data);
    } catch (error) {
      return sendError(error);
    }
  },

  getNewsList: async (page = 1, limit = 6) => {
    try {
      const { data } = await apiClient(`/api/frontend/news/news-list?page=${page}&limit=${limit}`);
      return sendSuccess(data);
    } catch (error) {
      return sendError(error);
    }
  },

  getNewsDetailsData: async (slug) => {
    try {
      const {data} = await apiClient(`/api/frontend/news-details?slug=${slug}`);
      return sendSuccess(data);
    } catch (error) {
      return sendError(error);
    }
  },
};


