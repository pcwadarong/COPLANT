import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { domains: ['firebase.google.com'] },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
