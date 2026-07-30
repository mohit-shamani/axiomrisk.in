import { site } from '../config/site'

/**
 * AxiomRisk wordmark + mark.
 * The mark is an abstract "axis" motif: two converging axes forming an 'A'
 * that resolves to a plotted point — clarity emerging from complexity.
 * `tone`: 'dark' (default, for light backgrounds) | 'light' (for dark bg).
 */
export default function Logo({ tone = 'dark', showText = true }) {
  const ink = tone === 'light' ? '#EAF0F7' : 'var(--ar-ink)'
  const accent = tone === 'light' ? 'var(--ar-emerald-300)' : 'var(--ar-emerald)'
  return (
    <span className={`logo logo--${tone}`} aria-label={site.name}>
      <svg
        className="logo__mark"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* converging axes */}
        <path d="M4 26 L15 4 L26 26" stroke={ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* crossbar */}
        <path d="M9.5 18 H20.5" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
        {/* resolved point */}
        <circle cx="15" cy="4" r="2.6" fill={accent} />
      </svg>
      {showText && (
        <span className="logo__word">
          Axiom<span className="logo__word-accent">Risk</span>
        </span>
      )}
    </span>
  )
}
