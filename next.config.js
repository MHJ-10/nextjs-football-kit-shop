/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.footballkitarchive.com",
      },
      {
        protocol: "https",
        hostname: "www.hnfootballshop.com",
      },
    ],
  },
};
