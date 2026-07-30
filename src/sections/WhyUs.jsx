import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { whyUs } from '../config/content'

export default function WhyUs() {
  return (
    <Section>
      <div className="section-head">
        <Reveal as="h2">Why Businesses Work With AxiomRisk</Reveal>
      </div>

      <div className="grid grid--3">
        {whyUs.map((w, i) => (
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
