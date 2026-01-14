import { apiClient, sendError, sendSuccess } from "../client";

const getSustainabilityData = async () => {
  try {
    const data = await apiClient(`/api/frontend/sustainability`);
    return sendSuccess(data?.data);
  } catch (error) {
    return sendError(error);
  }
};

const getErgonomicChairData = async () => {
  try {
    const data = await apiClient(`/api/frontend/ergonomic-chair`);
    return sendSuccess(data?.data);
  } catch (error) {
    return sendError(error);
  }
};

export { getSustainabilityData, getErgonomicChairData };
