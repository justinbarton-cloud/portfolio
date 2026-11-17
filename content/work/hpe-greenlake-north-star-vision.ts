import type { Case } from '../types'

// Imported from https://justinbarton.webflow.io/projects/hpe-greenlake-north-star-vision by npm run import-webflow.
// Edit freely: the importer won't overwrite this file without --force.
const work: Case = {
  "id": "hpe-greenlake-north-star-vision",
  "title": "HPE GreenLake North Star Vision",
  "summary": "HPE’s GreenLake Platform (GLP) lacked a cohesive design strategy across its suite of applications and services, leading to fragmented user experiences.",
  "chapter": "hpe",
  "company": "Hewlett Packard Enterprise",
  "role": "Head of Product Design",
  "timeframe": "June 2023 to May 2024",
  "date": "2025-01",
  "tags": [
    "product-design"
  ],
  "share": "public",
  "walkthrough": {
    "device": "browser",
    "intro": "I led the North Star vision for GreenLake: a home you arrange yourself instead of a page of launch buttons. Press the ring to step through it.",
    "steps": [
      {
        "screen": { "src": "/work/services-centric-ux-architecture/675c587905fc6c2f822148d1_old-glp-dashboard.png", "w": 1920, "h": 1459, "alt": "The original GreenLake home: a grid of applications, each with its own Launch button" },
        "url": "greenlake.hpe.com",
        "title": "Where it started",
        "caption": "The original platform was link and launch. Every service was a separate application, so the home page was a row of Launch buttons and customers had to know where to go.",
        "hotspot": { "x": 12.5, "y": 26, "w": 50, "h": 29, "label": "See what replaced the launch grid" }
      },
      {
        "screen": { "src": "/work/services-centric-ux-architecture/675c59557e121927424df91c_n-star-glp-dashboard.jpeg", "w": 1920, "h": 1080, "alt": "The North Star home: pinned services, a private cloud summary and usage charts on one dashboard" },
        "url": "greenlake.hpe.com/home",
        "title": "A home you arrange",
        "caption": "Research told us customers wanted a dashboard they could fully customize. North Star brings every service onto one page of widgets, with Edit dashboard at the top.",
        "hotspot": { "x": 23, "y": 1.2, "w": 23.6, "h": 4, "label": "Open search" }
      },
      {
        "screen": { "src": "/work/hpe-greenlake-north-star-vision/67587d3490ce0f87525195c8_n-star-global-search.jpeg", "w": 1920, "h": 1080, "alt": "Global search answering a question about running instances, with an AI summary above the results" },
        "url": "greenlake.hpe.com/morpheus/dashboard",
        "title": "Search that answers",
        "caption": "Search was the way customers said they preferred to navigate. Ask a question and it answers first, with an AI summary over the top hits.",
        "hotspot": { "x": 24.4, "y": 8.6, "w": 31.8, "h": 6.6, "label": "See how a new customer gets started" }
      },
      {
        "screen": { "src": "/work/hpe-greenlake-north-star-vision/675875eb0f8bddecbdd09adb_n-star-onboarding.png", "w": 1920, "h": 1080, "alt": "A welcome tour for a new private cloud, beside a getting started checklist" },
        "url": "greenlake.hpe.com/morpheus/welcome",
        "title": "Guided from day one",
        "caption": "Guided onboarding turned out to be a good way to prompt personalization. North Star shaped it, and we built it with the teams that already had mature tours in production."
      }
    ]
  },
  "cover": {
    "src": "/work/hpe-greenlake-north-star-vision/image_processing20200129-19798-1k8ponz-4-min.png",
    "w": 1160,
    "h": 800,
    "alt": ""
  },
  "body": [
    {
      "kind": "h",
      "text": "Problem Statement"
    },
    {
      "kind": "p",
      "text": "HPE’s GreenLake Platform (GLP) lacked a cohesive design strategy across its suite of applications and services, leading to fragmented user experiences. Product teams were siloed, and customer pain points were inconsistently addressed, undermining the platform's ability to deliver a seamless and scalable enterprise IT experience."
    },
    {
      "kind": "h",
      "text": "Solution"
    },
    {
      "kind": "p",
      "text": "I spearheaded the creation of a North Star vision for GLP product design, defining a unified design strategy that addressed customer needs holistically. This effort included building cross-functional alignment, prototyping end-to-end solutions, and presenting the vision to L1 and L2 leadership. The resulting framework now serves as a guide for product teams, ensuring alignment across feature development and setting the direction for GreenLake’s product design evolution."
    },
    {
      "kind": "h",
      "text": "Execution"
    },
    {
      "kind": "list",
      "ordered": true,
      "items": [
        {
          "lead": "Establishing a Vision",
          "text": "Partnered with researchers, design system team members, and product designers to analyze customer pain points and develop a design strategy grounded in user needs."
        },
        {
          "text": "Directed the creation of prototypes that demonstrated solutions to critical issues, such as disjointed navigation, inconsistent workflows, and siloed application features."
        },
        {
          "lead": "Driving Cross-Functional Alignment",
          "text": "Engaged with engineering, product, and executive stakeholders to build consensus around the vision."
        },
        {
          "text": "Conducted multiple North Star presentations to leadership, securing buy-in for the strategy."
        },
        {
          "lead": "Tackling Ambiguity",
          "text": "Unified disparate feature sets, such as global search, customizable dashboards, and a new navigation paradigm, into a cohesive North Star vision."
        },
        {
          "text": "Created a proof-of-concept that tied these features together, offering a compelling and actionable design strategy for the GLP roadmap."
        },
        {
          "lead": "Prioritizing User-Centric Features",
          "text": "Personalization and Visibility: Expanded the widget library to include features critical to storage and support, offering users greater control over their workspace."
        },
        {
          "lead": "Simplified Navigation",
          "text": "Progressed toward a single service navigation menu, reducing fragmentation across applications and enabling a more unified user experience."
        },
        {
          "lead": "AI-Enhanced Capabilities",
          "text": "Introduced AI-powered features, including an AI-driven search and recommendation engine to surface relevant insights and optimize workflows."
        },
        {
          "lead": "Strategic Pivot Toward AI",
          "text": "Explored broader opportunities for AI to add value across the platform, aligning future features with this transformative technology."
        },
        {
          "lead": "Impactful Storytelling",
          "text": "Delivered a polished presentation at HPE Discover Las Vegas '24, highlighting the North Star vision’s alignment with GreenLake’s customer and business objectives."
        }
      ]
    },
    {
      "kind": "figure",
      "picture": {
        "src": "/work/hpe-greenlake-north-star-vision/67587d3490ce0f87525195c8_n-star-global-search.jpeg",
        "w": 1920,
        "h": 1080,
        "alt": "",
        "caption": "Personalization and improved navigation were key themes of the N. Star project. UX research validated that our users wanted a fully customizable dashboard and their preferred navigation pattern was search. An example is shown above."
      }
    },
    {
      "kind": "h",
      "text": "Outcomes"
    },
    {
      "kind": "list",
      "items": [
        {
          "lead": "Adopted Strategy",
          "text": "The North Star vision has been embraced as a foundational design framework, guiding product teams across GLP."
        },
        {
          "lead": "Enhanced User Experience",
          "text": "Improved navigation and streamlined workflows are now core priorities, directly addressing key customer pain points."
        },
        {
          "lead": "Roadmap Influence",
          "text": "Features such as widget-based dashboards, a centralized navigation menu, and AI-driven search were directly shaped by the North Star strategy and incorporated into the product roadmap."
        },
        {
          "lead": "Cross-Team Collaboration",
          "text": "The process fostered greater collaboration among design, product, and engineering teams, setting a new standard for interdisciplinary partnership."
        }
      ]
    },
    {
      "kind": "figure",
      "picture": {
        "src": "/work/hpe-greenlake-north-star-vision/675875eb0f8bddecbdd09adb_n-star-onboarding.png",
        "w": 1920,
        "h": 1080,
        "alt": "",
        "caption": "Guided onboarding was an effective mechanism for prompting personalization. This was a new feature influenced by the N. Star project, and realized by collaborating with teams who had mature solutions already in production."
      }
    },
    {
      "kind": "h",
      "text": "Key Learnings"
    },
    {
      "kind": "list",
      "items": [
        {
          "text": "Prototyping tangible solutions to customer problems accelerates stakeholder alignment and buy-in."
        },
        {
          "text": "A well-articulated vision can break down silos and inspire collaboration across traditionally disconnected teams."
        },
        {
          "text": "Persistent advocacy for design’s role in the product development lifecycle is crucial for long-term strategic impact."
        }
      ]
    },
    {
      "kind": "p",
      "text": "This case study demonstrates my ability to navigate ambiguity, align diverse teams, and define a transformative design strategy that impacts both product development and business outcomes."
    }
  ],
  "source": "https://justinbarton.webflow.io/projects/hpe-greenlake-north-star-vision"
}

export default work
