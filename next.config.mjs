/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for @opennextjs/cloudflare
  // Do not use 'edge' runtime globally — set per-route as needed
  images: {
    // Allow placeholder images from the web for demo screenshots
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

export default nextConfig;
