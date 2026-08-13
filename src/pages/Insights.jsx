import { useState } from 'react'
import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import ArticleCard from '../components/ArticleCard'
import JsonLd, { collectionPageSchema } from '../components/JsonLd'
import { seo } from '../config/seo'
import { site } from '../config/site'
import { posts, getActiveCategories } from '../lib/posts'

const ALL = 'All'

export default function Insights() {
  const categories = [ALL, ...getActiveCategories()]
  const [active, setActive] = useState(ALL)

  const visible = active === ALL ? posts : posts.filter((p) => p.category === active)

  return (
    <>
      <Seo {...seo.insights} />
      <JsonLd data={collectionPageSchema(site, seo.insights, posts)} />

      <PageIntro
        eyebrow="INSIGHTS"
        title="Perspectives on Risk"
        lead="Practical thinking on risk management, compliance and resilience for businesses in India."
      />

      <Section>
        {categories.length > 2 && (
          <Reveal as="div" className="filter" role="group" aria-label="Filter insights by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`filter__btn${c === active ? ' is-active' : ''}`}
                aria-pressed={c === active}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </Reveal>
        )}

        {visible.length === 0 ? (
          <p className="posts-empty">No articles in this category yet.</p>
        ) : (
          <div className="grid grid--3 posts-grid">
            {visible.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <ArticleCard post={post} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
