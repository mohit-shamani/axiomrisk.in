import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../config/site'
import { isValidEmail, normaliseEmail } from '../lib/validation'
import { submitToWeb3Forms, failureMessage } from '../lib/web3forms'

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
  const [error, setError] = useState('') // validation only
  const [failure, setFailure] = useState(null) // submission only
  const [status, setStatus] = useState('idle') // idle | submitting | success

  async function handleSubmit(event) {
    event.preventDefault()
    setFailure(null)

    const cleaned = normaliseEmail(email)

    // --- validation errors: shown inline against the field ---------------
    if (!cleaned) {
      setError('Please enter your work email.')
      return
    }
    if (!isValidEmail(cleaned)) {
      setError('Please enter a valid email address, for example name@company.com.')
      return
    }
    setError('')

    // --- submission: failures are reported separately from validation ----
    setStatus('submitting')
    const result = await submitToWeb3Forms({
      subject,
      from_name: 'AxiomRisk website',
      'Work Email': cleaned,
      Company: company.trim() || '—',
      ...extraFields,
      botcheck,
    })

    if (result.ok) {
      setStatus('success')
    } else {
      setStatus('idle')
      setFailure(result.kind)
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

  const failureCopy = failure ? failureMessage(failure, CONTACT_EMAIL) : null

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
            name="email"
            type="email"
            inputMode="email"
            className="input"
            value={email}
            autoComplete="email"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            aria-required="true"
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${idPrefix}-email-error` : undefined}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
              if (failure) setFailure(null)
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
              name="company"
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
        {failureCopy && (
          <p className={`form-result form-result--${failureCopy.variant}`}>
            <strong>{failureCopy.lead}</strong> {failureCopy.detail}
            {failureCopy.email && (
              <>
                {' '}
                <a href={`mailto:${failureCopy.email}`}>{failureCopy.email}</a>.
              </>
            )}
          </p>
        )}
      </div>
    </form>
  )
}
