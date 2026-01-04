import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        pathname: process.env.APP_API_URL,
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_FILES_URL: process.env.NEXT_PUBLIC_FILES_URL,
    NEXT_PUBLIC_ASSETS_URL: process.env.NEXT_PUBLIC_ASSETS_URL,
  },
  experimental: {
    scrollRestoration: true,
  },
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  devIndicators: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);