import type { NextConfig } from 'next'

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  experimental: {
    preloadEntriesOnStart: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  productionBrowserSourceMaps: isProduction,
  reactStrictMode: true,
}

const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? // eslint-disable-next-line  @typescript-eslint/no-require-imports
      require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
      })
    : (x: NextConfig) => x

export default withBundleAnalyzer(nextConfig)
