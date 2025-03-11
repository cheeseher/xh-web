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
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  output: 'export',
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // 生产环境客户端配置
      config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
          '...',
          new (require('css-minimizer-webpack-plugin'))(),
        ],
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 20000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 20000,
          cacheGroups: {
            defaultVendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            commons: {
              name: 'commons',
              minChunks: 3,
              priority: 20,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
            },
            default: false,
            styles: {
              name: 'styles',
              test: /\.(css|scss)$/,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      }
    }
    return config
  },
}

module.exports = nextConfig 