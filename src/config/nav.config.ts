import { siteConfig } from '@/config/site.config';

export type NavItem = { label: string; href: string; external?: boolean };

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Games', href: '/games' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Events', href: '/events' },
  { label: 'Gekko Cup', href: '/tournament' },
];

export const secondaryNav: NavItem[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'YouTube', href: siteConfig.links.youtube, external: true },
];

export const publicNav: NavItem[] = [...primaryNav, ...secondaryNav];

export const footerSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'Platform',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Games', href: '/games' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Events', href: '/events' },
      { label: 'Gekko Cup', href: '/tournament' },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'Members', href: '/members' },
      { label: 'Blog', href: '/blog' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    title: 'Help',
    items: [
      { label: 'Contact', href: '/contact' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
];
