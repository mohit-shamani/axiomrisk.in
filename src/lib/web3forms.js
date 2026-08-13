// ---------------------------------------------------------------------------
// Single place that talks to Web3Forms.
//
// Both the contact form and the email-capture forms use this, so submission
// behaviour and error handling can't drift apart between them.
//
// NOTE: Vite inlines import.meta.env at BUILD time. A bundle built without
// VITE_WEB3FORMS_ACCESS_KEY set can never submit, no matter what the runtime
// environment looks like — the key must be present when `npm run build` runs.
// ---------------------------------------------------------------------------

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const RAW_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

/**
 * True only when a real key is present. Also rejects the literal placeholder
 * from .env.example, which is otherwise an easy thing to copy and forget.
 */
export function isFormConfigured() {
  const key = typeof RAW_KEY === 'string' ? RAW_KEY.trim() : ''
  return key.length > 0 && !key.startsWith('your-')
}

/**
 * Post a submission.
 *
 * Returns a discriminated result so callers can tell the failure modes apart:
 *   { ok: true }
 *   { ok: false, kind: 'config'  }  — key missing/placeholder at build time
 *   { ok: false, kind: 'network' }  — request never reached the API
 *   { ok: false, kind: 'api', status, message } — API rejected the submission
 */
export async function submitToWeb3Forms(fields) {
  // Logged in production too. A form that fails silently in the browser is
  // undiagnosable for whoever has to support it, and the API's own message
  // ("Invalid access key", rate limiting, and so on) is the fastest route to
  // the cause. Nothing secret is written here: the key is already public in
  // the bundle, and only field NAMES are listed, never what the user typed.
  const log = (...args) => console.error('[AxiomRisk form]', ...args)

  if (!isFormConfigured()) {
    log(
      'not submitted — VITE_WEB3FORMS_ACCESS_KEY is missing or still the placeholder.\n' +
        '  Local:  cp .env.example .env, add the key, restart the dev server\n' +
        '  Vercel: add it to the project env vars, then REDEPLOY — Vite inlines\n' +
        '          env vars at build time, so setting it alone changes nothing.'
    )
    return { ok: false, kind: 'config' }
  }

  const payload = { access_key: RAW_KEY.trim(), ...fields }

  let res
  try {
    res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    log('request never reached the API.', {
      subject: fields.subject,
      error: err?.message,
      hint: 'Offline, DNS failure, or a blocked request (ad blocker / corporate proxy).',
    })
    return { ok: false, kind: 'network', message: err?.message }
  }

  // Read as text first, then decide. Calling .json() on an HTML error page is
  // what produces "Unexpected token '<'", which hides the real status.
  const contentType = res.headers.get('content-type') || ''
  const raw = await res.text()

  let data = null
  if (contentType.includes('application/json')) {
    try {
      data = JSON.parse(raw)
    } catch (err) {
      log(`HTTP ${res.status} claimed JSON but did not parse.`, {
        parseError: err?.message,
        bodyStart: raw.slice(0, 200),
      })
      return { ok: false, kind: 'api', status: res.status, message: 'Malformed response' }
    }
  } else {
    log(`HTTP ${res.status} returned ${contentType || 'no content-type'}, not JSON.`, {
      subject: fields.subject,
      bodyStart: raw.slice(0, 200),
      hint: 'An HTML body here usually means the request was intercepted before the API.',
    })
    return { ok: false, kind: 'api', status: res.status, message: 'Unexpected response type' }
  }

  if (res.ok && data.success) return { ok: true }

  log(`the API rejected the submission (HTTP ${res.status}).`, {
    apiMessage: data?.message ?? '(none given)',
    subject: fields.subject,
    fieldsSent: Object.keys(fields),
  })
  return { ok: false, kind: 'api', status: res.status, message: data?.message }
}

/**
 * User-facing copy for each failure mode.
 *
 * A missing key is a build/config problem, not something a visitor can act on
 * — so in production it stays behind the same graceful message as an API
 * error. In development it says so plainly and on screen, because otherwise
 * "no key" is indistinguishable from "the form is broken".
 */
export function failureMessage(kind, contactEmail) {
  if (kind === 'config' && import.meta.env.DEV) {
    return {
      variant: 'config',
      lead: 'Form not configured — this notice only appears in development.',
      detail:
        'Your email was accepted; the submission was not sent because ' +
        'VITE_WEB3FORMS_ACCESS_KEY is missing. Add it to .env and restart the dev server.',
      email: null,
    }
  }

  if (kind === 'network') {
    return {
      variant: 'error',
      lead: "We couldn't reach our server.",
      detail: 'Please check your connection and try again, or email us directly at',
      email: contactEmail,
    }
  }

  return {
    variant: 'error',
    lead: 'Something went wrong.',
    detail: 'Please email us directly at',
    email: contactEmail,
  }
}
