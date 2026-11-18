import type { Case } from '../types'

// HPE GreenLake, 2022 to 2025. Screens use sample data (Acme Co.).
const work: Case = {
  id: 'scaling-platform-ux',
  title: 'Every acquired product shipped its own UX, so we built shared platform patterns',
  summary:
    'HPE GreenLake kept absorbing acquired products, each with its own UI and workflows. I led 12 designers across three countries in building shared platform patterns: shell, navigation, personalization and observability. OpsRamp became the proof.',
  chapter: 'hpe',
  company: 'Hewlett Packard Enterprise',
  role: 'Head of Product Design',
  timeframe: '2022 to 2025',
  date: '2025-01',
  tags: ['design-leadership', 'systems', 'ux-architecture'],
  share: 'public',
  deep: true,
  cover: {
    src: '/work/scaling-platform-ux/opsramp-after.png',
    w: 2400,
    h: 1390,
    alt: 'OpsRamp topology maps inside the HPE GreenLake shell, with the global header on top, service navigation on the left and the content region in the middle.',
  },

  body: [
    { kind: 'h', text: 'Each acquisition arrived with its own product, and customers felt the seams' },
    {
      kind: 'p',
      text:
        'HPE has acquired 27+ companies since 2017. Each one came with its own UI, information architecture, data model, auth patterns and workflows. Meanwhile customers wanted one experience for the basics: user management, subscriptions, onboarding. Internal teams often worked in silos and shipped inconsistent UX. That was the gap.',
    },
    {
      kind: 'p',
      text:
        'I led product design for the GreenLake platform foundation services. That meant the parts every product has to share.',
    },
    {
      kind: 'p',
      text:
        'My team was 12 product designers across the US, Brazil and Ireland. We worked alongside UX Research and the Design System team.',
    },

    { kind: 'h', text: 'The problem: slow, surprising onboarding that hurt revenue' },
    {
      kind: 'p',
      text:
        'The question we kept asking was simple. How do we onboard any newly acquired product quickly and consistently, and still give customers a good experience across products, account types and user roles?',
    },
    {
      kind: 'list',
      items: [
        {
          lead: 'What users felt',
          text: 'Poor onboarding and unexpected complexity in common tasks.',
        },
        {
          lead: 'What it cost the business',
          text: 'NSAT was declining, and slow time to value and rising support costs were hitting revenue directly.',
        },
        {
          lead: 'What the market expected',
          text: 'Customers expect the ease they get from Google Cloud, Azure and AWS.',
        },
      ],
    },

    { kind: 'h', text: 'The answer: reusable patterns that every product plugs into' },
    {
      kind: 'p',
      text:
        'A platform pattern is a reusable design solution that solves a common problem across many products in one consistent way. We built them for the places where customers crossed from one product into another.',
    },
    {
      kind: 'p',
      text:
        'Think of 2022 to 2025 as a before and after. Before, we had fragmented patterns, inconsistent onboarding, no unified observability and no personalization. After, we had a consistent shell, standard onboarding flows, multi-product observability and personalization for critical tasks.',
    },
    {
      kind: 'p',
      text:
        'The pattern set also covered user onboarding, service catalog, and identity and access.',
    },

    { kind: 'h', text: 'Shell architecture: one skeleton for every product' },
    {
      kind: 'p',
      text:
        'Each product handled loading states, templates and navigation its own way. Products felt disconnected, most of all when a task crossed from one to another.',
    },
    {
      kind: 'p',
      text:
        'We unified the shell so every region loads with the same skeleton: global header on top, service navigation on the left, content in the middle, a contextual panel on the right. Controls and preferences live in the same places everywhere.',
    },
    {
      kind: 'p',
      text:
        'The result was a green light for the global header, navigation and user preferences to spread. The majority of products now have them or have them on the roadmap.',
    },

    { kind: 'h', text: 'Personalization: stop treating every customer the same' },
    {
      kind: 'p',
      text:
        'A broad set of products brings a broad set of users, roles and use cases. The platform was one size fits all, and it wasn\'t holding up as the customer base got more varied.',
    },
    {
      kind: 'p',
      text:
        'Small options did a lot. A preferred workspace and a preferred landing page cut the number of steps across top tasks. Global preferences also carry language, date and time format, units, currency and temperature, all in one panel.',
    },
    {
      kind: 'p',
      text:
        'The pattern answered real signals. They came from UX research, support tickets and customer conversations, and it paid down a lot of UX and technical debt.',
    },

    { kind: 'h', text: 'Observability: data where people already are' },
    {
      kind: 'p',
      text:
        'Observability matters to most GreenLake personas. Siloed products made it hard to find data in context.',
    },
    {
      kind: 'p',
      text:
        'We used one set of data tools: tables, maps, topologies and charts. They can sit in dashboards, modals and panels.',
    },
    {
      kind: 'p',
      text:
        'The catalog of contextual observability data keeps growing. It covers dozens of use cases and lives on the dashboard, inside the platform shell.',
    },

    { kind: 'h', text: 'Patterns come from everywhere, so we listened on every track' },
    {
      kind: 'p',
      text:
        'Patterns follow the normal product lifecycle: ideation, planning, design, development, deployment, then scaling, where we refine design system components and templates.',
    },
    {
      kind: 'p',
      text:
        'They don\'t fit cleanly in a delivery, discovery or R&D track. Some of the best came out of rapid feature delivery. Others came from future innovation work. Our job was to listen for them and make them reusable.',
    },

    { kind: 'h', text: 'Worked example: bringing OpsRamp into GreenLake' },
    {
      kind: 'p',
      text:
        'OpsRamp is SaaS full-stack observability, predictive insights and intelligent automation for IT operations. Its onboarding began in late 2023.',
    },
    {
      kind: 'p',
      text:
        'I use it because it shows how our patterns grew up. It also shows how our platform strategy moved toward observability.',
    },
    {
      kind: 'p',
      text: 'We worked in three phases.',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        {
          lead: 'Get it live',
          text: 'We met the teams and stakeholders, then started ideation and planning. We set the MVP as integrating essential services such as identity and access management, then ran QA and launched.',
        },
        {
          lead: 'Achieve alignment (just beginning when I left)',
          text: 'Keep collaborating with Product Design and the Design System team, adopt our tokens and components, and reach full accessibility compliance. Deliver the MVP cross-product features and a clear integration roadmap, despite resource constraints. OpsRamp was just starting this phase when I left HPE in January 2026.',
        },
        {
          lead: 'Become fully integrated (planned)',
          text: 'Refactor the UI and UX with every pattern that applies: shell, navigation, personalization and the rest. OpsRamp capabilities would then reach across the portfolio through the platform.',
        },
      ],
    },
    {
      kind: 'p',
      text: 'To know where a product really stood, we graded it. The audit scored six things: brand alignment, global header, tokens, components, accessibility readiness and how engaged the team was. OpsRamp’s first audit came back at 20%, an F. Its team was fully engaged, and its accessibility readiness was two thirds of the way there. Everything else was at zero.',
    },
    {
      kind: 'figure',
      picture: {
        src: '/work/scaling-platform-ux/opsramp-audit.png',
        w: 1330,
        h: 1220,
        alt: 'An alignment scorecard for OpsRamp. Brand alignment, global header usage, token usage and component usage score 0.0, accessibility readiness 0.66 and engagement level 1.0, for an overall grade of 20%, an F.',
        caption: 'OpsRamp’s first design system audit. Each criterion scores from 0 to 1.',
      },
    },
    {
      kind: 'p',
      text: 'The plan set a target for each phase: 90%, a B, at the end of phase 2, and 95%, an A, once OpsRamp was fully integrated. A grade made the gap concrete. It also showed exactly which piece to fix next.',
    },
    {
      kind: 'h',
      text: 'Before and after, in one screen',
    },
    {
      kind: 'figure',
      picture: {
        src: '/work/scaling-platform-ux/opsramp-before.png',
        w: 2560,
        h: 1230,
        alt: 'The original OpsRamp topology view with its own header and a narrow icon rail on the left, showing a dense web of cloud resources.',
        caption: 'OpsRamp before (2023). A standalone brand and its own UX patterns.',
      },
    },
    {
      kind: 'figure',
      picture: {
        src: '/work/scaling-platform-ux/opsramp-after.png',
        w: 2400,
        h: 1390,
        alt: 'OpsRamp topology maps inside the GreenLake shell, with a full service navigation on the left and a cleaner topology diagram in the content region.',
        caption: 'OpsRamp inside the platform shell, as we designed it.',
      },
    },
    {
      kind: 'list',
      items: [
        {
          lead: 'Before',
          text: 'A standalone brand and UX patterns, an ad hoc integration into GreenLake products, a complex onboarding experience, and limited accessibility compliance and scalability.',
        },
        {
          lead: 'The target',
          text: 'Brand and UX patterns that match the platform shell, OpsRamp observability reachable from anywhere in the UI, fast onboarding into the customer\'s environment, and full accessibility with more room to scale.',
        },
      ],
    },

    { kind: 'h', text: 'What changed' },
    {
      kind: 'p',
      text:
        'Platform UX NSAT rose 14 points in the 2025 voice of customer survey, against 2024.',
    },
    {
      kind: 'p',
      text:
        'Platform onboarding for OpsRamp took about half the time it used to.',
    },
    {
      kind: 'p',
      text:
        'Of the 15 products we could align to the design system we owned, 11 had committed to a roadmap for adopting it. That’s 73%.',
    },
    {
      kind: 'p',
      text:
        'Product and engineering teams gained confidence that new features would feel cohesive, and not bolted on. Cross-team complexity and conflict dropped. Designers began to think system first and brought in engineering and the Design System team earlier.',
    },
    {
      kind: 'p',
      text:
        'We also changed how people saw design. It became a strategic advantage.',
    },

    { kind: 'h', text: 'How I led the team and the partners around it' },
    {
      kind: 'p',
      text:
        'I coached designers to focus on outcomes and build systems thinking at the same time. We used three tools.',
    },
    {
      kind: 'list',
      items: [
        {
          lead: 'OKRs',
          text: 'They keep the team on outcomes, tie to core skill development, and we revisit them every quarter or sooner.',
        },
        {
          lead: 'Mentorship',
          text: 'I act as a player coach with 1:1 trust. We hold design critique with discipline and grow leadership inside the team.',
        },
        {
          lead: 'Training and education',
          text: 'Training is part of the OKRs. Designers used Coursera and HPE trainings, plus internal and external knowledge sharing.',
        },
      ],
    },
    {
      kind: 'p',
      text:
        'The team got steadily more resilient through change, ambiguity and setbacks, and we built a design culture we could shape. In HPE’s most recent annual survey before I left, my team rated me 94% favorable on people leader effectiveness, and team engagement came in at 84%.',
    },
    {
      kind: 'p',
      text:
        'Patterns only stick when product management and engineering use them. So we worked on all three sides.',
    },
    {
      kind: 'list',
      items: [
        {
          lead: 'Product management',
          text: 'We co-led ideation workshops, planned scope together for roadmap alignment, and worked through tradeoffs to build empathy.',
        },
        {
          lead: 'Engineering',
          text: 'We wrote better annotations and implementation guides, and stayed close through design, development and deployment. Tokenized components made the system easier to use across tech stacks.',
        },
        {
          lead: 'Design',
          text: 'We built a complete Figma component library, contributed pattern designs to the Design System team, and coached across teams for continuous improvement.',
        },
      ],
    },

    { kind: 'h', text: 'What I took from it' },
    {
      kind: 'list',
      items: [
        {
          lead: 'Look for patterns across the whole lifecycle',
          text: 'The best ones started in delivery, discovery and innovation work, so we listened in all three.',
        },
        {
          lead: 'Align people before screens',
          text: 'Product management, engineering and design lined up from the start.',
        },
        {
          lead: 'Coach continuously',
          text: 'Enablement never stopped, and the design culture stayed resilient and biased toward action.',
        },
      ],
    },
    {
      kind: 'p',
      text:
        'Without shared patterns, customers got fragmented experiences and called support. Product teams slowed down, piled up technical debt and struggled to scale. With them, customers got consistency and teams got efficiency.',
    },
  ],

  walkthrough: {
    device: 'browser',
    intro: 'Follow OpsRamp from a standalone product into the GreenLake platform.',
    steps: [
      {
        screen: {
          src: '/work/scaling-platform-ux/opsramp-before.png',
          w: 2560,
          h: 1230,
          alt: 'The original OpsRamp topology view with its own header and a narrow icon rail on the left, showing a dense web of cloud resources.',
        },
        url: 'opsramp.com/infrastructure/topology',
        title: 'OpsRamp before',
        caption:
          'A standalone brand with its own UX patterns, and an ad hoc link into GreenLake products.',
        hotspot: { x: 30, y: 25, w: 40, h: 45, label: 'See it inside GreenLake' },
      },
      {
        screen: {
          src: '/work/scaling-platform-ux/opsramp-after.png',
          w: 2400,
          h: 1390,
          alt: 'OpsRamp topology maps inside the GreenLake shell, with a full service navigation on the left and a cleaner topology diagram in the content region.',
        },
        url: 'greenlake.hpe.com/opsramp/infrastructure/topology-maps',
        title: 'Inside the platform shell',
        caption:
          'The same product with the shared header, service navigation and content region. OpsRamp observability is reachable from anywhere in the UI.',
        hotspot: { x: 93, y: 0.5, w: 6, h: 6, label: 'Open account preferences' },
      },
      {
        screen: {
          src: '/work/scaling-platform-ux/global-preferences.png',
          w: 2400,
          h: 1403,
          alt: 'The Edit preferences panel open beside OpsRamp topology maps, listing default workspace, theme, language, date and time format, unit of measure, currency, temperature unit, session timeout and preferred landing page.',
        },
        url: 'greenlake.hpe.com/opsramp/infrastructure/topology-maps',
        title: 'Global preferences in context',
        caption:
          'Preferences open from the shell header. A preferred workspace and landing page cut steps across top tasks.',
        hotspot: { x: 79, y: 76, w: 20, h: 5, label: 'See the platform dashboard' },
      },
      {
        screen: {
          src: '/work/scaling-platform-ux/observability-dashboard.png',
          w: 2400,
          h: 2170,
          alt: 'A grid of observability cards: system capacity and performance, workloads, protection, subscription overview, device inventory, device summary, servers health status and latency.',
        },
        url: 'greenlake.hpe.com/home',
        title: 'Observability on the dashboard',
        caption:
          'Cards from Compute Ops Management, Data Ops Manager and Block sit on one dashboard. It is on your dashboard, in your platform shell.',
      },
    ],
  },

  impact: [
    {
      kind: 'measured',
      text: 'NSAT for platform UX rose 14 points in the 2025 voice of customer survey, against 2024.',
      source: 'HPE voice of customer survey, 2025 against 2024',
    },
    {
      kind: 'measured',
      text: '73% of the products we could align to the design system (11 of 15) committed to a roadmap for adopting it.',
      source: 'GreenLake product integration roadmaps, 2025',
    },
    {
      kind: 'measured',
      text: 'My team rated me 94% favorable on people leader effectiveness, with 84% team engagement.',
      source: 'HPE annual People Leader Effectiveness survey, the last before I left',
    },
    {
      kind: 'qualitative',
      text: 'The global header, navigation and user preferences are implemented or on the roadmap for the majority of platform products.',
    },
    {
      kind: 'qualitative',
      text: 'Product and engineering gained confidence that new features would feel cohesive, and designers began to think system first.',
    },
  ],
}

export default work
