'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'
import { THEME_KEY, THEMES } from './ThemeScript'

const subscribe = (cb: () => void) => {
  const o = new MutationObserver(cb)
  o.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => o.disconnect()
}

/** The bar on every page: the name home, the three places, and the look. */
export function SiteNav() {
  const path = usePathname()
  const theme = useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme ?? 'paper', () => 'paper')
  const next = THEMES[(THEMES.findIndex((t) => t.id === theme) + 1) % THEMES.length]
  const flip = () => {
    document.documentElement.dataset.theme = next.id
    try {
      localStorage.setItem(THEME_KEY, next.id)
    } catch {}
  }
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
    <nav className="sticky top-0 z-30 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-6 py-3 sm:px-10">
        <Link href="/" className="display mr-auto text-[19px] leading-none text-ink">
          Justin Barton
        </Link>
        {item('/work/', 'Work')}
        {item('/about/', 'About')}
        <button
          type="button"
          onClick={flip}
          title={`Switch to the ${next.name} look`}
          aria-label={`Switch to the ${next.name} look`}
          className="ml-1 grid size-9 place-items-center rounded-full text-ink-soft ring-1 ring-rule transition hover:text-ink"
        >
          <svg viewBox="0 0 16 16" aria-hidden className="size-4">
            <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 2.5a5.5 5.5 0 0 1 0 11z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
