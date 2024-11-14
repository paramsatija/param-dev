/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Remove AWS domain unless you're using it for images
  }
};

export default nextConfig;
