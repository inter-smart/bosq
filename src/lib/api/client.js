export const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiClient(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  const { next, cache, ...restOptions } = options;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...restOptions.headers,
    },
    ...restOptions,

    ...(next && { next }),
    ...(cache && { cache }),
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || `HTTP ${res.status}`);
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}
