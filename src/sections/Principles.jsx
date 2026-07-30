import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { principles } from '../config/content'

export default function Principles() {
  return (
    <Section variant="alt">
      <div className="section-head">
        <Reveal as="p" className="eyebrow">OUR PRINCIPLES</Reveal>
        <Reveal as="h2" delay={0.05}>How We Think About Risk</Reveal>
      </div>

      <div className="grid grid--4">
        {principles.map((p, i) => (
          <Reveal key={p.title} className="card principle-card" delay={i * 0.07}>
            <span className="principle-card__index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="card__title">{p.title}</h3>
            <p className="card__body">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
