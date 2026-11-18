/**
 * Cases as slides. Every case already reads top to bottom as a talk, so it
 * becomes one: a cover, a slide per section, a slide per picture, list and
 * quote, the walkthrough playing live, then the team and what changed. A
 * section's own paragraphs become the presenter's notes for it, so the case
 * text and the talk never drift apart.
 *
 * Keys are stable across edits: `<case id>/<part>`, where the part names its
 * heading or its picture, not its position. A reel that points at
 * `global-accessibility-hpe/section:the-problem` keeps working when a
 * paragraph is added above it.
 */
import type { Case, Impact, Picture, Reel, ReelSlide, Walkthrough } from './types'

export type SlideKind = 'cover' | 'section' | 'figure' | 'list' | 'quote' | 'stage' | 'team' | 'impact' | 'title' | 'context'

export type Slide = {
  key: string
  kind: SlideKind
  /** Its name in the sorter. */
  label: string
  caseId?: string
  caseTitle?: string
  eyebrow?: string
  headline?: string
  lede?: string
  points?: { lead?: string; text: string }[]
  meta?: [string, string][]
  picture?: Picture
  walkthrough?: Walkthrough
  quote?: { text: string; attribution: string }
  team?: NonNullable<Case['team']>
  impact?: Impact[]
  notes: string
  /** A slide written in a reel file rather than drawn from a case, kept so the sorter can write it back. */
  custom?: ReelSlide
}

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
const fileOf = (src: string) => (src.split('/').pop() ?? src).replace(/\.[a-z]+$/i, '')
/** Imported headings can carry invisible joiners and a trailing colon. A slide wants neither. */
const clean = (t: string) => t.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/:\s*$/, '').trim()
const firstSentence = (t: string) => (t.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? t).trim()

/** Every slide a case can give, in reading order. */
export function slidesOf(c: Case): Slide[] {
  const out: Slide[] = []
  const seen = new Set<string>()
  const add = (s: Omit<Slide, 'caseId' | 'caseTitle'>) => {
    let key = s.key
    for (let n = 2; seen.has(key); n++) key = `${s.key}~${n}`
    seen.add(key)
    const slide: Slide = { ...s, key, caseId: c.id, caseTitle: c.title }
    out.push(slide)
    return slide
  }

  const cover = add({
    key: `${c.id}/cover`,
    kind: 'cover',
    label: 'Cover',
    eyebrow: c.company,
    headline: c.title,
    lede: c.summary,
    meta: [
      ['My role', c.role],
      ['Timeline', c.timeframe],
    ],
    picture: c.cover,
    notes: c.summary,
  })
  if (c.walkthrough)
    add({
      key: `${c.id}/stage`,
      kind: 'stage',
      label: 'Walkthrough',
      eyebrow: c.company,
      headline: c.title,
      walkthrough: c.walkthrough,
      notes: c.walkthrough.steps.map((s, i) => `${i + 1}. ${s.title}. ${s.caption}`).join('\n'),
    })

  let section: Slide | null = null
  let at = 'intro'
  for (const b of c.body ?? []) {
    if (b.kind === 'h') {
      at = slug(b.text)
      section = add({ key: `${c.id}/section:${at}`, kind: 'section', label: clean(b.text), eyebrow: c.company, headline: clean(b.text), notes: '' })
    } else if (b.kind === 'p') {
      const target = section ?? cover
      target.notes = target === cover && target.notes === c.summary ? b.text : `${target.notes}${target.notes ? '\n\n' : ''}${b.text}`
      if (section && !section.lede) section.lede = firstSentence(b.text)
    } else if (b.kind === 'figure') {
      add({
        key: `${c.id}/figure:${fileOf(b.picture.src)}`,
        kind: 'figure',
        label: b.picture.caption ?? b.picture.alt,
        picture: b.picture,
        lede: b.picture.caption,
        notes: b.picture.caption ?? b.picture.alt,
      })
    } else if (b.kind === 'list') {
      add({
        key: `${c.id}/list:${at}`,
        kind: 'list',
        label: `${section?.headline ?? c.title}, the list`,
        eyebrow: c.company,
        headline: section?.headline ?? c.title,
        points: b.items,
        notes: b.items.map((i) => `${i.lead ? `${i.lead}. ` : ''}${i.text}`).join('\n'),
      })
    } else if (b.kind === 'quote') {
      add({
        key: `${c.id}/quote:${at}`,
        kind: 'quote',
        label: `Quote: ${b.attribution}`,
        quote: { text: b.text, attribution: b.attribution },
        notes: b.text,
      })
    }
  }

  if (c.team?.length)
    add({
      key: `${c.id}/team`,
      kind: 'team',
      label: 'The team',
      eyebrow: c.company,
      headline: 'The team',
      team: c.team,
      notes: c.team.map((m) => `${m.name}, ${m.role}. ${m.did}`).join('\n'),
    })
  if (c.impact?.length)
    add({
      key: `${c.id}/impact`,
      kind: 'impact',
      label: 'What changed',
      eyebrow: c.company,
      headline: 'What changed',
      impact: c.impact,
      notes: c.impact.map((i) => (i.kind === 'measured' ? `${i.text} (${i.source})` : i.text)).join('\n'),
    })
  return out
}

/** A slide written in a reel file, as a slide. */
const customSlide = (reelId: string, s: ReelSlide, i: number): Slide | null =>
  s.kind === 'title'
    ? { key: `reel:${reelId}/${i}`, kind: 'title', label: s.headline, headline: s.headline, lede: s.deck, notes: s.notes ?? '', custom: s }
    : s.kind === 'context'
      ? {
          key: `reel:${reelId}/${i}`,
          kind: 'context',
          label: s.headline,
          eyebrow: s.eyebrow,
          headline: s.headline,
          points: s.points?.map((text) => ({ text })),
          notes: s.notes ?? '',
          custom: s,
        }
      : null

/** Every slide there is: each case's, then each reel's own title and context slides. */
export function buildPool(cases: Case[], reels: Reel[]) {
  const slides = [...cases.flatMap(slidesOf), ...reels.flatMap((r) => r.slides.map((s, i) => customSlide(r.id, s, i)).filter((s): s is Slide => !!s))]
  return { slides, byKey: Object.fromEntries(slides.map((s) => [s.key, s])) as Record<string, Slide> }
}

/** A reel's slides, in its order. Slides whose case isn't on this build are skipped. */
export function resolveReel(r: Reel, byKey: Record<string, Slide>): Slide[] {
  return r.slides.flatMap((s, i) => {
    if (s.kind !== 'from') return [byKey[`reel:${r.id}/${i}`]]
    const found = byKey[s.key]
    return found ? [{ ...found, notes: s.notes ?? found.notes }] : []
  })
}

/** The running order as a reel file's slides, for the sorter's Copy as code. */
export function toReelSlides(order: string[], byKey: Record<string, Slide>): ReelSlide[] {
  return order.flatMap((k) => {
    const s = byKey[k]
    if (!s) return []
    return [s.custom ?? { kind: 'from' as const, key: k }]
  })
}
