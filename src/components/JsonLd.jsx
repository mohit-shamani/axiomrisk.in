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

/**
 * CollectionPage for the /insights index, with the articles as an ItemList.
 *
 * Built from the same `posts` array that renders the cards, so the markup
 * cannot list something the page does not show. It always describes the full
 * collection, not whatever the category filter is currently set to — the
 * filter is client-side and the canonical URL covers every article.
 */
export function collectionPageSchema(site, meta, posts) {
  const url = new URL(meta.path, site.url).href
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: 'Insights',
    description: meta.description,
    inLanguage: 'en-IN',
    publisher: { '@id': `${site.url}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListOrder: 'https://schema.org/ItemListOrderDescending', // newest first
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: new URL(p.path, site.url).href,
        name: p.title,
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
