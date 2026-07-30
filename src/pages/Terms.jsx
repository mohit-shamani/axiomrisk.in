import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import Section from '../components/Section'
import { seo } from '../config/seo'

export default function Terms() {
  return (
    <>
      <Seo {...seo.terms} />
      <PageIntro eyebrow="Legal" title="Terms of Use" />
      <Section container="narrow">
        <div className="stub">
          <span className="stub__note">Placeholder route</span>
          <p>The terms of use content will be added here.</p>
        </div>
      </Section>
    </>
  )
}
