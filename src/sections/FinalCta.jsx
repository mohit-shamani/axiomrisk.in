import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Button from '../components/Button'

/**
 * Closing call-to-action on a slate-blue surface with an emerald button.
 * Copy is overridable per page; defaults are the homepage wording.
 */
export default function FinalCta({
  title = "Let's Talk About Your Risk",
  sub = 'A short conversation is often enough to see where the real exposure lies.',
  ctaLabel = 'Book a Consultation',
  ctaTo = '/contact',
}) {
  return (
    <Section variant="primary">
      <div className="final-cta">
        <Reveal as="h2" className="final-cta__title">{title}</Reveal>
        <Reveal as="p" className="final-cta__sub" delay={0.06}>{sub}</Reveal>
        <Reveal className="final-cta__action" delay={0.12}>
          <Button to={ctaTo} variant="accent" size="lg">{ctaLabel}</Button>
        </Reveal>
      </div>
    </Section>
  )
}
