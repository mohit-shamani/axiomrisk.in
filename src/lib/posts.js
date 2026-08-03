import { parseFrontmatter, renderMarkdown, extractHeadings, estimateReadTime } from './markdown'

// ---------------------------------------------------------------------------
// Post registry.
//
// Every .md file in src/content/insights is picked up automatically at build
// time — adding an article is just adding a file. `eager: true` means the
// posts are part of the module graph, so the prerenderer can render each
// article's full HTML (and its meta + JSON-LD) into a static file.
// ---------------------------------------------------------------------------

const modules = import.meta.glob('../content/insights/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** Canonical category list — also drives the listing-page filter order. */
export const CATEGORIES = [
  'Enterprise Risk',
  'Operational',
  'Compliance',
  'Continuity',
  'Strategy',
]

function buildPost(filePath, raw) {
  const { data, content } = parseFrontmatter(raw)

  // Slug falls back to the filename so a missing frontmatter slug can't 404.
  const fileSlug = filePath.split('/').pop().replace(/\.md$/, '')
  const slug = data.slug || fileSlug

  if (import.meta.env?.DEV) {
    const required = ['title', 'metaDescription', 'category', 'date', 'excerpt']
    const missing = required.filter((k) => !data[k])
    if (missing.length) {
      console.warn(`[insights] ${fileSlug}.md is missing frontmatter: ${missing.join(', ')}`)
    }
    if (data.category && !CATEGORIES.includes(data.category)) {
      console.warn(
        `[insights] ${fileSlug}.md has category "${data.category}" which is not in CATEGORIES ` +
          `(${CATEGORIES.join(', ')}) — it will not appear under any filter.`
      )
    }
  }

  return {
    slug,
    path: `/insights/${slug}`,
    title: data.title || fileSlug,
    metaDescription: data.metaDescription || data.excerpt || '',
    excerpt: data.excerpt || '',
    category: data.category || 'Enterprise Risk',
    author: data.author || 'AxiomRisk',
    date: data.date || '',
    readTime: data.readTime || estimateReadTime(content),
    featuredImage: data.featuredImage || '',
    draft: String(data.draft || '').toLowerCase() === 'true',
    html: renderMarkdown(content),
    headings: extractHeadings(content),
  }
}

const allPosts = Object.entries(modules)
  .map(([filePath, raw]) => buildPost(filePath, raw))
  // Newest first; posts without a date sort last
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

/** Published posts, newest first. Drafts are excluded from the built site. */
export const posts = allPosts.filter((p) => !p.draft)

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug)
}

/** Most recent `count` posts. */
export function getLatestPosts(count = 3) {
  return posts.slice(0, count)
}

/**
 * Related posts: same category first, then most recent, never the post itself.
 */
export function getRelatedPosts(slug, count = 3) {
  const current = getPostBySlug(slug)
  if (!current) return posts.slice(0, count)

  const sameCategory = posts.filter((p) => p.slug !== slug && p.category === current.category)
  const others = posts.filter((p) => p.slug !== slug && p.category !== current.category)
  return [...sameCategory, ...others].slice(0, count)
}

/** Posts in a given category (used by the "Related reading" blocks). */
export function getPostsByCategory(category, count) {
  const list = posts.filter((p) => p.category === category)
  return count ? list.slice(0, count) : list
}

/** Only categories that actually have posts — keeps the filter honest. */
export function getActiveCategories() {
  const used = new Set(posts.map((p) => p.category))
  return CATEGORIES.filter((c) => used.has(c))
}

/** Paths for vite-react-ssg's getStaticPaths (no leading slash). */
export function getPostStaticPaths() {
  return posts.map((p) => `insights/${p.slug}`)
}

/** "2026-08-01" → "1 August 2026" */
export function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
