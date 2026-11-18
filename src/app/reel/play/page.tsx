import type { Metadata } from 'next'
import { pool } from '../../../../content/site'
import { OrderPlayer } from '../../../components/reel/OrderPlayer'

export const metadata: Metadata = { title: 'Running order', robots: { index: false, follow: false } }

/** A running order from the sorter, playing. */
export default function Play() {
  return <OrderPlayer slides={pool.slides} />
}
