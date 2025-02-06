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
  // async rewrites() {
  //   return [
  //     {
  //       source: '/news/page/:page',
  //       destination: '/news', // You can adjust this based on how your app is structured
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
