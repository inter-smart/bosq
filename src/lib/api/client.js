const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";


export async function apiClient(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {    const res = await fetch(url, config);

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || `HTTP ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
}

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
