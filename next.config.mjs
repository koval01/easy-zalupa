/** @type {import('next').NextConfig} */
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
