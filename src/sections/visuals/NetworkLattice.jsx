import { motion, useReducedMotion } from 'framer-motion'

/**
 * HERO VISUAL — Option C: "Network Lattice"
 * ------------------------------------------------------------------------
 * An interconnected system of exposures. Nodes and links fade up as a quiet
 * lattice, then a single critical path illuminates in emerald — tracing how
 * one exposure propagates through a business.
 *
 * Reads as: interconnected risk, dependency mapping, systems thinking.
 */

// Column-based lattice with deliberate irregularity (organic, not mechanical).
const NODES = [
  { id: 0, x: 88, y: 246 },
  { id: 1, x: 92, y: 148 },
  { id: 2, x: 216, y: 94 },
  { id: 3, x: 222, y: 194 },
  { id: 4, x: 212, y: 268 },
  { id: 5, x: 350, y: 72 },
  { id: 6, x: 346, y: 158 },
  { id: 7, x: 354, y: 252 },
  { id: 8, x: 480, y: 110 },
  { id: 9, x: 476, y: 212 },
  { id: 10, x: 606, y: 86 },
  { id: 11, x: 610, y: 188 },
  { id: 12, x: 602, y: 262 },
]

const N = Object.fromEntries(NODES.map((n) => [n.id, n]))

// All lattice links.
const EDGES = [
  [0, 3], [0, 4], [1, 2], [1, 3], [1, 0],
  [2, 5], [2, 6], [3, 6], [3, 7], [4, 7], [4, 3],
  [5, 8], [6, 8], [6, 9], [7, 9], [5, 6],
  [8, 10], [8, 11], [9, 11], [9, 12], [11, 12],
]

// The illuminated critical path traced through the network.
const CRITICAL = [0, 3, 6, 8, 10]

const isCriticalEdge = (a, b) => {
  for (let i = 0; i < CRITICAL.length - 1; i++) {
    if (
      (CRITICAL[i] === a && CRITICAL[i + 1] === b) ||
      (CRITICAL[i] === b && CRITICAL[i + 1] === a)
    ) {
      return true
    }
  }
  return false
}

const CRITICAL_PATH_D = CRITICAL.map(
  (id, i) => `${i === 0 ? 'M' : 'L'}${N[id].x} ${N[id].y}`
).join(' ')

export default function NetworkLattice() {
  const reduce = useReducedMotion()

  return (
    <div className="hero-visual" aria-hidden="true">
      <svg viewBox="0 0 680 320" fill="none" role="presentation" className="hero-visual__svg">
        <defs>
          <linearGradient id="ar-critical" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--ar-slate-blue)" />
            <stop offset="100%" stopColor="var(--ar-emerald)" />
          </linearGradient>
        </defs>

        {/* Faint reference grid */}
        <g stroke="var(--ar-border-strong)" strokeWidth="1" opacity="0.5">
          {[60, 160, 260].map((y) => (
            <line key={y} x1="40" y1={y} x2="640" y2={y} strokeDasharray="2 8" />
          ))}
        </g>

        {/* Lattice links */}
        <g>
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={`${a}-${b}`}
              x1={N[a].x}
              y1={N[a].y}
              x2={N[b].x}
              y2={N[b].y}
              stroke="var(--ar-slate-blue)"
              strokeWidth="1"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: isCriticalEdge(a, b) ? 0 : 0.22 }}
              transition={{
                duration: 0.8,
                delay: reduce ? 0 : 0.25 + i * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </g>

        {/* Illuminated critical path, drawn over the lattice */}
        <motion.path
          d={CRITICAL_PATH_D}
          stroke="url(#ar-critical)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Nodes */}
        {NODES.map((n, i) => {
          const onPath = CRITICAL.includes(n.id)
          const isEnd = n.id === CRITICAL[CRITICAL.length - 1]
          return (
            <motion.circle
              key={n.id}
              cx={n.x}
              cy={n.y}
              r={onPath ? 4.5 : 3}
              fill={isEnd ? 'var(--ar-emerald)' : onPath ? 'var(--ar-slate-blue)' : 'var(--ar-slate-grey-400)'}
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: onPath ? 1 : 0.45 }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : 0.2 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
          )
        })}

        {/* Pulse on the terminal node of the critical path */}
        {!reduce && (
          <motion.circle
            cx={N[10].x}
            cy={N[10].y}
            r="10"
            stroke="var(--ar-emerald)"
            strokeWidth="1.5"
            fill="none"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.9, 1.6], opacity: [0.65, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 2.6, ease: 'easeOut' }}
            style={{ transformOrigin: `${N[10].x}px ${N[10].y}px` }}
          />
        )}
      </svg>
    </div>
  )
}
