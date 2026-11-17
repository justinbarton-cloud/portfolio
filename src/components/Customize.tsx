'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { faces, type ColorTokens, type Mode } from '../../content/themes'
import type { CustomizeTheme } from './customizeData'
import { MODE_KEY, THEME_KEY } from './ThemeScript'

/*
 * Customize: a theme and a mode, chosen independently, and the tokens that
 * result. The token table is the point. Every value on the page comes from
 * one of these names, so switching a theme visibly changes the answers while
 * the questions stay the same, which is how a token system works.
 *
 * Nothing re-renders the page. It sets data-theme and data-mode on <html>
 * and remembers them in this browser; the stylesheet does the rest.
 */
export type Pref = 'auto' | Mode

const html = () => document.documentElement
const subscribe = (cb: () => void) => {
  const o = new MutationObserver(cb)
  o.observe(html(), { attributes: true, attributeFilter: ['data-theme', 'data-mode', 'data-mode-pref'] })
  return () => o.disconnect()
}
export const useHtml = () =>
  useSyncExternalStore(
    subscribe,
    () => `${html().dataset.theme}|${html().dataset.mode}|${html().dataset.modePref ?? 'auto'}`,
    () => 'studio|light|auto',
  ).split('|') as [string, Mode, Pref]

const resolve = (t: CustomizeTheme, pref: Pref): Mode =>
  pref !== 'auto' ? pref : t.defaultMode === 'dark' || matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

/** Where a change came from, so the new look can spread out from there. */
export type Origin = { x: number; y: number }
export const originOf = (el: Element): Origin => {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

export function apply(themes: CustomizeTheme[], themeId: string, pref: Pref, from?: Origin) {
  const t = themes.find((x) => x.id === themeId) ?? themes[0]
  const run = () => {
    html().dataset.theme = t.id
    html().dataset.mode = resolve(t, pref)
    html().dataset.modePref = pref
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.color[resolve(t, pref)].surface)
  }
  try {
    localStorage.setItem(THEME_KEY, t.id)
    localStorage.setItem(MODE_KEY, pref)
  } catch {}
  const url = new URL(location.href)
  if (url.searchParams.has('theme') || url.searchParams.has('mode')) {
    url.searchParams.delete('theme')
    url.searchParams.delete('mode')
    history.replaceState(null, '', url)
  }

  // The new look grows as a circle from the control that asked for it. Where
  // the browser can't, or the reader prefers less motion, the colours fade.
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!from || still || !document.startViewTransition) return run()
  const r = Math.hypot(Math.max(from.x, innerWidth - from.x), Math.max(from.y, innerHeight - from.y))
  html().classList.add('vt')
  const vt = document.startViewTransition(run)
  vt.ready.then(() =>
    html().animate(
      { clipPath: [`circle(0px at ${from.x}px ${from.y}px)`, `circle(${r}px at ${from.x}px ${from.y}px)`] },
      { duration: 650, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
    ),
  )
  vt.finished.finally(() => html().classList.remove('vt'))
}

const COLOR_ROWS: [keyof ColorTokens, string][] = [
  ['surface', 'color.surface'],
  ['raised', 'color.surface.raised'],
  ['ink', 'color.ink'],
  ['inkMuted', 'color.ink.muted'],
  ['inkSubtle', 'color.ink.subtle'],
  ['line', 'color.line'],
  ['accent', 'color.accent'],
  ['accentAlt', 'color.accent.alt'],
  ['onAccent', 'color.on-accent'],
  ['action', 'color.action'],
  ['onAction', 'color.on-action'],
]

export function Customize({ themes, open, onClose }: { themes: CustomizeTheme[]; open: boolean; onClose: () => void }) {
  const [themeId, mode, pref] = useHtml()
  const t = themes.find((x) => x.id === themeId) ?? themes[0]
  const c = t.color[mode]
  const closeRef = useRef<HTMLButtonElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  }, [open, onClose])

  if (!open) return null
  const rows: [string, string, string?][] = [
    ...COLOR_ROWS.map(([k, name]) => [name, c[k], c[k]] as [string, string, string]),
    ['type.body', faces.atkinson.family],
    ['type.display', faces[t.type.display].family],
    ['type.display.weight', String(t.type.displayWeight)],
    ['type.display.tracking', t.type.displayTracking],
    ['type.display.leading', String(t.type.displayLeading)],
    ['type.label', `${faces[t.type.label].family}${t.type.labelCaps ? ', caps' : ''}`],
    ['shape.radius', t.shape.radius],
    ['interaction.press', t.press],
    ['motif', t.motif],
  ]

  const copy = async () => {
    const u = new URL(location.href)
    u.searchParams.set('theme', t.id)
    u.searchParams.set('mode', mode)
    await navigator.clipboard.writeText(u.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Customize the look">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]" />
      <aside className="absolute top-0 right-0 flex h-full w-[min(460px,100vw)] flex-col border-l border-rule bg-paper shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-rule px-6 py-5">
          <div>
            <div className="kicker">Customize</div>
            <p className="mt-2 text-[14px] leading-snug text-ink-soft">
              Every page asks for these {rows.length} tokens by name. Each theme answers them differently, in light and in dark.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 shrink-0 place-items-center rounded-full text-ink-soft ring-1 ring-rule hover:text-ink"
          >
            <svg viewBox="0 0 16 16" aria-hidden className="size-3.5">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="text-[14px] font-semibold text-ink">Mode</div>
          <div role="radiogroup" aria-label="Mode" className="mt-3 grid grid-cols-3 rounded-full bg-raised p-1 ring-1 ring-rule">
            {(['auto', 'light', 'dark'] as Pref[]).map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={pref === p}
                onClick={(e) => apply(themes, t.id, p, originOf(e.currentTarget))}
                className={`rounded-full py-2 text-[13.5px] capitalize transition ${pref === p ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'}`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="mt-8 text-[14px] font-semibold text-ink">Theme</div>
          <div role="radiogroup" aria-label="Theme" className="mt-3 grid grid-cols-2 gap-3">
            {themes.map((x) => {
              const xc = x.color[pref === 'auto' ? (x.defaultMode === 'dark' ? 'dark' : mode) : pref]
              const on = x.id === t.id
              return (
                <button
                  key={x.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={(e) => apply(themes, x.id, pref, originOf(e.currentTarget))}
                  className={`press overflow-hidden text-left transition ${on ? 'ring-2 ring-accent' : 'ring-1 ring-rule hover:ring-ink-faint'}`}
                  style={{ borderRadius: x.shape.radius, background: xc.surface }}
                >
                  <div className="px-4 pt-4 pb-3">
                    <div
                      style={{
                        fontFamily: `var(${faces[x.type.display].var})`,
                        fontWeight: x.type.displayWeight,
                        letterSpacing: x.type.displayTracking,
                        color: xc.ink,
                      }}
                      className="text-[34px] leading-none"
                    >
                      Aa
                    </div>
                    <div className="mt-3 flex gap-1">
                      {[xc.ink, xc.accent, xc.accentAlt, xc.line].map((col, i) => (
                        <span key={i} className="size-3.5 rounded-full ring-1 ring-black/10" style={{ background: col }} />
                      ))}
                    </div>
                  </div>
                  <div className="px-4 pb-4" style={{ color: xc.ink }}>
                    <div className="text-[14px] font-semibold">{x.name}</div>
                    {x.inspiredBy ? (
                      <div className="text-[12px]" style={{ color: xc.inkMuted }}>
                        After {x.inspiredBy}
                      </div>
                    ) : null}
                    <div className="mt-0.5 text-[12px] leading-snug" style={{ color: xc.inkMuted }}>
                      {x.mood}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-8 flex items-baseline justify-between">
            <div className="text-[14px] font-semibold text-ink">Tokens</div>
            <div className="font-mono text-[11px] text-ink-faint">
              {t.id} / {mode}
            </div>
          </div>
          <table className="mt-3 w-full border-t border-rule font-mono text-[12px]">
            <tbody>
              {rows.map(([name, value, swatch]) => (
                <tr key={name} className="border-b border-rule">
                  <td className="py-2 pr-3 text-ink-soft">{name}</td>
                  <td className="py-2 text-right text-ink">
                    {/* Keyed by value, so each change replays the flash. */}
                    <span key={value} className="token-flash inline-flex items-center gap-2 rounded px-1">
                      {swatch ? <span className="size-3 rounded-sm ring-1 ring-black/15" style={{ background: swatch }} /> : null}
                      {value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="border-t border-rule px-6 py-4">
          <button
            type="button"
            onClick={copy}
            className="press w-full rounded-[min(var(--radius),999px)] bg-action py-2.5 text-[14px] font-semibold text-on-action hover:brightness-110"
          >
            {copied ? 'Link copied' : 'Copy a link to this look'}
          </button>
        </footer>
      </aside>
    </div>,
    document.body,
  )
}
