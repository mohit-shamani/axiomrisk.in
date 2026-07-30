import { motion, useReducedMotion } from 'framer-motion'

/**
 * HERO VISUAL — Option B: "Axis Shield"
 * ------------------------------------------------------------------------
 * An emblematic mark rather than a chart: a shield constructed entirely from
 * precise draughtsman's line-work — measured axes, registration ticks and
 * concentric contours that draw themselves into a protected structure.
 *
 * Reads as: governance, protection, engineered rigour.
 * The most "institutional" of the three options.
 */

const SHIELD_OUTER =
  'M340 44 L452 88 V180 C452 236 400 268 340 284 C280 268 228 236 228 180 V88 Z'
const SHIELD_INNER =
  'M340 72 L426 106 V178 C426 220 386 245 340 258 C294 245 254 220 254 178 V106 Z'

export default function AxisShield() {
  const reduce = useReducedMotion()

  const drawTransition = (delay) =>
    reduce ? { duration: 0 } : { duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }

  return (
    <div className="hero-visual" aria-hidden="true">
      <svg viewBox="0 0 680 320" fill="none" role="presentation" className="hero-visual__svg">
        <defs>
          <linearGradient id="ar-shield-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ar-slate-blue)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--ar-slate-blue)" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Measured baseline rules extending full width — structural context */}
        <g stroke="var(--ar-border-strong)" strokeWidth="1" opacity="0.85">
          {[70, 130, 190, 250].map((y) => (
            <line key={y} x1="30" y1={y} x2="650" y2={y} strokeDasharray="3 7" />
          ))}
        </g>

        {/* Registration ticks along the left and right margins */}
        <g stroke="var(--ar-slate-grey-400)" strokeWidth="1.25" opacity="0.5">
          {[70, 130, 190, 250].map((y) => (
            <g key={y}>
              <line x1="30" y1={y} x2="44" y2={y} />
              <line x1="636" y1={y} x2="650" y2={y} />
            </g>
          ))}
        </g>

        {/* Shield fill */}
        <motion.path
          d={SHIELD_OUTER}
          fill="url(#ar-shield-fill)"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.9 }}
        />

        {/* Outer contour */}
        <motion.path
          d={SHIELD_OUTER}
          stroke="var(--ar-slate-blue)"
          strokeWidth="2.25"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={drawTransition(0.2)}
        />

        {/* Inner contour */}
        <motion.path
          d={SHIELD_INNER}
          stroke="var(--ar-slate-grey-400)"
          strokeWidth="1.25"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={drawTransition(0.5)}
        />

        {/* Vertical axis through the shield */}
        <motion.line
          x1="340"
          y1="44"
          x2="340"
          y2="284"
          stroke="var(--ar-slate-blue)"
          strokeWidth="1.25"
          strokeDasharray="4 6"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={drawTransition(0.75)}
        />

        {/* Horizontal axis through the shield */}
        <motion.line
          x1="228"
          y1="164"
          x2="452"
          y2="164"
          stroke="var(--ar-slate-blue)"
          strokeWidth="1.25"
          strokeDasharray="4 6"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={drawTransition(0.9)}
        />

        {/* Chevron — the 'A' of Axiom, formed by converging axes */}
        <motion.path
          d="M296 200 L340 128 L384 200"
          stroke="var(--ar-slate-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={drawTransition(1.05)}
        />

        {/* Resolved centre point */}
        <motion.circle
          cx="340"
          cy="128"
          r="5"
          fill="var(--ar-emerald)"
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: reduce ? 0 : 1.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '340px 128px' }}
        />

        {/* Slow pulse on the centre point */}
        {!reduce && (
          <motion.circle
            cx="340"
            cy="128"
            r="11"
            stroke="var(--ar-emerald)"
            strokeWidth="1.5"
            fill="none"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.85, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: 2.3, ease: 'easeOut' }}
            style={{ transformOrigin: '340px 128px' }}
          />
        )}
      </svg>
    </div>
  )
}
