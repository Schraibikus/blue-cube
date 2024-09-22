/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.detmir.st",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
