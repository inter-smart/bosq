import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutUser } from "@/store/slices/authSlice";
import { attemptTokenRefresh } from "@/lib/helper";
import { toast } from "sonner";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
});

export async function baseQueryWithReauth(args, api, extraOptions) {
  let result = await rawBaseQuery(args, api, extraOptions);

  console.log("Base query result:", {
    args,
    result,
    timestamp: new Date().toISOString(),
  });

  if (result.error?.status === 401) {
    if (!api.getState().auth.isAuthenticated) return result;

    const refreshed = await attemptTokenRefresh();

    console.log("refreshed", refreshed);

    if (refreshed) {
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      toast.error("Your session has expired. Please log in again.");
      api.dispatch(logoutUser());
      result = {
        error: {
          status: 401,
          data: {
            message: "Your session has expired. Please log in again.",
            error_code: "SESSION_EXPIRED",
          },
        },
      };
    }
  }

  return result;
}
