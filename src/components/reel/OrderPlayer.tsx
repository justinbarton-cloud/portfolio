'use client'

import { useEffect, useState } from 'react'
import type { Slide } from '../../../content/slides'
import { ReelPlayer } from './ReelPlayer'

/**
 * Plays a running order straight from the address (?order=key|key|...), so
 * the sorter's Play and Copy link need no saved file.
 */
export function OrderPlayer({ slides }: { slides: Slide[] }) {
  const [order, setOrder] = useState<Slide[] | null>(null)
  useEffect(() => {
    const byKey = Object.fromEntries(slides.map((s) => [s.key, s]))
    const keys = (new URLSearchParams(location.search).get('order') ?? '').split('|').filter(Boolean)
    setOrder(keys.map((k) => byKey[k]).filter(Boolean))
  }, [slides])
  if (!order) return null
  return <ReelPlayer id="play" title="Running order" slides={order} back="/reel/sort/" />
}
