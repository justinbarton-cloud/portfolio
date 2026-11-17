'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { apply, Customize } from './Customize'
import type { CustomizeTheme } from './customizeData'

const subscribe = (cb: () => void) => {
  const o = new MutationObserver(cb)
  o.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-mode'] })
  return () => o.disconnect()
}

/**
 * The bar on every page: the name home, the places, a one tap light or dark
 * switch, and Customize, which says which theme is on.
 */
export function SiteNav({ themes }: { themes: CustomizeTheme[] }) {
  const path = usePathname()
  const [open, setOpen] = useState(false)
  const [themeId, mode] = useSyncExternalStore(
    subscribe,
    () => `${document.documentElement.dataset.theme}|${document.documentElement.dataset.mode}`,
    () => '|',
  ).split('|')
  const theme = themes.find((t) => t.id === themeId)
  // Anything on the page can open Customize, like the spec line on the home page.
  useEffect(() => {
    const o = () => setOpen(true)
    window.addEventListener('open-customize', o)
    return () => window.removeEventListener('open-customize', o)
  }, [])

  const item = (href: string, label: string) => {
    const on = href === '/' ? path === '/' : path.startsWith(href)
    return (
      <Link
        href={href}
        aria-current={on ? 'page' : undefined}
        className={`rounded-full px-3 py-1.5 text-[14px] transition ${on ? 'bg-ink text-paper' : 'text-ink-soft hover:text-ink'}`}
      >
        {label}
      </Link>
    )
  }
  return (
    <nav className="sticky top-0 z-30 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center gap-1.5 px-6 py-3 sm:px-10">
        <Link href="/" className="display mr-auto whitespace-nowrap text-[20px] leading-none text-ink">
          Justin Barton
        </Link>
        {item('/work/', 'Work')}
        {item('/about/', 'About')}
        <button
          type="button"
          onClick={() => apply(themes, themeId || 'studio', mode === 'dark' ? 'light' : 'dark')}
          aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={mode === 'dark' ? 'Light mode' : 'Dark mode'}
          className="ml-1 grid size-9 place-items-center rounded-full text-ink-soft ring-1 ring-rule transition hover:text-ink"
        >
          {mode === 'dark' ? (
            <svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="currentColor">
              <path d="M13.2 10.2A5.8 5.8 0 0 1 5.8 2.8a5.8 5.8 0 1 0 7.4 7.4z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full py-1.5 pr-3.5 pl-2 text-[14px] text-ink-soft ring-1 ring-rule transition hover:text-ink"
        >
          <span aria-hidden className="grid grid-cols-2 gap-[2px]">
            {['var(--ink)', 'var(--accent)', 'var(--accent-alt)', 'var(--line)'].map((c, i) => (
              <span key={i} className="size-[7px] rounded-[2px]" style={{ background: c }} />
            ))}
          </span>
          <span className="hidden sm:inline">{theme ? theme.name : 'Customize'}</span>
        </button>
      </div>
      <Customize themes={themes} open={open} onClose={() => setOpen(false)} />
    </nav>
  )
}
