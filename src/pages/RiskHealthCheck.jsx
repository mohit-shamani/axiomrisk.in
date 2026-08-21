import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Section from '../components/Section'
import Button from '../components/Button'
import EmailCaptureForm from '../components/EmailCaptureForm'
import { seo } from '../config/seo'
import {
  ANSWERS,
  QUESTIONS,
  MAX_SCORE,
  DISCLAIMER,
  getBand,
  totalScore,
  scoreByArea,
} from '../config/assessment'
import { trackLead } from '../lib/analytics'

export default function RiskHealthCheck() {
  const reduce = useReducedMotion()
  const [stage, setStage] = useState('intro') // intro | quiz | result
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  const question = QUESTIONS[step]
  const answered = Object.keys(answers).length
  const progress = Math.round((answered / QUESTIONS.length) * 100)

  function choose(value) {
    const next = { ...answers, [question.id]: value }
    setAnswers(next)
    if (step < QUESTIONS.length - 1) setStep(step + 1)
    else setStage('result')
  }

  function restart() {
    setAnswers({})
    setStep(0)
    setStage('intro')
  }

  // Assessment completed and results shown. Keyed on `stage` rather than fired
  // inside choose() so it cannot double-count, and so retaking the check
  // (which returns to 'intro' first) is counted once per completion.
  useEffect(() => {
    if (stage === 'result') trackLead('risk_health_check')
  }, [stage])

  const score = totalScore(answers)
  const band = getBand(score)
  const areas = scoreByArea(answers)
  const weakest = [...areas].sort((a, b) => a.pct - b.pct)[0]

  // Every answer is sent with the email capture so follow-up can be specific.
  const submissionFields = {
    'Assessment Score': `${score} / ${MAX_SCORE}`,
    'Result Band': band.name,
    'Weakest Area': weakest ? `${weakest.name} (${weakest.score}/${weakest.max})` : '—',
    ...Object.fromEntries(
      QUESTIONS.map((q, i) => [
        `Q${i + 1}. ${q.text}`,
        ANSWERS.find((a) => a.value === answers[q.id])?.label ?? 'Not answered',
      ])
    ),
  }

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -14 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <>
      <Seo {...seo.riskHealthCheck} />

      <Section>
        <Container size="narrow">
          <AnimatePresence mode="wait">
            {/* ---------------------------------------------------- INTRO */}
            {stage === 'intro' && (
              <motion.div key="intro" {...fade} className="check-intro">
                <p className="eyebrow">FREE SELF-ASSESSMENT</p>
                <h1 className="check-intro__title">How Exposed Is Your Business?</h1>
                <p className="check-intro__lead lead">
                  A short, free self-assessment across key areas of business risk. Takes
                  about two minutes — no jargon, no obligation.
                </p>
                <Button variant="accent" size="lg" onClick={() => setStage('quiz')}>
                  Start the Check
                </Button>
                <p className="check-intro__meta">
                  {QUESTIONS.length} questions · Results shown instantly · No email required
                </p>
              </motion.div>
            )}

            {/* ----------------------------------------------------- QUIZ */}
            {stage === 'quiz' && (
              <motion.div key="quiz" {...fade} className="check-quiz">
                <div className="check-progress">
                  <div className="check-progress__meta">
                    <span>Question {step + 1} of {QUESTIONS.length}</span>
                    <span>{progress}%</span>
                  </div>
                  <div
                    className="check-progress__track"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Assessment progress"
                  >
                    <motion.div
                      className="check-progress__bar"
                      animate={{ width: `${((step) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.fieldset key={question.id} {...fade} className="check-question">
                    <legend className="check-question__text">{question.text}</legend>
                    <div className="check-options">
                      {ANSWERS.map((a) => (
                        <button
                          key={a.value}
                          type="button"
                          className={`check-option${
                            answers[question.id] === a.value ? ' is-selected' : ''
                          }`}
                          onClick={() => choose(a.value)}
                        >
                          <span className="check-option__dot" aria-hidden="true" />
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </motion.fieldset>
                </AnimatePresence>

                {step > 0 && (
                  <button type="button" className="check-back" onClick={() => setStep(step - 1)}>
                    ← Back
                  </button>
                )}
              </motion.div>
            )}

            {/* --------------------------------------------------- RESULT */}
            {stage === 'result' && (
              <motion.div key="result" {...fade} className="check-result">
                <p className="eyebrow">YOUR RESULT</p>

                <div className="check-score">
                  <div className="check-score__band">{band.name}</div>
                  <div className="check-score__value">
                    <strong>{score}</strong>
                    <span>/ {MAX_SCORE}</span>
                  </div>
                </div>

                <p className="check-result__summary">{band.summary}</p>

                {/* Area breakdown — derived only from the user's own answers */}
                <div className="check-areas">
                  <h2 className="check-areas__title">By area</h2>
                  {areas.map((a) => (
                    <div className="check-area" key={a.key}>
                      <div className="check-area__head">
                        <span>{a.name}</span>
                        <span className="check-area__score">{a.score}/{a.max}</span>
                      </div>
                      <div className="check-area__track">
                        <motion.div
                          className="check-area__bar"
                          initial={reduce ? false : { width: 0 }}
                          animate={{ width: `${a.pct * 100}%` }}
                          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="check-steps">
                  <h2 className="check-steps__title">Three practical next steps</h2>
                  <ol className="check-steps__list">
                    {band.steps.map((s, i) => (
                      <li key={i}>
                        <span className="check-steps__num">{i + 1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="check-disclaimer">
                  <strong>Please note:</strong> {DISCLAIMER}
                </p>
                <p className="check-note">
                  "Not sure" answers are scored the same as "No" — if the answer isn't
                  readily known, the visibility itself is usually what's missing.
                </p>

                {/* Email-gated detailed report */}
                <div className="check-capture">
                  <h2 className="check-capture__title">Want the detailed breakdown?</h2>
                  <p className="check-capture__text">
                    Enter your email and we'll send a fuller report covering each area,
                    what good practice looks like, and where to start.
                  </p>
                  <EmailCaptureForm
                    idPrefix="rhc"
                    formName="risk_health_check_report"
                    subject={`Risk Health Check — ${band.name} (${score}/${MAX_SCORE})`}
                    extraFields={submissionFields}
                    submitLabel="Send me the report"
                    successMessage="Thank you — your report is on its way."
                  />
                </div>

                <div className="check-actions">
                  <Button variant="outline" onClick={restart}>Retake the check</Button>
                  <Button to="/contact" variant="primary">Book a Consultation</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>
    </>
  )
}
