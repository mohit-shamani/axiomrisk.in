/**
 * Supporting visual slot.
 *
 * Renders a real photograph when `src` is supplied; otherwise it falls back to
 * an abstract branded figure — nested frames resolving toward a clear centre.
 * The fallback is deliberately non-representational: no stock imagery, no
 * implied people, nothing that could read as a fabricated photo of the firm.
 *
 * To swap in a real image later:
 *   <SupportingImage src="/images/office.jpg" alt="…" />
 */
export default function SupportingImage({ src, alt = '' }) {
  if (src) {
    return (
      <figure className="figure">
        <img className="figure__img" src={src} alt={alt} loading="lazy" decoding="async" />
      </figure>
    )
  }

  return (
    <figure className="figure figure--abstract" role="presentation">
      <svg viewBox="0 0 520 520" fill="none" aria-hidden="true" className="figure__svg">
        <defs>
          <linearGradient id="ar-figure-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--ar-emerald)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--ar-emerald)" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Fine reference grid */}
        <g stroke="var(--ar-border-strong)" strokeWidth="1" opacity="0.55">
          {[130, 260, 390].map((v) => (
            <line key={'h' + v} x1="40" y1={v} x2="480" y2={v} strokeDasharray="2 8" />
          ))}
          {[130, 260, 390].map((v) => (
            <line key={'v' + v} x1={v} y1="40" x2={v} y2="480" strokeDasharray="2 8" />
          ))}
        </g>

        {/* Nested frames — structure resolving inward toward clarity */}
        <rect x="40" y="40" width="440" height="440" rx="16" stroke="var(--ar-slate-blue)" strokeWidth="1.25" opacity="0.22" />
        <rect x="98" y="98" width="324" height="324" rx="14" stroke="var(--ar-slate-blue)" strokeWidth="1.5" opacity="0.42" />
        <rect x="156" y="156" width="208" height="208" rx="12" stroke="var(--ar-slate-blue)" strokeWidth="1.75" opacity="0.7" />
        <rect x="214" y="214" width="92" height="92" rx="10" fill="url(#ar-figure-core)" stroke="var(--ar-emerald)" strokeWidth="2" />

        {/* Resolved centre */}
        <circle cx="260" cy="260" r="5.5" fill="var(--ar-emerald)" />

        {/* Corner registration ticks */}
        <g stroke="var(--ar-slate-grey-400)" strokeWidth="1.5" opacity="0.5" strokeLinecap="round">
          <path d="M40 76 V40 H76" />
          <path d="M444 40 H480 V76" />
          <path d="M480 444 V480 H444" />
          <path d="M76 480 H40 V444" />
        </g>
      </svg>
    </figure>
  )
}
