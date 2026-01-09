import { apiClient, sendError, sendSuccess } from "./client";

export const getDeliveryPolicyCms = {
    getCmsData: async()=>{
        try {
            const data = await apiClient(`/api/frontend/delivery-policy`);
            return sendSuccess(data?.data);
        } catch (error) {
            return sendError(error)
        }
    }
}