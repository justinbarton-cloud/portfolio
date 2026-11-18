'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Slide } from '../../../content/slides'
import { Fit, SlideView } from './SlideView'

/*
 * The reel: one slide at a time, scaled to fill the screen. Arrows, Page Up
 * and Down and Space step through it, Home and End jump, F goes full screen
 * and P opens the presenter view in a second window: this slide, the next
 * one, the notes and a timer. The two windows stay in step over a
 * BroadcastChannel, and the slide number lives in the address, so a reload
 * or a shared link lands on the same slide.
 */
export function ReelPlayer({ id, title, slides, back }: { id: string; title: string; slides: Slide[]; back: string }) {
  const [index, setIndex] = useState(0)
  const [presenter, setPresenter] = useState(false)
  const channel = useRef<BroadcastChannel | null>(null)
  const shell = useRef<HTMLDivElement>(null)
  const last = slides.length - 1

  const show = useCallback(
    (n: number, tell = true) => {
      const to = Math.max(0, Math.min(last, n))
      setIndex(to)
      history.replaceState(null, '', `${location.pathname}${location.search}#${to + 1}`)
      if (tell) channel.current?.postMessage({ index: to })
    },
    [last],
  )

  useEffect(() => {
    setPresenter(new URLSearchParams(location.search).has('presenter'))
    const n = parseInt(location.hash.slice(1), 10)
    if (n > 0) setIndex(Math.min(last, n - 1))
    if (typeof BroadcastChannel === 'undefined') return
    const ch = new BroadcastChannel(`reel:${id}`)
    ch.onmessage = (e) => typeof e.data?.index === 'number' && show(e.data.index, false)
    channel.current = ch
    return () => ch.close()
  }, [id, last, show])

  const fullscreen = () => (document.fullscreenElement ? document.exitFullscreen() : shell.current?.requestFullscreen())
  const openPresenter = () => {
    const q = new URLSearchParams(location.search)
    q.set('presenter', '')
    window.open(`${location.pathname}?${q}#${index + 1}`, `reel-presenter-${id}`, 'width=1280,height=800')
  }

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const key = e.key
      if (key === 'ArrowRight' || key === 'PageDown' || (key === ' ' && !e.shiftKey)) show(index + 1)
      else if (key === 'ArrowLeft' || key === 'PageUp' || (key === ' ' && e.shiftKey)) show(index - 1)
      else if (key === 'Home') show(0)
      else if (key === 'End') show(last)
      else if ((key === 'f' || key === 'F') && !presenter) fullscreen()
      else if ((key === 'p' || key === 'P') && !presenter) openPresenter()
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  })

  if (!slides.length) return <p className="p-10 text-ink-soft">This reel has no slides on this build.</p>
  if (presenter) return <Presenter slides={slides} index={index} show={show} title={title} />

  return (
    <div ref={shell} className="fixed inset-0 z-40 flex flex-col bg-paper">
      <Fit className="min-h-0 flex-1">
        <SlideView s={slides[index]} />
      </Fit>
      <Chrome
        title={title}
        index={index}
        count={slides.length}
        back={back}
        show={show}
        fullscreen={fullscreen}
        openPresenter={openPresenter}
      />
    </div>
  )
}

/** The bar under the slide. It fades when the mouse rests, so the room sees only the slide. */
function Chrome({
  title,
  index,
  count,
  back,
  show,
  fullscreen,
  openPresenter,
}: {
  title: string
  index: number
  count: number
  back: string
  show: (n: number) => void
  fullscreen: () => void
  openPresenter: () => void
}) {
  const [awake, setAwake] = useState(true)
  useEffect(() => {
    let t = setTimeout(() => setAwake(false), 2500)
    const wake = () => {
      setAwake(true)
      clearTimeout(t)
      t = setTimeout(() => setAwake(false), 2500)
    }
    window.addEventListener('mousemove', wake)
    window.addEventListener('keydown', wake)
    return () => {
      clearTimeout(t)
      window.removeEventListener('mousemove', wake)
      window.removeEventListener('keydown', wake)
    }
  }, [])
  const btn = 'press rounded-full px-3 py-1.5 text-[14px] text-ink-soft transition hover:bg-raised hover:text-ink'
  return (
    <div
      className={`flex items-center gap-2 border-t border-rule px-4 py-2 transition-opacity duration-500 ${awake ? 'opacity-100' : 'opacity-0'}`}
    >
      <Link href={back} className={btn}>
        ← Back
      </Link>
      <span className="mx-2 truncate text-[14px] text-ink-faint">{title}</span>
      <span className="ml-auto text-[14px] text-ink-faint tabular-nums">
        {index + 1} / {count}
      </span>
      <button type="button" onClick={() => show(index - 1)} aria-label="Previous slide" className={btn}>
        ←
      </button>
      <button type="button" onClick={() => show(index + 1)} aria-label="Next slide" className={btn}>
        →
      </button>
      <button type="button" onClick={openPresenter} className={btn}>
        Presenter view <span className="text-ink-faint">P</span>
      </button>
      <button type="button" onClick={fullscreen} className={btn}>
        Full screen <span className="text-ink-faint">F</span>
      </button>
    </div>
  )
}

/** The presenter's window: this slide, the next one, the notes and a timer. */
function Presenter({ slides, index, show, title }: { slides: Slide[]; index: number; show: (n: number) => void; title: string }) {
  const [start, setStart] = useState(() => Date.now())
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const secs = Math.max(0, Math.floor((now - start) / 1000))
  const clock = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`
  const next = slides[index + 1]
  return (
    <div className="fixed inset-0 z-40 grid grid-cols-[1.6fr_1fr] gap-6 bg-raised p-6">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <p className="truncate text-[15px] text-ink-faint">{title}</p>
          <p className="text-[15px] text-ink-faint tabular-nums">
            {index + 1} / {slides.length}
          </p>
        </div>
        <Fit className="aspect-video w-full rounded-[var(--radius)] ring-1 ring-rule">
          <SlideView s={slides[index]} still />
        </Fit>
        <div className="flex gap-3">
          <button type="button" onClick={() => show(index - 1)} className="press rounded-full px-5 py-2.5 text-[16px] ring-1 ring-rule">
            ← Back
          </button>
          <button type="button" onClick={() => show(index + 1)} className="press rounded-full bg-action px-6 py-2.5 text-[16px] font-semibold text-on-action">
            Next →
          </button>
        </div>
      </div>
      <div className="flex min-h-0 flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[44px] font-semibold tabular-nums">{clock}</p>
          <button type="button" onClick={() => setStart(Date.now())} className="text-[15px] text-ink-soft underline hover:text-ink">
            Reset timer
          </button>
        </div>
        <div>
          <p className="text-[14px] font-semibold text-ink-faint">Next</p>
          {next ? (
            <Fit className="mt-2 aspect-video w-full rounded-[calc(var(--radius)*0.6)] opacity-80 ring-1 ring-rule">
              <SlideView s={next} still />
            </Fit>
          ) : (
            <p className="mt-2 text-[16px] text-ink-soft">That&rsquo;s the last slide.</p>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto rounded-[var(--radius)] bg-paper p-5">
          <p className="text-[14px] font-semibold text-ink-faint">Notes</p>
          <p className="mt-2 text-[22px] leading-relaxed whitespace-pre-line">{slides[index].notes || 'No notes on this slide.'}</p>
        </div>
      </div>
    </div>
  )
}
