import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import MethodBlocks from '../sections/MethodBlocks'
import WhyItWorks from '../sections/WhyItWorks'
import WhatToExpect from '../sections/WhatToExpect'
import Faq from '../sections/Faq'
import RelatedReading from '../sections/RelatedReading'
import FinalCta from '../sections/FinalCta'
import { seo } from '../config/seo'
import { approachFaqs } from '../config/content'

export default function Approach() {
  return (
    <>
      <Seo {...seo.approach} />

      <PageIntro
        eyebrow="OUR APPROACH"
        title="A Clear, Practical Method"
        lead="Good risk work isn't complicated — it's structured, honest, and built around how your business actually runs."
      />

      <MethodBlocks />
      <WhyItWorks />
      <WhatToExpect />

      <Faq items={approachFaqs} />

      <RelatedReading categories={['Enterprise Risk', 'Operational', 'Strategy']} />

      <FinalCta
        title="Start With a Conversation"
        sub="No obligation — just a discussion about what's on your mind."
        ctaLabel="Book a Consultation"
        ctaTo="/contact"
      />
    </>
  )
}
