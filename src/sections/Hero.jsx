import { motion } from 'framer-motion'
import Container from '../components/Container'
import Button from '../components/Button'
import { heroVisual } from '../config/site'
import { getHeroVisual } from './visuals'

const HeroVisual = getHeroVisual(heroVisual)

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.05 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="hero">
      <Container size="wide" className="hero__inner">
        <div className="hero__copy">
          <motion.p className="eyebrow" variants={fadeUp} initial="hidden" animate="show" custom={0}>
            RISK ADVISORY &amp; MANAGEMENT CONSULTING
          </motion.p>

          <motion.h1 className="hero__title" variants={fadeUp} initial="hidden" animate="show" custom={1}>
            Clarity in Complexity
          </motion.h1>

          <motion.p className="hero__lead lead" variants={fadeUp} initial="hidden" animate="show" custom={2}>
            We help businesses across India identify, understand and manage risk — so you
            can make confident decisions and grow with resilience.
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp} initial="hidden" animate="show" custom={3}>
            <Button to="/contact" variant="accent" size="lg">
              Book a Consultation
            </Button>
            <Button to="/services" variant="outline" size="lg">
              Our Services
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="hero__media"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  )
}
