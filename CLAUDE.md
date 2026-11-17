# Justin Barton's portfolio

Justin's design portfolio: his Toast work and his earlier work (HPE and
before), built from the POS Design showcase's template. Next.js 16, static,
published to GitHub Enterprise Pages behind Toast sign-in with
`npm run publish`.

## Content

- `content/work/<id>.ts`, one case per file, named for its id. The shape is
  `Case` in `content/types.ts`; its doc comments say why each field exists.
- `content/about.ts`: bio, experience, education, testimonials, chapters.
- `public/work/<id>/`: a case's pictures. `public/people/justin.jpg` is the
  only photo of Justin the site uses. Never use photos from his Webflow site.
- `npm run import-webflow` re-imports cases from justinbarton.webflow.io. It
  won't overwrite an edited file without `--force`.

## Rules

- Write in Justin's voice (the justin-voice skill). No em dashes or en dashes
  anywhere; `npm run check` fails on them.
- Never invent a number, a quote or an outcome. Measured impact carries its
  source and date; otherwise label it expected or qualitative.
- Everything is `share: 'internal'` unless Justin marks it public. Toast work
  stays internal: unshipped roadmap, customer research and internal metrics
  never go public.
- Name customers by first name and a description of the business only.

## Before publishing

`npm run check` (registry, build, types, dashes), look at it with
`npm run dev`, commit, then `npm run publish`.
