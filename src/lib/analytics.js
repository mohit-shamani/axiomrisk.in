// ---------------------------------------------------------------------------
// Google Analytics 4 — the single place that talks to gtag.
//
// The base snippet lives in index.html and is configured with
// `send_page_view: false`, because this is a single-page app: gtag would only
// ever see the landing page, and its automatic first view would double count
// against the one the router sends. Every page view comes from here instead.
//
// Every call is guarded. gtag is a third-party script and is routinely blocked
// by ad blockers, privacy extensions and corporate proxies, so `window.gtag`
// being absent is a normal runtime state, not an error — the site must behave
// identically when it never loads.
// ---------------------------------------------------------------------------

export const GA_MEASUREMENT_ID = 'G-Y1ZQP3E6Y3'

/** True only when the gtag script actually loaded and was not blocked. */
function gtagReady() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

/**
 * Send a GA4 page view for the current route.
 *
 * Call this after the route's <title> has been committed — see Analytics.jsx
 * for why the caller defers a frame.
 */
export function trackPageView({ path, title }) {
  if (!gtagReady()) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  })
}

/**
 * Send a conversion / interaction event.
 *
 * Only ever called on a confirmed success path. Firing on submit-attempt would
 * count failures as leads, and every form on this site can fail — see
 * src/lib/web3forms.js.
 */
export function trackEvent(name, params = {}) {
  if (!gtagReady()) return
  window.gtag('event', name, params)
}

/**
 * A lead was captured. `formName` distinguishes the sources in GA4 so the
 * three entry points can be compared rather than lumped into one total.
 */
export function trackLead(formName) {
  trackEvent('generate_lead', { form_name: formName })
}
