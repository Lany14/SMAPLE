/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable server-side rendering for the entire app
  experimental: {
    appDir: true,
  },
  // Transpile specific packages
  transpilePackages: ["next-auth"],
  // Disable image optimization to reduce build complexity
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
