import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { whoWeServe } from '../config/content'

export default function WhoWeServe() {
  return (
    <Section variant="alt">
      <div className="serve">
        <Reveal as="span" className="serve__rule" aria-hidden="true" />
        <Reveal as="h2" delay={0.05}>The Businesses We Serve</Reveal>
        <Reveal as="p" className="serve__text" delay={0.1}>{whoWeServe}</Reveal>
      </div>
    </Section>
  )
}
