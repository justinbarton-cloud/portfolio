import type { Metadata } from 'next'
import { allCases, allReels, pool } from '../../../../content/site'
import { slidesOf } from '../../../../content/slides'
import { ReelSorter } from '../../../components/reel/ReelSorter'

export const metadata: Metadata = { title: 'Build a reel', robots: { index: false, follow: false } }

/** The sorter, with every slide on this build. */
export default function Sort() {
  const custom = pool.slides.filter((s) => s.custom).map((s) => s.key)
  const library = [
    ...allCases.map((c) => ({ id: c.id, title: c.title, keys: slidesOf(c).map((s) => s.key) })),
    ...(custom.length ? [{ id: 'custom', title: 'Title and context slides from saved reels', keys: custom }] : []),
  ]
  const starts = allReels.map((r) => ({ id: r.id, title: r.fromCase ? `Case: ${r.title}` : `Reel: ${r.title}`, keys: r.slides.map((s) => s.key) }))
  return <ReelSorter slides={pool.slides} library={library} starts={starts} />
}
