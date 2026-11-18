'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Case, Picture } from '../../../content/types'
import { CaseBody } from '../CaseBody'
import { Pic } from '../Pic'
import { Stage } from '../Stage'
import { deriveKey, forget, open as _open, openJson, openPicture, recall, remember, vaultMeta } from './crypto'

void _open

type Entry = Pick<Case, 'id' | 'title' | 'summary' | 'company' | 'timeframe' | 'cover'> & { file: string }
type Manifest = { sealed: string; cases: Entry[] }

/*
 * Private work: Toast cases sealed with a password by scripts/seal.mjs. The
 * page ships nothing readable. The password stretches into a key in this
 * browser, the key opens the list, and each case and picture is decrypted
 * only when it's shown. Cases are addressed by #id so the static site needs
 * no route per case.
 */
export function Vault() {
  const [state, setState] = useState<'loading' | 'none' | 'locked' | 'open'>('loading')
  const [key, setKey] = useState<CryptoKey | null>(null)
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [pw, setPw] = useState('')
  const [busy, setBusy] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [hash, setHash] = useState('')

  useEffect(() => {
    const h = () => setHash(decodeURIComponent(location.hash.slice(1)))
    h()
    addEventListener('hashchange', h)
    return () => removeEventListener('hashchange', h)
  }, [])

  const unlock = useCallback(async (k: CryptoKey) => {
    const meta = await vaultMeta()
    if (!meta) return false
    try {
      setManifest(await openJson<Manifest>(k, meta.manifest))
      setKey(k)
      setState('open')
      return true
    } catch {
      return false
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      const meta = await vaultMeta().catch(() => null)
      if (!meta) return setState('none')
      const k = await recall()
      if (k && (await unlock(k))) return
      forget()
      setState('locked')
    })()
  }, [unlock])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setWrong(false)
    const meta = await vaultMeta()
    if (!meta) return setState('none')
    const k = await deriveKey(pw, meta)
    if (await unlock(k)) {
      await remember(k)
      setPw('')
    } else setWrong(true)
    setBusy(false)
  }

  const lock = () => {
    forget()
    setKey(null)
    setManifest(null)
    setState('locked')
    history.replaceState(null, '', location.pathname)
  }

  if (state === 'loading') return <Shell />
  if (state === 'none')
    return (
      <Shell>
        <p className="mt-8 text-[19px] text-ink-soft">Nothing&rsquo;s here yet.</p>
      </Shell>
    )
  if (state === 'locked')
    return (
      <Shell>
        <form onSubmit={submit} className="mt-10 flex max-w-[30rem] flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="vault-pw">
            Password
          </label>
          <input
            id="vault-pw"
            type="password"
            autoComplete="current-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            aria-invalid={wrong}
            aria-describedby={wrong ? 'vault-wrong' : undefined}
            className="min-w-0 flex-1 rounded-[min(var(--radius),999px)] bg-raised px-5 py-3 text-[17px] text-ink ring-1 ring-rule outline-none placeholder:text-ink-faint focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            disabled={!pw || busy}
            className="press rounded-[min(var(--radius),999px)] bg-action px-6 py-3 text-[16px] font-semibold text-on-action disabled:opacity-50"
          >
            {busy ? 'Opening' : 'Open'}
          </button>
        </form>
        {wrong ? (
          <p id="vault-wrong" role="alert" className="mt-3 text-[16px] text-accent">
            That password doesn&rsquo;t open it.
          </p>
        ) : null}
      </Shell>
    )

  const entry = manifest!.cases.find((c) => c.id === hash)
  if (entry && key) return <SealedCase k={key} entry={entry} onLock={lock} />
  return (
    <Shell open onLock={lock}>
      {manifest!.cases.length ? (
        <div className="mt-12">
          {manifest!.cases.map((c) => (
            <SealedRow key={c.id} k={key!} c={c} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-[19px] text-ink-soft">Nothing&rsquo;s been sealed yet.</p>
      )}
    </Shell>
  )
}

function Shell({ children, open, onLock }: { children?: React.ReactNode; open?: boolean; onLock?: () => void }) {
  return (
    <main className="mx-auto max-w-[1240px] px-6 pt-16 sm:px-10 sm:pt-24">
      <div className="flex items-start justify-between gap-6">
        <p className="kicker">Private work</p>
        {open ? (
          <button type="button" onClick={onLock} className="text-[15px] text-ink-soft underline hover:text-ink">
            Lock
          </button>
        ) : null}
      </div>
      <h1 className="display mt-4 max-w-[18ch] text-[44px] text-ink sm:text-[64px]">Work I can only show you directly.</h1>
      <p className="mt-6 max-w-[38em] text-[20px] leading-relaxed text-ink-soft">
        Toast work that isn&rsquo;t public yet. If I sent you here, I sent you the password too.
      </p>
      {children}
    </main>
  )
}

const useBlob = (k: CryptoKey, p?: Picture) => {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!p) return
    let u: string | null = null
    openPicture(k, p.src).then((x) => setUrl((u = x)))
    return () => {
      if (u) URL.revokeObjectURL(u)
    }
  }, [k, p])
  return url
}

function SealedRow({ k, c }: { k: CryptoKey; c: Entry }) {
  const cover = useBlob(k, c.cover)
  return (
    <a href={`#${c.id}`} className="group grid grid-cols-[88px_1fr] items-start gap-5 border-t border-rule py-7 sm:grid-cols-[200px_1fr_auto] sm:gap-10">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--radius)*0.6)] bg-raised">
        {cover && c.cover ? <Pic p={{ ...c.cover, src: cover }} sizes="200px" className="absolute inset-0 h-full object-cover" /> : null}
      </div>
      <div className="min-w-0">
        <p className="text-[15px] text-ink-faint">{c.company}</p>
        <h2 className="display mt-1 text-[22px] text-ink transition group-hover:text-accent sm:text-[26px]">{c.title}</h2>
        <p className="mt-2 line-clamp-2 max-w-[60ch] text-[17px] leading-relaxed text-ink-soft">{c.summary}</p>
      </div>
      <div className="hidden pt-1.5 text-[15px] whitespace-nowrap text-ink-faint sm:block">{c.timeframe}</div>
    </a>
  )
}

/** Swaps every sealed picture in a case for a blob URL, decrypting them all at once. */
async function openCase(k: CryptoKey, file: string) {
  const c = await openJson<Case>(k, file)
  const pic = async (p?: Picture) => (p ? { ...p, src: await openPicture(k, p.src) } : p)
  const [cover, body, steps] = await Promise.all([
    pic(c.cover),
    Promise.all((c.body ?? []).map(async (b) => (b.kind === 'figure' ? { ...b, picture: (await pic(b.picture))! } : b))),
    Promise.all((c.walkthrough?.steps ?? []).map(async (s) => ({ ...s, screen: (await pic(s.screen))! }))),
  ])
  return { ...c, cover, body, walkthrough: c.walkthrough ? { ...c.walkthrough, steps } : undefined } as Case
}

function SealedCase({ k, entry, onLock }: { k: CryptoKey; entry: Entry; onLock: () => void }) {
  const [c, setC] = useState<Case | null>(null)
  useEffect(() => {
    let alive = true
    setC(null)
    openCase(k, entry.file).then((x) => alive && setC(x))
    scrollTo(0, 0)
    return () => {
      alive = false
    }
  }, [k, entry.file])
  return (
    <main className="pt-16 sm:pt-24">
      <header className="mx-auto max-w-[1240px] px-6 sm:px-10">
        <div className="flex items-start justify-between gap-6">
          <a href="#" className="kicker hover:underline">
            ← Private work
          </a>
          <button type="button" onClick={onLock} className="text-[15px] text-ink-soft underline hover:text-ink">
            Lock
          </button>
        </div>
        <h1 className="display mt-4 max-w-[20ch] text-[40px] text-ink sm:text-[56px] lg:text-[68px]">{entry.title}</h1>
        <p className="mt-6 max-w-[38em] text-[21px] leading-relaxed text-ink-soft">{entry.summary}</p>
        {c ? (
          <dl className="mt-10 grid max-w-[760px] grid-cols-2 gap-6 sm:grid-cols-3">
            {[
              ['My role', c.role],
              ['Timeline', c.timeframe],
              ['Company', c.company],
            ].map(([kk, v]) => (
              <div key={kk}>
                <dt className="text-[15px] text-ink-faint">{kk}</dt>
                <dd className="mt-1 text-[17px] font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>
      {!c ? (
        <p className="mx-auto mt-14 max-w-[1240px] px-6 text-[17px] text-ink-faint sm:px-10">Opening&hellip;</p>
      ) : (
        <>
          {c.walkthrough ? (
            <div className="mx-auto mt-14 max-w-[1240px] px-6 sm:px-10">
              <Stage w={c.walkthrough} label={c.title} />
            </div>
          ) : c.cover ? (
            <div className="mx-auto mt-14 max-w-[1240px] px-6 sm:px-10">
              <div className="relative aspect-[21/9] overflow-hidden rounded-[var(--radius)]">
                <Pic p={c.cover} sizes="100vw" className="absolute inset-0 h-full object-cover" />
              </div>
            </div>
          ) : null}
          <article className="mx-auto mt-16 max-w-[1240px] px-6 sm:px-10">
            {c.body ? <CaseBody blocks={c.body} /> : null}
            {c.team?.length ? (
              <section className="mx-auto mt-16 max-w-[40rem]">
                <h2 className="display text-[28px] text-ink sm:text-[32px]">The team</h2>
                <ul className="mt-6">
                  {c.team.map((m) => (
                    <li key={m.name} className="border-t border-rule py-4">
                      <p className="text-[18px] text-ink">
                        <span className="font-semibold">{m.name}</span>
                        <span className="text-ink-faint">, {m.role}</span>
                      </p>
                      <p className="mt-1 text-[17px] leading-relaxed text-ink-soft">{m.did}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>
        </>
      )}
    </main>
  )
}
