// ---------------------------------------------------------------------------
// Shared form validation.
//
// The email pattern is the one from the WHATWG HTML living standard for
// <input type="email"> — i.e. exactly what the browser itself uses. Matching
// the browser is deliberate: it means our inline errors never disagree with
// native validation, and we inherit a rule set that already permits plus
// signs, dots, subdomains, long TLDs and the other characters people
// legitimately have in work addresses.
//
// The single addition is a required dot in the domain. The HTML spec allows
// bare hosts like "someone@localhost"; for a public contact form that is
// almost always a typo.
// ---------------------------------------------------------------------------

export const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

/** Trim and strip zero-width/non-breaking characters that survive copy-paste. */
export function normaliseEmail(value) {
  return String(value ?? '')
    .replace(/[​-‍﻿ ]/g, '')
    .trim()
}

export function isValidEmail(value) {
  const email = normaliseEmail(value)
  if (!email) return false
  if (email.length > 254) return false // RFC 5321 practical maximum
  if (!EMAIL_PATTERN.test(email)) return false

  const domain = email.slice(email.lastIndexOf('@') + 1)
  return domain.includes('.')
}
