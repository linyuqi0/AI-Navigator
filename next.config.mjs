/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/AI-Navigator',
  assetPrefix: '/AI-Navigator/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
