import { cookies } from "next/headers";

// ✅ CHANGE: Remove fallback to NEXT_PUBLIC_API_BASE_URL
const API_URL = process.env.API_URL || "";

export async function fetchApi(endpoint, options = {}, passCookie = false) {
  const url = `${API_URL}${endpoint}`;

  let cookieHeader = null;

  if (passCookie) {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    if (allCookies.length > 0) {
      cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join("; ");
    }
  }

  const config = {
    // ✅ REMOVE: credentials: "include" (not needed for server-to-server)
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader && { Cookie: cookieHeader }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || `HTTP ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.log("API Client Error:", error.message);
    throw error;
  }
}
