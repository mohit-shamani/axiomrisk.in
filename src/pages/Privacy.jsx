import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import LegalDocument from '../sections/LegalDocument'
import { seo } from '../config/seo'
import { privacySections } from '../config/legal'

export default function Privacy() {
  return (
    <>
      <Seo {...seo.privacy} />
      <PageIntro
        eyebrow="LEGAL"
        title="Privacy Policy"
        lead="What we collect through this website, why, and what you can ask us to do about it."
      />
      <LegalDocument
        sections={privacySections}
        intro="We keep this short and specific. If anything here is unclear, ask us — a policy nobody can follow is not much of a safeguard."
      />
    </>
  )
}
