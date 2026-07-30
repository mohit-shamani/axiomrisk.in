import Container from '../components/Container'
import Reveal from '../components/Reveal'
import { serviceDetails } from '../config/content'

function TickIcon() {
  return (
    <svg
      className="svc-includes__tick"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 8.4 L6.2 11.5 L13 4.8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * One detailed block per service. Layout and background alternate down the
 * page; on narrow viewports every block collapses to a single column in
 * source order (copy first, then the "what's included" panel).
 */
export default function ServiceDetailBlocks() {
  return (
    <>
      {serviceDetails.map((s, i) => {
        const reversed = i % 2 === 1
        return (
          <section
            key={s.slug}
            id={s.slug}
            className={`svc-block${reversed ? ' svc-block--alt' : ''}`}
          >
            <Container size="wide">
              <div className="svc-block__inner">
                <div className="svc-block__copy">
                  <Reveal as="span" className="svc-block__num">{s.num}</Reveal>
                  <Reveal as="h2" className="svc-block__title" delay={0.05}>{s.name}</Reveal>
                  <Reveal as="p" className="svc-block__intro" delay={0.1}>{s.intro}</Reveal>
                </div>

                <Reveal className="svc-block__panel" delay={0.12}>
                  <h3 className="svc-block__panel-title">What this includes</h3>
                  <ul className="svc-includes">
                    {s.includes.map((item) => (
                      <li key={item} className="svc-includes__item">
                        <TickIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {s.note && <p className="svc-block__note">{s.note}</p>}
                </Reveal>
              </div>
            </Container>
          </section>
        )
      })}
    </>
  )
}
