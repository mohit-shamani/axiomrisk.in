/**
 * Email validation test suite.
 *
 * Run: node scripts/test-email-validation.mjs
 * Exits non-zero if any case fails, so it can gate a build if wanted.
 */

import { isValidEmail, normaliseEmail } from '../src/lib/validation.js'

const MUST_PASS = [
  // The four required by the brief
  'test@example.com',
  'first.last@company.co.in',
  'name+tag@domain.com',
  'hello@axiomrisk.com',
  // Other shapes that must not be rejected
  'a@b.co',
  'user@sub.domain.co.uk',
  'first.middle.last@example.info',
  'user_name@example-company.com',
  'user-name@example.technology',
  "o'brien@example.com",
  'UPPER.CASE@Example.COM',
  'finance+invoices@axiomrisk.co',
  'r&d@example.com',
  '123@example.com',
  'x@example.museum',
  // Whitespace / paste artefacts should be tolerated, not rejected
  '  padded@example.com  ',
  '\tname@example.com\n',
]

const MUST_FAIL = [
  '',
  '   ',
  'notanemail',
  'missing@domain',        // no dot in domain — likely a typo
  '@example.com',
  'user@',
  'user@@example.com',
  'user name@example.com', // space inside
  'user@exam ple.com',
  'user@.com',
  'a'.repeat(250) + '@example.com', // over 254 chars
]

let failed = 0

console.log('MUST PASS')
for (const value of MUST_PASS) {
  const ok = isValidEmail(value)
  if (!ok) failed++
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${JSON.stringify(value)}`)
}

console.log('\nMUST FAIL (correctly rejected)')
for (const value of MUST_FAIL) {
  const rejected = !isValidEmail(value)
  if (!rejected) failed++
  const shown = value.length > 40 ? value.slice(0, 37) + '…' : value
  console.log(`  ${rejected ? 'PASS' : 'FAIL'}  ${JSON.stringify(shown)}`)
}

console.log('\nnormaliseEmail trims and strips invisible characters')
const messy = ' ​name@example.com  '
console.log(`  ${normaliseEmail(messy) === 'name@example.com' ? 'PASS' : 'FAIL'}  ${JSON.stringify(messy)} -> ${JSON.stringify(normaliseEmail(messy))}`)
if (normaliseEmail(messy) !== 'name@example.com') failed++

console.log(
  `\n${failed === 0 ? 'ALL TESTS PASSED' : `${failed} TEST(S) FAILED`} ` +
    `(${MUST_PASS.length + MUST_FAIL.length + 1} cases)`
)
process.exit(failed === 0 ? 0 : 1)
