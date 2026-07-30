import Seo from '../components/Seo'
import Section from '../components/Section'
import Button from '../components/Button'
import { seo } from '../config/seo'

export default function NotFound() {
  return (
    <>
      <Seo {...seo.notFound} noindex />
      <Section>
        <div className="stub" style={{ textAlign: 'center', margin: '0 auto', minHeight: '30vh' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Error 404</p>
          <h1>This page could not be found</h1>
          <p>The page you're looking for may have moved or no longer exists.</p>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <Button to="/" variant="primary">Back to home</Button>
          </div>
        </div>
      </Section>
    </>
  )
}
