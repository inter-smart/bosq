import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/il8n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Use environment variable or fallback to localhost for development
    const apiUrl = process.env.API_URL || "http://localhost:4000";

    console.log("🔄 API Rewrite configured:", apiUrl); // Helpful for debugging

    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "crm.intersmarthosting.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
