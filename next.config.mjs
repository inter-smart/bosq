import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/il8n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "https://crm.intersmarthosting.in/bosq/api/:path*",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
