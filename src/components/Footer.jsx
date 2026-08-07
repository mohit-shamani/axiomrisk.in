import { Link } from 'react-router-dom'
import { site, navLinks, legalLinks, primaryCta } from '../config/site'
import Logo from './Logo'
import Button from './Button'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* CTA band */}
      <div className="footer__cta">
        <div className="container container--wide footer__cta-inner">
          <div>
            <p className="eyebrow">Let's talk</p>
            <h2 className="footer__cta-title">Ready to see your risk clearly?</h2>
          </div>
          <Button to={primaryCta.to} variant="accent" size="lg">
            {primaryCta.label}
          </Button>
        </div>
      </div>

      {/* Main footer */}
      <div className="container container--wide footer__main">
        <div className="footer__brand">
          <Link to="/" aria-label="AxiomRisk home">
            <Logo tone="light" />
          </Link>
          <p className="footer__tagline">{site.tagline}</p>
          <p className="footer__blurb">
            Risk advisory &amp; management consulting for businesses across India.
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3 className="footer__heading">Company</h3>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="footer__link">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="footer__col">
          <h3 className="footer__heading">Contact</h3>
          <a className="footer__link" href={`mailto:${site.email}`}>{site.email}</a>
          <span className="footer__link footer__link--static">{site.location}</span>
          <a
            className="footer__link"
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container container--wide footer__bar-inner">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <nav className="footer__legal" aria-label="Legal">
            {legalLinks.map((l) => (
              <Link key={l.to} to={l.to} className="footer__link">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
