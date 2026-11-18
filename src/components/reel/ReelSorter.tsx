'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { pageHref } from '../../../content/base'
import { toReelSlides, type Slide } from '../../../content/slides'
import { Fit, SlideView } from './SlideView'

type Group = { id: string; title: string; keys: string[] }

const KEY = 'jb-portfolio:reel-order'
const enc = (order: string[]) => encodeURIComponent(order.join('|'))

/*
 * The sorter: every slide the site can make, grouped by case, and a running
 * order you build from them. Drag a slide in, or press Add. In the running
 * order, drag to reorder, or select a slide and use the arrow keys to move it
 * and Delete to take it out. Play runs it; Copy link shares that exact order;
 * Copy as code gives a reel file for content/reels/.
 */
export function ReelSorter({ slides, library, starts }: { slides: Slide[]; library: Group[]; starts: Group[] }) {
  const byKey = useMemo(() => Object.fromEntries(slides.map((s) => [s.key, s])), [slides])
  const [order, setOrder] = useState<string[]>([])
  const [sel, setSel] = useState<number | null>(null)
  const [copied, setCopied] = useState('')
  const [over, setOver] = useState<number | null>(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? '[]') as string[]
      setOrder(saved.filter((k) => byKey[k]))
    } catch {}
  }, [byKey])
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(order))
    } catch {}
  }, [order])

  const insert = (key: string, at = order.length) =>
    setOrder((o) => {
      const without = o.filter((k) => k !== key)
      const i = Math.min(at, without.length)
      return [...without.slice(0, i), key, ...without.slice(i)]
    })
  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length) return
    setOrder((o) => {
      const next = [...o]
      const [k] = next.splice(from, 1)
      next.splice(to, 0, k)
      return next
    })
    setSel(to)
  }
  const remove = (i: number) => {
    setOrder((o) => o.filter((_, n) => n !== i))
    setSel(null)
  }
  const flash = (what: string) => {
    setCopied(what)
    setTimeout(() => setCopied(''), 1800)
  }
  const playHref = `/reel/play/?order=${enc(order)}`
  const copyLink = async () => {
    await navigator.clipboard.writeText(`${location.origin}${pageHref(playHref)}`)
    flash('link')
  }
  const copyCode = async () => {
    const code = `import type { Reel } from '../types'

const reel: Reel = {
  id: 'my-talk',
  title: 'My talk',
  slides: ${JSON.stringify(toReelSlides(order, byKey), null, 2).replace(/\n/g, '\n  ')},
}

export default reel
`
    await navigator.clipboard.writeText(code)
    flash('code')
  }
  const startFrom = (id: string) => {
    const g = starts.find((s) => s.id === id)
    if (!g) return setOrder([])
    if (order.length && !confirm(`Replace the running order with ${g.title}?`)) return
    setOrder(g.keys.filter((k) => byKey[k]))
    setSel(null)
  }
  const present = new Set(order)
  const btn = 'press rounded-full px-4 py-2 text-[15px] ring-1 ring-rule transition hover:ring-ink'

  return (
    <main className="mx-auto max-w-[1440px] px-6 pt-12 pb-24 sm:px-10">
      <p className="kicker">Reels</p>
      <h1 className="display mt-3 text-[40px] text-ink sm:text-[52px]">Build a talk from the work.</h1>
      <p className="mt-4 max-w-[46em] text-[18px] leading-relaxed text-ink-soft">
        Every case is already a set of slides, and its own words are the presenter notes. Pull slides into a running order, then play it.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label className="text-[15px] text-ink-soft" htmlFor="start">
          Start from
        </label>
        <select
          id="start"
          defaultValue=""
          onChange={(e) => startFrom(e.target.value)}
          className="rounded-[min(var(--radius),12px)] bg-raised px-3 py-2 text-[15px] text-ink ring-1 ring-rule"
        >
          <option value="">Choose a reel or a case</option>
          {starts.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
        <span className="ml-auto" />
        <Link href={playHref} aria-disabled={!order.length} className={`press rounded-full bg-action px-5 py-2 text-[15px] font-semibold text-on-action ${order.length ? '' : 'pointer-events-none opacity-40'}`}>
          Play
        </Link>
        <button type="button" onClick={copyLink} disabled={!order.length} className={`${btn} disabled:opacity-40`}>
          {copied === 'link' ? 'Link copied' : 'Copy link'}
        </button>
        <button type="button" onClick={copyCode} disabled={!order.length} className={`${btn} disabled:opacity-40`}>
          {copied === 'code' ? 'Code copied' : 'Copy as code'}
        </button>
        <button type="button" onClick={() => order.length && confirm('Clear the running order?') && setOrder([])} className={btn}>
          Clear
        </button>
      </div>

      <section className="mt-8 rounded-[var(--radius)] bg-raised p-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[17px] font-semibold text-ink">Running order</h2>
          <p className="text-[14px] text-ink-faint">
            {order.length} slide{order.length === 1 ? '' : 's'}. Drag to reorder, or select one and use ← → and Delete.
          </p>
        </div>
        <ol
          className="mt-4 grid min-h-[140px] grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const k = e.dataTransfer.getData('text/reel-key')
            if (k && over === null) insert(k)
            setOver(null)
          }}
        >
          {order.map((k, i) => {
            const s = byKey[k]
            return (
              <li
                key={k}
                draggable
                tabIndex={0}
                onDragStart={(e) => e.dataTransfer.setData('text/reel-key', k)}
                onDragOver={(e) => {
                  e.preventDefault()
                  setOver(i)
                }}
                onDragLeave={() => setOver(null)}
                onDrop={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  const dragged = e.dataTransfer.getData('text/reel-key')
                  setOver(null)
                  if (!dragged) return
                  insert(dragged, i)
                }}
                onClick={() => setSel(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') move(i, i + 1)
                  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') move(i, i - 1)
                  else if (e.key === 'Delete' || e.key === 'Backspace') remove(i)
                  else return
                  e.preventDefault()
                }}
                className={`cursor-grab rounded-[calc(var(--radius)*0.6)] outline-none ${sel === i ? 'ring-2 ring-accent' : ''} ${over === i ? 'translate-x-1' : ''}`}
              >
                <Fit className="pointer-events-none aspect-video w-full rounded-[calc(var(--radius)*0.6)] ring-1 ring-rule">
                  <SlideView s={s} still />
                </Fit>
                <p className="mt-1.5 truncate text-[13px] text-ink-soft">
                  <span className="text-ink-faint tabular-nums">{i + 1}.</span> {s.label}
                </p>
              </li>
            )
          })}
          {!order.length ? (
            <li className="col-span-full grid place-items-center rounded-[calc(var(--radius)*0.6)] border-2 border-dashed border-rule p-8 text-[15px] text-ink-faint">
              Drag slides here, or press Add on any slide below.
            </li>
          ) : null}
        </ol>
        {sel !== null && order[sel] ? (
          <div className="mt-5 border-t border-rule pt-4">
            <p className="text-[14px] font-semibold text-ink-faint">Presenter notes for slide {sel + 1}</p>
            <p className="mt-1 max-w-[70ch] text-[16px] leading-relaxed whitespace-pre-line text-ink-soft">{byKey[order[sel]].notes || 'No notes on this slide.'}</p>
            <button type="button" onClick={() => remove(sel)} className="mt-3 text-[14px] text-ink-soft underline hover:text-ink">
              Take it out
            </button>
          </div>
        ) : null}
      </section>

      <section className="mt-12">
        <h2 className="display text-[28px] text-ink">Library</h2>
        {library.map((g) => (
          <details key={g.id} className="mt-4 border-t border-rule pt-4" open={library.length < 4}>
            <summary className="cursor-pointer text-[17px] font-semibold text-ink">
              {g.title} <span className="font-normal text-ink-faint">({g.keys.length})</span>
            </summary>
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {g.keys.map((k) => {
                const s = byKey[k]
                const used = present.has(k)
                return (
                  <li key={k} draggable onDragStart={(e) => e.dataTransfer.setData('text/reel-key', k)} className="cursor-grab">
                    <Fit className={`pointer-events-none aspect-video w-full rounded-[calc(var(--radius)*0.6)] ring-1 ring-rule ${used ? 'opacity-45' : ''}`}>
                      <SlideView s={s} still />
                    </Fit>
                    <div className="mt-1.5 flex items-center gap-2">
                      <p className="min-w-0 flex-1 truncate text-[13px] text-ink-soft">{s.label}</p>
                      <button type="button" onClick={() => insert(k)} className="shrink-0 text-[13px] text-accent underline">
                        {used ? 'Move to end' : 'Add'}
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </details>
        ))}
      </section>
    </main>
  )
}
