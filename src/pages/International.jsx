import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Seo from '../components/Seo'
import OpenAiPixel from '../components/OpenAiPixel'
import Section from '../components/Section'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import ContactForm from '../sections/ContactForm'
import { seo } from '../config/seo'
import { trackEvent } from '../lib/analytics'
import { trackOpenAiConversion } from '../lib/openaiPixel'

const services = [
  {
    title: 'Enterprise Risk Management',
    body: 'Build structured approaches to identifying, assessing and prioritizing risks across the organization.',
    to: '/services/enterprise-risk-management',
  },
  {
    title: 'Operational Risk',
    body: 'Identify operational vulnerabilities and strengthen processes, controls and resilience.',
    to: '/services/operational-risk-advisory',
  },
  {
    title: 'Strategic Risk',
    body: 'Evaluate risks surrounding major decisions, expansion initiatives and changing market conditions.',
    to: '/services#strategic-risk',
  },
  {
    title: 'Compliance & Regulatory Risk',
    body: 'Assess regulatory and compliance exposures and develop practical risk-management frameworks.',
    to: '/services#compliance-regulatory',
  },
  {
    title: 'Business Continuity & Resilience',
    body: 'Prepare for disruption through continuity planning, scenario analysis and resilience strategies.',
    to: '/services/business-continuity-crisis-planning',
  },
  {
    title: 'Risk Assessments',
    body: 'Structured assessments designed to identify exposures, prioritize risks and support informed decision-making.',
    to: '/services#risk-assessment-reviews',
  },
]

const audiences = [
  'Business Owners',
  'Founders',
  'Leadership Teams',
  'Growing Companies',
  'International Businesses',
  'Organizations Entering New Markets',
]

const valueProps = [
  {
    title: 'Structured Analysis',
    body: 'Turn complex risks into clearly defined priorities.',
  },
  {
    title: 'Practical Recommendations',
    body: 'Focus on actions that can realistically be implemented.',
  },
  {
    title: 'Business-Focused Approach',
    body: 'Evaluate risk in the context of operations, strategy and commercial objectives.',
  },
  {
    title: 'Confidential Engagement',
    body: 'Handle business discussions and submitted information professionally and discreetly.',
  },
]

const processSteps = [
  {
    num: '01',
    title: 'Understand',
    body: 'We begin by understanding your organization, objectives and key concerns.',
  },
  {
    num: '02',
    title: 'Assess',
    body: 'Relevant exposures, dependencies and risk factors are evaluated.',
  },
  {
    num: '03',
    title: 'Prioritize',
    body: 'Risks are organized according to their potential business significance.',
  },
  {
    num: '04',
    title: 'Recommend',
    body: 'A practical set of recommendations and next steps is developed.',
  },
]

const internationalTopics = [
  'Enterprise Risk Management',
  'Operational Risk',
  'Strategic Risk',
  'Compliance & Regulatory Risk',
  'Business Continuity',
  'Risk Assessment',
  'Other',
]

function withSearch(to, search) {
  if (!search) return to

  const [path, hash] = to.split('#')
  return `${path}${search}${hash ? `#${hash}` : ''}`
}

function eventParams(extra = {}) {
  if (typeof window === 'undefined') return extra

  return {
    page_path: window.location.pathname + window.location.search,
    ...extra,
  }
}

function utmFields() {
  if (typeof window === 'undefined') return {}

  const labels = {
    utm_source: 'UTM Source',
    utm_medium: 'UTM Medium',
    utm_campaign: 'UTM Campaign',
    utm_term: 'UTM Term',
    utm_content: 'UTM Content',
  }
  const params = new URLSearchParams(window.location.search)

  return Object.fromEntries(
    Object.entries(labels)
      .map(([key, label]) => [label, params.get(key)])
      .filter(([, value]) => value)
  )
}

const META_PIXEL_ID = '2032074647447191'

function initializeMetaPixel() {
  if (typeof window === 'undefined') return

  if (!window.fbq) {
    const fbq = function () {
      return fbq.callMethod
        ? fbq.callMethod.apply(fbq, arguments)
        : fbq.queue.push(arguments)
    }

    window.fbq = fbq
    window._fbq = fbq
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
  }

  if (!window.__axiomRiskMetaPixelInitialized) {
    window.fbq('init', META_PIXEL_ID)
    window.__axiomRiskMetaPixelInitialized = true
  }

  window.fbq('track', 'PageView')
}

function trackMetaLead() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead')
  }
}

export default function International() {
  const location = useLocation()
  const [currentSearch, setCurrentSearch] = useState(location.search)

  useEffect(() => {
    const search = window.location.search
    setCurrentSearch(search)
    trackEvent('international_page_view', eventParams())
    initializeMetaPixel()
  }, [])

  const trackCta = (placement) => {
    trackEvent('international_primary_cta_click', eventParams({ placement }))
  }

  const trackService = (service) => {
    trackEvent('international_service_click', eventParams({ service_name: service.title }))
  }

  const handleServiceClick = (event, service) => {
    trackService(service)

    if (typeof window === 'undefined' || !window.location.search) return
    event.preventDefault()
    window.location.assign(withSearch(service.to, window.location.search))
  }

  return (
    <>
      <Seo {...seo.international} />
      {/* Paid-acquisition measurement. This route only. */}
      <OpenAiPixel />

      <div className="intl-hero">
        <Container size="wide">
          <div className="intl-hero__grid">
            <div>
              <Reveal as="p" className="eyebrow">INTERNATIONAL RISK ADVISORY</Reveal>
              <Reveal as="h1" className="intl-hero__title" delay={0.05}>
                Risk Advisory for Businesses Operating Across Complex Markets
              </Reveal>
              <Reveal as="p" className="intl-hero__lead lead" delay={0.1}>
                Navigate operational uncertainty, evolving risk environments and complex
                business decisions with structured, practical risk advisory.
              </Reveal>
              <Reveal className="intl-hero__actions" delay={0.16}>
                <Button
                  href="#international-consultation"
                  variant="accent"
                  size="lg"
                  onClick={() => trackCta('hero')}
                >
                  Request a Consultation
                </Button>
                <Button href="#international-services" variant="outline" size="lg">
                  Explore Our Services
                </Button>
              </Reveal>
            </div>

            <Reveal className="intl-hero__panel" delay={0.12} y={14}>
              <p className="intl-hero__panel-label">Advisory Focus</p>
              <ul className="intl-focus-list">
                {['Enterprise risk', 'Operational resilience', 'Strategic decisions', 'Compliance exposure'].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </div>

      <Section>
        <div className="svc-prose">
          <Reveal as="h2">Managing Risk Across an Increasingly Complex Business Environment</Reveal>
          <Reveal as="p" delay={0.05}>
            Businesses operating across markets face interconnected risks from operational
            disruption and regulatory change to strategic uncertainty and business
            continuity challenges.
          </Reveal>
          <Reveal as="p" delay={0.1}>
            AxiomRisk provides structured risk advisory designed to help organizations
            identify exposures, evaluate priorities and develop practical approaches to
            risk management.
          </Reveal>
        </div>
      </Section>

      <Section id="international-services" variant="alt">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">SERVICES</Reveal>
          <Reveal as="h2" delay={0.05}>International Risk Advisory Services</Reveal>
        </div>

        <div className="grid grid--3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.08}>
              <Link
                to={withSearch(service.to, currentSearch)}
                className="card service-card intl-service-card"
                onClick={(event) => handleServiceClick(event, service)}
              >
                <span className="service-card__mark" aria-hidden="true" />
                <h3 className="card__title">{service.title}</h3>
                <p className="card__body">{service.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="svc-split intl-context">
          <div className="svc-split__copy">
            <Reveal as="h2">Risk Doesn't Stop at Borders</Reveal>
            <Reveal as="p" className="svc-split__intro" delay={0.05}>
              Organizations operating internationally can face unfamiliar regulations,
              supply-chain dependencies, geopolitical uncertainty, operational complexity
              and rapidly changing market conditions.
            </Reveal>
          </div>
          <Reveal className="svc-panel" delay={0.1}>
            <p>
              A structured risk-management approach helps decision-makers understand
              these exposures before they become business-critical problems.
            </p>
            <p>
              AxiomRisk brings a practical, analytical approach to evaluating risk and
              developing actionable recommendations.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section variant="alt">
        <div className="section-head">
          <Reveal as="h2">Built for Decision-Makers</Reveal>
          <Reveal as="p" delay={0.05}>
            Whether evaluating expansion, strengthening operations or preparing for
            uncertainty, AxiomRisk helps organizations approach complex risk decisions
            systematically.
          </Reveal>
        </div>

        <ul className="industries intl-audience">
          {audiences.map((audience, i) => (
            <Reveal as="li" key={audience} className="industry" delay={(i % 3) * 0.05} y={12}>
              {audience}
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="section-head">
          <Reveal as="h2">Practical Risk Advisory, Built Around Your Business</Reveal>
        </div>

        <div className="grid grid--4">
          {valueProps.map((item, i) => (
            <Reveal key={item.title} className="card why-card" delay={i * 0.06}>
              <span className="why-card__rule" aria-hidden="true" />
              <h3 className="card__title">{item.title}</h3>
              <p className="card__body">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">PROCESS</Reveal>
          <Reveal as="h2" delay={0.05}>How an Engagement Works</Reveal>
        </div>

        <ol className="steps">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.num} className="step" delay={i * 0.08}>
              <span className="step__num">Step {step.num}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__body">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section variant="primary">
        <div className="final-cta">
          <Reveal as="h2" className="final-cta__title">
            Make Better Decisions With a Clearer View of Risk
          </Reveal>
          <Reveal as="p" className="final-cta__sub" delay={0.06}>
            Tell us about the challenges your organization is facing and explore how
            AxiomRisk can support your risk-management objectives.
          </Reveal>
          <Reveal className="final-cta__action" delay={0.12}>
            <Button
              href="#international-consultation"
              variant="accent"
              size="lg"
              onClick={() => trackCta('final_cta')}
            >
              Request a Confidential Consultation
            </Button>
          </Reveal>
        </div>
      </Section>

      <Section id="international-consultation">
        <div className="intl-form-layout">
          <Reveal className="intl-form-layout__copy">
            <p className="eyebrow">CONSULTATION</p>
            <h2>Request a Confidential Consultation</h2>
            <p>
              Share a brief outline of the risks or decisions you are evaluating.
              AxiomRisk will review your enquiry and respond through the existing
              consultation process.
            </p>
          </Reveal>

          <Reveal className="intl-form-layout__form" delay={0.08}>
            <ContactForm
              includeCountry
              topics={internationalTopics}
              formName="international"
              subjectPrefix="International risk advisory enquiry"
              submitLabel="Request Consultation"
              topicLabel="Service Interested In"
              roleLabel="Role / Position"
              roleHint="e.g. Founder, CFO, Operations, Compliance"
              successMessage={"Thank you \u2014 we've received your consultation request and will be in touch shortly."}
              extraFields={utmFields}
              analytics={{
                formStart: () => trackEvent('international_form_start', eventParams()),
                // Called from ContactForm's `if (result.ok)` branch only —
                // after Web3Forms has confirmed the submission, never on click,
                // validation, request start, HTTP error or API failure.
                submitSuccess: () => {
                  trackEvent('international_form_submit_success', eventParams())
                  trackOpenAiConversion()
                  trackMetaLead()
                },
              }}
            />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
