// next.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';

// simulate __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  // distDir: 'build', // optional, use default .next
};

export default nextConfig;
