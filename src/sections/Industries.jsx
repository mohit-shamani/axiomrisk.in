import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { industries } from '../config/content'

export default function Industries() {
  return (
    <Section variant="alt">
      <div className="section-head">
        <Reveal as="h2">Sectors We Advise</Reveal>
      </div>

      <ul className="industries">
        {industries.map((name, i) => (
          <Reveal as="li" key={name} className="industry" delay={(i % 3) * 0.07} y={14}>
            {name}
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
