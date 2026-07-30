import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { services } from '../config/content'

export default function ServicesSection() {
  return (
    <Section id="services">
      <div className="section-head">
        <Reveal as="p" className="eyebrow">WHAT WE DO</Reveal>
        <Reveal as="h2" delay={0.05}>Risk Advisory, End to End</Reveal>
      </div>

      <div className="grid grid--3">
        {services.map((s, i) => (
          <Reveal key={s.title} className="card service-card" delay={(i % 3) * 0.08}>
            <span className="service-card__mark" aria-hidden="true" />
            <h3 className="card__title">{s.title}</h3>
            <p className="card__body">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
