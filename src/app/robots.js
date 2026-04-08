export default function robots() {
    return {
        rules: [
            {
                userAgent: "Googlebot",
                disallow: "/",
            },
            {
                userAgent: "Bingbot",
                disallow: "/",
            },
            {
                userAgent: "Twitterbot",
                disallow: "/",
            },
            {
                userAgent: "facebookexternalhit",
                disallow: "/",
            },
            {
                userAgent: "*",
                disallow: "/",
            },
        ],
    };
}
