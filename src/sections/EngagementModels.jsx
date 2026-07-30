import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import { engagementModels } from '../config/content'

export default function EngagementModels() {
  return (
    <Section variant="alt">
      <div className="section-head">
        <Reveal as="p" className="eyebrow">WORKING TOGETHER</Reveal>
        <Reveal as="h2" delay={0.05}>Engagements Shaped Around You</Reveal>
      </div>

      <div className="grid grid--2">
        {engagementModels.map((m, i) => (
          <Reveal key={m.title} className="card engagement-card" delay={i * 0.08}>
            <span className="engagement-card__rule" aria-hidden="true" />
            <h3 className="card__title">{m.title}</h3>
            <p className="card__body">{m.body}</p>
            <div className="card__foot">
              <Button to={m.cta.to} variant="outline">{m.cta.label}</Button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
