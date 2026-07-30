import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { whyItWorks } from '../config/content'

export default function WhyItWorks() {
  return (
    <Section>
      <div className="section-head">
        <Reveal as="p" className="eyebrow">WHY IT WORKS</Reveal>
        <Reveal as="h2" delay={0.05}>Advice You Can Actually Use</Reveal>
      </div>

      <div className="grid grid--3">
        {whyItWorks.map((w, i) => (
          <Reveal key={w.title} className="card why-card" delay={i * 0.08}>
            <span className="why-card__rule" aria-hidden="true" />
            <h3 className="card__title">{w.title}</h3>
            <p className="card__body">{w.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
