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
  productionBrowserSourceMaps: false,
  optimization: {
    minimize: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // 生产环境客户端配置
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 40000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    return config
  },
}

module.exports = nextConfig 