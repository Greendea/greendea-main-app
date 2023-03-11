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
  env: {
    BE_URL: process.env.BE_URL,
  }
}

module.exports = nextConfig
