import { chapters } from './about'
import { reels as reelFiles, work } from './registry.generated'
import { buildPool, resolveReel, slidesOf, type Slide } from './slides'
import type { Case, ChapterId, Reel } from './types'

/**
 * The Pages build is the public site, so it only ever holds cases marked
 * `share: 'public'`. Local dev and `npm run check` show everything, with
 * internal cases marked.
 */
export const publicOnly = !!process.env.PAGES_BASE_PATH

/** Every case, newest first, deep cases ahead of light ones on the same date. */
export const allCases: Case[] = work
  .map((w) => w.work)
  .filter((c) => !publicOnly || c.share === 'public')
  .sort((a, b) => (a.date === b.date ? Number(!!b.deep) - Number(!!a.deep) || a.id.localeCompare(b.id) : a.date < b.date ? 1 : -1))

export const caseById: Record<string, Case> = Object.fromEntries(allCases.map((c) => [c.id, c]))

/** The few cases told in full, which lead the home page. */
export const deepCases = allCases.filter((c) => c.deep)

export const casesIn = (chapter: ChapterId) => allCases.filter((c) => c.chapter === chapter)

export const chapterOf = (id: ChapterId) => chapters.find((c) => c.id === id)!

export const tagLabels: Record<Case['tags'][number], string> = {
  'design-leadership': 'Design leadership',
  'product-design': 'Product design',
  systems: 'Systems',
  'ux-architecture': 'UX architecture',
  innovation: 'Innovation',
  accessibility: 'Accessibility',
  ai: 'AI and agents',
  strategy: 'Strategy',
}

/** The next case in reading order, for the foot of a case page. */
export const nextCase = (id: string) => {
  const i = allCases.findIndex((c) => c.id === id)
  return allCases[(i + 1) % allCases.length]
}

// ---------------------------------------------------------------- reels

/** Every slide on this build, from the cases it holds and the reels' own slides. */
export const pool = buildPool(
  allCases,
  reelFiles.map((r) => r.reel),
)

/**
 * The reels that can play here: each saved reel with at least one slide on
 * this build (so a reel built from drafts never shows on the public site),
 * then one for every case, made from the case itself.
 */
export const allReels: { id: string; title: string; slides: Slide[]; fromCase?: string }[] = [
  ...reelFiles
    .map(({ reel }: { reel: Reel }) => ({ id: reel.id, title: reel.title, slides: resolveReel(reel, pool.byKey) }))
    .filter((r) => r.slides.some((s) => s.caseId)),
  ...allCases.map((c) => ({ id: `case-${c.id}`, title: c.title, slides: slidesOf(c), fromCase: c.id })),
]
export const reelById = Object.fromEntries(allReels.map((r) => [r.id, r]))
