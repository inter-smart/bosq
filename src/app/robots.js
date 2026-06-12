export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

    const privateRoutes = [
        "/api/",
        "/account/",
        "/cart/",
        "/checkout/",
        "/order/",
        "/login/",
        "/signup/",
        "/forgot-password/",
        "/create-password/",
        "/otp-submission/",
        "/search-results/"
    ];

    // Generate disallow rules for both default (English) and Arabic locales
    const disallow = [
        ...privateRoutes,
        ...privateRoutes.map((route) => `/ar${route}`)
    ];

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: disallow,
            },
        ],
        sitemap: `${cleanBaseUrl}/sitemap.xml`,
    };
}
