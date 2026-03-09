import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get("redirect") || "/";
  const locale = searchParams.get("locale") || "en";

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const cookieHeader = request.headers.get("cookie") || "";

  try {
    const refreshResponse = await fetch(`${API_BASE_URL}/api/frontend/auth/refresh-token`, {
      method: "POST",
      headers: { cookie: cookieHeader },
    });

    if (refreshResponse.ok) {
      const response = NextResponse.redirect(new URL(redirectTo, request.url));
      const setCookie = refreshResponse.headers.get("set-cookie");
      if (setCookie) {
        response.headers.set("set-cookie", setCookie);
      }
      return response;
    }
  } catch (_) {}

  // Refresh failed → redirect to login
  const loginUrl = new URL(`/${locale}/login`, request.url);
  loginUrl.searchParams.set("redirect", redirectTo);
  return NextResponse.redirect(loginUrl);
}
