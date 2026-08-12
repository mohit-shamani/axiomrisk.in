import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import JsonLd from '../components/JsonLd'
import Container from '../components/Container'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import ArticleCover from '../components/ArticleCover'
import ArticleCard from '../components/ArticleCard'
import TableOfContents from '../components/TableOfContents'
import NotFound from './NotFound'
import { site } from '../config/site'
import { getPostBySlug, getRelatedPosts, formatDate } from '../lib/posts'

/** schema.org Article — describes the post itself. */
function articleSchema(post) {
  const url = new URL(post.path, site.url).href
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: new URL(post.featuredImage || '/og-default.png', site.url).href,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    inLanguage: 'en-IN',
    author: { '@type': 'Organization', name: post.author, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: {
        '@type': 'ImageObject',
        url: new URL('/favicon.svg', site.url).href,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
}

/** schema.org BreadcrumbList — Home › Insights › Article. */
function breadcrumbSchema(post) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: post.title, path: post.path },
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.path, site.url).href,
    })),
  }
}

export default function InsightArticle() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  // Unknown slug — render the 404 page (noindex) rather than an empty shell.
  if (!post) return <NotFound />

  const related = getRelatedPosts(post.slug, 3)

  return (
    <>
      <Seo
        title={`${post.title} | ${site.name}`}
        description={post.metaDescription}
        path={post.path}
        image={post.featuredImage || '/og-default.png'}
        type="article"
      />
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema(post)} />

      <article className="article">
        {/* Header */}
        <header className="article__head">
          <Container size="narrow">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link to="/insights">Insights</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{post.title}</li>
              </ol>
            </nav>

            <span className="article__tag">{post.category}</span>
            <h1 className="article__title">{post.title}</h1>

            <div className="article__meta">
              <span>By {post.author}</span>
              <span aria-hidden="true">·</span>
              {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
          </Container>
        </header>

        {/* Featured image */}
        <Container size="narrow">
          <div className="article__cover">
            <ArticleCover post={post} priority />
          </div>
        </Container>

        {/* Body + on-this-page navigation */}
        <Container size="wide">
          <div className="article__body">
            {/* First in the DOM so the collapsed version sits above the
                article on narrow screens, and so the left rail needs no
                grid reordering on wide ones. */}
            <aside className="article__aside">
              <TableOfContents headings={post.headings} />
            </aside>
            <div className="article__main">
              <div
                className="prose"
                /* Content is authored in-repo as markdown — not user input. */
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>
        </Container>

        {/* End-of-article CTA */}
        <Container size="narrow">
          <aside className="article-cta">
            <h2 className="article-cta__title">Concerned about this in your business?</h2>
            <p className="article-cta__sub">
              A short, no-obligation conversation is usually enough to see where the real
              exposure lies.
            </p>
            <Button to="/contact" variant="accent" size="lg">Book a Consultation</Button>
          </aside>
        </Container>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <Section variant="alt">
          <div className="section-head">
            <Reveal as="p" className="eyebrow">KEEP READING</Reveal>
            <Reveal as="h2" delay={0.05}>Related Insights</Reveal>
          </div>
          <div className="grid grid--3 posts-grid">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <ArticleCard post={p} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
