import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import Section from '../components/Section'
import { seo } from '../config/seo'

export default function Insights() {
  return (
    <>
      <Seo {...seo.insights} />
      <PageIntro
        eyebrow="Insights"
        title="Perspectives on risk, governance and resilience"
        lead="Frameworks and research from the AxiomRisk team, written for people who make decisions."
      />
      <Section>
        <div className="stub">
          <span className="stub__note">Placeholder route</span>
          <p>The article index and post template will be built out here after design sign-off.</p>
        </div>
      </Section>
    </>
  )
}
