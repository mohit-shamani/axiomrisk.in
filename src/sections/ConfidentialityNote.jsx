import Container from '../components/Container'
import Reveal from '../components/Reveal'
import { confidentialityNote } from '../config/content'

export default function ConfidentialityNote() {
  return (
    <div className="confidentiality">
      <Container size="wide">
        <Reveal className="confidentiality__inner" y={12}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path
              d="M11 2.5 L18 5.2 V10.4 C18 14.6 15.1 17.7 11 19.5 C6.9 17.7 4 14.6 4 10.4 V5.2 Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="M8.2 11 L10.3 13.1 L14 9.4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>{confidentialityNote}</p>
        </Reveal>
      </Container>
    </div>
  )
}
