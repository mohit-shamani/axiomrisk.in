import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import ArticleCard from '../components/ArticleCard'
import { getLatestPosts } from '../lib/posts'

export default function LatestInsights({ count = 3 }) {
  const latest = getLatestPosts(count)
  if (latest.length === 0) return null

  return (
    <Section>
      <div className="section-head">
        <Reveal as="p" className="eyebrow">INSIGHTS</Reveal>
        <Reveal as="h2" delay={0.05}>Latest Insights</Reveal>
      </div>

      <div className="grid grid--3 posts-grid">
        {latest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <ArticleCard post={post} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} style={{ marginTop: 'var(--space-7)' }}>
        <Button to="/insights" variant="outline">View All Insights</Button>
      </Reveal>
    </Section>
  )
}
