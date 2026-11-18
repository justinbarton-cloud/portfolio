import type { Case } from '../types'

// HPE GreenLake, 2021 to 2025. Screens use sample data.
const work: Case = {
  id: 'global-accessibility-hpe',
  title: 'Europe’s accessibility law put every acquired product at risk, so we fixed it in the design system',
  summary:
    'HPE GreenLake was sold worldwide, much of it through acquired products with uneven accessibility. We made compliance and language support part of the design system, so a product became compliant by adopting the components.',
  chapter: 'hpe',
  company: 'Hewlett Packard Enterprise',
  role: 'Head of Product Design',
  timeframe: '2021 to 2025',
  date: '2025-01',
  tags: ['accessibility', 'design-leadership', 'systems'],
  share: 'public',
  deep: true,
  cover: {
    src: '/work/global-accessibility-hpe/global-preferences.png',
    w: 2400,
    h: 1403,
    alt: 'GreenLake with the Edit preferences panel open, showing language, date and time format, unit of measure, currency and temperature unit',
  },
  body: [
    { kind: 'h', text: 'The problem' },
    {
      kind: 'p',
      text: 'HPE sells worldwide, and GreenLake, the cloud platform my team designed, was sold in dozens of countries by the time I left. That reach is the point of a cloud platform. It’s also the risk.',
    },
    {
      kind: 'p',
      text: 'A server sits in a data center and a few people touch it. A SaaS product lands in front of every user at every customer. So an accessibility gap in GreenLake wasn’t one bug in one box. It was a gap repeated across every account in every country.',
    },
    {
      kind: 'p',
      text: 'And HPE grew by buying companies. Morpheus Data and Juniper Networks, two of the most recent, had real share in Europe. Each came with its own UI and its own level of accessibility. When HPE bought them, it bought their exposure too.',
    },
    { kind: 'h', text: 'Why Europe came first' },
    {
      kind: 'p',
      text: 'GreenLake started in the US, and growing it outside the US was the plan. Europe was the biggest part of that plan. When the European Accessibility Act became law, my team raised what it could mean for us right away. Nobody had to ask.',
    },
    {
      kind: 'p',
      text: 'The Act covers products and services sold to consumers. Enterprise software usually sits outside it. GreenLake didn’t, quite. Our customers were enterprises, but anyone could go to HPE’s website, create a personal account and start using it. That made the platform look a lot more like a mass-market service than a contract-only enterprise product, and that’s what made it a real exposure.',
    },
    {
      kind: 'p',
      text: 'Contracts raised the stakes too. A government customer, for example, needed a full accessibility audit before it would sign. So compliance wasn’t a someday problem for us. It decided deals.',
    },
    { kind: 'h', text: 'We fixed it once, in the design system' },
    {
      kind: 'p',
      text: 'We couldn’t rewrite every acquired product. We could make the components they were adopting compliant. So that’s where we put the work, because it was the part a design org controls.',
    },
    {
      kind: 'list',
      items: [
        {
          lead: 'Every component to WCAG 2.1 AA',
          text: 'Contrast, keyboard navigation and screen reader support, audited component by component. A product that adopts the component inherits the fix. HPE’s published commitment today names Section 508, WCAG 2.2 and EN 301 549, the European standard, and it documents each product’s conformance in a VPAT, with an EN 301 549 report on request.',
        },
        {
          lead: 'Languages and scripts at the component level',
          text: 'Text expansion and different script orientations were some of the hardest problems we had. A dedicated part of the design system team solved them inside the components, so every product that consumed the system got them for free.',
        },
        {
          lead: 'Global Preferences',
          text: 'One place for each person to set language, date and time format, unit of measure, currency and temperature. It shipped, and it kept growing to cover more product families.',
        },
      ],
    },
    {
      kind: 'p',
      text: 'GreenLake supported ten languages: English, French, German, Italian, Japanese, Korean, Portuguese, Simplified Chinese, Spanish and Traditional Chinese. The platform had to handle all ten. A product could support fewer, depending on how mature it was in each market.',
    },
    {
      kind: 'figure',
      picture: {
        src: '/work/global-accessibility-hpe/global-preferences.png',
        w: 2400,
        h: 1403,
        alt: 'GreenLake with the Edit preferences panel open, showing language, date and time format, unit of measure, currency and temperature unit',
        caption: 'Global Preferences, inside an acquired product. The platform owns the locale, so each product doesn’t have to.',
      },
    },
    { kind: 'h', text: 'The people who carried it' },
    {
      kind: 'p',
      text: 'Two dedicated accessibility consultants sat on the design team. Audits came first, because contracts depended on them. Their ongoing job was sitting with product designers to get accessibility right at design time, before anything reached an auditor.',
    },
    {
      kind: 'p',
      text: 'Lauren, a senior UX researcher, and Marina, a senior product designer on the team I started in Galway, led the work. Marina is one of the strongest accessibility advocates I know. The two of them spoke about it at CSUN, the assistive technology conference.',
    },
    {
      kind: 'figure',
      picture: {
        src: '/work/global-accessibility-hpe/a11y-checklist.png',
        w: 2231,
        h: 1315,
        alt: 'Accessibility checklists for the design phase and the QA phase, each item linked to its WCAG criterion, beside a list of Figma plugins',
        caption: 'Checklists built into the Figma templates, so a designer checks the work while making it. Each item links to its WCAG criterion.',
      },
    },
    { kind: 'h', text: 'How it reached each country' },
    {
      kind: 'p',
      text: 'HPE had support hubs and offices around the world. A mature translation team worked with in-country consultancies to get the language right. Support staff, salespeople and consultants tested what we shipped and told us fast when it didn’t land.',
    },
    {
      kind: 'p',
      text: 'When a customer in one region needed a language or a capability quickly, the fix usually wasn’t new design. It was helping that product team adopt the design system and Global Preferences. The system did the work once. Each team’s job was to take it.',
    },
    { kind: 'h', text: 'What changed' },
    {
      kind: 'p',
      text: 'I don’t have a number for this one. The outcome is that becoming compliant stopped being a project. For an acquired product it became one workflow: adopt the components. Nothing else scales across dozens of countries and a steady stream of acquisitions.',
    },
    {
      kind: 'p',
      text: 'When I left HPE in January 2026, we were in the middle of an extensive design system audit. It showed, product by product, where each one had drifted from the system. Those gaps doubled as a map of accessibility risk, for the European Accessibility Act and in general.',
    },
    {
      kind: 'p',
      text: 'OpsRamp shows how it worked. Its first audit graded six things, accessibility readiness among them, and came back at 20%. The plan put token and component adoption and full accessibility compliance in the same phase, so fixing one meant fixing the other. That phase was just starting when I left.',
    },
    {
      kind: 'figure',
      picture: {
        src: '/work/global-accessibility-hpe/opsramp-audit.png',
        w: 1330,
        h: 1220,
        alt: 'An alignment scorecard for OpsRamp. Brand alignment, global header usage, token usage and component usage score 0.0, accessibility readiness 0.66 and engagement level 1.0, for an overall grade of 20%, an F.',
        caption: 'OpsRamp’s first design system audit. Accessibility readiness sits beside brand, tokens and components, so it’s graded as part of the same system.',
      },
    },
    {
      kind: 'figure',
      picture: {
        src: '/work/global-accessibility-hpe/a11y-principles.png',
        w: 1123,
        h: 546,
        alt: 'The four accessibility principles from the HPE Design System: perceivable, operable, understandable and robust',
      },
    },
  ],
  team: [
    { name: 'Lauren', role: 'Senior UX Researcher', did: 'Co-led accessibility across the design team, and spoke about it at CSUN.' },
    {
      name: 'Marina',
      role: 'Senior Product Designer, Galway',
      did: 'Co-led accessibility, and spoke about it at CSUN.',
    },
    {
      name: 'The accessibility consultants',
      role: 'Two, on the design team',
      did: 'Ran the audits customers needed before signing, and worked with product designers on accessibility by design.',
    },
    {
      name: 'The HPE Design System team',
      role: 'Component library and tokens',
      did: 'Solved text expansion and script orientation inside the components, so every product inherited the fix.',
    },
  ],
}

export default work
