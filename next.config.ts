import type { NextConfig } from 'next'

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  experimental: {
    serverSourceMaps: isProduction,
    preloadEntriesOnStart: false,
  },
  productionBrowserSourceMaps: isProduction,
  reactStrictMode: true,
  distDir: 'dist',
}

const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
      })
    : (x: NextConfig) => x

export default withBundleAnalyzer(nextConfig)
