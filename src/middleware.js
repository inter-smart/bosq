// middleware.ts
import { NextResponse } from "next/server";
import { locales, defaultLocale } from "./il8n/config";

const PROTECTED_PATHS = ["/account"];
const AUTH_PAGES = ["/login", "/signup", "/forgot-password", "/create-password", "/otp-submission"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  /* --------------------------------------------------
     1️⃣ LOCALE DETECTION & EXTRACTION
  -------------------------------------------------- */
  const pathnameHasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  let locale;
  let pathnameWithoutLocale;

  if (pathnameHasLocale) {
    const segments = pathname.split("/").filter(Boolean);
    locale = segments[0];
    pathnameWithoutLocale = "/" + segments.slice(1).join("/") || "/";
  } else {
    locale = getLocale(request) || defaultLocale;
    pathnameWithoutLocale = pathname;
  }

  /* --------------------------------------------------
     2️⃣ AUTH PROTECTION & REDIRECTS
  -------------------------------------------------- */
  const isProtected = PROTECTED_PATHS.some(
    (protectedPath) => pathnameWithoutLocale === protectedPath || pathnameWithoutLocale.startsWith(`${protectedPath}/`),
  );

  const isAuthPage = AUTH_PAGES.some((authPath) => pathnameWithoutLocale === authPath || pathnameWithoutLocale.startsWith(`${authPath}/`));

  const token = request.cookies.get("access_token")?.value;

  // 🔴 Not logged in → try silent refresh first, then block protected pages
  if (isProtected && !token) {
    const refreshToken = request.cookies.get("refresh_token")?.value;
    if (refreshToken) {
      const refreshUrl = new URL(`/api/refresh-and-redirect`, request.url);
      refreshUrl.searchParams.set("redirect", pathname + request.nextUrl.search);
      refreshUrl.searchParams.set("locale", locale);
      return NextResponse.redirect(refreshUrl);
    }
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("redirect", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // 🟢 Logged in → block auth pages (even browser back button)
  if (isAuthPage && token) {
    // Check if there's a redirect param to send them to, otherwise home
    const redirectTo = request.nextUrl.searchParams.get("redirect");
    const destination = redirectTo && redirectTo.startsWith("/") ? redirectTo : `/${locale}`;
    return NextResponse.redirect(new URL(destination, request.url));
  }

  /* --------------------------------------------------
     3️⃣ LOCALE REDIRECT (if needed)
  -------------------------------------------------- */
  if (!pathnameHasLocale) {
    const localeUrl = new URL(`/${locale}${pathname}`, request.url);
    localeUrl.search = request.nextUrl.search;
    return NextResponse.redirect(localeUrl);
  }

  return NextResponse.next();
}

/* --------------------------------------------------
   LOCALE DETECTION
-------------------------------------------------- */
function getLocale(request) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return null;

  return (
    acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase())
      .find((lang) => locales.includes(lang)) ?? null
  );
}

/* --------------------------------------------------
   MATCHER
-------------------------------------------------- */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|manifest.json).*)"],
};
