import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import Section from '../components/Section'
import Button from '../components/Button'
import { HERO_VISUALS } from '../sections/visuals'
import { heroVisual } from '../config/site'

/**
 * Internal design-system reference. Not linked from navigation and marked
 * noindex. Safe to delete before launch (remove this file + its route).
 */

const PALETTE = [
  { name: 'Primary', sub: 'Deep Slate Blue', hex: '#1E3A5F', token: '--color-primary' },
  { name: 'Accent', sub: 'Emerald Green', hex: '#1F7A5C', token: '--color-accent' },
  { name: 'Accent on dark', sub: 'Lightened emerald', hex: '#4FBF97', token: '--color-accent-on-dark' },
  { name: 'Background', sub: 'Clean off-white', hex: '#F7F8FA', token: '--color-bg' },
  { name: 'Section alt', sub: 'Light grey-blue', hex: '#EEF1F5', token: '--color-bg-alt' },
  { name: 'Headings', sub: 'Deep ink', hex: '#14202E', token: '--color-heading' },
  { name: 'Body text', sub: 'Slate grey', hex: '#55606E', token: '--color-text' },
]

const TYPE_SCALE = [
  { label: 'Display', token: '--fs-display', sample: 'Clarity in Complexity', tag: 'div' },
  { label: 'H1', token: '--fs-h1', sample: 'Risk, mapped and measured', tag: 'h1' },
  { label: 'H2', token: '--fs-h2', sample: 'Advisory built for decisions', tag: 'h2' },
  { label: 'H3', token: '--fs-h3', sample: 'Enterprise risk assessment', tag: 'h3' },
  { label: 'Lead', token: '--fs-lead', sample: 'We help decision-makers anticipate and quantify exposure.', tag: 'p' },
  { label: 'Body', token: '--fs-body', sample: 'Body copy sits at 17px with a 1.7 line-height for sustained reading comfort across long-form advisory content.', tag: 'p' },
  { label: 'Small', token: '--fs-sm', sample: 'Supporting detail and card copy.', tag: 'p' },
]

export default function Styleguide() {
  return (
    <>
      <Seo
        title="Styleguide | AxiomRisk"
        description="Internal design system reference."
        path="/styleguide"
        noindex
      />
      <PageIntro
        eyebrow="Internal"
        title="Design System"
        lead="Living reference for colour, type, components and hero visual options. Not indexed; delete before launch."
      />

      {/* Colour */}
      <Section>
        <div className="section-head">
          <p className="eyebrow">01 — Colour</p>
          <h2>Palette</h2>
        </div>
        <div className="grid grid--3">
          {PALETTE.map((c) => (
            <div key={c.name} className="card sg-swatch">
              <div
                className="sg-swatch__chip"
                style={{ background: c.hex, borderColor: 'var(--color-border)' }}
              />
              <h3 className="card__title" style={{ marginBottom: 2 }}>{c.name}</h3>
              <p className="card__body" style={{ marginBottom: 6 }}>{c.sub}</p>
              <code className="sg-code">{c.hex}</code>
              <code className="sg-code sg-code--muted">var({c.token})</code>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section variant="alt">
        <div className="section-head">
          <p className="eyebrow">02 — Typography</p>
          <h2>Inter throughout, hierarchy by weight</h2>
          <p>
            A single-family system. Headings run Inter Bold (700) with tight
            tracking for a precise, contemporary read; body is Inter Regular at
            17px. Hierarchy comes from weight, size and spacing rather than
            contrasting typefaces. Self-hosted variable font — no external requests.
          </p>
        </div>
        <div className="sg-type">
          {TYPE_SCALE.map((t) => {
            const Tag = t.tag
            return (
              <div key={t.label} className="sg-type__row">
                <div className="sg-type__meta">
                  <strong>{t.label}</strong>
                  <code className="sg-code sg-code--muted">var({t.token})</code>
                </div>
                <Tag className="sg-type__sample" style={{ fontSize: `var(${t.token})` }}>
                  {t.sample}
                </Tag>
              </div>
            )
          })}
        </div>
      </Section>

      {/* Components */}
      <Section>
        <div className="section-head">
          <p className="eyebrow">03 — Components</p>
          <h2>Buttons &amp; cards</h2>
        </div>

        <div className="sg-row">
          <Button variant="primary">Primary</Button>
          <Button variant="accent">Book a Consultation</Button>
          <Button variant="outline">Learn more</Button>
          <Button variant="primary" size="lg">Large primary</Button>
        </div>

        <div className="sg-row sg-row--dark">
          <Button variant="accent">Accent on dark</Button>
          <Button variant="ghost-light">Ghost light</Button>
        </div>

        <div className="grid grid--3" style={{ marginTop: 'var(--space-6)' }}>
          {[
            { t: 'Equal height', b: 'Cards in a grid always match height regardless of copy length.' },
            { t: 'Consistent padding', b: 'All cards share the same internal rhythm and hairline border.' },
            {
              t: 'Footer alignment',
              b: 'Card actions pin to the bottom via margin-top:auto, so CTAs line up across a row even when this card carries noticeably more copy than its neighbours.',
            },
          ].map((c) => (
            <div key={c.t} className="card">
              <h3 className="card__title">{c.t}</h3>
              <p className="card__body">{c.b}</p>
              <div className="card__foot">
                <Button variant="outline">Action</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Hero visuals */}
      <Section variant="alt">
        <div className="section-head">
          <p className="eyebrow">04 — Hero visual</p>
          <h2>Three options</h2>
          <p>
            All are pure animated SVG — crisp at any size, no images, no canvas, and
            each honours <code className="sg-code">prefers-reduced-motion</code>. Switch
            the active one via <code className="sg-code">heroVisual</code> in{' '}
            <code className="sg-code">src/config/site.js</code>.
          </p>
        </div>

        <div className="sg-visuals">
          {Object.entries(HERO_VISUALS).map(([key, v], i) => {
            const Visual = v.component
            const active = key === heroVisual
            return (
              <div key={key} className="sg-visual">
                <div className="sg-visual__head">
                  <h3>
                    Option {String.fromCharCode(65 + i)} — {v.name}
                    {active && <span className="sg-badge">Active</span>}
                  </h3>
                  <p className="card__body">{v.blurb}</p>
                  <code className="sg-code sg-code--muted">heroVisual = '{key}'</code>
                </div>
                <Visual />
              </div>
            )
          })}
        </div>
      </Section>
    </>
  )
}
