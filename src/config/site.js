// ---------------------------------------------------------------------------
// Central brand + site configuration.
// Edit business facts here once; components read from this file.
// ---------------------------------------------------------------------------

// ===========================================================================
// ⚠️  FILL IN BEFORE LAUNCH — PLACEHOLDER
// The public contact address. Used by the contact page, the form's error
// fallback and the footer. Replace with the real inbox.
// ===========================================================================
export const CONTACT_EMAIL = 'contact@axiomrisk.in'

export const site = {
  name: 'AxiomRisk',
  legalName: 'AxiomRisk Advisory Pvt. Ltd.',
  tagline: 'Clarity in Complexity',
  description:
    'AxiomRisk is a B2B risk advisory and management consulting firm helping ' +
    'Indian businesses anticipate, quantify and manage enterprise risk with ' +
    'clarity and precision.',
  url: 'https://axiomrisk.in',
  locale: 'en_IN',
  email: CONTACT_EMAIL,
  // NOTE: no phone number or street address. Nothing is published here unless
  // it is real — a placeholder that reaches nobody is worse than an omission.
  // To add one later, set it here and render it in Footer / ContactDetails.
  location: 'India',
  responseTime: 'We typically respond within one business day.',
  social: {
    // ⚠️ PLACEHOLDER — confirm or remove before launch.
    linkedin: 'https://www.linkedin.com/company/axiomrisk',
  },
}

// Active hero visual. Options (see src/sections/visuals/index.js):
//   'chaos-to-order'  — scattered points organising into a lattice, loops
//   'resolving-grid'  — data field resolving into an ordered trend
//   'axis-shield'     — emblematic shield in precise line-work
//   'network-lattice' — interconnected exposures, critical path lit
// Compare them all live at /styleguide.
export const heroVisual = 'chaos-to-order'

// Primary navigation (Header + Footer).
export const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Approach', to: '/approach' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

// Global call-to-action used across Header, Footer and section CTAs.
export const primaryCta = {
  label: 'Book a Consultation',
  to: '/contact',
}

// Footer legal links.
export const legalLinks = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
]
