import { site, CONTACT_EMAIL } from '../config/site'

/**
 * Contact details beside the form.
 * Only genuinely known facts are rendered — there is deliberately no phone
 * number or street address. Add them to `site` in config and render here once
 * they are real.
 */
export default function ContactDetails() {
  return (
    <aside className="contact-details">
      <h2 className="contact-details__title">Contact</h2>

      <dl className="contact-details__list">
        <div className="contact-details__row">
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </dd>
        </div>

        <div className="contact-details__row">
          <dt>Location</dt>
          <dd>{site.location}</dd>
        </div>

        <div className="contact-details__row">
          <dt>Response time</dt>
          <dd>{site.responseTime}</dd>
        </div>
      </dl>
    </aside>
  )
}
