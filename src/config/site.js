// ---------------------------------------------------------------------------
// Central brand + site configuration.
// Edit business facts here once; components read from this file.
// ---------------------------------------------------------------------------

// The public contact address. Used by the contact page, the form's error
// fallback and the footer. Confirm this mailbox exists and is monitored.
export const CONTACT_EMAIL = 'contact@axiomrisk.co'

export const site = {
  name: 'AxiomRisk',
  // Trading name only. There is no registered company entity, so nothing
  // here should imply one — no "Pvt. Ltd.", no CIN, no registration number.
  // If an entity is incorporated later, set the registered name here and fill
  // {{COMPANY_LEGAL_NAME}} in src/config/legal.js to match.
  legalName: 'AxiomRisk',
  tagline: 'Clarity in Complexity',
  description:
    'AxiomRisk is a B2B risk advisory and management consulting firm helping ' +
    'Indian businesses anticipate, quantify and manage enterprise risk with ' +
    'clarity and precision.',
  // Production origin. Single source of truth — canonicals, Open Graph,
  // JSON-LD and scripts/generate-sitemap.mjs all derive from this.
  // No trailing slash.
  url: 'https://axiomrisk.co',
  locale: 'en_IN',
  email: CONTACT_EMAIL,
  // NOTE: no phone number or street address. Nothing is published here unless
  // it is real — a placeholder that reaches nobody is worse than an omission.
  // To add one later, set it here and render it in Footer / ContactDetails.
  location: 'India',
  responseTime: 'We typically respond within one business day.',
  // No social profiles published yet. The LinkedIn company page did not
  // exist, so the link was removed rather than shipped broken. To add one:
  // set `linkedin` here and restore the link in Footer.jsx.
  social: {},
}

// Active hero visual. Options (see src/sections/visuals/index.js):
//   'chaos-to-order'  — scattered points organising into a lattice, loops
//   'resolving-grid'  — data field resolving into an ordered trend
//   'axis-shield'     — emblematic shield in precise line-work
//   'network-lattice' — interconnected exposures, critical path lit
// Unused visuals are kept in the registry so an alternative can be swapped in
// without rebuilding it; they add nothing to the bundle unless selected.
export const heroVisual = 'chaos-to-order'

// Primary navigation (Header + Footer).
export const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Approach', to: '/approach' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Resources', to: '/resources' },
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
