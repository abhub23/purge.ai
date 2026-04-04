import type { NextConfig } from 'next';
import { localIP } from './config/config';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [localIP],
};

export default nextConfig;
