import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import JsonLd, { serviceSchema, breadcrumbListSchema, faqPageSchema } from '../components/JsonLd'
import Container from '../components/Container'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import NotFound from './NotFound'
import { site } from '../config/site'
import { serviceLandingPages } from '../config/serviceLanding'

/**
 * Dedicated commercial landing page for one service.
 *
 * One component drives all three URLs from src/config/serviceLanding.js, so
 * layout and schema stay identical across them and a fourth page is a config
 * entry rather than a new file. Content is deliberately deeper and differently
 * structured from the /services hub summary, so the two do not duplicate.
 */
export default function ServiceLanding() {
  const { serviceSlug } = useParams()
  const page = serviceLandingPages[serviceSlug]

  // Unknown slug under /services/ — render the branded 404 (noindex).
  if (!page) return <NotFound />

  const path = `/services/${page.slug}`

  return (
    <>
      <Seo
        title={page.seoTitle}
        description={page.metaDescription}
        path={path}
      />
      <JsonLd data={serviceSchema(site, page)} />
      <JsonLd
        data={breadcrumbListSchema(site, [
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: page.h1, path },
        ])}
      />
      {/* FAQPage only because the questions below are visibly rendered */}
      <JsonLd data={faqPageSchema(page.faqs)} />

      {/* ---------------------------------------------------------- intro */}
      <div className="svc-page__head">
        <Container size="wide">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/services">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{page.h1}</li>
            </ol>
          </nav>

          <Reveal as="p" className="eyebrow">{page.eyebrow}</Reveal>
          <Reveal as="h1" className="svc-page__title" delay={0.05}>{page.h1}</Reveal>
          <div className="svc-page__intro">
            {page.intro.map((p, i) => (
              <Reveal as="p" key={i} className="lead" delay={0.1 + i * 0.05}>{p}</Reveal>
            ))}
          </div>
          <Reveal className="svc-page__head-cta" delay={0.2}>
            <Button to="/contact" variant="accent" size="lg">{page.cta.label}</Button>
            <Button to="/approach" variant="outline" size="lg">See our approach</Button>
          </Reveal>
        </Container>
      </div>

      {/* ------------------------------------------------- what it is */}
      <Section>
        <div className="svc-prose">
          <Reveal as="h2">{page.whatItIs.heading}</Reveal>
          {page.whatItIs.body.map((p, i) => (
            <Reveal as="p" key={i} delay={0.04 + i * 0.04}>{p}</Reveal>
          ))}
        </div>
      </Section>

      {/* --------------------------------------------------- problems */}
      <Section variant="alt">
        <div className="section-head">
          <Reveal as="h2">{page.problems.heading}</Reveal>
          <Reveal as="p" delay={0.05}>{page.problems.intro}</Reveal>
        </div>
        <ul className="svc-list svc-list--two">
          {page.problems.items.map((item, i) => (
            <Reveal as="li" key={item} className="svc-list__item" delay={(i % 2) * 0.06} y={14}>
              {item}
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* --------------------------------------------------- approach */}
      <Section>
        <div className="section-head">
          <Reveal as="p" className="eyebrow">HOW WE WORK</Reveal>
          <Reveal as="h2" delay={0.05}>{page.approach.heading}</Reveal>
          <Reveal as="p" delay={0.1}>
            {page.approach.intro.replace(' described in full on our approach page.', '')}
            {' '}
            <Link to="/approach" className="svc-inline-link">See our approach in detail</Link>.
          </Reveal>
        </div>
        <ol className="steps">
          {page.approach.steps.map((s, i) => (
            <Reveal as="li" key={s.num} className="step" delay={i * 0.08}>
              <span className="step__num">{s.num}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__body">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ----------------------------------------------- deliverables */}
      <Section variant="alt">
        <div className="svc-split">
          <div className="svc-split__copy">
            <Reveal as="h2">{page.deliverables.heading}</Reveal>
            <Reveal as="p" delay={0.05} className="svc-split__intro">{page.deliverables.intro}</Reveal>
            <Reveal delay={0.1} className="svc-split__note">
              <p>
                Engagements are shaped as either a focused review with a defined scope, or
                ongoing advisory as your risk profile evolves.{' '}
                <Link to="/services" className="svc-inline-link">Both are described on the services hub</Link>.
              </p>
            </Reveal>
          </div>
          <Reveal className="svc-panel" delay={0.12}>
            <ul className="svc-ticks">
              {page.deliverables.items.map((d) => (
                <li key={d} className="svc-ticks__item">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.4 L6.2 11.5 L13 4.8" stroke="currentColor" strokeWidth="1.9"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* -------------------------------------- who for + risk areas */}
      <Section>
        <div className="svc-duo">
          <div>
            <Reveal as="h2">{page.whoFor.heading}</Reveal>
            <Reveal as="p" delay={0.05} className="svc-duo__body">{page.whoFor.body}</Reveal>
            <ul className="svc-list">
              {page.whoFor.items.map((item, i) => (
                <Reveal as="li" key={item} className="svc-list__item" delay={0.08 + i * 0.05} y={12}>
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal as="h2" delay={0.06}>{page.riskAreas.heading}</Reveal>
            <ul className="svc-tags">
              {page.riskAreas.items.map((item, i) => (
                <Reveal as="li" key={item} className="svc-tags__item" delay={0.1 + i * 0.04} y={12}>
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------------- FAQ */}
      <Section variant="alt">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">QUESTIONS</Reveal>
          <Reveal as="h2" delay={0.05}>Frequently asked</Reveal>
        </div>
        <div className="faq">
          {page.faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05} y={14}>
              <details className="faq__item" {...(i === 0 ? { open: true } : {})}>
                <summary className="faq__q">
                  <span>{f.q}</span>
                  <svg className="faq__chevron" width="20" height="20" viewBox="0 0 20 20"
                    fill="none" aria-hidden="true" focusable="false">
                    <path d="M5 8 L10 13 L15 8" stroke="currentColor" strokeWidth="1.75"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="faq__a">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- CTA */}
      <Section variant="primary">
        <div className="final-cta">
          <Reveal as="h2" className="final-cta__title">{page.cta.title}</Reveal>
          <Reveal as="p" className="final-cta__sub" delay={0.06}>{page.cta.sub}</Reveal>
          <Reveal className="final-cta__action" delay={0.12}>
            <Button to="/contact" variant="accent" size="lg">{page.cta.label}</Button>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------- related services + insights */}
      <Section>
        <div className="svc-duo">
          <div>
            <Reveal as="h2" className="svc-related__title">Related services</Reveal>
            <ul className="svc-related">
              {page.relatedServices.map((s, i) => (
                <Reveal as="li" key={s.to} delay={i * 0.06} y={12}>
                  <Link to={s.to} className="svc-related__link">
                    <span>{s.label}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor"
                        strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal as="h2" className="svc-related__title" delay={0.06}>Further reading</Reveal>
            <ul className="svc-related">
              {page.relatedInsights.map((a, i) => (
                <Reveal as="li" key={a.to} delay={0.1 + i * 0.06} y={12}>
                  <Link to={a.to} className="svc-related__link svc-related__link--stacked">
                    <span className="svc-related__label">{a.label}</span>
                    <span className="svc-related__note">{a.note}</span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {page.references.length > 0 && (
          <Reveal className="svc-refs" delay={0.1}>
            <h2 className="svc-refs__title">References</h2>
            <ul>
              {page.references.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer">{r.label}</a>
                  {r.note && <span className="svc-refs__note"> — {r.note}</span>}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </Section>
    </>
  )
}
