import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'image.tmdb.org',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
