import { Link } from 'react-router-dom'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { posts, getPostsByCategory } from '../lib/posts'

/**
 * Compact "Related reading" block for /services and /approach.
 *
 * `categories` picks posts from the most relevant categories first, then tops
 * up with the newest posts so the block is never half-empty. Renders nothing
 * when there are no posts at all.
 */
export default function RelatedReading({
  categories = [],
  count = 3,
  variant = 'alt',
  title = 'Related reading',
}) {
  const preferred = categories.flatMap((c) => getPostsByCategory(c))
  const seen = new Set()
  const picked = [...preferred, ...posts]
    .filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true)))
    .slice(0, count)

  if (picked.length === 0) return null

  return (
    <Section variant={variant} tight>
      <div className="section-head" style={{ marginBottom: 'var(--space-6)' }}>
        <Reveal as="p" className="eyebrow">FURTHER READING</Reveal>
        <Reveal as="h2" delay={0.05}>{title}</Reveal>
      </div>

      <div className="related-reading__list">
        {picked.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.07} y={14}>
            <Link to={p.path} className="related-reading__item">
              <span className="related-reading__tag">{p.category}</span>
              <span>
                <span className="related-reading__title">{p.title}</span>
                <span className="related-reading__meta">{p.readTime}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
