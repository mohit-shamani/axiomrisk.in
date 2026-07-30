import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion'

/**
 * HERO VISUAL — "Chaos to Order"
 * ------------------------------------------------------------------------
 * Points and connecting lines begin scattered and tangled, then migrate
 * smoothly into a clean structured lattice. As the structure resolves, a
 * faint reference grid fades up behind it and an emerald trend line emerges
 * through the ordered points. The cycle reverses and loops slowly.
 *
 * Reads as: turning risk chaos into clarity.
 *
 * Performance notes:
 *  - A single MotionValue (0 = chaos, 1 = order) drives every element via
 *    useTransform. Framer writes SVG attributes directly to the DOM, so the
 *    animation runs with ZERO React re-renders.
 *  - Scatter positions come from a deterministic hash, not Math.random(), so
 *    the prerendered SSG markup matches client hydration exactly.
 *  - An IntersectionObserver pauses the loop whenever the hero is off-screen.
 *  - prefers-reduced-motion renders the resolved (ordered) state statically.
 */

// --- Ordered lattice geometry (5 x 4) ------------------------------------
const COLS = [110, 225, 340, 455, 570]
const ROWS = [55, 125, 195, 265]
const CHAOS_BOUNDS = { x: [40, 640], y: [25, 295] }

/** Deterministic pseudo-random in [0,1) — stable across server and client. */
function hash(n) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const NODES = []
ROWS.forEach((y, r) =>
  COLS.forEach((x, c) => {
    const i = r * COLS.length + c
    NODES.push({
      i,
      ox: x, // ordered position
      oy: y,
      // scattered position
      sx: CHAOS_BOUNDS.x[0] + hash(i * 2 + 1) * (CHAOS_BOUNDS.x[1] - CHAOS_BOUNDS.x[0]),
      sy: CHAOS_BOUNDS.y[0] + hash(i * 2 + 2) * (CHAOS_BOUNDS.y[1] - CHAOS_BOUNDS.y[0]),
      // four accent nodes forming an ascending diagonal once ordered
      accent: i > 0 && i % 4 === 0,
    })
  })
)

// Lattice links: each node joins its right and lower neighbour.
const EDGES = []
ROWS.forEach((_, r) =>
  COLS.forEach((_, c) => {
    const i = r * COLS.length + c
    if (c < COLS.length - 1) EDGES.push([i, i + 1])
    if (r < ROWS.length - 1) EDGES.push([i, i + COLS.length])
  })
)

// The emerald trend that emerges through the accent nodes (indices 16,12,8,4).
const TREND = 'M225 265 L340 195 L455 125 L570 55'

// --- Sub-components: each owns its own transforms, so nothing re-renders ---

function Node({ n, progress }) {
  const cx = useTransform(progress, [0, 1], [n.sx, n.ox])
  const cy = useTransform(progress, [0, 1], [n.sy, n.oy])
  const r = useTransform(progress, [0, 1], [2.2, n.accent ? 3.6 : 2.8])
  const opacity = useTransform(progress, [0, 1], [0.4, n.accent ? 1 : 0.8])
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      opacity={opacity}
      fill={n.accent ? 'var(--ar-emerald)' : 'var(--ar-slate-blue)'}
    />
  )
}

function Edge({ a, b, progress }) {
  const x1 = useTransform(progress, [0, 1], [a.sx, a.ox])
  const y1 = useTransform(progress, [0, 1], [a.sy, a.oy])
  const x2 = useTransform(progress, [0, 1], [b.sx, b.ox])
  const y2 = useTransform(progress, [0, 1], [b.sy, b.oy])
  const opacity = useTransform(progress, [0, 1], [0.07, 0.26])
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      opacity={opacity}
      stroke="var(--ar-slate-blue)"
      strokeWidth="1"
    />
  )
}

export default function ChaosToOrder() {
  const reduce = useReducedMotion()
  const progress = useMotionValue(0)
  const wrapRef = useRef(null)

  // Reference grid and trend line only appear as order resolves.
  const gridOpacity = useTransform(progress, [0.35, 1], [0, 0.55])
  const trendOpacity = useTransform(progress, [0.65, 1], [0, 1])
  const trendLength = useTransform(progress, [0.65, 1], [0, 1])

  useEffect(() => {
    if (reduce) {
      progress.set(1) // render the resolved state, no motion
      return
    }

    const controls = animate(progress, 1, {
      duration: 6, // slow migration into order
      ease: [0.45, 0, 0.25, 1],
      repeat: Infinity,
      repeatType: 'reverse',
      repeatDelay: 2.6, // hold at each end of the cycle
    })

    // Pause while off-screen — no wasted frames.
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      return () => controls.stop()
    }
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? controls.play() : controls.pause()),
      { threshold: 0 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      controls.stop()
    }
  }, [reduce, progress])

  return (
    <div className="hero-visual" ref={wrapRef} aria-hidden="true">
      <svg viewBox="0 0 680 320" fill="none" role="presentation" className="hero-visual__svg">
        <defs>
          <linearGradient id="ar-trend" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--ar-slate-blue)" />
            <stop offset="100%" stopColor="var(--ar-emerald)" />
          </linearGradient>
        </defs>

        {/* Reference grid — fades up as structure resolves */}
        <motion.g
          stroke="var(--ar-border-strong)"
          strokeWidth="1"
          strokeDasharray="2 7"
          style={{ opacity: gridOpacity }}
        >
          {ROWS.map((y) => (
            <line key={'h' + y} x1="60" y1={y} x2="620" y2={y} />
          ))}
          {COLS.map((x) => (
            <line key={'v' + x} x1={x} y1="35" x2={x} y2="285" />
          ))}
        </motion.g>

        {/* Connecting lines */}
        <g>
          {EDGES.map(([a, b]) => (
            <Edge key={`${a}-${b}`} a={NODES[a]} b={NODES[b]} progress={progress} />
          ))}
        </g>

        {/* Emerald trend emerging through the ordered accent nodes */}
        <motion.path
          d={TREND}
          stroke="url(#ar-trend)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: trendOpacity, pathLength: trendLength }}
        />

        {/* Points */}
        {NODES.map((n) => (
          <Node key={n.i} n={n} progress={progress} />
        ))}
      </svg>
    </div>
  )
}
