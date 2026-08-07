import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import LegalDocument from '../sections/LegalDocument'
import { seo } from '../config/seo'
import { termsSections } from '../config/legal'

export default function Terms() {
  return (
    <>
      <Seo {...seo.terms} />
      <PageIntro
        eyebrow="LEGAL"
        title="Terms of Use"
        lead="The terms that apply when you use this website, and the limits of what the content here is."
      />
      <LegalDocument
        sections={termsSections}
        intro="These cover the website itself. If we work together, the engagement letter governs that work and takes precedence over anything here."
      />
    </>
  )
}
