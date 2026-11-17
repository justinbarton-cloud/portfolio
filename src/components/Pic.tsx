import Image from 'next/image'
import type { Picture } from '../../content/types'

/** A picture at its real proportions, framed like a print on the page. */
export function Pic({ p, sizes, priority, className = '' }: { p: Picture; sizes: string; priority?: boolean; className?: string }) {
  return (
    <Image
      src={p.src}
      width={p.w}
      height={p.h}
      alt={p.alt}
      sizes={sizes}
      priority={priority}
      className={`h-auto w-full ${className}`}
    />
  )
}
