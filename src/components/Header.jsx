import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks, primaryCta } from '../config/site'
import Logo from './Logo'
import Button from './Button'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Elevate header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
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
            className={`header__burger${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `mobile-menu__link${isActive ? ' is-active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
          <Button to={primaryCta.to} variant="accent" size="lg" className="mobile-menu__cta">
            {primaryCta.label}
          </Button>
        </nav>
      </div>
    </header>
  )
}
