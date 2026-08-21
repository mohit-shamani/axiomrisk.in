import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../config/site'
import { isValidEmail, normaliseEmail } from '../lib/validation'
import { submitToWeb3Forms, failureMessage } from '../lib/web3forms'
import { trackLead } from '../lib/analytics'

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
  successNote = 'Check your email for a copy.',
  // GA4 form_name for the generate_lead event. Required: this component backs
  // more than one lead source, and a shared name would merge them in reporting.
  formName,
  idPrefix = 'capture',
  children,
}) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [botcheck, setBotcheck] = useState('')
  const [error, setError] = useState('') // validation only
  const [failure, setFailure] = useState(null) // submission only
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const [submittedEmail, setSubmittedEmail] = useState('')
  const successRef = useRef(null)

  // Bring the confirmation into view once it replaces the form. Without this
  // the success block can render off-screen — on the health check it sits far
  // down the page — and someone who cannot see it submits a second time.
  useEffect(() => {
    if (status !== 'success' || !successRef.current) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    successRef.current.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'center',
    })
  }, [status])

  async function handleSubmit(event) {
    event.preventDefault()

    // Guard the handler itself, not just the button. A disabled button still
    // leaves Enter-in-a-text-input as a way to fire submit twice.
    if (status === 'submitting' || status === 'success') return

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
      setSubmittedEmail(cleaned)
      setStatus('success')
      if (formName) trackLead(formName)
    } else {
      setStatus('idle')
      setFailure(result.kind)
    }
  }

  if (status === 'success') {
    return (
      <div className="capture__success" role="status" ref={successRef} tabIndex={-1}>
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
          <p className="capture__success-note">
            {successNote}{' '}
            Sent to <strong>{submittedEmail}</strong> — check your spam folder if
            it does not arrive, and there is no need to submit the form again.
          </p>
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
