#!/usr/bin/env node
// Imports the case studies from Justin's Webflow site into content/work/.
//
//   npm run import-webflow            every case on /projects
//   npm run import-webflow -- <slug>  one case
//
// For each case it reads the title, tag, role, timeline, hero image and the
// rich text (headings, paragraphs, lists, figures with captions), downloads
// every image into public/work/<id>/ with its real size, and writes
// content/work/<id>.ts. A file that already exists is left alone unless
// --force is passed, because imported cases get edited by hand afterwards.
//
// Long dashes are replaced with a comma, so the build's dash check passes,
// and every replacement is listed at the end so the sentence can be reworded
// properly. The original page is recorded as `source`.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { basename, join } from 'node:path'

const SITE = 'https://justinbarton.webflow.io'
const root = new URL('..', import.meta.url).pathname
const args = process.argv.slice(2)
const force = args.includes('--force')
const only = args.filter((a) => !a.startsWith('--'))

const get = async (url) => {
  const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 portfolio-import' } })
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return r.text()
}

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&(\w+);/g, (m, n) => entities[n] ?? m)

const dashes = []
const clean = (html, where) => {
  let t = decode(html.replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
  if (/[\u2013\u2014]/.test(t)) {
    const fixed = t.replace(/\s*[\u2013\u2014]\s*/g, ', ')
    dashes.push({ where, before: t, after: fixed })
    t = fixed
  }
  return t
}

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const TAGS = {
  'design leadership': 'design-leadership',
  'product design': 'product-design',
  innovation: 'innovation',
  'ux architecture': 'ux-architecture',
}

// Downloads an image once and reads its size with sips (macOS).
const pictures = async (id, src, alt, caption) => {
  const dir = join(root, 'public/work', id)
  mkdirSync(dir, { recursive: true })
  const name = decodeURIComponent(basename(new URL(src).pathname)).replace(/^[0-9a-f]{24}_/, '').replace(/[^\w.-]+/g, '-')
  const file = join(dir, name)
  if (!existsSync(file)) {
    const r = await fetch(src)
    if (!r.ok) throw new Error(`${r.status} ${src}`)
    writeFileSync(file, Buffer.from(await r.arrayBuffer()))
  }
  const size = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file], { encoding: 'utf8' })
  const w = +size.match(/pixelWidth: (\d+)/)?.[1]
  const h = +size.match(/pixelHeight: (\d+)/)?.[1]
  return { src: `/work/${id}/${name}`, w, h, alt: alt || '', ...(caption ? { caption } : {}) }
}

const importCase = async (path) => {
  const html = await get(SITE + path)
  const id = slug(path.split('/').pop())
  const out = join(root, 'content/work', `${id}.ts`)
  if (existsSync(out) && !force) return console.log(`skip ${id}: content/work/${id}.ts exists (use --force)`)

  const title = clean(html.match(/project-detail-heading-wrapper"><h2>(.*?)<\/h2>/s)?.[1] ?? id, `${id} title`)
  const tag = clean(html.match(/class="project-detail-subtext">(.*?)<\/h6>/s)?.[1] ?? '', `${id} tag`)
  const role = clean(html.match(/<h5>My Role<\/h5>.*?project-detail">(.*?)<\/div>/s)?.[1] ?? '', `${id} role`)
  const timeframe = clean(html.match(/<h5>Timeline<\/h5>.*?project-detail">(.*?)<\/div>/s)?.[1] ?? '', `${id} timeline`)
  const heroSrc = html.match(/project-detail-image-wrapper"><img[^>]*?\ssrc="([^"]+)"/s)?.[1]

  const rich = html.match(/<div class="rich-text w-richtext">(.*?)<\/div><\/div><\/div>/s)?.[1] ?? ''
  const body = []
  const re = /<(h[2-4]|p|ol|ul|figure)([^>]*)>(.*?)<\/\1>/gs
  for (const m of rich.matchAll(re)) {
    const [, tag, , inner] = m
    if (tag.startsWith('h')) body.push({ kind: 'h', text: clean(inner, `${id} heading`) })
    else if (tag === 'p') {
      // "1. Title, then a long dash, then what it was" paragraphs are really a numbered list, with
      // the title as each item's label.
      const raw = decode(inner.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
      const numbered = raw.match(/^\d+\.\s+(.+?)\s*[\u2013\u2014]\s*(.+)$/)
      if (numbered) {
        const item = { lead: numbered[1], text: numbered[2] }
        const last = body.at(-1)
        if (last?.kind === 'list' && last.ordered) last.items.push(item)
        else body.push({ kind: 'list', ordered: true, items: [item] })
        continue
      }
      const text = clean(inner, `${id} paragraph`)
      if (text) body.push({ kind: 'p', text })
    } else if (tag === 'ol' || tag === 'ul') {
      const items = [...inner.matchAll(/<li>(.*?)<\/li>/gs)].map(([, li]) => {
        const lead = li.match(/^\s*<strong>(.*?)<\/strong>/s)?.[1]
        const rest = lead ? li.replace(/^\s*<strong>.*?<\/strong>/s, '') : li
        return {
          ...(lead ? { lead: clean(lead, `${id} list`).replace(/:$/, '') } : {}),
          text: clean(rest, `${id} list`).replace(/^:\s*/, ''),
        }
      })
      body.push({ kind: 'list', ...(tag === 'ol' ? { ordered: true } : {}), items })
    } else if (tag === 'figure') {
      const src = inner.match(/<img[^>]*?\ssrc="([^"]+)"/s)?.[1]
      const alt = decode(inner.match(/<img[^>]*?\salt="([^"]*)"/s)?.[1] ?? '')
      const caption = clean(inner.match(/<figcaption>(.*?)<\/figcaption>/s)?.[1] ?? '', `${id} caption`)
      if (src) body.push({ kind: 'figure', picture: await pictures(id, src, alt, caption) })
    }
  }

  const problem = body.find((b, i) => b.kind === 'p' && body[i - 1]?.kind === 'h')
  const summary = problem ? (problem.text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? problem.text) : title
  const record = {
    id,
    title,
    summary,
    chapter: 'hpe',
    company: 'Hewlett Packard Enterprise',
    role,
    timeframe,
    date: '2025-01',
    tags: [TAGS[tag.toLowerCase()] ?? 'product-design'],
    share: 'public',
    ...(heroSrc ? { cover: await pictures(id, heroSrc, '') } : {}),
    body,
    source: SITE + path,
  }
  mkdirSync(join(root, 'content/work'), { recursive: true })
  writeFileSync(
    out,
    `import type { Case } from '../types'

// Imported from ${SITE + path} by npm run import-webflow.
// Edit freely: the importer won't overwrite this file without --force.
const work: Case = ${JSON.stringify(record, null, 2)}

export default work
`,
  )
  console.log(`wrote content/work/${id}.ts: ${body.length} blocks, ${body.filter((b) => b.kind === 'figure').length} figures`)
}

const list = await get(`${SITE}/projects`)
const paths = [...new Set([...list.matchAll(/href="(\/projects\/[^"#?]+)"/g)].map((m) => m[1]))]
for (const p of paths) if (!only.length || only.some((o) => p.endsWith(o))) await importCase(p)

if (dashes.length) {
  console.log(`\nReplaced long dashes in ${dashes.length} places. Reword these by hand:`)
  for (const d of dashes) console.log(`- ${d.where}: ${d.after}`)
}
