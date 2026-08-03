import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import EmailCaptureForm from '../components/EmailCaptureForm'
import { seo } from '../config/seo'
import { RISK_HEALTH_CHECK, RISK_REGISTER_TEMPLATE } from '../config/resources'

export default function Resources() {
  return (
    <>
      <Seo {...seo.resources} />

      <PageIntro
        eyebrow="FREE RESOURCES"
        title="Practical Tools for Managing Risk"
        lead="Free, practical resources you can use in your business today."
      />

      <Section>
        <div className="grid grid--2">
          {/* Risk Health Check */}
          <Reveal className="card resource-card">
            <span className="resource-card__mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M2.5 15.5 L7.5 9.5 L11.5 13 L19.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M14.5 4.5 H19.5 V9.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 className="card__title">{RISK_HEALTH_CHECK.title}</h2>
            <p className="card__body">{RISK_HEALTH_CHECK.description}</p>
            <div className="card__foot">
              <Button to={RISK_HEALTH_CHECK.to} variant="accent">
                {RISK_HEALTH_CHECK.ctaLabel}
              </Button>
            </div>
          </Reveal>

          {/* Risk Register Template — email gated */}
          <Reveal className="card resource-card" delay={0.08}>
            <span className="resource-card__mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2.5 V14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                <path d="M6.5 9.5 L11 14 L15.5 9.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 17.5 H19" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
            </span>
            <h2 className="card__title">{RISK_REGISTER_TEMPLATE.title}</h2>
            <p className="card__body">{RISK_REGISTER_TEMPLATE.description}</p>

            <div className="card__foot resource-card__gate">
              <EmailCaptureForm
                idPrefix="template"
                subject="Risk Register Template — download request"
                extraFields={{ Resource: 'Risk Register Template' }}
                submitLabel="Get the template"
                successMessage="Thank you — your template is ready below."
              >
                <a
                  className="btn btn--accent resource-card__download"
                  href={RISK_REGISTER_TEMPLATE.file}
                  download
                >
                  {RISK_REGISTER_TEMPLATE.fileLabel}
                </a>
              </EmailCaptureForm>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
