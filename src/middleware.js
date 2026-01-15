// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { Locale, locales, localeDirection, defaultLocale } from "./il8n/config"; 

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return NextResponse.next();

  // Detect locale from Accept-Language header or use default
  const locale = getLocale(request) || defaultLocale;

  // Redirect to locale-prefixed URL
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

function getLocale(request) {
  // Check cookie first
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase())
      .find((lang) => locales.includes(lang));

    if (preferredLocale) return preferredLocale;
  }

  return null;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|manifest.json).*)",
  ],
};
