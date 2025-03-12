/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'out',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    domains: ['via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 60,
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  output: 'export',
}

module.exports = nextConfig
