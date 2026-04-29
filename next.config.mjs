
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/il8n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─────────────────────────────────────────
  // Image Optimization
  // ─────────────────────────────────────────
  images: {
    qualities: [100],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowLocalIP: true,
    minimumCacheTTL: 60 * 60 * 24 * 7, // cache images 7 days
    remotePatterns: [
      { protocol: "http",  hostname: "localhost", port: "4000", pathname: "/**" },
      { protocol: "http",  hostname: "localhost", port: "5000", pathname: "/**" },
      { protocol: "https", hostname: "crm.intersmarthosting.in", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },

  // ─────────────────────────────────────────
  // Compiler — remove console logs in prod
  // ─────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ─────────────────────────────────────────
  // Tree-shake heavy packages automatically
  // ─────────────────────────────────────────
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "lodash",
      "@radix-ui/react-icons",
      "react-icons",
      "date-fns",
      "recharts",
    ],
  },

  // ─────────────────────────────────────────
  // Rewrites (unchanged)
  // ─────────────────────────────────────────
  async rewrites() {
    const apiUrl = process.env.API_URL || "";
    if (!apiUrl || apiUrl.includes("localhost")) return [];
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },

  // ─────────────────────────────────────────
  // Headers — security + caching
  // ─────────────────────────────────────────
  async headers() {
    return [
      // Security headers — all routes
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy",   value: "same-origin-allow-popups" },
          { key: "Strict-Transport-Security",     value: "max-age=31536000; includeSubDomains; preload" },
          { key: "X-Frame-Options",               value: "SAMEORIGIN" },
          { key: "X-XSS-Protection",              value: "1; mode=block" },
          { key: "X-Content-Type-Options",        value: "nosniff" },
          { key: "Referrer-Policy",               value: "strict-origin-when-cross-origin" },
          // ✅ Added: prevent unnecessary revalidation
          { key: "X-DNS-Prefetch-Control",        value: "on" },
        ],
      },

      // ✅ Cache static JS/CSS chunks aggressively (immutable = never re-request)
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      // ✅ Cache images
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },

      // ✅ Cache fonts
      {
        source: "/fonts/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // ─────────────────────────────────────────
  // Webpack — chunk splitting
  // ─────────────────────────────────────────
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 200000, // max 200kb per chunk — prevents huge chunks like 773abe17
        cacheGroups: {
          // Separate vendor chunks by package name
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const match = module.context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)
              if (!match) return "vendor"
              return `vendor.${match[1].replace("@", "")}`
            },
            priority: 10,
            reuseExistingChunk: true,
          },

          // Keep recaptcha in its own chunk so it can be lazy loaded
          recaptcha: {
            test: /[\\/]node_modules[\\/](react-google-recaptcha)/,
            name: "vendor.recaptcha",
            priority: 20,
          },

          // Common shared code
          common: {
            name: "common",
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
    }
    return config
  },
};

export default withNextIntl(nextConfig);