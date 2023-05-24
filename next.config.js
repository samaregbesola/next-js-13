/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "localhost", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
