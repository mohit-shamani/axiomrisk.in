// ---------------------------------------------------------------------------
// Per-route SEO metadata.
// Each route renders <Seo {...seo.<route>} /> so that unique title, meta
// description and canonical URL are prerendered into the served HTML at
// build time (vite-react-ssg). Keep titles < ~60 chars, descriptions < ~155.
// ---------------------------------------------------------------------------

import { site } from './site'

const titleSuffix = ` | ${site.name}`

export const seo = {
  home: {
    title: 'AxiomRisk | Risk Advisory & Management Consulting in India',
    description:
      'AxiomRisk helps businesses across India identify, assess and manage risk — ' +
      'enterprise risk management, compliance, continuity and strategic risk advisory.',
    path: '/',
  },
  services: {
    title: 'Risk Advisory Services | AxiomRisk',
    description:
      'Enterprise risk management, compliance, business continuity and strategic ' +
      'risk advisory for businesses across India. Practical, independent, confidential.',
    path: '/services',
  },
  approach: {
    title: 'Our Approach | How AxiomRisk Works',
    description:
      'A clear, practical method for risk advisory — understand, assess, advise ' +
      'and support. Independent, evidence-based and proportionate to your business.',
    path: '/approach',
  },
  about: {
    title: 'About AxiomRisk | Risk Advisory Firm in India',
    description:
      'AxiomRisk is an independent risk advisory and management consulting firm ' +
      'helping businesses across India manage risk with clarity, objectivity and ' +
      'practical advice.',
    path: '/about',
  },
  insights: {
    title: `Insights${titleSuffix}`,
    description:
      'Perspectives, frameworks and research on enterprise risk, governance ' +
      'and resilience from the AxiomRisk team.',
    path: '/insights',
  },
  contact: {
    title: 'Contact AxiomRisk | Book a Risk Advisory Consultation',
    description:
      'Speak with AxiomRisk about your business risk. Independent, confidential ' +
      'risk advisory for businesses across India. Book a no-obligation consultation.',
    path: '/contact',
  },
  privacy: {
    title: `Privacy Policy${titleSuffix}`,
    description: `How ${site.name} collects, uses and protects your information.`,
    path: '/privacy',
  },
  terms: {
    title: `Terms of Use${titleSuffix}`,
    description: `The terms governing your use of the ${site.name} website.`,
    path: '/terms',
  },
  notFound: {
    title: `Page Not Found${titleSuffix}`,
    description: 'The page you are looking for could not be found.',
    path: '/404',
  },
}
