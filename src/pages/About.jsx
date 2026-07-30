import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import WhoWeAre from '../sections/WhoWeAre'
import Principles from '../sections/Principles'
import Expertise from '../sections/Expertise'
import WhoWeServe from '../sections/WhoWeServe'
import Faq from '../sections/Faq'
import FinalCta from '../sections/FinalCta'
import { seo } from '../config/seo'
import { aboutFaqs } from '../config/content'

export default function About() {
  return (
    <>
      <Seo {...seo.about} />

      <PageIntro
        eyebrow="ABOUT US"
        title="Independent Risk Advisory, Built on Clarity"
        lead="We exist to help businesses see their risks clearly — and act on them sensibly."
      />

      <WhoWeAre />
      <Principles />
      <Expertise />
      <WhoWeServe />

      <Faq items={aboutFaqs} />

      <FinalCta
        title="Let's Talk About Your Business"
        sub="A short conversation is usually enough to see whether we can help."
        ctaLabel="Book a Consultation"
        ctaTo="/contact"
      />
    </>
  )
}
