/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http", // Use 'http' for localhost during development
        hostname: "localhost",
        port: "4000", // Specify the exact port your local image server is running on
        pathname: "/**", // Use '/**' to allow any path
      },
    ],
  },
};

export default nextConfig;
