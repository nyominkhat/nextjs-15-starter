import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'flapi.tagoplus.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'flapi.tagoplus.co.kr',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5014',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
