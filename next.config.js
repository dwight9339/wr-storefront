/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: process.env.IMAGE_DOMAIN ? [process.env.IMAGE_DOMAIN] : null
  }
}

module.exports = nextConfig
