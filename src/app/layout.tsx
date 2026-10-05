import { RootProviders } from '@/components/providers/root-providers';
import { siteConfig } from '@/config/site.config';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Where the squad plays, competes, and grows together`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.longDescription,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: siteConfig.authors.map((a) => ({ name: a.name })),
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'community',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Gaming community platform`,
    description: siteConfig.longDescription,
    // The dynamic /opengraph-image route is auto-picked up by Next; no need to declare here.
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Gaming community platform`,
    description: siteConfig.longDescription,
    creator: '@teamgekko',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#03050a' }],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-(--color-gekko-500) focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-(--color-bg-void) focus:outline-none"
        >
          Skip to content
        </a>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
