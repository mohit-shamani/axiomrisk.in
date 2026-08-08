import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { navLinks, primaryCta } from '../config/site'
import Logo from './Logo'
import Button from './Button'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()
  const burgerRef = useRef(null)
  const closeRef = useRef(null)

  // Elevate header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Lock background scroll while open, and close on Escape
  useEffect(() => {
    if (!open) return

    const { overflow, paddingRight } = document.body.style
    // Compensate for the scrollbar so locking doesn't shift the layout
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)

    // Move focus into the dialog
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function close() {
    setOpen(false)
    // Return focus to the control that opened the menu
    burgerRef.current?.focus()
  }

  const panelMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header__inner container container--wide">
          <Link to="/" className="header__brand" aria-label="AxiomRisk home">
            <Logo />
          </Link>

          <nav className="header__nav" aria-label="Primary">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `header__link${isActive ? ' is-active' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <Button to={primaryCta.to} variant="accent" className="header__cta">
              {primaryCta.label}
            </Button>
            <button
              ref={burgerRef}
              type="button"
              className="header__burger"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/*
        Rendered OUTSIDE <header> on purpose. The header uses backdrop-filter,
        which makes it a containing block for position:fixed descendants — a
        fixed overlay nested inside it would be sized against the 76px header
        rather than the viewport and get clipped to nothing.
      */}
      <AnimatePresence>
        {open && (
          <div className="mobile-menu-root" id="mobile-menu">
            <motion.div
              className="mobile-menu__backdrop"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.15 : 0.25 }}
              aria-hidden="true"
            />

            <motion.div
              className="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              {...panelMotion}
            >
              <div className="mobile-menu__top">
                <Logo />
                <button
                  ref={closeRef}
                  type="button"
                  className="mobile-menu__close"
                  aria-label="Close menu"
                  onClick={close}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                    <path
                      d="M5 5 L17 17 M17 5 L5 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <nav className="mobile-menu__nav" aria-label="Mobile">
                {navLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `mobile-menu__link${isActive ? ' is-active' : ''}`}
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>

              <Button
                to={primaryCta.to}
                variant="accent"
                size="lg"
                className="mobile-menu__cta"
                onClick={() => setOpen(false)}
              >
                {primaryCta.label}
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
