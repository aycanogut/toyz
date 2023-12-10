const bundleAnalyzer = require('@next/bundle-analyzer')
const withNextIntl = require('next-intl/plugin')('./i18n.ts')

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  images: {
    domains: [
      'johnsonconsulting.com',
      'images.ctfassets.net',
      'placehold.co',
      'freight.cargo.site',
    ],
  },
}

module.exports = withBundleAnalyzer(withNextIntl(nextConfig))
