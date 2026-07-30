import { Head } from 'vite-react-ssg'
import { site } from '../config/site'

/**
 * Per-page SEO. Renders into <head> and — because the site is prerendered with
 * vite-react-ssg — the resulting title / description / canonical / Open Graph
 * tags are baked into each route's static .html file at build time.
 *
 * Usage:  <Seo {...seo.services} />
 */
export default function Seo({
  title,
  description = site.description,
  path = '/',
  image = '/og-default.png',
  type = 'website',
  noindex = false,
}) {
  const canonical = new URL(path, site.url).href
  const ogImage = new URL(image, site.url).href
  const fullTitle = title || `${site.name} — ${site.tagline}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={site.locale} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
}
