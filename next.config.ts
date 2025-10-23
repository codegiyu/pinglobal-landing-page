import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Force HTTPS
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://pinglobal.ng/:path*',
        permanent: true,
      },
      // Redirect www to root domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.pinglobal.ng' }],
        destination: 'https://pinglobal.ng/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.pinpoint.ng',
      },
      {
        protocol: 'https',
        hostname: 'static.pinglobal.ng',
      },
    ],
  },
};

export default nextConfig;
