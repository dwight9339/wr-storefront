/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.IMAGE_DOMAIN, "shippo-static.s3.amazonaws.com"]
  }
}

module.exports = nextConfig
