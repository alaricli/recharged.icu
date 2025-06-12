import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "recharged-assets.s3.us-east-1.amazonaws.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Applies CSP to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com;
              frame-src https://js.stripe.com https://checkout.stripe.com;
              connect-src 'self' http://localhost:8080 https://api.stripe.com;
              img-src 'self' data: https://*.stripe.com https://recharged-assets.s3.us-east-1.amazonaws.com;
              style-src 'self' 'unsafe-inline';
            `.replace(/\s{2,}/g, " "), // ✅ Ensures proper formatting
          },
        ],
      },
    ];
  },
};

export default nextConfig;
