/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 3600000,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
