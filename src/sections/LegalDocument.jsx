import Container from '../components/Container'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { LEGAL_LAST_UPDATED } from '../config/legal'

const PLACEHOLDER_RE = /(\{\{[A-Z0-9_]+\}\})/g

/**
 * Renders a run of text, marking any {{PLACEHOLDER}} so an unfilled value is
 * impossible to miss on the page rather than hiding in the prose.
 */
function Text({ children }) {
  const parts = String(children).split(PLACEHOLDER_RE)
  return (
    <>
      {parts.map((part, i) =>
        PLACEHOLDER_RE.test(part) ? (
          <mark key={i} className="legal__placeholder" title="Unfilled placeholder — replace before publishing">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

/** Shared layout for the Privacy Policy and Terms of Use pages. */
export default function LegalDocument({ sections, intro }) {
  return (
    <Section>
      <Container size="narrow">
        <div className="legal">
          <Reveal as="p" className="legal__updated">
            Last updated: <Text>{LEGAL_LAST_UPDATED}</Text>
          </Reveal>

          {intro && (
            <Reveal as="p" className="legal__intro" delay={0.04}>
              {intro}
            </Reveal>
          )}

          {sections.map((s, i) => (
            <Reveal as="section" key={s.id} id={s.id} className="legal__section" delay={0.04 + i * 0.02}>
              <h2 className="legal__heading">{s.heading}</h2>

              {s.body?.map((p, n) => (
                <p key={n}>
                  <Text>{p}</Text>
                </p>
              ))}

              {s.list && (
                <>
                  {s.list.intro && (
                    <p>
                      <Text>{s.list.intro}</Text>
                    </p>
                  )}
                  <ul className="legal__list">
                    {s.list.items.map((item) => (
                      <li key={item}>
                        <Text>{item}</Text>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {s.after?.map((p, n) => (
                <p key={`a${n}`}>
                  <Text>{p}</Text>
                </p>
              ))}
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
