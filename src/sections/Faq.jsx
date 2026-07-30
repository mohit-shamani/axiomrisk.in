import Section from '../components/Section'
import Reveal from '../components/Reveal'
import JsonLd, { faqPageSchema } from '../components/JsonLd'
import { faqs as defaultFaqs } from '../config/content'

/**
 * Native <details>/<summary> accordion: answers are always present in the DOM
 * (so they are crawlable and readable without JS) and it is keyboard
 * accessible for free. Paired with FAQPage structured data.
 *
 * `items` lets each route supply its own question set; the schema is generated
 * from whatever is passed, so markup and structured data can never drift apart.
 */
export default function Faq({
  items = defaultFaqs,
  eyebrow = 'QUESTIONS',
  title = 'Frequently Asked',
  variant = 'default',
}) {
  return (
    <Section variant={variant}>
      <JsonLd data={faqPageSchema(items)} />

      <div className="section-head">
        {eyebrow && <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>}
        <Reveal as="h2" delay={0.05}>{title}</Reveal>
      </div>

      <div className="faq">
        {items.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.06} y={14}>
            <details className="faq__item" {...(i === 0 ? { open: true } : {})}>
              <summary className="faq__q">
                <span>{f.q}</span>
                <svg
                  className="faq__chevron"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M5 8 L10 13 L15 8"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <p className="faq__a">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
