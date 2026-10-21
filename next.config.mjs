/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'avatar.vercel.sh'],
  },
};

export default nextConfig;
