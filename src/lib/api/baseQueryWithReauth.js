import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAuth } from "@/store/slices/authSlice";
import { attemptTokenRefresh } from "@/lib/helper";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
});

export async function baseQueryWithReauth(args, api, extraOptions) {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshed = await attemptTokenRefresh();

    if (refreshed) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearAuth());
    }
  }

  return result;
}
