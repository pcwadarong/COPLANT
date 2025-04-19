import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { domains: ['firebasestorage.googleapis.com'] },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
