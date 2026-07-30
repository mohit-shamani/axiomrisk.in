import { motion, useReducedMotion } from 'framer-motion'

/**
 * Subtle scroll-reveal wrapper. Fades + lifts content into view once.
 * Content is always present in the DOM (only transformed), so prerendered
 * HTML remains crawlable. Honours prefers-reduced-motion.
 *
 * `as`: element/component to render (default 'div')
 * `delay`: stagger in seconds
 * `y`: initial vertical offset in px
 */
export default function Reveal({ as = 'div', delay = 0, y = 18, once = true, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
