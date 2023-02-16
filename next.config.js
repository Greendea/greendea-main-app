/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@balkangraph/orgchart.js'],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ]
  },
}

module.exports = nextConfig
