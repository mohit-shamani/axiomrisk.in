import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import Section from '../components/Section'
import { seo } from '../config/seo'

export default function Privacy() {
  return (
    <>
      <Seo {...seo.privacy} />
      <PageIntro eyebrow="Legal" title="Privacy Policy" />
      <Section container="narrow">
        <div className="stub">
          <span className="stub__note">Placeholder route</span>
          <p>The privacy policy content will be added here.</p>
        </div>
      </Section>
    </>
  )
}
