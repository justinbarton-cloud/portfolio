'use client'

import { useLayoutEffect, useRef, type ReactNode } from 'react'

/*
 * Holds the headline and the deck under it to one measure. A headline's
 * longest line ends wherever its words happen to break, so no fixed width can
 * match it. This measures that line and caps everything after the first
 * child at its width, through --measure. It measures again when fonts land
 * and when the column changes width. Before it runs, the CSS fallback holds
 * the deck a little inside the column.
 */
export function MatchMeasure({ children, className = '' }: { children: ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = box.current
    const head = el?.firstElementChild
    if (!el || !head) return
    const measure = () => {
      const range = document.createRange()
      range.selectNodeContents(head)
      const left = head.getBoundingClientRect().left
      const right = Math.max(...[...range.getClientRects()].map((r) => r.right))
      if (Number.isFinite(right)) el.style.setProperty('--measure', `${Math.ceil(right - left)}px`)
    }
    measure()
    document.fonts?.ready.then(measure)
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={box} className={className}>
      {children}
    </div>
  )
}
