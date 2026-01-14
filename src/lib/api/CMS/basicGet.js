import { apiClient, sendError, sendSuccess } from "../client";

export const getSustainabilityData = async () => {
  try {
    const data = await apiClient(`/api/frontend/sustainability`);
    return sendSuccess(data?.data);
  } catch (error) {
    return sendError(error);
  }
};

export const getErgonomicChairData = async () => {
  try {
    const data = await apiClient(`/api/frontend/ergonomic-chair`);
    return sendSuccess(data?.data);
  } catch (error) {
    return sendError(error);
  }
};

export const getFaqData = async () => {
  try {
    const data = await apiClient(`/api/frontend/faq`);
    return sendSuccess(data?.data);
  } catch (error) {
    return sendError(error);
  }
};

export const getAuthData = async () => {
  try {
    const data = await apiClient(`/api/frontend/auth-cms`);
    return sendSuccess(data?.data);
  } catch (error) {
    return sendError(error);
  }
};
