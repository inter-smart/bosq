import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get("redirect") || "/";
  const locale = searchParams.get("locale") || "en";

  // Use API_URL (server-side only env var) for server-to-server calls.
  // NEXT_PUBLIC_API_BASE_URL may be "/api/proxy" in production (a relative path),
  // which doesn't work for server-side fetch — we need the full backend URL.
  const API_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const cookieHeader = request.headers.get("cookie") || "";

  try {
    const refreshResponse = await fetch(`${API_BASE_URL}/api/frontend/auth/refresh-token`, {
      method: "POST",
      headers: { cookie: cookieHeader },
    });

    if (refreshResponse.ok) {
      const response = NextResponse.redirect(new URL(redirectTo, request.url));
      const cookies = refreshResponse.headers.getSetCookie?.()
        ?? [refreshResponse.headers.get("set-cookie")].filter(Boolean);

      for (const cookie of cookies) {
        response.headers.append("set-cookie", cookie);
      }
      return response;
    }
  } catch (error) {
  }

  // Refresh failed → redirect to login
  const loginUrl = new URL(`/${locale}/login`, request.url);
  loginUrl.searchParams.set("redirect", redirectTo);
  return NextResponse.redirect(loginUrl);
}
