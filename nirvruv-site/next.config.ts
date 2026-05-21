import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/about', destination: '/about.html' },
      { source: '/automations', destination: '/automations.html' },
      { source: '/courses-books', destination: '/books.html' },
      { source: '/books', destination: '/books.html' },
      { source: '/clients', destination: '/clients.html' },
      { source: '/contact', destination: '/contact.html' },
      { source: '/courses', destination: '/courses.html' },
      { source: '/marketing', destination: '/marketing.html' },
      { source: '/services', destination: '/services.html' },
      { source: '/products', destination: '/services.html' }, // Assuming products maps to services based on the nav link
      { source: '/youtube-growth', destination: '/youtube-growth.html' }
    ];
  }
};

export default nextConfig;
