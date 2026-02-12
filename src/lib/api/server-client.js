import { cookies } from "next/headers";
export { sendSuccess, sendError } from "./client";

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchApi(endpoint, options = {}, passCookie = false) {
  const url = `${API_URL}${endpoint}`;

  let cookieHeader = "";

  if (passCookie) {
    const cookieStore = await cookies();

    cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
  }

  const config = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(passCookie && cookieHeader && { Cookie: cookieHeader }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);

    console.log(res);

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
