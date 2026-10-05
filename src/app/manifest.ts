import { siteConfig } from '@/config/site.config';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#03050a',
    theme_color: '#00ff88',
    orientation: 'portrait-primary',
    categories: ['social', 'productivity'],
    icons: [
      { src: '/brand/gekko-logo-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/gekko-logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
