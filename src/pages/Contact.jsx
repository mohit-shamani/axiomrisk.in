import Seo from '../components/Seo'
import PageIntro from '../components/PageIntro'
import Section from '../components/Section'
import Reveal from '../components/Reveal'
import ContactForm from '../sections/ContactForm'
import ContactDetails from '../sections/ContactDetails'
import ConfidentialityNote from '../sections/ConfidentialityNote'
import Faq from '../sections/Faq'
import { seo } from '../config/seo'
import { contactFaqs } from '../config/content'

export default function Contact() {
  return (
    <>
      <Seo {...seo.contact} />

      <PageIntro
        eyebrow="GET IN TOUCH"
        title="Let's Talk About Your Risk"
        lead="Most engagements begin with a short, no-obligation conversation. Tell us what's on your mind and we'll come back to you."
      />

      <Section>
        <div className="contact-layout">
          <Reveal className="contact-layout__form">
            <ContactForm />
          </Reveal>
          <Reveal className="contact-layout__aside" delay={0.1}>
            <ContactDetails />
          </Reveal>
        </div>
      </Section>

      <ConfidentialityNote />

      <Faq items={contactFaqs} />
    </>
  )
}
