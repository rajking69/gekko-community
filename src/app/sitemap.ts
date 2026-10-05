import { siteConfig } from '@/config/site.config';
import { eventService } from '@/services/event.service';
import { galleryService } from '@/services/gallery.service';
import { gameService } from '@/services/game.service';
import { postService } from '@/services/post.service';
import type { MetadataRoute } from 'next';

/**
 * Phase 1 sitemap. Includes pages that currently render real content.
 * Add public marketing pages here as they get built in subsequent phases.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [games, events, posts, gallery] = await Promise.all([
    gameService.all(),
    eventService.all(),
    postService.all(),
    galleryService.all(),
  ]);

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/games`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...games.map((g) => ({
      url: `${siteConfig.url}/games/${g.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    {
      url: `${siteConfig.url}/events`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...events.map((e) => ({
      url: `${siteConfig.url}/events/${e.slug}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
    {
      url: `${siteConfig.url}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...posts.map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    {
      url: `${siteConfig.url}/gallery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...gallery.map((g) => ({
      url: `${siteConfig.url}/gallery/${g.slug ?? g.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    })),
    {
      url: `${siteConfig.url}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/changelog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/roadmap`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/support`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
