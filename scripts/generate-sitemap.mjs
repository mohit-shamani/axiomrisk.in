/**
 * Generates dist/sitemap.xml after the SSG build.
 *
 * Source of truth is the built output itself: every prerendered .html file in
 * dist/ becomes a URL. That means the sitemap can never drift from what was
 * actually shipped — new articles appear automatically.
 *
 * Run via `npm run build` (see the postbuild step in package.json).
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')

// Read the origin from the app config so the sitemap can never disagree with
// the canonical URLs the pages themselves render.
const { site } = await import(pathToFileURL(path.join(ROOT, 'src/config/site.js')).href)
const SITE_URL = site.url.replace(/\/$/, '')

// Pages that must never appear in the sitemap.
const EXCLUDE = new Set(['styleguide', '404'])

// Crawl priority / change frequency by route shape.
function hints(route) {
  if (route === '/') return { priority: '1.0', changefreq: 'monthly' }
  if (route === '/insights') return { priority: '0.9', changefreq: 'weekly' }
  if (route.startsWith('/insights/')) return { priority: '0.8', changefreq: 'yearly' }
  if (route === '/privacy' || route === '/terms')
    return { priority: '0.3', changefreq: 'yearly' }
  return { priority: '0.8', changefreq: 'monthly' }
}

/** Recursively collect every .html file in dist/. */
function collectHtml(dir, base = '') {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'assets' || entry.name.startsWith('.')) continue
    const abs = path.join(dir, entry.name)
    const rel = base ? `${base}/${entry.name}` : entry.name
    if (entry.isDirectory()) out.push(...collectHtml(abs, rel))
    else if (entry.name.endsWith('.html')) out.push(rel)
  }
  return out
}

/** Prefer the article's publish date from its JSON-LD, else the file mtime. */
function lastmodFor(absPath) {
  try {
    const html = fs.readFileSync(absPath, 'utf8')
    const m = html.match(/"datePublished":"(\d{4}-\d{2}-\d{2})"/)
    if (m) return m[1]
  } catch {
    /* fall through to mtime */
  }
  return fs.statSync(absPath).mtime.toISOString().slice(0, 10)
}

if (!fs.existsSync(DIST)) {
  console.error('[sitemap] dist/ not found — run the build first.')
  process.exit(1)
}

const routes = collectHtml(DIST)
  .map((rel) => {
    const slug = rel.replace(/\.html$/, '')
    const route = slug === 'index' ? '/' : `/${slug.replace(/\/index$/, '')}`
    return { route, abs: path.join(DIST, rel) }
  })
  .filter(({ route }) => !EXCLUDE.has(route.replace(/^\//, '')))
  .sort((a, b) => a.route.localeCompare(b.route))

const body = routes
  .map(({ route, abs }) => {
    const { priority, changefreq } = hints(route)
    return [
      '  <url>',
      `    <loc>${SITE_URL}${route === '/' ? '/' : route}</loc>`,
      `    <lastmod>${lastmodFor(abs)}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n')
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8')

const articles = routes.filter((r) => r.route.startsWith('/insights/')).length
console.log(
  `[sitemap] wrote dist/sitemap.xml — ${routes.length} URLs (${articles} article${
    articles === 1 ? '' : 's'
  })`
)

// Keep robots.txt's Sitemap: line in step with the configured origin, so the
// two can never disagree after a domain change.
const robotsPath = path.join(DIST, 'robots.txt')
if (fs.existsSync(robotsPath)) {
  const before = fs.readFileSync(robotsPath, 'utf8')
  const after = before.replace(
    /^Sitemap:\s*\S+$/m,
    `Sitemap: ${SITE_URL}/sitemap.xml`
  )
  if (after !== before) {
    fs.writeFileSync(robotsPath, after, 'utf8')
    console.log(`[sitemap] corrected robots.txt Sitemap: -> ${SITE_URL}/sitemap.xml`)
  } else {
    console.log('[sitemap] robots.txt Sitemap: already matches')
  }
} else {
  console.warn('[sitemap] WARNING: dist/robots.txt not found')
}

// dist/.vite/ssr-manifest.json is a build-time artefact that embeds absolute
// paths from the build machine. Nothing serves it, so drop it rather than
// publishing local filesystem details.
const viteMeta = path.join(DIST, '.vite')
if (fs.existsSync(viteMeta)) {
  fs.rmSync(viteMeta, { recursive: true, force: true })
  console.log('[sitemap] removed dist/.vite build artefacts')
}
