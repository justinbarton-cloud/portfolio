# Justin Barton's portfolio

Justin's design portfolio: his Toast work and his earlier work (HPE and
before), built from the POS Design showcase's template. Next.js 16, static.
It lives on his personal github.com account (justinbarton-cloud/portfolio),
never on a Toast org, and publishes to public GitHub Pages at
https://justinbarton-cloud.github.io/portfolio/ on every push to main.

## Content

- `content/work/<id>.ts`, one case per file, named for its id. The shape is
  `Case` in `content/types.ts`; its doc comments say why each field exists.
- `content/about.ts`: bio, experience, education, testimonials, chapters.
- `public/work/<id>/`: a case's pictures. `public/people/justin.jpg` is the
  only photo of Justin the site uses. Never use photos from his Webflow site.
- `npm run import-webflow` re-imports cases from justinbarton.webflow.io. It
  won't overwrite an edited file without `--force`.

## Themes

`content/themes.ts` holds the design tokens. Every theme answers the same
semantic questions (color, headline weight and tracking, corner radius, and a
background motif) in a light and a dark mode, and components only ask for the
semantic name. The build checks every text color against its page, so a new
theme that fails contrast fails `npm run check`.

Type is the same in every theme: Atkinson Hyperlegible Next, with its mono
only for token names in Customize. A theme changes how heavy a headline is,
never whether it's easy to read. Keep pages quiet: one idea per section,
space between sections rather than rules, and motion only in the motifs, the
page entrance and the theme switch. The fonts are OFL and listed in
`src/app/fonts/LICENSES.md`.

## Rules

- Write in Justin's voice (the justin-voice skill). No em dashes or en dashes
  anywhere; `npm run check` fails on them.
- Never invent a number, a quote or an outcome. Measured impact carries its
  source and date; otherwise label it expected or qualitative.
- This repo and its site are public-safe. Nothing confidential to Toast goes
  in it at all: no unshipped roadmap, customer research or internal metrics,
  not even as `share: 'internal'`. Toast work only goes in once it's public
  or cleared.
- The Pages build keeps only `share: 'public'` cases and fails if anything
  points inside Toast (`scripts/check-public.mjs`).
- Name customers by first name and a description of the business only.

## Before pushing

`npm run check` (registry, build, types, dashes), then `npm run build:public`
(the Pages build plus the leak check), and look at it with `npm run dev`.
