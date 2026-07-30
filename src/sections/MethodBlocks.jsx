import Container from '../components/Container'
import Reveal from '../components/Reveal'
import { methodSteps } from '../config/content'

function ChevronIcon() {
  return (
    <svg
      className="method-points__chevron"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M5.5 3.5 L10 8 L5.5 12.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The four-step method. Same alternating rhythm as /services but visually
 * distinct: oversized emerald numerals and a stepped rail that reads as a
 * sequence rather than a catalogue.
 */
export default function MethodBlocks() {
  return (
    <ol className="method">
      {methodSteps.map((s, i) => {
        const reversed = i % 2 === 1
        return (
          <li
            key={s.slug}
            id={s.slug}
            className={`method-block${reversed ? ' method-block--alt' : ''}`}
          >
            <Container size="wide">
              <div className="method-block__inner">
                <div className="method-block__copy">
                  <Reveal as="span" className="method-block__num" aria-hidden="true">
                    {s.num}
                  </Reveal>
                  <Reveal as="h2" className="method-block__title" delay={0.05}>
                    <span className="method-block__title-num">{s.num} — </span>
                    {s.name}
                  </Reveal>
                  <Reveal as="p" className="method-block__intro" delay={0.1}>
                    {s.intro}
                  </Reveal>
                </div>

                <Reveal className="method-block__panel" delay={0.12}>
                  <ul className="method-points">
                    {s.points.map((p) => (
                      <li key={p} className="method-points__item">
                        <ChevronIcon />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </Container>
          </li>
        )
      })}
    </ol>
  )
}
