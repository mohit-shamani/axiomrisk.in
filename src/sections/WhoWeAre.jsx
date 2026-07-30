import Section from '../components/Section'
import Reveal from '../components/Reveal'
import SupportingImage from '../components/SupportingImage'
import { whoWeAre } from '../config/content'

export default function WhoWeAre() {
  return (
    <Section>
      <div className="about-split">
        <div className="about-split__copy">
          <Reveal as="h2">Who We Are</Reveal>
          {whoWeAre.map((para, i) => (
            <Reveal as="p" key={i} className="about-split__para" delay={0.06 + i * 0.06}>
              {para}
            </Reveal>
          ))}
        </div>

        <Reveal className="about-split__media" delay={0.12}>
          <SupportingImage />
        </Reveal>
      </div>
    </Section>
  )
}
