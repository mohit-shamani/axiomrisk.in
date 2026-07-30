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
