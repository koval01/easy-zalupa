/** @type {import('next').NextConfig} */

import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.easyx.ru',
        port: '',
        pathname: '/images/**',
      },
    ],
  }
};

export default nextConfig;
