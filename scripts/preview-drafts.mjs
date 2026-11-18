#!/usr/bin/env node
// Copies Justin's private drafts into this repo for a local preview, so a
// draft case reads exactly as it will on the site. Cases go to
// content/drafts/ and their pictures to public/media/, both gitignored.
//
//   npm run preview          copy the drafts in, then start the dev server
//   npm run preview:clean    take them out again
//
// Nothing copied here is ever published. The Pages build keeps only cases
// marked share: 'public', CI never has these folders, and
// scripts/check-public.mjs fails a public build that finds public/media.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const cases = join(root, 'content/drafts')
const media = join(root, 'public/media')

rmSync(cases, { recursive: true, force: true })
rmSync(media, { recursive: true, force: true })
if (process.argv.includes('--clean')) {
  console.log('preview: drafts removed')
  process.exit(0)
}

const drafts = resolve(root, process.env.DRAFTS ?? '../portfolio-drafts')
if (!existsSync(join(drafts, 'cases'))) {
  console.error(`No drafts repo at ${drafts}. Clone justinbarton-toast/portfolio-drafts there, or set DRAFTS.`)
  process.exit(1)
}
mkdirSync(cases, { recursive: true })
const files = readdirSync(join(drafts, 'cases')).filter((f) => f.endsWith('.ts'))
for (const f of files) cpSync(join(drafts, 'cases', f), join(cases, f))
if (existsSync(join(drafts, 'media'))) cpSync(join(drafts, 'media'), media, { recursive: true })
console.log(`preview: ${files.length} draft cases copied in`)
