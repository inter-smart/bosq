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
    pathnameWithoutLocale = "/" + (segments.slice(1).join("/") || "");

    // /en/... → redirect to clean URL (strip default locale from URL)
    if (locale === defaultLocale) {
      const cleanUrl = new URL(pathnameWithoutLocale || "/", request.url);
      cleanUrl.search = request.nextUrl.search;
      return NextResponse.redirect(cleanUrl);
    }
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

  // Login URL: clean for en, prefixed for ar
  const loginBase = locale === defaultLocale ? "" : `/${locale}`;

  // 🔴 Not logged in → try silent refresh first, then block protected pages
  if (isProtected && !token) {
    const refreshToken = request.cookies.get("refresh_token")?.value;
    if (refreshToken) {
      const refreshUrl = new URL(`/api/refresh-and-redirect`, request.url);
      refreshUrl.searchParams.set("redirect", pathname + request.nextUrl.search);
      refreshUrl.searchParams.set("locale", locale);
      return NextResponse.redirect(refreshUrl);
    }
    const loginUrl = new URL(`${loginBase}/login`, request.url);
    loginUrl.searchParams.set("redirect", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // 🟢 Logged in → block auth pages (even browser back button)
  if (isAuthPage && token) {
    const redirectTo = request.nextUrl.searchParams.get("redirect");
    const destination = redirectTo && redirectTo.startsWith("/") ? redirectTo : (locale === defaultLocale ? "/" : `/${locale}`);
    return NextResponse.redirect(new URL(destination, request.url));
  }

  /* --------------------------------------------------
     3️⃣ LOCALE ROUTING
  -------------------------------------------------- */
  if (!pathnameHasLocale) {
    if (locale === defaultLocale) {
      // REWRITE: browser URL stays clean, Next.js routes internally to /en/...
      const rewriteUrl = new URL(`/${locale}${pathname}`, request.url);
      rewriteUrl.search = request.nextUrl.search;
      return NextResponse.rewrite(rewriteUrl);
    } else {
      // Non-default locale (ar): redirect to add locale prefix
      const localeUrl = new URL(`/${locale}${pathname}`, request.url);
      localeUrl.search = request.nextUrl.search;
      return NextResponse.redirect(localeUrl);
    }
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
