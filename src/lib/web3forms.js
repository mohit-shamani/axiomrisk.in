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
  if (!isFormConfigured()) {
    if (import.meta.env.DEV) {
      console.error(
        '[AxiomRisk] Form not submitted: VITE_WEB3FORMS_ACCESS_KEY is missing or ' +
          'still set to the placeholder value.\n' +
          '  1. cp .env.example .env\n' +
          '  2. add your key from https://web3forms.com\n' +
          '  3. restart the dev server (or rebuild) — Vite inlines env vars at build time'
      )
    }
    return { ok: false, kind: 'config' }
  }

  let res
  try {
    res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: RAW_KEY.trim(), ...fields }),
    })
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('[AxiomRisk] Web3Forms request failed to send:', err)
    }
    return { ok: false, kind: 'network', message: err?.message }
  }

  let data = {}
  try {
    data = await res.json()
  } catch {
    // Non-JSON response — treat as an API failure and fall through.
  }

  if (res.ok && data.success) return { ok: true }

  if (import.meta.env.DEV) {
    console.error(
      `[AxiomRisk] Web3Forms rejected the submission (HTTP ${res.status}):`,
      data?.message || data
    )
  }
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
