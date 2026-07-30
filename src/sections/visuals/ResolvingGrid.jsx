import { motion, useReducedMotion } from 'framer-motion'

/**
 * HERO VISUAL — Option A: "Resolving Field"
 * ------------------------------------------------------------------------
 * An abstract risk field: a precise coordinate grid over which scattered
 * data points and connecting lines settle from noise into an ordered,
 * ascending band — "clarity emerging from complexity".
 *
 * Pure SVG + framer-motion (no canvas, no images). Crisp at any size,
 * lightweight, and honours prefers-reduced-motion.
 */

// Scattered "noise" points that resolve toward an ordered ascending path.
const NODES = [
  { x: 60, y: 250, r: 3 },
  { x: 120, y: 210, r: 4 },
  { x: 185, y: 235, r: 3 },
  { x: 245, y: 180, r: 5 },
  { x: 310, y: 200, r: 3 },
  { x: 370, y: 150, r: 4 },
  { x: 430, y: 165, r: 3 },
  { x: 495, y: 120, r: 5 },
  { x: 555, y: 135, r: 3 },
  { x: 615, y: 95, r: 4 },
]

// The ordered path the field resolves toward (an ascending trend line).
const TREND = 'M60 250 L120 222 L185 210 L245 190 L310 176 L370 158 L430 144 L495 124 L555 110 L615 92'

export default function ResolvingGrid() {
  const reduce = useReducedMotion()

  const draw = reduce
    ? { pathLength: 1, opacity: 1 }
    : {
        pathLength: [0, 1],
        opacity: [0, 1],
      }

  return (
    <div className="hero-visual" aria-hidden="true">
      <svg viewBox="0 0 680 320" fill="none" role="presentation" className="hero-visual__svg">
        <defs>
          <linearGradient id="ar-band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ar-slate-blue)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--ar-slate-blue)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ar-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--ar-slate-blue)" />
            <stop offset="100%" stopColor="var(--ar-emerald)" />
          </linearGradient>
        </defs>

        {/* Grid */}
        <g stroke="var(--ar-border-strong)" strokeWidth="1" opacity="0.7">
          {[40, 100, 160, 220, 280].map((y) => (
            <line key={'h' + y} x1="40" y1={y} x2="640" y2={y} />
          ))}
          {[100, 220, 340, 460, 580].map((x) => (
            <line key={'v' + x} x1={x} y1="30" x2={x} y2="290" strokeDasharray="2 6" opacity="0.6" />
          ))}
        </g>

        {/* Axes */}
        <line x1="40" y1="290" x2="640" y2="290" stroke="var(--ar-slate-grey)" strokeWidth="1.5" />
        <line x1="40" y1="30" x2="40" y2="290" stroke="var(--ar-slate-grey)" strokeWidth="1.5" />

        {/* Filled band under the resolved trend */}
        {!reduce && (
          <motion.path
            d={`${TREND} L615 290 L60 290 Z`}
            fill="url(#ar-band)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          />
        )}

        {/* Resolved trend line */}
        <motion.path
          d={TREND}
          stroke="url(#ar-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={draw}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />

        {/* Data nodes settling onto the trend */}
        {NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={i === NODES.length - 1 ? 'var(--ar-emerald)' : 'var(--ar-slate-blue)'}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}

        {/* Pulsing focus ring on the resolved endpoint */}
        {!reduce && (
          <motion.circle
            cx={615}
            cy={92}
            r={9}
            stroke="var(--ar-emerald)"
            strokeWidth="1.5"
            fill="none"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.9, 1.5], opacity: [0.7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 1.8, ease: 'easeOut' }}
            style={{ transformOrigin: '615px 92px' }}
          />
        )}
      </svg>
    </div>
  )
}
