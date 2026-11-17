/**
 * Where the site lives under its host. On GitHub Pages that's /portfolio,
 * set by the build as PAGES_BASE_PATH and
 * handed to the page as NEXT_PUBLIC_BASE_PATH (see next.config.ts). Locally,
 * and anywhere else the site runs at the root, it's empty and these change
 * nothing.
 *
 * next/link adds the base itself. Plain links, image paths written in
 * content as /teams/<team>/x.png, and anything built by hand go through
 * withBase, so contributors keep writing root paths.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** A static host serves /menus/ from menus/index.html, so page links end in a slash there. */
const TRAILING = !!BASE

/** Prefixes a root path (`/x`) with the base. Anything else (a hash, a full URL) passes through. */
export const withBase = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? `${BASE}${path}` : path)

/** A link to a page on this site, with its trailing slash where the host needs one. */
export const pageHref = (path: string) => {
  if (!TRAILING) return withBase(path)
  const [, p, rest] = path.match(/^([^?#]*)(.*)$/) ?? ['', path, '']
  return withBase(p.endsWith('/') ? p : `${p}/`) + rest
}
