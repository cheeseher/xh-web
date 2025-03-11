/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'out',
  images: {
    domains: ['via.placeholder.com'],
  },
}

module.exports = nextConfig 