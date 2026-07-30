import Container from '../components/Container'
import Reveal from '../components/Reveal'
import { trustPoints } from '../config/content'

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
      <path
        d="M5.5 9.2 L7.8 11.4 L12.5 6.6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function TrustStrip() {
  return (
    <div className="trust">
      <Container size="wide">
        <ul className="trust__grid">
          {trustPoints.map((point, i) => (
            <Reveal as="li" key={point} className="trust__item" delay={i * 0.07} y={12}>
              <CheckIcon />
              <span>{point}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </div>
  )
}
