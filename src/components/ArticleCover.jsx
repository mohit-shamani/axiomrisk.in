/**
 * Article featured image.
 *
 * Renders the real image when a post's `featuredImage` frontmatter is set.
 * Otherwise it draws an abstract branded cover, varied deterministically by
 * category — so posts look distinct without shipping stock photography or
 * implying imagery that doesn't exist.
 *
 * To use a real image: put the file in `public/images/insights/` and set
 *   featuredImage: "/images/insights/your-file.jpg"
 * in the post's frontmatter.
 */

// Each category gets its own geometry so covers are recognisable at a glance.
const MOTIFS = {
  'Enterprise Risk': 'lattice',
  Operational: 'bars',
  Compliance: 'frames',
  Continuity: 'wave',
  Strategy: 'trend',
}

function Motif({ kind }) {
  switch (kind) {
    case 'bars':
      return (
        <g>
          {[
            [70, 150, 60],
            [150, 120, 90],
            [230, 165, 45],
            [310, 96, 114],
            [390, 132, 78],
          ].map(([x, y, h], i) => (
            <rect
              key={x}
              x={x}
              y={y}
              width="44"
              height={h}
              rx="4"
              fill={i === 3 ? 'var(--ar-emerald)' : 'var(--ar-slate-blue)'}
              opacity={i === 3 ? 0.85 : 0.3 + i * 0.06}
            />
          ))}
        </g>
      )

    case 'frames':
      return (
        <g fill="none">
          <rect x="120" y="46" width="240" height="148" rx="12" stroke="var(--ar-slate-blue)" strokeWidth="1.5" opacity="0.3" />
          <rect x="152" y="70" width="176" height="100" rx="10" stroke="var(--ar-slate-blue)" strokeWidth="1.75" opacity="0.55" />
          <rect x="184" y="94" width="112" height="52" rx="8" stroke="var(--ar-emerald)" strokeWidth="2" />
          <circle cx="240" cy="120" r="5" fill="var(--ar-emerald)" />
        </g>
      )

    case 'wave':
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M60 150 Q120 90 180 150 T300 150 T420 150" stroke="var(--ar-slate-blue)" strokeWidth="2" opacity="0.35" />
          <path d="M60 172 Q120 112 180 172 T300 172 T420 172" stroke="var(--ar-slate-blue)" strokeWidth="2" opacity="0.2" />
          <path d="M60 128 Q120 68 180 128 T300 128 T420 128" stroke="var(--ar-emerald)" strokeWidth="2.25" />
          <circle cx="420" cy="128" r="5" fill="var(--ar-emerald)" stroke="none" />
        </g>
      )

    case 'trend':
      return (
        <g>
          <path
            d="M60 190 L140 160 L220 168 L300 124 L380 106 L440 70"
            fill="none"
            stroke="var(--ar-emerald)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[
            [60, 190],
            [140, 160],
            [220, 168],
            [300, 124],
            [380, 106],
            [440, 70],
          ].map(([cx, cy], i, arr) => (
            <circle
              key={cx}
              cx={cx}
              cy={cy}
              r={i === arr.length - 1 ? 6 : 3.5}
              fill={i === arr.length - 1 ? 'var(--ar-emerald)' : 'var(--ar-slate-blue)'}
            />
          ))}
        </g>
      )

    case 'lattice':
    default:
      return (
        <g>
          <g stroke="var(--ar-slate-blue)" strokeWidth="1" opacity="0.28">
            {[90, 190, 290, 390].map((x) =>
              [70, 130, 190].map((y) => (
                <g key={`${x}-${y}`}>
                  {x < 390 && <line x1={x} y1={y} x2={x + 100} y2={y} />}
                  {y < 190 && <line x1={x} y1={y} x2={x} y2={y + 60} />}
                </g>
              ))
            )}
          </g>
          {[90, 190, 290, 390].map((x) =>
            [70, 130, 190].map((y) => {
              const accent = (x === 290 && y === 70) || (x === 190 && y === 130)
              return (
                <circle
                  key={`n-${x}-${y}`}
                  cx={x}
                  cy={y}
                  r={accent ? 5 : 3}
                  fill={accent ? 'var(--ar-emerald)' : 'var(--ar-slate-blue)'}
                  opacity={accent ? 1 : 0.45}
                />
              )
            })
          )}
        </g>
      )
  }
}

export default function ArticleCover({ post, priority = false, className = '' }) {
  const cls = `article-cover${className ? ' ' + className : ''}`

  if (post.featuredImage) {
    return (
      <div className={cls}>
        <img
          className="article-cover__img"
          src={post.featuredImage}
          alt={post.title}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    )
  }

  return (
    <div className={`${cls} article-cover--abstract`} role="presentation">
      <svg viewBox="0 0 500 240" fill="none" aria-hidden="true" className="article-cover__svg">
        <g stroke="var(--ar-border-strong)" strokeWidth="1" opacity="0.5">
          {[60, 120, 180].map((y) => (
            <line key={y} x1="30" y1={y} x2="470" y2={y} strokeDasharray="2 8" />
          ))}
        </g>
        <Motif kind={MOTIFS[post.category] || 'lattice'} />
      </svg>
    </div>
  )
}
