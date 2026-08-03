// ---------------------------------------------------------------------------
// Downloadable resources.
// ===========================================================================
// ⚠️  FILE NOT INCLUDED — you must add it before launch.
//
// Put the actual template file at:
//     public/downloads/axiomrisk-risk-register-template.xlsx
//
// Anything inside public/ is copied to the site root at build time, so that
// file becomes available at /downloads/axiomrisk-risk-register-template.xlsx
//
// If you use a different filename or format (.xlsx / .csv / .pdf), update the
// `file` and `fileLabel` values below to match.
// ===========================================================================

export const RISK_REGISTER_TEMPLATE = {
  title: 'Risk Register Template',
  description:
    'A simple, practical risk register structure your team can actually maintain — with guidance on how to use each column.',
  file: '/downloads/axiomrisk-risk-register-template.xlsx',
  fileLabel: 'Download the template (XLSX)',
}

export const RISK_HEALTH_CHECK = {
  title: 'Risk Health Check',
  description:
    'A two-minute self-assessment across key risk areas, with instant results.',
  to: '/risk-health-check',
  ctaLabel: 'Start the Check',
}
