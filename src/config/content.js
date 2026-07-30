// ---------------------------------------------------------------------------
// Site copy. Kept out of components so it can be reused across routes
// (e.g. the services list also feeds /services) and edited without touching JSX.
// ---------------------------------------------------------------------------

export const trustPoints = [
  'Independent & Objective',
  'Confidential by Default',
  'Tailored to Your Business',
  'Practical, Not Theoretical',
]

export const services = [
  {
    title: 'Enterprise Risk Management',
    body: 'A structured view of the risks across your organisation, and a clear framework to manage them.',
  },
  {
    title: 'Operational Risk Advisory',
    body: 'Strengthening processes, supply chains and day-to-day resilience.',
  },
  {
    title: 'Compliance & Regulatory Advisory',
    body: 'Helping you understand and meet your regulatory obligations with confidence.',
  },
  {
    title: 'Business Continuity & Crisis Planning',
    body: 'Preparing your business to withstand and recover from disruption.',
  },
  {
    title: 'Strategic Risk Advisory',
    body: 'Bringing risk insight into growth, expansion and major business decisions.',
  },
  {
    title: 'Risk Assessment & Reviews',
    body: 'Independent assessment of where your exposure lies, and what to do about it.',
  },
]

// Expanded service detail used on /services. `slug` doubles as the anchor id
// so individual services can be linked directly (e.g. /services#continuity).
export const serviceDetails = [
  {
    num: '01',
    slug: 'enterprise-risk-management',
    name: 'Enterprise Risk Management (ERM)',
    intro:
      'A structured, organisation-wide view of the risks that matter, and a framework to manage them consistently rather than reactively.',
    includes: [
      'Risk identification across functions and processes',
      'A prioritised risk register your team can actually maintain',
      'Clear ownership, thresholds and escalation paths',
      'Reporting that gives leadership a real picture',
    ],
  },
  {
    num: '02',
    slug: 'operational-risk',
    name: 'Operational Risk Advisory',
    intro:
      'Strengthening the day-to-day: the processes, dependencies and supply chains your business runs on.',
    includes: [
      'Process and control reviews',
      'Supply chain and third-party dependency assessment',
      'Identification of single points of failure',
      'Practical improvements suited to your scale',
    ],
  },
  {
    num: '03',
    slug: 'compliance-regulatory',
    name: 'Compliance & Regulatory Advisory',
    intro:
      'Helping you understand your obligations and meet them with confidence, without unnecessary complexity.',
    includes: [
      'Mapping applicable obligations to your operations',
      'Gap assessment against current practice',
      'Practical remediation planning',
      'Support in building sustainable compliance routines',
    ],
    note: 'We provide advisory support; we are not a substitute for legal counsel.',
  },
  {
    num: '04',
    slug: 'continuity-crisis',
    name: 'Business Continuity & Crisis Planning',
    intro:
      'Preparing your business to withstand disruption — and to recover quickly when something does go wrong.',
    includes: [
      'Business impact analysis',
      'Continuity and recovery planning',
      'Crisis response roles and communication protocols',
      'Testing and review of plans',
    ],
  },
  {
    num: '05',
    slug: 'strategic-risk',
    name: 'Strategic Risk Advisory',
    intro:
      'Bringing risk insight into the decisions that shape your business — expansion, new markets, major investments and change.',
    includes: [
      'Risk review of growth and expansion plans',
      'Scenario and sensitivity thinking',
      'Independent challenge to key assumptions',
      'Board and leadership-level briefing',
    ],
  },
  {
    num: '06',
    slug: 'risk-assessment-reviews',
    name: 'Risk Assessment & Reviews',
    intro:
      'An independent look at where your exposure actually lies, and what to do about it first.',
    includes: [
      'Focused assessment of a function, site or process',
      'Objective findings, clearly prioritised',
      'Practical, proportionate recommendations',
      'A clear action roadmap',
    ],
  },
]

// Engagement shapes shown on /services. Deliberately no pricing.
export const engagementModels = [
  {
    title: 'Focused Reviews',
    body: 'A defined piece of work with a clear scope and outcome, ideal when you have a specific concern or need an independent view.',
    cta: { label: 'Discuss a Review', to: '/contact' },
  },
  {
    title: 'Ongoing Advisory',
    body: 'Continuing support as your business and risk profile evolve, including periodic review and leadership reporting.',
    cta: { label: 'Discuss Ongoing Support', to: '/contact' },
  },
]

export const approachSteps = [
  {
    num: '01',
    title: 'Understand',
    body: 'We start by understanding your business, your objectives and where you feel exposed.',
  },
  {
    num: '02',
    title: 'Assess',
    body: 'We map and prioritise risks objectively, based on evidence rather than assumption.',
  },
  {
    num: '03',
    title: 'Advise',
    body: 'We recommend practical, proportionate actions you can actually implement.',
  },
  {
    num: '04',
    title: 'Support',
    body: 'We stay with you through implementation and review as your business evolves.',
  },
]

export const whyUs = [
  {
    title: 'Independent Perspective',
    body: 'We have no product to sell you. Our only interest is a clear, honest view of your risk.',
  },
  {
    title: 'Practical Advice',
    body: 'Recommendations designed for real operations and real budgets, not theory.',
  },
  {
    title: 'Confidential & Discreet',
    body: 'Sensitive information is handled with strict confidentiality.',
  },
]

export const industries = [
  'Manufacturing',
  'Financial Services',
  'Technology',
  'Healthcare',
  'Retail & Distribution',
  'Professional Services',
]

// --- /contact -------------------------------------------------------------

// Options for the "What would you like to discuss?" dropdown.
export const contactTopics = [
  'Enterprise Risk Management',
  'Operational Risk',
  'Compliance & Regulatory',
  'Business Continuity',
  'Strategic Risk',
  'General Enquiry',
]

export const confidentialityNote =
  'Anything you share with us is treated as confidential. Initial conversations are exploratory and carry no obligation.'

export const contactFaqs = [
  {
    q: 'What happens after I get in touch?',
    a: "We'll arrange a short conversation to understand your situation, then propose a scope if we can help.",
  },
  {
    q: 'Is the first conversation chargeable?',
    a: 'No. The initial discussion is no-obligation and free.',
  },
  {
    q: 'Do you work with businesses outside our sector?',
    a: "We advise across a range of sectors. If your situation falls outside our expertise, we'll say so.",
  },
]

// --- /approach ------------------------------------------------------------

export const methodSteps = [
  {
    num: '01',
    slug: 'understand',
    name: 'Understand',
    intro:
      "Before assessing anything, we take time to understand your business: what you do, how you do it, what you're planning, and where you already feel uneasy.",
    points: [
      'Conversations with the people who run the operation',
      'Review of how the business is structured and where it depends on others',
      'Clarity on your objectives, constraints and appetite for risk',
    ],
  },
  {
    num: '02',
    slug: 'assess',
    name: 'Assess',
    intro:
      'We map risks objectively — based on what is actually happening, not on assumptions or generic checklists — and prioritise what genuinely matters.',
    points: [
      'Structured identification across functions and processes',
      'Assessment of likelihood and business impact',
      'Honest prioritisation, so effort goes where it counts',
    ],
  },
  {
    num: '03',
    slug: 'advise',
    name: 'Advise',
    intro:
      'Recommendations are only useful if they can be implemented. Ours are practical, proportionate and tied to what your business can realistically do.',
    points: [
      'Clear, prioritised recommendations',
      'Options rather than a single prescriptive answer where appropriate',
      'Guidance written for decision-makers, not specialists',
    ],
  },
  {
    num: '04',
    slug: 'support',
    name: 'Support',
    intro:
      "Risk isn't a one-time exercise. As your business changes, so does your exposure — and we stay available as that happens.",
    points: [
      'Support through implementation',
      'Periodic review as the business evolves',
      'A point of contact when a decision or incident calls for one',
    ],
  },
]

export const whyItWorks = [
  {
    title: 'Built for Your Scale',
    body: 'A framework suited to a 40-person business looks nothing like one built for a multinational. We build for yours.',
  },
  {
    title: 'Written to Be Understood',
    body: 'No jargon-heavy reports that sit unread. Clear language, clear priorities.',
  },
  {
    title: 'Independent Throughout',
    body: 'No products, no commissions, no incentive to overstate a risk.',
  },
]

export const whatToExpect = [
  "An initial conversation to understand what's prompting the review — no obligation.",
  'A proposed scope, with clear deliverables and timelines agreed upfront.',
  'The work itself, with regular contact rather than silence until the end.',
  'A clear, prioritised set of findings and recommendations.',
  'Follow-up support as you act on them.',
]

export const approachFaqs = [
  {
    q: 'How long does an engagement take?',
    a: 'It depends entirely on scope. A focused review may take a few weeks; a full framework takes longer. We agree timelines before starting.',
  },
  {
    q: 'Will this disrupt our operations?',
    a: 'We work to minimise disruption. Most of what we need comes from conversations and existing documentation.',
  },
  {
    q: 'What do we receive at the end?',
    a: 'A clear set of prioritised findings and practical recommendations, written to be understood by leadership.',
  },
]

// --- /about ---------------------------------------------------------------

export const whoWeAre = [
  'AxiomRisk is an independent risk advisory and management consulting firm working with businesses across India. We help organisations understand where they are exposed, what actually matters, and what to do about it — without unnecessary complexity.',
  'Risk work often fails for one of two reasons: it stays theoretical, or it becomes a compliance exercise no one uses. We aim for the opposite — advice that is practical, proportionate, and genuinely usable by the people running the business.',
]

export const principles = [
  {
    title: 'Independence First',
    body: "We don't sell products or push solutions. Our value is an honest, objective view.",
  },
  {
    title: 'Proportionate, Not Excessive',
    body: 'Controls should fit the size and reality of your business, not a textbook.',
  },
  {
    title: 'Evidence Over Assumption',
    body: 'We assess what is actually happening, not what is supposed to happen.',
  },
  {
    title: 'Clarity Above All',
    body: "If leadership can't understand it, it won't get acted on.",
  },
]

// Firm-level capability. Deliberately describes the practice, never individuals.
export const expertise = [
  {
    title: 'Enterprise & Operational Risk',
    body: 'Structured frameworks and process-level assessment across functions.',
  },
  {
    title: 'Compliance & Governance',
    body: 'Practical support in meeting obligations and strengthening governance.',
  },
  {
    title: 'Continuity & Resilience',
    body: 'Planning for disruption, response and recovery.',
  },
  {
    title: 'Strategic & Decision Risk',
    body: 'Independent challenge on growth, investment and change decisions.',
  },
]

export const whoWeServe =
  'We work with organisations of different sizes and sectors across India — from growing companies putting their first risk framework in place, to established businesses seeking an independent review. The approach is always scaled to the organisation.'

export const aboutFaqs = [
  {
    q: 'What kind of businesses do you work with?',
    a: 'Businesses of varying size and sector across India, from growing companies to established enterprises. The scope is always tailored.',
  },
  {
    q: 'Are you independent?',
    a: "Yes. We don't sell software, insurance or products. Our only role is to give you an objective view and practical advice.",
  },
  {
    q: 'How is confidentiality handled?',
    a: 'Confidentiality is fundamental to advisory work. Sensitive information is treated with strict discretion throughout an engagement.',
  },
  {
    q: 'Do you provide legal advice?',
    a: 'No. We provide risk and management advisory support, and we work alongside your legal counsel where legal advice is needed.',
  },
]

export const faqs = [
  {
    q: 'What does a risk advisory firm actually do?',
    a: 'We help you identify what could go wrong in your business, understand how serious it is, and put practical measures in place to reduce or manage it.',
  },
  {
    q: 'Do you work with small businesses or only large companies?',
    a: 'We work with businesses of all sizes, from growing SMEs to established enterprises. The approach is scaled to your needs.',
  },
  {
    q: 'Is our information kept confidential?',
    a: 'Yes. Confidentiality is fundamental to our work, and sensitive information is handled with strict discretion.',
  },
  {
    q: 'How do engagements usually start?',
    a: 'With a conversation. We discuss your business and concerns, then propose a scope that fits.',
  },
]
