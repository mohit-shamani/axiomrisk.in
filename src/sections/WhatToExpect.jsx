import Section from '../components/Section'
import Reveal from '../components/Reveal'
import { whatToExpect } from '../config/content'

export default function WhatToExpect() {
  return (
    <Section variant="alt">
      <div className="section-head">
        <Reveal as="p" className="eyebrow">ENGAGEMENT</Reveal>
        <Reveal as="h2" delay={0.05}>How a Typical Engagement Runs</Reveal>
      </div>

      <ol className="timeline">
        {whatToExpect.map((item, i) => (
          <Reveal as="li" key={item} className="timeline__item" delay={i * 0.07} y={14}>
            <span className="timeline__marker" aria-hidden="true">{i + 1}</span>
            <p className="timeline__text">{item}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
