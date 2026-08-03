import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../config/site'

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
const ENDPOINT = 'https://api.web3forms.com/submit'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Compact email capture wired to Web3Forms.
 *
 * `extraFields` is a plain object merged into the submission — used by the
 * Risk Health Check to send the score and every individual answer, so a
 * follow-up can be specific rather than generic.
 *
 * `children` renders after a successful submission (e.g. a download link).
 */
export default function EmailCaptureForm({
  subject,
  extraFields = {},
  showCompany = true,
  submitLabel = 'Send it to me',
  successMessage = 'Thank you — your report is on its way.',
  idPrefix = 'capture',
  children,
}) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [botcheck, setBotcheck] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim()) return setError('Please enter your work email.')
    if (!EMAIL_RE.test(email.trim())) return setError('Please enter a valid email address.')
    setError('')

    if (!ACCESS_KEY) {
      if (import.meta.env.DEV) {
        console.warn(
          '[AxiomRisk] VITE_WEB3FORMS_ACCESS_KEY is not set. ' +
            'Copy .env.example to .env, add your key, then rebuild.'
        )
      }
      return setStatus('error')
    }

    setStatus('submitting')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject,
          from_name: 'AxiomRisk website',
          'Work Email': email,
          Company: company || '—',
          ...extraFields,
          botcheck,
        }),
      })
      const data = await res.json()
      setStatus(res.ok && data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="capture__success" role="status">
        <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
          <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          <path
            d="M8 13.4 L11.4 16.8 L18 10.2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <p className="capture__success-text">{successMessage}</p>
          {children}
        </div>
      </div>
    )
  }

  return (
    <form className="capture" onSubmit={handleSubmit} noValidate>
      <input
        type="checkbox"
        name="botcheck"
        className="form__botcheck"
        tabIndex={-1}
        autoComplete="off"
        onChange={(e) => setBotcheck(e.target.checked ? 'on' : '')}
      />

      <div className="capture__row">
        <div className={`field${error ? ' field--invalid' : ''}`}>
          <label className="field__label" htmlFor={`${idPrefix}-email`}>
            Work Email <span className="field__req" aria-hidden="true">*</span>
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            className="input"
            value={email}
            autoComplete="email"
            aria-required="true"
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${idPrefix}-email-error` : undefined}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
          />
          {error && (
            <p className="field__error" id={`${idPrefix}-email-error`}>{error}</p>
          )}
        </div>

        {showCompany && (
          <div className="field">
            <label className="field__label" htmlFor={`${idPrefix}-company`}>Company</label>
            <input
              id={`${idPrefix}-company`}
              type="text"
              className="input"
              value={company}
              autoComplete="organization"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        )}
      </div>

      <button type="submit" className="btn btn--accent" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </button>

      <p className="capture__note">
        We'll email you the report. We won't share your details or send you spam.{' '}
        <Link to="/privacy">Privacy</Link>.
      </p>

      <div role="status" aria-live="polite">
        {status === 'error' && (
          <p className="form-result form-result--error">
            Something went wrong. Please email us directly at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        )}
      </div>
    </form>
  )
}
