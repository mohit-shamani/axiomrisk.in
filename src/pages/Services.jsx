import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import ServiceDetailBlocks from '../sections/ServiceDetailBlocks'
import EngagementModels from '../sections/EngagementModels'
import RelatedReading from '../sections/RelatedReading'
import RiskCheckPromo from '../sections/RiskCheckPromo'
import FinalCta from '../sections/FinalCta'
import { seo } from '../config/seo'

export default function Services() {
  return (
    <>
      <Seo {...seo.services} />

      <PageIntro
        eyebrow="OUR SERVICES"
        title="Risk Advisory, End to End"
        lead="Whether you need a full risk framework or a focused review of one area, our work is practical, independent and built around your business."
      />

      <ServiceDetailBlocks />
      <EngagementModels />

      <RiskCheckPromo variant="default" />

      <RelatedReading categories={['Enterprise Risk', 'Compliance', 'Continuity']} />

      <FinalCta
        title="Not Sure Where to Start?"
        sub="Most engagements begin with a short, no-obligation conversation about what's on your mind."
        ctaLabel="Book a Consultation"
        ctaTo="/contact"
      />
    </>
  )
}
