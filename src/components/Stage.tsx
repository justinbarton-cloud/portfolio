'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Walkthrough } from '../../content/types'
import { Pic } from './Pic'

/*
 * The stage: a piece of work you can click through. A device frame drawn
 * only from the theme's tokens, so it changes with the look; the real
 * screens inside it; and one ring on each screen marking where its user
 * would press next. Press the ring, use the arrows, or the arrow keys.
 *
 * Every screen is in the page from the start and the current one fades in,
 * so stepping never waits on a network request.
 */
export function Stage({ w, label }: { w: Walkthrough; label: string }) {
  const [i, setI] = useState(0)
  const last = w.steps.length - 1
  const step = w.steps[i]
  const root = useRef<HTMLDivElement>(null)
  const go = useCallback((n: number) => setI(Math.max(0, Math.min(last, n))), [last])

  useEffect(() => {
    const el = root.current
    if (!el) return
    // The arrows step the walkthrough while it has somewhere to go, and
    // stop there, so inside a reel the next press moves to the next slide.
    const k = (e: KeyboardEvent) => {
      const to = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null
      if (to === null || to < 0 || to > last) return
      e.preventDefault()
      e.stopPropagation()
      go(to)
    }
    el.addEventListener('keydown', k)
    return () => el.removeEventListener('keydown', k)
  }, [i, go, last])

  return (
    <div ref={root} role="region" aria-roledescription="walkthrough" aria-label={label} className="stage">
      <div className="overflow-hidden rounded-[var(--radius)] bg-raised ring-1 ring-rule">
        {/* The browser's chrome, in the theme's own colours. */}
        <div className="flex items-center gap-3 border-b border-rule px-4 py-2.5">
          <span aria-hidden className="flex gap-1.5">
            {[0, 1, 2].map((d) => (
              <span key={d} className="size-2.5 rounded-full bg-rule" />
            ))}
          </span>
          <span className="mx-auto min-w-0 truncate rounded-full bg-paper px-4 py-1 text-[13px] text-ink-faint">
            {step.url ?? ''}
          </span>
          <span aria-hidden className="w-[42px]" />
        </div>

        <div className="relative aspect-[16/9] overflow-hidden bg-paper">
          {w.steps.map((s, n) => (
            <div
              key={s.screen.src}
              aria-hidden={n !== i}
              className={`stage-screen absolute inset-0 ${n === i ? 'is-on' : ''}`}
            >
              <Pic
                p={s.screen}
                sizes="(min-width: 1240px) 1160px, 100vw"
                priority={n === 0}
                className="absolute inset-0 h-full object-cover object-top"
              />
            </div>
          ))}
          {step.hotspot ? (
            <button
              key={i}
              type="button"
              onClick={() => go(i + 1)}
              aria-label={step.hotspot.label}
              title={step.hotspot.label}
              className="stage-spot absolute"
              style={{
                left: `${step.hotspot.x}%`,
                top: `${step.hotspot.y}%`,
                width: `${step.hotspot.w}%`,
                height: `${step.hotspot.h}%`,
              }}
            />
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div aria-live="polite" className="min-w-0">
          <p className="kicker">
            Step {i + 1} of {w.steps.length}
          </p>
          <h3 className="display mt-2 text-[24px] text-ink sm:text-[28px]">{step.title}</h3>
          <p className="mt-2 max-w-[40em] text-[17px] leading-relaxed text-ink-soft">{step.caption}</p>
        </div>
        <div className="flex items-center gap-3">
          <div aria-hidden className="mr-2 flex gap-1.5">
            {w.steps.map((_, n) => (
              <span key={n} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-6 bg-accent' : 'w-1.5 bg-rule'}`} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(i - 1)}
            disabled={i === 0}
            aria-label="Previous step"
            className="press grid size-11 place-items-center rounded-full text-ink ring-1 ring-rule transition hover:ring-ink disabled:opacity-35"
          >
            <span aria-hidden>←</span>
          </button>
          {i < last ? (
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label="Next step"
              className="press grid size-11 place-items-center rounded-full bg-action text-on-action"
            >
              <span aria-hidden>→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => go(0)}
              className="press rounded-full bg-action px-5 py-2.5 text-[15px] font-semibold text-on-action"
            >
              Start over
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
