import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { approachSteps } from '../config/content'

export default function ApproachSection() {
  return (
    <Section variant="alt" id="approach">
      <div className="section-head">
        <Reveal as="p" className="eyebrow">HOW WE WORK</Reveal>
        <Reveal as="h2" delay={0.05}>A Clear, Practical Method</Reveal>
      </div>

      <ol className="steps">
        {approachSteps.map((s, i) => (
          <Reveal as="li" key={s.num} className="step" delay={i * 0.09}>
            <span className="step__num">{s.num}</span>
            <h3 className="step__title">{s.title}</h3>
            <p className="step__body">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
