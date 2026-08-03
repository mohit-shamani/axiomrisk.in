import { useRef, useState } from 'react'
import { CONTACT_EMAIL } from '../config/site'
import { contactTopics } from '../config/content'
import { isValidEmail, normaliseEmail } from '../lib/validation'
import { submitToWeb3Forms, failureMessage } from '../lib/web3forms'

const EMPTY = {
  name: '',
  email: '',
  company: '',
  phone: '',
  role: '',
  topic: '',
  message: '',
  botcheck: '', // honeypot — real users never fill this
}

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your full name.'
  if (!normaliseEmail(v.email)) e.email = 'Please enter your work email.'
  else if (!isValidEmail(v.email))
    e.email = 'Please enter a valid email address, for example name@company.com.'
  if (!v.company.trim()) e.company = 'Please enter your company or organisation.'
  if (!v.topic) e.topic = 'Please choose what you would like to discuss.'
  if (!v.message.trim()) e.message = 'Please tell us a little about your enquiry.'
  return e
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({}) // per-field validation
  const [failure, setFailure] = useState(null) // submission failure kind
  const [status, setStatus] = useState('idle') // idle | submitting | success
  const formRef = useRef(null)

  const update = (field) => (event) => {
    setValues((v) => ({ ...v, [field]: event.target.value }))
    // Clear a field's error as soon as the user starts correcting it
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e))
    if (failure) setFailure(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFailure(null)

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid field for keyboard and screen-reader users
      const first = formRef.current?.querySelector('[aria-invalid="true"]')
      first?.focus()
      return
    }

    setStatus('submitting')
    const result = await submitToWeb3Forms({
      subject: `New enquiry — ${values.topic} — ${values.name}`,
      from_name: 'AxiomRisk website',
      'Full Name': values.name.trim(),
      'Work Email': normaliseEmail(values.email),
      'Company / Organisation': values.company.trim(),
      Phone: values.phone.trim() || '—',
      Role: values.role.trim() || '—',
      'Discussion Topic': values.topic,
      Message: values.message.trim(),
      botcheck: values.botcheck,
    })

    if (result.ok) {
      setStatus('success')
      setValues(EMPTY)
    } else {
      setStatus('idle')
      setFailure(result.kind)
    }
  }

  if (status === 'success') {
    return (
      <div className="form-panel">
        <div className="form-result form-result--success" role="status">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            <path
              d="M8 13.4 L11.4 16.8 L18 10.2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Thank you — we've received your enquiry and will be in touch shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="form-panel">
      <form ref={formRef} className="form" onSubmit={handleSubmit} noValidate>
        {/* Honeypot: hidden from users, catches naive bots */}
        <input
          type="checkbox"
          name="botcheck"
          className="form__botcheck"
          tabIndex={-1}
          autoComplete="off"
          onChange={(e) => setValues((v) => ({ ...v, botcheck: e.target.checked ? 'on' : '' }))}
        />

        <div className="form__grid">
          <Field
            id="name"
            label="Full Name"
            required
            value={values.name}
            error={errors.name}
            onChange={update('name')}
            autoComplete="name"
          />
          <Field
            id="email"
            label="Work Email"
            type="email"
            required
            value={values.email}
            error={errors.email}
            onChange={update('email')}
            autoComplete="email"
          />
          <Field
            id="company"
            label="Company / Organisation"
            required
            value={values.company}
            error={errors.company}
            onChange={update('company')}
            autoComplete="organization"
          />
          <Field
            id="phone"
            label="Phone"
            type="tel"
            value={values.phone}
            onChange={update('phone')}
            autoComplete="tel"
          />
          <Field
            id="role"
            label="Role"
            hint="e.g. Founder, CFO, Operations, Compliance"
            value={values.role}
            onChange={update('role')}
            autoComplete="organization-title"
            className="form__full"
          />

          <div className={`field form__full${errors.topic ? ' field--invalid' : ''}`}>
            <label className="field__label" htmlFor="topic">
              What would you like to discuss?{' '}
              <span className="field__req" aria-hidden="true">*</span>
            </label>
            <select
              id="topic"
              name="topic"
              className="select"
              value={values.topic}
              onChange={update('topic')}
              aria-required="true"
              aria-invalid={errors.topic ? 'true' : undefined}
              aria-describedby={errors.topic ? 'topic-error' : undefined}
            >
              <option value="">Please select…</option>
              {contactTopics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.topic && (
              <p className="field__error" id="topic-error">{errors.topic}</p>
            )}
          </div>

          <div className={`field form__full${errors.message ? ' field--invalid' : ''}`}>
            <label className="field__label" htmlFor="message">
              Message <span className="field__req" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              className="textarea"
              rows={6}
              value={values.message}
              onChange={update('message')}
              aria-required="true"
              aria-invalid={errors.message ? 'true' : undefined}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p className="field__error" id="message-error">{errors.message}</p>
            )}
          </div>
        </div>

        <div className="form__foot">
          <button
            type="submit"
            className="btn btn--accent btn--lg"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
          </button>
          <p className="form__required-note">
            <span className="field__req" aria-hidden="true">*</span> Required fields
          </p>
        </div>

        <div role="status" aria-live="polite">
          {failure && (() => {
            const copy = failureMessage(failure, CONTACT_EMAIL)
            return (
              <p className="form-result form-result--error">
                <strong>{copy.lead}</strong> {copy.detail}{' '}
                <a href={`mailto:${copy.email}`}>{copy.email}</a>.
              </p>
            )
          })()}
        </div>
      </form>
    </div>
  )
}

/** Single-line labelled input with optional hint and error message. */
function Field({ id, label, hint, required, error, className = '', ...rest }) {
  return (
    <div className={`field${error ? ' field--invalid' : ''}${className ? ' ' + className : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}{' '}
        {required && <span className="field__req" aria-hidden="true">*</span>}
      </label>
      {hint && <span className="field__hint" id={`${id}-hint`}>{hint}</span>}
      <input
        id={id}
        name={id}
        className="input"
        aria-required={required ? 'true' : undefined}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={
          [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') ||
          undefined
        }
        {...rest}
      />
      {error && <p className="field__error" id={`${id}-error`}>{error}</p>}
    </div>
  )
}
