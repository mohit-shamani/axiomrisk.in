import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { QUESTIONS } from '../config/assessment'
import { RISK_HEALTH_CHECK } from '../config/resources'

/**
 * Promo band for the free Risk Health Check. Used on the homepage and
 * /services. `variant` follows the surrounding section rhythm.
 */
export default function RiskCheckPromo({ variant = 'alt' }) {
  return (
    <Section variant={variant}>
      <div className="promo">
        <div className="promo__copy">
          <Reveal as="p" className="eyebrow">FREE SELF-ASSESSMENT</Reveal>
          <Reveal as="h2" className="promo__title" delay={0.05}>
            How exposed is your business?
          </Reveal>
          <Reveal as="p" className="promo__text" delay={0.1}>
            Answer {QUESTIONS.length} plain-language questions and get an instant view of
            where to look first. Takes about two minutes — free, with no email required
            to see your result.
          </Reveal>
          <Reveal delay={0.15} className="promo__action">
            <Button to={RISK_HEALTH_CHECK.to} variant="accent" size="lg">
              {RISK_HEALTH_CHECK.ctaLabel}
            </Button>
          </Reveal>
        </div>

        <Reveal className="promo__visual" delay={0.12} aria-hidden="true">
          <svg viewBox="0 0 320 200" fill="none" className="promo__svg" role="presentation">
            <g stroke="var(--ar-border-strong)" strokeWidth="1" opacity="0.6">
              {[50, 100, 150].map((y) => (
                <line key={y} x1="24" y1={y} x2="296" y2={y} strokeDasharray="2 8" />
              ))}
            </g>
            {/* Four area bars, mirroring the result screen */}
            {[
              { y: 34, w: 150 },
              { y: 76, w: 210 },
              { y: 118, w: 96 },
              { y: 160, w: 178 },
            ].map((b, i) => (
              <g key={b.y}>
                <rect x="24" y={b.y} width="272" height="10" rx="5" fill="var(--ar-slate-blue)" opacity="0.1" />
                <rect
                  x="24"
                  y={b.y}
                  width={b.w}
                  height="10"
                  rx="5"
                  fill={i === 2 ? 'var(--ar-emerald)' : 'var(--ar-slate-blue)'}
                  opacity={i === 2 ? 1 : 0.55}
                />
              </g>
            ))}
          </svg>
        </Reveal>
      </div>
    </Section>
  )
}
