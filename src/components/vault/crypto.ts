/*
 * The vault, opened in the browser. Reads what scripts/seal.mjs writes: a
 * salt and iteration count in vault.json, and files that are a 12 byte IV
 * followed by AES-256-GCM ciphertext. Change both files together.
 *
 * A wrong password fails GCM's check on the first file, so there's no
 * separate "is this right" value to leak.
 */
import { withBase } from '../../../content/base'

const KEY = 'jb-portfolio:vault'

type Meta = { v: 1; iter: number; salt: string; manifest: string }

const b64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))

export async function vaultMeta(): Promise<Meta | null> {
  const r = await fetch(withBase('/vault/vault.json'), { cache: 'no-store' })
  return r.ok ? r.json() : null
}

export async function deriveKey(password: string, meta: Meta) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: b64(meta.salt), iterations: meta.iter, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    true,
    ['decrypt'],
  )
}

export async function open(key: CryptoKey, file: string): Promise<ArrayBuffer> {
  const r = await fetch(withBase(`/vault/${file}`))
  if (!r.ok) throw new Error(`missing ${file}`)
  const buf = new Uint8Array(await r.arrayBuffer())
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, key, buf.slice(12))
}

export const openJson = async <T,>(key: CryptoKey, file: string): Promise<T> =>
  JSON.parse(new TextDecoder().decode(await open(key, file)))

/** A sealed picture's src is vault:<file>:<mime>. This turns it into a blob URL. */
export async function openPicture(key: CryptoKey, src: string) {
  const [, file, mime] = src.split(':')
  return URL.createObjectURL(new Blob([await open(key, file)], { type: mime }))
}

/* The key stays for this tab only, so moving between cases doesn't ask again. */
export async function remember(key: CryptoKey) {
  const raw = new Uint8Array(await crypto.subtle.exportKey('raw', key))
  sessionStorage.setItem(KEY, btoa(String.fromCharCode(...raw)))
}
export async function recall(): Promise<CryptoKey | null> {
  const s = sessionStorage.getItem(KEY)
  if (!s) return null
  return crypto.subtle.importKey('raw', b64(s), { name: 'AES-GCM', length: 256 }, true, ['decrypt'])
}
export const forget = () => sessionStorage.removeItem(KEY)
