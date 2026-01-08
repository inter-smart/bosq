import { sendSuccess, sendError, apiClient } from "./client";

export const getTermsCms = {
    getCmsData: async()=>{
        try {
            const data = await apiClient(`/api/frontend/terms-and-conditions`);
            return sendSuccess(data?.data);
        } catch (error) {
            return sendError(error)
        }
    }
}