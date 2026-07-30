import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import TrustStrip from '../sections/TrustStrip'
import ServicesSection from '../sections/ServicesSection'
import ApproachSection from '../sections/ApproachSection'
import WhyUs from '../sections/WhyUs'
import Industries from '../sections/Industries'
import Faq from '../sections/Faq'
import FinalCta from '../sections/FinalCta'
import { seo } from '../config/seo'

export default function Home() {
  return (
    <>
      <Seo {...seo.home} />
      <Hero />
      <TrustStrip />
      <ServicesSection />
      <ApproachSection />
      <WhyUs />
      <Industries />
      <Faq />
      <FinalCta />
    </>
  )
}
