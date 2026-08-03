// ---------------------------------------------------------------------------
// Risk Health Check — questions, scoring and result bands.
//
// IMPORTANT: the scoring here is a deliberate design choice, not a benchmark.
// It is not derived from industry data, survey results or peer comparison, and
// the copy must never imply otherwise. It exists to point a reader at the area
// worth looking at first — nothing more.
// ---------------------------------------------------------------------------

/** Answer options, in display order. */
export const ANSWERS = [
  { value: 'yes', label: 'Yes', score: 2 },
  { value: 'partly', label: 'Partly', score: 1 },
  { value: 'no', label: 'No', score: 0 },
  // "Not sure" scores as "No" on purpose: if leadership cannot answer, the
  // visibility itself is missing. This is explained to the user in the result.
  { value: 'unsure', label: 'Not sure', score: 0 },
]

export const ANSWER_SCORE = Object.fromEntries(ANSWERS.map((a) => [a.value, a.score]))

/** The four areas questions roll up into. */
export const AREAS = {
  visibility: 'Visibility & Ownership',
  continuity: 'Continuity & Resilience',
  compliance: 'Compliance & Governance',
  decisions: 'Decisions & Process',
}

export const QUESTIONS = [
  {
    id: 'q1',
    area: 'visibility',
    text: 'Do you have a documented list of the main risks facing your business?',
  },
  {
    id: 'q2',
    area: 'visibility',
    text: 'Is there a named person responsible for risk in your organisation?',
  },
  {
    id: 'q3',
    area: 'continuity',
    text: 'Do you have a written business continuity or disaster recovery plan?',
  },
  {
    id: 'q4',
    area: 'continuity',
    text: 'Has that plan been tested in the last 12 months?',
  },
  {
    id: 'q5',
    area: 'continuity',
    text: 'Do you know which single suppliers or systems your business cannot operate without?',
  },
  {
    id: 'q6',
    area: 'compliance',
    text: 'Are your regulatory and compliance obligations documented and reviewed regularly?',
  },
  {
    id: 'q7',
    area: 'decisions',
    text: 'Do you review risk before major decisions such as expansion or large investments?',
  },
  {
    id: 'q8',
    area: 'decisions',
    text: 'Are your key processes documented well enough for someone else to run them?',
  },
  {
    id: 'q9',
    area: 'compliance',
    text: 'Is your insurance reviewed against your actual exposure, not just renewed?',
  },
  {
    id: 'q10',
    area: 'visibility',
    text: 'Does leadership receive regular reporting on risk?',
  },
]

export const MAX_SCORE = QUESTIONS.length * 2 // 20

/**
 * Result bands. Thresholds are judgement, not measurement.
 */
export const BANDS = [
  {
    id: 'early',
    name: 'Early Stage',
    min: 0,
    max: 7,
    summary:
      'Risk is largely informal. The priority is basic visibility: knowing what your main exposures actually are.',
    steps: [
      'Write down your ten most significant risks in plain language — one line each, no framework required.',
      'Name one person accountable for each. A named individual, not a department.',
      'Identify the single suppliers, systems or people the business could not operate without for two weeks.',
    ],
  },
  {
    id: 'developing',
    name: 'Developing',
    min: 8,
    max: 14,
    summary:
      'Foundations exist but are applied inconsistently. The priority is structure and ownership.',
    steps: [
      'Consolidate what exists into a single register with a common way of rating likelihood and impact.',
      'Set escalation thresholds in advance, so escalation is not a judgement call made under pressure.',
      'Put risk on the leadership agenda at a fixed interval rather than only after an incident.',
    ],
  },
  {
    id: 'established',
    name: 'Established',
    min: 15,
    max: 20,
    summary:
      'Good practices are in place. The priority is testing, review and keeping pace with change.',
    steps: [
      'Test a continuity plan against a realistic scenario rather than reviewing it on paper.',
      'Re-examine risks that have not changed rating in a year — static ratings often mean stale assessment.',
      'Check that your risk profile has been revisited after growth, new markets or new dependencies.',
    ],
  },
]

export function getBand(score) {
  return BANDS.find((b) => score >= b.min && score <= b.max) || BANDS[0]
}

/** Per-area totals, so the result can point at the weakest area honestly. */
export function scoreByArea(answers) {
  const totals = {}
  for (const q of QUESTIONS) {
    const key = q.area
    if (!totals[key]) totals[key] = { key, name: AREAS[key], score: 0, max: 0 }
    totals[key].score += ANSWER_SCORE[answers[q.id]] ?? 0
    totals[key].max += 2
  }
  return Object.values(totals).map((a) => ({ ...a, pct: a.max ? a.score / a.max : 0 }))
}

export function totalScore(answers) {
  return QUESTIONS.reduce((sum, q) => sum + (ANSWER_SCORE[answers[q.id]] ?? 0), 0)
}

export const DISCLAIMER =
  "This is an indicative self-assessment, not a formal risk audit. It's designed to show where to look first, not to give a definitive view of your risk."
