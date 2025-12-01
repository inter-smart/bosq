import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

// 1. Define your valid route patterns
const validRoutes = [
  /^\/$/, // Allow root "/" as valid
  /^\/(en|ar)$/, // Home pages for each locale
  /^\/(en|ar)\/about$/, // About page
  /^\/(en|ar)\/contact$/, // Contact page
  /^\/(en|ar)\/legal-statement$/, // Statement page
  /^\/(en|ar)\/models\/(u8|u9)(\/.*)?$/, // Models page
  /^\/(en|ar)\/news$/, // News page
  /^\/(en|ar)\/news\/[^\/]+$/, // News detail page (matches /en/news/some-article)
  /^\/(en|ar)\/offers$/, // Offers page
  /^\/(en|ar)\/ownership$/, // Ownership page
  /^\/(en|ar)\/privacy-policy$/, // Privacy page
  /^\/(en|ar)\/service$/, // Service page
  /^\/(en|ar)\/not-found$/, // Error page
];

function isValidRoute(pathname) {
  return validRoutes.some((pattern) => pattern.test(pathname));
}

export default async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Redirect paths without locale prefix to locale-specific path
  if (!pathname.startsWith("/en") && !pathname.startsWith("/ar")) {
    const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";
    const targetPath =
      pathname === "/" || pathname === ""
        ? `/${locale}`
        : `/${locale}${pathname}`;
    const url = new URL(targetPath + search, request.url);
    return NextResponse.redirect(url, { status: 308 });
  }

  // Remove trailing slash
  if (pathname !== "/" && pathname.endsWith("/")) {
    const url = new URL(pathname.slice(0, -1) + search, request.url);
    return NextResponse.redirect(url, { status: 308 });
  }

  // Check if the route is valid
  if (!isValidRoute(pathname)) {
    // Extract locale from pathname, default to "en"
    const match = pathname.match(/^\/(en|ar)(\/|$)/);
    const locale = match ? match[1] : "en";
    const url = new URL(`/${locale}/not-found`, request.url);
    return NextResponse.redirect(url, { status: 307 });
  }

  // Apply next-intl middleware for localization
  try {
    const intlMiddleware = createMiddleware({
      locales: ["en", "ar"],
      defaultLocale: "en",
      localePrefix: "always",
    });
    const response = await intlMiddleware(request);
    return response;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] next-intl error:`, error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};
