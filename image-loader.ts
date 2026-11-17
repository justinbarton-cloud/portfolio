import { withBase } from './content/base'

/*
 * The image loader for the static build on GitHub Pages. A static host
 * can't resize images, so this serves each screen as it is, under the
 * site's base path. Local builds at the root don't use it; next.config.ts only
 * switches it on when PAGES_BASE_PATH is set.
 */
export default function pagesLoader({ src }: { src: string; width: number; quality?: number }) {
  return withBase(src)
}
