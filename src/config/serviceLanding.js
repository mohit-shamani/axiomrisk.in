// ---------------------------------------------------------------------------
// Dedicated commercial service pages (/services/<slug>).
//
// ACCURACY RULE: every capability, deliverable and claim below is traceable to
// existing site content — serviceDetails, methodSteps, whyItWorks,
// whatToExpect, principles, engagementModels and the published FAQs. Nothing
// here asserts clients, case studies, certifications, statistics,
// testimonials, awards, regulatory approval, proprietary technology or
// financial outcomes, because the site supports none of those.
//
// `references` is empty on two of the three pages on purpose. Standards are
// named in prose (factually accurate) but not linked, because iso.org blocks
// automated requests and the exact standard URLs could not be verified. Add
// verified URLs there and the reference block renders automatically.
// ---------------------------------------------------------------------------

export const serviceLandingPages = {
  // =========================================================== PAGE 1
  'business-continuity-crisis-planning': {
    slug: 'business-continuity-crisis-planning',
    hubAnchor: 'continuity-crisis',
    eyebrow: 'SERVICE',
    h1: 'Business Continuity Planning',
    seoTitle: 'Business Continuity Planning Services | AxiomRisk',
    metaDescription:
      'Business continuity planning for businesses across India — impact analysis, recovery planning, crisis roles and plan testing. Independent and practical.',
    serviceType: 'Business continuity and crisis planning',

    // Answer-first: WHAT / WHO / WHY in the first two paragraphs
    intro: [
      'Business continuity planning is the work of deciding, in advance, how your business will keep serving customers when something critical stops — and how quickly it will recover. AxiomRisk builds continuity and crisis plans for organisations across India, from growing companies with no plan at all to established businesses whose plan has never been tested.',
      'It matters because the decisions that determine how badly a disruption hurts are made before it happens, not during it. A plan written in advance turns a crisis into a sequence of prepared steps rather than a set of judgement calls made under pressure by whoever happens to be available.',
    ],

    whatItIs: {
      heading: 'What business continuity planning involves',
      body: [
        'A continuity plan is not a description of your business. It is a small set of decisions made ahead of time: who declares an incident, which activities must keep running, how they continue by other means, in what order things are restored, and who communicates with customers, staff and regulators.',
        'The discipline that surrounds it is often called business continuity management — the ongoing practice of keeping those decisions current as the business changes. ISO 22301 is the international standard describing a management-system approach to this; our work is advisory and proportionate rather than certification-driven, and we scale it to what your organisation will realistically maintain.',
        'We work from impact rather than from a list of threats. A fire, a failed supplier and a ransomware incident can produce the same operational reality — you cannot dispatch orders. Planning for that outcome covers all three causes, which is why a business impact analysis comes before any threat brainstorm.',
      ],
    },

    problems: {
      heading: 'Problems this addresses',
      intro: 'Businesses typically come to us with one or more of these:',
      items: [
        'No written continuity or disaster recovery plan exists, and nobody is sure where to start.',
        'A plan exists but has never been tested, so nobody knows whether it works.',
        'The plan was written for a structure, site or system the business no longer has.',
        'A customer, insurer or prospective client has asked for evidence of continuity arrangements.',
        'The business knows it depends on a small number of suppliers or systems, but has never mapped which ones it genuinely cannot operate without.',
        'Recovery expectations were set by IT rather than by the business, so tolerable downtime has never been agreed by the people who bear the consequences.',
      ],
    },

    approach: {
      heading: 'How we approach continuity work',
      intro:
        'We follow the same four-stage method we apply to all our advisory work, described in full on our approach page.',
      steps: [
        {
          num: '01',
          title: 'Understand',
          body: 'Conversations with the people who run the operation, a review of how the business is structured and where it depends on others, and clarity on your objectives and constraints.',
        },
        {
          num: '02',
          title: 'Assess',
          body: 'A business impact analysis identifying critical activities, how long each can be interrupted before the harm becomes serious, and what each depends on — people, systems, suppliers, premises and information.',
        },
        {
          num: '03',
          title: 'Advise',
          body: 'A continuity and recovery plan built around decisions rather than description: activation, roles and deputies, communication, workarounds and recovery sequence — written to be acted on under pressure.',
        },
        {
          num: '04',
          title: 'Support',
          body: 'Facilitated testing of the plan against a realistic scenario, and periodic review as the business changes.',
        },
      ],
    },

    deliverables: {
      heading: 'What the engagement produces',
      intro: 'Scope is agreed before we start. Depending on it, an engagement produces:',
      items: [
        'A business impact analysis identifying critical activities and tolerable interruption',
        'A dependency map covering people, systems, suppliers, premises and information',
        'A continuity and recovery plan written for use, not for filing',
        'Defined crisis response roles, deputies and communication protocols',
        'A recovery sequence setting the order in which activities are restored',
        'A facilitated test or tabletop exercise, with findings and follow-up actions',
      ],
    },

    whoFor: {
      heading: 'Who this is for',
      body: 'We work with organisations of different sizes and sectors across India. The approach is scaled to the organisation — a framework suited to a 40-person business looks nothing like one built for a multinational, and we build for yours.',
      items: [
        'Founders and managing directors who know the business has a single point of failure',
        'CFOs and operations heads answering customer or insurer due-diligence questions',
        'Compliance officers whose sector expects documented continuity arrangements',
        'Boards seeking assurance that a plan exists and has actually been tested',
      ],
    },

    riskAreas: {
      heading: 'Risk areas we cover',
      items: [
        'Single points of failure in suppliers, systems, sites and people',
        'Supply chain and third-party dependency, including your providers’ own dependencies',
        'Loss of premises or critical equipment',
        'Loss of access to systems, data or connectivity',
        'Key-person dependency on undocumented processes',
        'Crisis communication with customers, staff, suppliers and regulators',
      ],
    },

    faqs: [
      {
        q: 'What is business continuity planning?',
        a: 'It is the process of deciding in advance how a business will keep its critical activities running during a disruption, and how it will recover afterwards. The output is a plan covering who declares an incident, which activities must continue, how they continue by other means, and in what order things are restored.',
      },
      {
        q: 'How is business continuity different from disaster recovery?',
        a: 'Business continuity covers the whole organisation — people, processes, suppliers and premises — and focuses on keeping the business serving customers. Disaster recovery is narrower, dealing specifically with restoring IT systems and data. Disaster recovery is usually one component of a continuity plan.',
      },
      {
        q: 'How long does a continuity engagement take?',
        a: 'It depends entirely on scope. A focused review of one critical activity is a much shorter piece of work than a plan covering a whole organisation. We agree timelines with you before starting rather than quoting a standard duration.',
      },
      {
        q: 'Does the plan need to be tested?',
        a: 'Yes. An untested plan is a set of assumptions rather than a capability. Testing typically starts with a walkthrough or facilitated tabletop exercise, which is inexpensive and reliably surfaces gaps such as out-of-date contact details or workarounds that depend on something also unavailable.',
      },
      {
        q: 'Do smaller businesses need a continuity plan?',
        a: 'Often yes, and usually a short one. Smaller organisations tend to have more concentrated dependencies — fewer suppliers, fewer people who know how something works — so a single disruption can be proportionally more damaging. The plan should be scaled to the business, not copied from a larger one.',
      },
      {
        q: 'Will this disrupt our operations?',
        a: 'We work to minimise disruption. Most of what we need comes from conversations with the people who run the operation and from documentation that already exists.',
      },
    ],

    relatedServices: [
      { label: 'Operational Risk Advisory', to: '/services/operational-risk-advisory' },
      { label: 'Enterprise Risk Management', to: '/services/enterprise-risk-management' },
      { label: 'All risk advisory services', to: '/services' },
    ],

    relatedInsights: [
      {
        label: 'Business Continuity Planning: A Practical Guide for Growing Businesses',
        to: '/insights/business-continuity-planning-practical-guide',
        note: 'How to work from impact rather than threats, and what a testable plan contains.',
      },
      {
        label: '5 Operational Risks Growing Indian Businesses Overlook',
        to: '/insights/operational-risks-growing-indian-businesses-overlook',
        note: 'Concentration and dependency risks that continuity planning usually surfaces first.',
      },
    ],

    // Standards named in prose above; no verified URL available. See file header.
    references: [],

    cta: {
      title: 'Discuss your continuity priorities',
      sub: 'A short, no-obligation conversation is usually enough to establish where your continuity gaps are and what a proportionate plan would involve.',
      label: 'Discuss Your Risk Priorities',
    },
  },

  // =========================================================== PAGE 2
  'enterprise-risk-management': {
    slug: 'enterprise-risk-management',
    hubAnchor: 'enterprise-risk-management',
    eyebrow: 'SERVICE',
    h1: 'Enterprise Risk Management',
    seoTitle: 'Enterprise Risk Management Services (ERM) | AxiomRisk',
    metaDescription:
      'Enterprise risk management for businesses across India — an ERM framework, a prioritised risk register, clear ownership and reporting you can act on.',
    serviceType: 'Enterprise risk management advisory',

    intro: [
      'Enterprise risk management is the practice of looking at risk across the whole organisation at once, rather than function by function, and making decisions with that complete picture in view. AxiomRisk designs and implements ERM frameworks for businesses across India, sized to what the organisation will actually maintain.',
      'It matters because when risk is managed in silos, the exposures that span functions are the ones nobody owns — and those are usually the ones that cause damage. ERM gives you one view of your material risks, one basis for comparing them, and one place where ownership and escalation are defined.',
    ],

    whatItIs: {
      heading: 'What an enterprise risk management framework contains',
      body: [
        'Most businesses already manage risk. Finance watches credit and cash flow, operations worries about equipment and suppliers, IT handles systems. Each is genuine risk management. The gap ERM closes is that these efforts rarely talk to each other, so priorities get set locally rather than across the business and leadership receives fragments rather than a position.',
        'A working risk management framework does not need to be elaborate. At minimum it establishes a shared way of describing and rating risk, a register that is genuinely maintained, defined ownership and escalation thresholds, and reporting that answers what the largest exposures are, what has changed, and what needs a decision now.',
        'ISO 31000 is the international standard setting out principles and guidelines for risk management, and it informs how we think about establishing risk criteria. Our work is advisory rather than certification-driven — we build the framework around your organisation rather than to a template.',
      ],
    },

    problems: {
      heading: 'Problems this addresses',
      intro: 'ERM engagements typically begin with one of these situations:',
      items: [
        'Nobody can produce a current list of the organisation’s most significant risks.',
        'Risks are recorded in several places, rated inconsistently, and cannot be compared.',
        'A register exists but has not been updated since it was created.',
        'Risks that span two or more functions have no owner, because each team assumes another holds it.',
        'Escalation depends on judgement made under pressure, because no thresholds were agreed in advance.',
        'The board receives risk reporting it cannot act on, or receives none at all.',
        'The risk profile has not been revisited after growth, a new market, an acquisition or a new dependency.',
      ],
    },

    approach: {
      heading: 'How we approach enterprise risk management',
      intro:
        'The same four-stage method underpins every engagement. It is set out in full on our approach page.',
      steps: [
        {
          num: '01',
          title: 'Understand',
          body: 'We start with the business — what you do, how you do it, what you are planning, and where you already feel exposed — including your objectives, constraints and appetite for risk.',
        },
        {
          num: '02',
          title: 'Assess',
          body: 'Structured risk identification across functions and processes, assessment of likelihood and business impact against a scale defined in your terms, and honest prioritisation so effort goes where it counts.',
        },
        {
          num: '03',
          title: 'Advise',
          body: 'A framework you can operate: register structure, rating criteria, named ownership, escalation thresholds and reporting written for decision-makers rather than specialists.',
        },
        {
          num: '04',
          title: 'Support',
          body: 'Support through implementation, periodic review as the business evolves, and a point of contact when a decision or incident calls for one.',
        },
      ],
    },

    deliverables: {
      heading: 'What the engagement produces',
      intro: 'Scope is agreed upfront. Depending on it, an engagement produces:',
      items: [
        'Risk identification across functions and processes',
        'A prioritised risk register your team can actually maintain',
        'A common scale for likelihood and impact, defined in measures your business recognises',
        'Clear ownership, thresholds and escalation paths',
        'Reporting that gives leadership a real picture',
        'A practical action roadmap, prioritised rather than exhaustive',
      ],
    },

    whoFor: {
      heading: 'Who this is for',
      body: 'We work with businesses of all sizes, from growing SMEs putting a first framework in place to established enterprises seeking an independent view of an existing one.',
      items: [
        'Founders and managing directors who want one view of the risks that matter',
        'CFOs building risk reporting the board can use',
        'Operations and compliance leads consolidating fragmented registers',
        'Boards and audit committees seeking independent challenge on risk governance',
      ],
    },

    riskAreas: {
      heading: 'Risk areas an ERM framework covers',
      items: [
        'Operational and process risk across functions',
        'Supplier, third-party and concentration risk',
        'Compliance and regulatory obligations',
        'Continuity and resilience exposures',
        'Strategic and decision risk in growth, expansion and investment',
        'People and key-person dependency',
        'Financial and credit exposure, where relevant to your operations',
      ],
    },

    faqs: [
      {
        q: 'What is enterprise risk management?',
        a: 'Enterprise risk management, often shortened to ERM, is the practice of identifying and managing risk across an entire organisation on a consistent basis, rather than separately within each function. Its purpose is to give leadership one comparable view of material exposures, with clear ownership for each.',
      },
      {
        q: 'Does a smaller business need an ERM framework?',
        a: 'Not always. A small business with one product line and a short supply chain may be well served by simpler, less formal risk management. The question is whether you can name your most significant risks, whether someone owns each of them, and whether they are reviewed other than after something goes wrong. If not, a framework is likely to help.',
      },
      {
        q: 'How is ERM different from compliance?',
        a: 'Compliance asks whether you are meeting rules set externally. ERM asks what could go wrong and what you are doing about it, with the scope set by your business rather than by a regulator. Non-compliance is one risk among several, so compliance sits inside enterprise risk management rather than replacing it.',
      },
      {
        q: 'What does an ERM engagement actually produce?',
        a: 'A prioritised risk register with named owners, a rating scale defined in your own terms, agreed escalation thresholds, reporting suited to leadership, and a clear set of prioritised recommendations. The emphasis is on a framework the team will maintain after we leave.',
      },
      {
        q: 'Who should own risk in our organisation?',
        a: 'Every material risk should have a named individual as owner, not a department. A risk owned by a function tends to be owned by nobody, because when something falls between two teams a departmental owner gives everyone a reason to assume it sits elsewhere.',
      },
      {
        q: 'Do you provide legal advice as part of this?',
        a: 'No. We provide risk and management advisory support, and we work alongside your legal counsel where legal advice is needed.',
      },
    ],

    relatedServices: [
      { label: 'Operational Risk Advisory', to: '/services/operational-risk-advisory' },
      { label: 'Business Continuity Planning', to: '/services/business-continuity-crisis-planning' },
      { label: 'All risk advisory services', to: '/services' },
    ],

    relatedInsights: [
      {
        label: 'What Is Enterprise Risk Management — and Does Your Business Need One?',
        to: '/insights/what-is-enterprise-risk-management',
        note: 'A plain-English explanation, plus a practical test for whether you need a framework yet.',
      },
      {
        label: 'Building a Risk Register Your Team Will Actually Use',
        to: '/insights/building-a-risk-register-your-team-will-use',
        note: 'Why registers get abandoned, and the column structure that survives contact with a busy team.',
      },
      {
        label: 'Six Questions Every Board Should Ask About Risk',
        to: '/insights/six-questions-every-board-should-ask-about-risk',
        note: 'What good risk governance sounds like from the board’s side of the table.',
      },
    ],

    // Verified reachable (HTTP 200) at time of writing. These support the
    // factual claim that risk-governance expectations differ by regulator.
    references: [
      {
        label: 'Securities and Exchange Board of India (SEBI)',
        url: 'https://www.sebi.gov.in/',
        note: 'Sets governance and risk-management expectations for listed entities in India.',
      },
      {
        label: 'Reserve Bank of India (RBI)',
        url: 'https://www.rbi.org.in/',
        note: 'Publishes risk-management and governance direction for regulated financial entities.',
      },
    ],

    cta: {
      title: 'Discuss your risk priorities',
      sub: 'Most engagements begin with a short, no-obligation conversation about where you feel exposed and what a proportionate framework would involve.',
      label: 'Discuss Your Risk Priorities',
    },
  },

  // =========================================================== PAGE 3
  'operational-risk-advisory': {
    slug: 'operational-risk-advisory',
    hubAnchor: 'operational-risk',
    eyebrow: 'SERVICE',
    // H1 carries the primary keyword; the hub still lists the service under
    // its shorter name, 'Operational Risk Advisory'.
    h1: 'Operational Risk Management Advisory',
    seoTitle: 'Operational Risk Management Services | AxiomRisk',
    metaDescription:
      'Operational risk management for businesses across India — process and control reviews, third-party dependency assessment and single points of failure.',
    serviceType: 'Operational risk advisory',

    intro: [
      'Operational risk management is the work of finding and reducing the ways your day-to-day operations can fail — the processes, controls, dependencies and supply chains the business runs on. AxiomRisk carries out operational risk assessments and process reviews for organisations across India, with improvements suited to your scale.',
      'It matters because operational exposure accumulates quietly as a business grows. A process that worked comfortably at twenty people strains at eighty; a supplier who was one of three becomes the only one. Nothing announces the shift, which is why it is usually found after something breaks rather than before.',
    ],

    whatItIs: {
      heading: 'What operational risk management involves',
      body: [
        'Operational risk covers the exposures created by how the business actually runs: processes that depend on undocumented knowledge, controls designed for a smaller organisation, suppliers and systems with no alternative, and dependencies nobody is accountable for monitoring.',
        'Our work is an assessment of what is actually happening rather than what is supposed to happen. That distinction matters, because process risk usually hides in the gap between the documented procedure and the workaround people have adopted to get the job done.',
        'ISO 31000 is the international standard setting out principles for risk management generally, and it informs how we structure assessment and rating. The engagement itself is advisory and proportionate, not a certification exercise.',
      ],
    },

    problems: {
      heading: 'Problems this addresses',
      intro: 'Operational risk engagements commonly start from one of these:',
      items: [
        'Concentration has built up by accident — in a supplier, a customer, a site or a system — and nobody consciously approved the position.',
        'One person holds knowledge, relationships or access that nobody else has.',
        'Key processes live in people’s heads, so new joiners learn by observation and variation creeps in.',
        'External providers are relied upon continuously, but ownership of those relationships evaporated after onboarding.',
        'Financial and operational controls were designed for the size the business used to be — approval thresholds now wave through significant spend.',
        'Operational resilience is assumed rather than tested, and single points of failure have never been mapped.',
      ],
    },

    approach: {
      heading: 'How we approach operational risk',
      intro: 'The engagement follows our standard four-stage method, described on our approach page.',
      steps: [
        {
          num: '01',
          title: 'Understand',
          body: 'Conversations with the people who actually run the operation, and a review of how the business is structured and where it depends on others.',
        },
        {
          num: '02',
          title: 'Assess',
          body: 'Process and control reviews, supply chain and third-party dependency assessment, and identification of single points of failure — assessed on evidence rather than assumption.',
        },
        {
          num: '03',
          title: 'Advise',
          body: 'Practical improvements suited to your scale, prioritised so effort goes where it counts, with options rather than a single prescriptive answer where appropriate.',
        },
        {
          num: '04',
          title: 'Support',
          body: 'Support through implementation and periodic review as the operation changes.',
        },
      ],
    },

    deliverables: {
      heading: 'What the engagement produces',
      intro: 'Scope is agreed before work begins. Depending on it, an engagement produces:',
      items: [
        'Process and control reviews covering the activities that matter most',
        'A supply chain and third-party dependency assessment, including fourth-party exposure where relevant',
        'Identification of single points of failure across suppliers, systems, sites and people',
        'Objective findings, clearly prioritised',
        'Practical improvements suited to your scale, not to a textbook',
        'A clear action roadmap',
      ],
    },

    whoFor: {
      heading: 'Who this is for',
      body: 'We advise across a range of sectors, including manufacturing, financial services, technology, healthcare, retail and distribution, and professional services. The scope is always tailored — an assessment can cover the whole operation or a single function, site or process.',
      items: [
        'Operations heads who suspect the business has outgrown its controls',
        'Founders scaling past the point where informal oversight works',
        'CFOs reviewing approval thresholds and segregation of duties',
        'Procurement and compliance leads mapping third-party dependency',
      ],
    },

    riskAreas: {
      heading: 'Operational risk areas we assess',
      items: [
        'Process and business process risk, including undocumented workarounds',
        'Control design and whether thresholds still match transaction sizes',
        'Supply chain and supplier concentration',
        'Third-party and vendor dependency, including your providers’ own dependencies',
        'Single points of failure in systems, sites, equipment and people',
        'Key-person dependency and cross-training gaps',
        'Data and system access held by external parties',
      ],
    },

    faqs: [
      {
        q: 'What is operational risk management?',
        a: 'It is the identification and reduction of risks arising from how a business operates day to day — its processes, controls, systems, suppliers and people. The aim is to find where operations can fail before they do, and to make proportionate improvements.',
      },
      {
        q: 'What does an operational risk assessment look at?',
        a: 'Typically process and control reviews, supply chain and third-party dependency, and single points of failure across suppliers, systems, sites and people. We assess what is actually happening in practice rather than what documented procedure says should happen.',
      },
      {
        q: 'How is operational risk different from enterprise risk management?',
        a: 'Operational risk is one category within enterprise risk management. An operational engagement goes deep on how the business runs; an ERM engagement establishes a framework spanning every category of risk, including operational, compliance, continuity and strategic.',
      },
      {
        q: 'Can you assess just one function or site?',
        a: 'Yes. A focused assessment of a single function, site or process is a common starting point, particularly where there is a specific concern or where an independent view is wanted before committing to broader work.',
      },
      {
        q: 'Will a process review disrupt our operations?',
        a: 'We work to minimise disruption. Most of what we need comes from conversations with the people running the process and from documentation that already exists.',
      },
      {
        q: 'What do we receive at the end?',
        a: 'A clear set of prioritised findings and practical recommendations, written to be understood by leadership rather than by specialists, together with an action roadmap.',
      },
    ],

    relatedServices: [
      { label: 'Enterprise Risk Management', to: '/services/enterprise-risk-management' },
      { label: 'Business Continuity Planning', to: '/services/business-continuity-crisis-planning' },
      { label: 'All risk advisory services', to: '/services' },
    ],

    relatedInsights: [
      {
        label: '5 Operational Risks Growing Indian Businesses Overlook',
        to: '/insights/operational-risks-growing-indian-businesses-overlook',
        note: 'Concentration, key-person dependency, undocumented process, unmanaged third parties and outgrown controls.',
      },
      {
        label: 'Building a Risk Register Your Team Will Actually Use',
        to: '/insights/building-a-risk-register-your-team-will-use',
        note: 'How to record operational findings so they are acted on rather than filed.',
      },
    ],

    references: [],

    cta: {
      title: 'Request an operational risk assessment',
      sub: 'A short, no-obligation conversation is usually enough to scope a focused review of the area you are least comfortable about.',
      label: 'Request a Risk Assessment',
    },
  },
}

export const serviceLandingSlugs = Object.keys(serviceLandingPages)
