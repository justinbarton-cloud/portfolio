import type { Metadata } from 'next'
import { allReels, reelById } from '../../../../content/site'
import { ReelPlayer } from '../../../components/reel/ReelPlayer'

export const dynamicParams = false
export const generateStaticParams = () => allReels.map((r) => ({ id: r.id }))

export async function generateMetadata({ params }: PageProps<'/reel/[id]'>): Promise<Metadata> {
  const { id } = await params
  return { title: reelById[id].title, robots: { index: false, follow: false } }
}

/** One reel, playing. */
export default async function ReelPage({ params }: PageProps<'/reel/[id]'>) {
  const { id } = await params
  const r = reelById[id]
  return <ReelPlayer id={r.id} title={r.title} slides={r.slides} back={r.fromCase ? `/work/${r.fromCase}/` : '/reel/'} />
}
