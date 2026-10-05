import { siteConfig } from '@/config/site.config';

/**
 * Server-rendered JSON-LD Organization schema. Drop into a server component.
 * One per page is enough; this is the landing-page variant.
 */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.longDescription,
    logo: `${siteConfig.url}/brand/gekko-logo-512.png`,
    sameAs: [
      siteConfig.links.discord,
      siteConfig.links.github,
      siteConfig.links.youtube,
      siteConfig.links.facebook,
      siteConfig.links.telegram,
    ].filter(Boolean),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Community',
        url: `${siteConfig.url}/contact`,
        availableLanguage: ['English'],
      },
    ],
    founder: siteConfig.authors.map((a) => ({
      '@type': 'Person',
      name: a.name,
      jobTitle: a.role,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted JSON serialization
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * WebSite + SearchAction — improves Google Sitelinks search box eligibility.
 */
export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted JSON serialization
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
