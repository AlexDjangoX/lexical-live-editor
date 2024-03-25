/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'th.bing.com' },
      { protocol: 'https', hostname: 'tse*.mm.bing.net' },
    ],
  },
};

export default nextConfig;
