import { sendSuccess, sendError, apiClient } from "./client";

export const getCustomizationCms = {
    getCmsData: async()=>{
        try {
            const data = await apiClient(`/api/frontend/customization`);
            return sendSuccess(data?.data);
        } catch (error) {
            return sendError(error)
        }
    },

     getStates: async()=>{
        try {
            const data = await apiClient(`/api/frontend/enquiries/customization/states`);
            return sendSuccess(data?.data);
        } catch (error) {
            return sendError(error)
        }
    }
}
