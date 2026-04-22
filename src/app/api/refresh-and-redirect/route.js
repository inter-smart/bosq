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

  console.log(`[RefreshRedirect] Attempting token refresh. Redirect target: ${redirectTo}`);
  console.log(`[RefreshRedirect] Using API_BASE_URL: ${API_BASE_URL}`);
  console.log(`[RefreshRedirect] Cookie header present: ${cookieHeader ? "yes" : "no"}`);

  try {
    const refreshResponse = await fetch(`${API_BASE_URL}/api/frontend/auth/refresh-token`, {
      method: "POST",
      headers: { cookie: cookieHeader },
    });

    if (refreshResponse.ok) {
      console.log(`[RefreshRedirect] ✅ Refresh successful. Redirecting to: ${redirectTo}`);
      const response = NextResponse.redirect(new URL(redirectTo, request.url));
      const cookies = refreshResponse.headers.getSetCookie?.()
        ?? [refreshResponse.headers.get("set-cookie")].filter(Boolean);

      console.log(`[RefreshRedirect] Forwarding ${cookies.length} Set-Cookie header(s) to browser`);

      for (const cookie of cookies) {
        response.headers.append("set-cookie", cookie);
      }
      return response;
    } else {
      const body = await refreshResponse.text().catch(() => "");
      console.log(`[RefreshRedirect] ❌ Refresh failed with status: ${refreshResponse.status}. Body: ${body}`);
    }
  } catch (error) {
    console.error(`[RefreshRedirect] ❌ Error during refresh:`, error.message);
  }

  // Refresh failed → redirect to login
  console.log(`[RefreshRedirect] Redirecting to login page for locale: ${locale}`);
  const loginUrl = new URL(`/${locale}/login`, request.url);
  loginUrl.searchParams.set("redirect", redirectTo);
  return NextResponse.redirect(loginUrl);
}
