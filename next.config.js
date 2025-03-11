/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'out',
  compress: true,
  images: {
    domains: ['via.placeholder.com'],
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/icons-material', '@mui/material'],
  },
}

module.exports = nextConfig 