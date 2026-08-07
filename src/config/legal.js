// ---------------------------------------------------------------------------
// Privacy Policy and Terms of Use content.
//
// ⚠️  DRAFT — REQUIRES LEGAL REVIEW BEFORE PUBLICATION.
//
// This is a structured starting point written to match what the site actually
// does today (three Web3Forms-backed forms collecting name, email, company,
// phone, role, topic and message; no analytics; no cookies beyond what the
// host sets; no payment processing). It is NOT legal advice and has not been
// reviewed against the Digital Personal Data Protection Act 2023 or its
// rules as they apply to your entity.
//
// Every {{PLACEHOLDER}} below is a fact only you can supply. Search this file
// for "{{" before publishing — the pages render them visibly on purpose, so
// an unfilled value cannot ship unnoticed.
// ---------------------------------------------------------------------------

export const LEGAL_LAST_UPDATED = '{{LAST_UPDATED_DATE}}'

export const LEGAL_PLACEHOLDERS = [
  '{{LAST_UPDATED_DATE}}',
  '{{COMPANY_LEGAL_NAME}}',
  '{{REGISTERED_ADDRESS}}',
  '{{GRIEVANCE_OFFICER_NAME}}',
  '{{GRIEVANCE_OFFICER_EMAIL}}',
  '{{RETENTION_PERIOD}}',
  '{{GOVERNING_JURISDICTION}}',
]

export const privacySections = [
  {
    id: 'who-we-are',
    heading: 'Who we are',
    body: [
      'This site is operated by {{COMPANY_LEGAL_NAME}} ("AxiomRisk", "we", "us"), a risk advisory and management consulting firm. Our registered address is {{REGISTERED_ADDRESS}}.',
      'This policy explains what personal information we collect through this website, why we collect it, and what you can do about it. It covers this website only. It does not cover information you share with us during a client engagement, which is governed by the engagement letter and any confidentiality agreement between us.',
    ],
  },
  {
    id: 'what-we-collect',
    heading: 'What we collect',
    body: [
      'We collect only what you choose to send us through a form on this site. We do not require you to create an account, and we do not ask for sensitive personal data.',
    ],
    list: {
      intro: 'Depending on which form you use, that may include:',
      items: [
        'Your name',
        'Your work email address',
        'Your company or organisation',
        'Your phone number and role, where you choose to provide them',
        'The topic you select and the message you write',
        'Your answers to the Risk Health Check, and the resulting score, if you ask us to send you the detailed report',
      ],
    },
    after: [
      'The Risk Health Check itself runs entirely in your browser. If you complete it and do not submit your email, nothing is transmitted to us and we have no record that you used it.',
    ],
  },
  {
    id: 'why-we-use-it',
    heading: 'Why we use it',
    body: [
      'We use the information you submit to respond to your enquiry, to send you the specific resource you requested, and to have a follow-up conversation about whether we can help. Where you have asked for the detailed Risk Health Check report, we use your answers so that the response is specific to what you told us rather than generic.',
      'We do not sell your information. We do not share it with third parties for their own marketing. We do not add you to a general mailing list on the basis of a single enquiry.',
    ],
  },
  {
    id: 'how-it-is-handled',
    heading: 'How your information is handled',
    body: [
      'Form submissions from this site are delivered to our inbox by Web3Forms, a third-party form delivery service. Your submission passes through their systems in order to reach us. Their handling of that data is governed by their own privacy terms.',
      'Confidentiality is central to advisory work. Information you send us through this site is treated with the same discretion as information shared during an engagement, and is seen only by people who need to see it in order to respond to you.',
    ],
  },
  {
    id: 'retention',
    heading: 'How long we keep it',
    body: [
      'We keep enquiry correspondence for {{RETENTION_PERIOD}}, after which it is deleted unless it forms part of an ongoing or completed client engagement, or we are required to retain it for legal or regulatory reasons.',
      'You can ask us to delete your enquiry sooner. See "Your choices" below.',
    ],
  },
  {
    id: 'cookies',
    heading: 'Cookies and analytics',
    body: [
      'This website does not set advertising or tracking cookies, and does not run third-party analytics or advertising scripts.',
      'Our hosting provider may set strictly necessary cookies or record standard server logs, including IP addresses, for security and to keep the site running. These are not used to build a profile of you.',
      'If we add analytics in future, we will update this policy before doing so.',
    ],
  },
  {
    id: 'your-choices',
    heading: 'Your choices',
    body: [
      'You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. You can also withdraw your consent to us contacting you at any time — a single reply asking us to stop is enough, and we will not ask you to justify it.',
      'To make any of these requests, contact us using the details below. We will respond within a reasonable period.',
    ],
  },
  {
    id: 'contact',
    heading: 'Contact and grievances',
    body: [
      'For any question about this policy or about how we handle your information, contact {{GRIEVANCE_OFFICER_NAME}} at {{GRIEVANCE_OFFICER_EMAIL}}.',
      'If you are not satisfied with our response, you may escalate the matter to the relevant supervisory authority.',
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    body: [
      'We may update this policy as the site or our practices change. The date at the top of this page shows when it was last revised. Material changes will be reflected here rather than communicated individually.',
    ],
  },
]

export const termsSections = [
  {
    id: 'about-these-terms',
    heading: 'About these terms',
    body: [
      'These terms govern your use of this website, operated by {{COMPANY_LEGAL_NAME}} ("AxiomRisk", "we", "us"). By using the site you accept them. If you do not accept them, please do not use the site.',
      'These terms cover the website only. Any advisory work we carry out for you is governed by a separate engagement letter, which takes precedence over anything on this site.',
    ],
  },
  {
    id: 'informational-only',
    heading: 'The content here is general, not advice',
    body: [
      'Everything published on this site — including the Insights articles, the Risk Health Check and any downloadable template — is general information. It is not professional advice, and it does not take account of your circumstances.',
      'You should not act, or refrain from acting, on the basis of anything on this site without taking appropriate professional advice on your specific situation. Reading an article or completing the self-assessment does not create a client relationship between us.',
    ],
  },
  {
    id: 'risk-health-check',
    heading: 'About the Risk Health Check',
    body: [
      'The Risk Health Check is an indicative self-assessment, not a formal risk audit. It is designed to show where to look first, not to give a definitive view of your risk.',
      'Its scoring reflects our judgement about which practices matter. It is not a benchmark, is not derived from industry data, and does not compare you to your peers. A result should not be represented to any third party as an assessment or certification of your risk position.',
    ],
  },
  {
    id: 'not-legal-advice',
    heading: 'We do not provide legal advice',
    body: [
      'We provide risk and management advisory support. We are not a law firm and we do not provide legal advice. Where a question requires legal advice, we work alongside your legal counsel.',
    ],
  },
  {
    id: 'accuracy',
    heading: 'Accuracy and availability',
    body: [
      'We take care to keep the content on this site accurate and current, but we do not warrant that it is complete, accurate or up to date. Regulatory requirements and good practice change, and material may become out of date.',
      'We do not guarantee that the site will be available without interruption, and we may change, suspend or withdraw any part of it without notice.',
    ],
  },
  {
    id: 'external-links',
    heading: 'Links to other sites',
    body: [
      'Where we link to an external site, we do so because we consider it a useful reference. We have no control over those sites and are not responsible for their content, availability or privacy practices. A link is not an endorsement.',
    ],
  },
  {
    id: 'intellectual-property',
    heading: 'Intellectual property',
    body: [
      'The content of this site, including text, design, and any templates we make available, belongs to us or our licensors.',
      'You may read, download and share our material for your own business purposes, and use any template we provide within your own organisation. You may not republish it as your own, sell it, or present it as the work of another party. Where you quote from it, please attribute it to AxiomRisk and link to the source page.',
    ],
  },
  {
    id: 'liability',
    heading: 'Liability',
    body: [
      'To the extent permitted by law, we are not liable for any loss arising from your use of, or reliance on, this website or its content.',
      'Nothing in these terms excludes or limits liability where it would be unlawful to do so.',
    ],
  },
  {
    id: 'governing-law',
    heading: 'Governing law',
    body: [
      'These terms are governed by the laws of {{GOVERNING_JURISDICTION}}, and any dispute relating to them is subject to the exclusive jurisdiction of its courts.',
    ],
  },
  {
    id: 'contact-terms',
    heading: 'Contact',
    body: [
      'If you have a question about these terms, contact us at {{GRIEVANCE_OFFICER_EMAIL}}.',
    ],
  },
]
