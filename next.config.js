/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    JSONBIN_ID: process.env.JSONBIN_ID,
    JSONBIN_API_KEY: process.env.JSONBIN_API_KEY,
  },
};

module.exports = nextConfig;
