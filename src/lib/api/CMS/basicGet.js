import { apiClient, sendError, sendSuccess } from "../client";

const getSustainabilityData = async () => {
  try {
    const data = await apiClient(`/api/frontend/sustainability`);
    return sendSuccess(data?.data);
  } catch (error) {
    return sendError(error);
  }
};

export { getSustainabilityData };
