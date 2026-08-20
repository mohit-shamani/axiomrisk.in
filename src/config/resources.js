// ---------------------------------------------------------------------------
// Downloadable resources.
//
// The template file lives at public/risk-register-template.xlsx. Anything in
// public/ is copied to the site root verbatim at build time, so it is served
// from /risk-register-template.xlsx — a static file, fetched by the browser's
// own download of an <a download> link. No JavaScript, no JSON parsing.
//
// To replace the template, overwrite that file and rebuild. If you change the
// filename or format, update `file` and `fileLabel` together so the button
// label never claims a format the file is not.
// ---------------------------------------------------------------------------

export const RISK_REGISTER_TEMPLATE = {
  title: 'Risk Register Template',
  description:
    'A simple, practical risk register structure your team can actually maintain — with guidance on how to use each column.',
  file: '/risk-register-template.xlsx',
  fileLabel: 'Download the template (Excel)',
}

export const RISK_HEALTH_CHECK = {
  title: 'Risk Health Check',
  description:
    'A two-minute self-assessment across key risk areas, with instant results.',
  to: '/risk-health-check',
  ctaLabel: 'Start the Check',
}
