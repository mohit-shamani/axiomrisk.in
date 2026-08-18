---
title: "Business Continuity Planning: A Practical Guide for Growing Businesses"
slug: "business-continuity-planning-practical-guide"
metaDescription: "A practical guide to business continuity planning — how to identify critical activities, work from impact rather than threats, build a plan around decisions, and test it properly."
category: "Continuity"
author: "AxiomRisk"
date: "2026-08-06"
readTime: "7 min read"
featuredImage: ""
excerpt: "Continuity planning has a reputation for thick binders written for auditors. The useful version answers one question: if this stopped tomorrow, how would we keep serving customers?"
draft: false
---

Business continuity planning has an image problem. For many people it means a thick
document, written once to satisfy a customer questionnaire or an auditor, stored
somewhere nobody can find under pressure.

The useful version is much smaller than that, and answers one question: if something
critical stopped tomorrow, how would we keep serving customers, and how quickly could
we get back to normal?

That question does not require a large framework to answer. It does require working in
a particular order — and most plans that fail get the order wrong.

## Start with impact, not with threats

The instinctive starting point is to list what could go wrong: fire, flood, power
failure, cyber attack, key supplier collapse, pandemic. The list is endless, and each
item invites its own plan.

Work from impact instead. A fire at your main site, a supplier failing and a
ransomware incident can all produce the same operational reality: *we cannot produce
and dispatch orders.* If you have planned for that outcome, you have substantially
planned for all three causes.

This is why the first step is a **business impact analysis** rather than a threat
brainstorm. It asks:

- Which activities must continue for us to keep serving customers?
- How long can each be interrupted before the harm becomes serious?
- What does each depend on to function?

The output is a short list of genuinely critical activities, ranked by how quickly
their loss hurts. Everything else can wait, and knowing what can wait is as valuable as
knowing what cannot.

## Be honest about what is critical

Almost every function will describe itself as critical. The test is narrower: which
activities, if they stopped, would damage customers, cash or compliance within days
rather than weeks?

For each of those, two numbers matter, and both should be set by the business rather
than by IT:

**How long you can tolerate the activity being down.** This is a business decision
about customer, contractual and regulatory consequence — not a technical estimate of
how fast something can be fixed.

**How much data you can afford to lose.** For anything involving records or
transactions, the gap between your last usable backup and the moment of failure is work
that has to be reconstructed manually, if it can be reconstructed at all.

Setting these before designing solutions keeps the conversation grounded. It is common
for a business to discover that its actual recovery capability and its assumed
capability were never compared.

## Map the dependencies

A critical activity is only as resilient as what it relies on. For each one, list:

- **People** — who can perform it, and how many of them there are
- **Systems** — applications, data, connectivity, and who controls them
- **Suppliers** — including the ones your suppliers depend on
- **Premises and equipment** — and whether an alternative exists
- **Information** — records needed to operate, and where they live

Dependency mapping is where most of the useful surprises appear. A manufacturer may
find that three apparently separate production lines share one calibration service. A
services firm may find that a routine workflow depends on a spreadsheet held by one
person. These are the same single points of failure discussed in
[five operational risks growing businesses overlook](/insights/operational-risks-growing-indian-businesses-overlook),
and continuity planning is usually where they surface first.

## Build the plan around decisions

A continuity plan is not a description of your business. It is a set of decisions made
in advance, so they do not have to be made under pressure. A workable plan covers:

**Activation.** Who decides this is an incident, and on what basis. Without this, the
first hour is spent debating whether the plan applies.

**Roles.** A small number of named roles — incident lead, communications, operations,
IT — with a deputy for each. Roles, not job titles, because the person who normally
holds a title may be unavailable or affected.

**Communication.** What is said to customers, staff, suppliers and, where relevant,
regulators — and who says it. Pre-agreed holding statements save hours.

**Workarounds.** How critical activities continue by other means: manual processing,
an alternative site, a secondary supplier, degraded but functional service.

**Recovery sequence.** The order in which things are restored. Restoring in the wrong
order wastes the scarcest resource in an incident, which is attention.

One practical detail defeats more plans than any strategic flaw: **the plan and the
contact list must be reachable when your systems are not.** A plan stored only on the
network that has failed is not a plan.

## Test it, or it remains a theory

An untested plan is a set of assumptions. Testing converts it into knowledge, and there
are three levels:

1. **Walkthrough** — the team reads the plan against a scenario and identifies gaps.
   Cheap, and usually finds a surprising number.
2. **Tabletop exercise** — a facilitated discussion where a scenario develops and
   participants make real decisions. This is the best value for most businesses.
3. **Live test** — actually failing over to alternative arrangements. The most
   informative and the most disruptive; reserved for the most critical activities.

Recurring findings across exercises tend to be mundane rather than dramatic: contact
details are out of date, an assumed workaround depends on something also unavailable,
one person holds knowledge nobody else has, or the plan assumes the incident happens on
a weekday morning.

Recognised standards set out a full management-system approach to continuity, and
organisations in regulated sectors may have specific obligations governing continuity
and recovery arrangements.

{{ADD SOURCE: ISO 22301 business continuity standard official reference}}

{{ADD SOURCE: relevant Indian sector regulator requirements on business continuity by entity type}}

## Common mistakes

- **Written for the auditor.** A plan optimised to pass review is rarely optimised to
  be used at 2am by someone under stress.
- **Too long.** If it cannot be acted on in the first thirty minutes, the length is
  working against you. Detail belongs in appendices.
- **People are treated as a resource.** Staff may be personally affected by the same
  event. Availability and welfare are part of the plan, not an afterthought.
- **Never updated.** A plan reflecting a structure, site or system you no longer have
  is worse than none, because it creates false confidence.

## Where to start

Pick your single most critical activity. Write one page: what it depends on, how long
it can be down, how you would keep it running by other means, who decides, and who
communicates. Walk three people through it and note what breaks.

That page, tested, is worth more than a fifty-page document that has never been opened.
From there the same structure extends to the next activity, and the next.

Our free [two-minute risk health check](/risk-health-check) includes whether a plan
exists and whether it has been tested in the last year — a quick way to see where you
stand. For the full picture, our
[business continuity planning services](/services/business-continuity-crisis-planning)
cover impact analysis, plan design and facilitated testing, or you can
[book a consultation](/contact) to talk it through first.
