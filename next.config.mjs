// next.config.mjs
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// simulate __dirname for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname, 
  distDir: 'build',                
};

export default nextConfig;
