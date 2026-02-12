// middleware.ts
import { NextResponse } from "next/server";
import { locales, defaultLocale } from "./il8n/config";

const PROTECTED_PATHS = ["/account"];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  /* --------------------------------------------------
     1️⃣ LOCALE DETECTION & EXTRACTION
  -------------------------------------------------- */
  const pathnameHasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  let locale;
  let pathnameWithoutLocale;

  if (pathnameHasLocale) {
    // Extract locale from pathname
    const segments = pathname.split("/").filter(Boolean);
    locale = segments[0];
    pathnameWithoutLocale = "/" + segments.slice(1).join("/");
  } else {
    // Get locale from detection
    locale = getLocale(request) || defaultLocale;
    pathnameWithoutLocale = pathname;
  }

  /* --------------------------------------------------
     2️⃣ AUTH PROTECTION
  -------------------------------------------------- */
  const isProtected = PROTECTED_PATHS.some(
    (protectedPath) => pathnameWithoutLocale === protectedPath || pathnameWithoutLocale.startsWith(`${protectedPath}/`),
  );

  const token = request.cookies.get("access_token")?.value;

  if (isProtected && !token) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /* --------------------------------------------------
     3️⃣ LOCALE REDIRECT (if needed)
  -------------------------------------------------- */
  if (!pathnameHasLocale) {
    const localeUrl = new URL(`/${locale}${pathname}`, request.url);
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
