/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  typescript: {
    // Dangerously allow production builds to complete even if your project has type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Don't run ESLint during builds
    ignoreDuringBuilds: true,
    ignoreDuringBuilds: true,
  },
  // Disable server-side rendering for the entire app
  experimental: {},
  // Transpile specific packages
  transpilePackages: ["next-auth"],
  // Disable image optimization to reduce build complexity
  images: {
    unoptimized: true,
  },
  // Add Webpack configuration for various fallbacks
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      querystring: require.resolve("querystring-es3"),
      vm: require.resolve("vm-browserify"),
    };
    return config;
  },
};

module.exports = nextConfig;
