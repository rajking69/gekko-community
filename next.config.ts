import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  // Don't let the bundler touch the Neon driver stack. Webpack mangles `ws`'s
  // frame-masking helper (`b.mask is not a function`), which breaks the Neon
  // WebSocket connection at runtime. Keeping these external makes them load
  // from node_modules intact on the server.
  serverExternalPackages: ['ws', '@neondatabase/serverless', '@prisma/adapter-neon'],
  images: {
    // Allowed `quality` values for next/image (required from Next 16).
    qualities: [75, 90],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.discordapp.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Official game art — Valorant agent renders, EA SPORTS FC media, Steam key art.
      { protocol: 'https', hostname: 'media.valorant-api.com' },
      { protocol: 'https', hostname: 'drop-assets.ea.com' },
      { protocol: 'https', hostname: 'media.contentapi.ea.com' },
      { protocol: 'https', hostname: 'cdn.cloudflare.steamstatic.com' },
    ],
  },
  async headers() {
    const securityHeaders = [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    ];
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default config;
