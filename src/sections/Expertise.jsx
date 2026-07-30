import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { expertise } from '../config/content'

export default function Expertise() {
  return (
    <Section>
      <div className="section-head">
        <Reveal as="p" className="eyebrow">CAPABILITIES</Reveal>
        <Reveal as="h2" delay={0.05}>Where Our Strength Lies</Reveal>
      </div>

      <div className="grid grid--2">
        {expertise.map((e, i) => (
          <Reveal key={e.title} className="card expertise-card" delay={i * 0.07}>
            <span className="expertise-card__rule" aria-hidden="true" />
            <h3 className="card__title">{e.title}</h3>
            <p className="card__body">{e.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
