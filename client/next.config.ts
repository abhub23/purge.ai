import type { NextConfig } from 'next';
import { localIP } from './config/config';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [localIP],
  eslint: {
    ignoreDuringBuilds: true, // Disables ALL ESLint during build
  },
};

export default nextConfig;
