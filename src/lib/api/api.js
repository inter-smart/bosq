export const sendSuccess = (data) => {
  return {
    success: true,
    data,
    error: null,
  };
};

export const sendError = (error) => {
  return {
    success: false,
    data: null,
    error,
  };
};
