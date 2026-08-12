import { Head } from 'vite-react-ssg'

/**
 * Injects a JSON-LD structured-data block into <head>.
 * Because the site is prerendered, the script is present in the served HTML —
 * which is what Google's rich-results parser requires.
 */
export default function JsonLd({ data }) {
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  )
}

/**
 * Organization — the brand entity, emitted on every page from App.jsx.
 *
 * Only facts already held in config appear here. Deliberately omitted:
 *  - `address` / `telephone`: none is published anywhere on the site
 *  - `sameAs`: no confirmed social profiles
 *  - `logo`: Google expects a raster logo; the only mark in the repo is an
 *    SVG favicon. Add a PNG and set it here once one exists.
 * LocalBusiness is deliberately NOT used — it requires a verified address.
 */
export function organizationSchema(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email,
    areaServed: { '@type': 'Country', name: site.location },
  }
}

/**
 * Service + OfferCatalog for /services, built from the same `serviceDetails`
 * that render the page, so the markup cannot drift from the visible copy.
 */
export function serviceCatalogSchema(site, services) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Risk advisory and management consulting',
    provider: { '@id': `${site.url}/#organization` },
    areaServed: { '@type': 'Country', name: site.location },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Risk Advisory Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.intro,
          url: `${site.url}/services#${s.slug}`,
        },
      })),
    },
  }
}

/** Build a schema.org FAQPage object from [{ q, a }]. */
export function faqPageSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
