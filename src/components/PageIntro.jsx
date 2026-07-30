import Container from './Container'
import Reveal from './Reveal'

/** Interior-page hero band: eyebrow + title + optional lead. */
export default function PageIntro({ eyebrow, title, lead }) {
  return (
    <div className="page-intro">
      <Container size="wide">
        {eyebrow && (
          <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>
        )}
        <Reveal as="h1" className="page-intro__title" delay={0.05}>{title}</Reveal>
        {lead && (
          <Reveal as="p" className="page-intro__lead lead" delay={0.1}>{lead}</Reveal>
        )}
      </Container>
    </div>
  )
}
