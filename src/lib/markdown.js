import { Marked } from 'marked'
import { site } from '../config/site'

// ---------------------------------------------------------------------------
// Frontmatter + markdown → HTML.
//
// Deliberately dependency-light: a small YAML-subset parser instead of
// gray-matter (which pulls Node's Buffer and breaks in the browser bundle).
// Supports `key: value`, quoted values, and `#` comments — which is all the
// post frontmatter needs.
// ---------------------------------------------------------------------------

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

/** Split a raw .md file into { data, content }. */
export function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_RE)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const idx = trimmed.indexOf(':')
    if (idx === -1) continue

    const key = trimmed.slice(0, idx).trim()
    let value = trimmed.slice(idx + 1).trim()

    // Strip matching surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }

  return { data, content: raw.slice(match[0].length) }
}

/**
 * Decode the HTML entities marked emits when it renders inline text.
 *
 * Without this, a heading like: ## "Who owns this risk?"
 * slugifies from `&quot;Who owns...&quot;` and the entity's own letters leak
 * into the id ("quotwho-owns..."), while the table of contents — which reads
 * the raw markdown — produces "who-owns...". The two then disagree and every
 * anchor link silently misses.
 */
function decodeEntities(text) {
  return String(text)
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

/**
 * Stable, URL-safe id from heading text — used for anchor links.
 * Both the renderer and extractHeadings() route through this, so the ids in
 * the HTML and the ids in the table of contents are guaranteed to match.
 */
export function slugifyHeading(text) {
  return decodeEntities(String(text).replace(/<[^>]*>/g, ''))
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const marked = new Marked({ gfm: true, breaks: false })

marked.use({
  renderer: {
    // Headings get ids so they can be deep-linked and so AI/search engines can
    // anchor an extracted answer to a specific section.
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens)
      const id = slugifyHeading(text)
      return `<h${depth} id="${id}">${text}</h${depth}>\n`
    },

    // External links open in a new tab and are given rel="noopener noreferrer".
    // Internal links stay in-tab so client-side routing can pick them up.
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const titleAttr = title ? ` title="${title}"` : ''
      const isExternal = /^https?:\/\//i.test(href) && !href.startsWith(site.url)

      if (isExternal) {
        return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer" class="prose__link prose__link--external">${text}</a>`
      }
      return `<a href="${href}"${titleAttr} class="prose__link">${text}</a>`
    },
  },
})

/** Render post markdown to HTML. */
export function renderMarkdown(content) {
  return marked.parse(content)
}

/** Extract H2/H3 headings for a table of contents. */
export function extractHeadings(content) {
  const headings = []
  // Ignore anything inside fenced code blocks
  const withoutCode = content.replace(/```[\s\S]*?```/g, '')
  const re = /^(#{2,3})\s+(.+)$/gm
  let m
  while ((m = re.exec(withoutCode)) !== null) {
    const text = m[2].replace(/[*_`]/g, '').trim()
    headings.push({ depth: m[1].length, text, id: slugifyHeading(text) })
  }
  return headings
}

/** Rough read-time fallback when frontmatter omits `readTime` (200 wpm). */
export function estimateReadTime(content) {
  const words = content.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}
