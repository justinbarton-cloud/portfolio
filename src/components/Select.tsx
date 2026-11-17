import type { ComponentProps } from 'react'

/*
 * The site's one select. A native select draws its own arrow, flush to the
 * edge and a different height in every browser, so it never lines up with
 * the inputs and pills beside it. This hides that arrow, draws a chevron
 * centred in the right padding, and fixes the height to the input next to
 * it: 36px, or 28px for `size="sm"` inside a card.
 *
 * It stays a real select, so the keyboard, the screen reader and a phone's
 * own picker all work as they would anyway.
 */
export function Select({
  size = 'md',
  tone = 'light',
  className = '',
  selectClassName = '',
  children,
  ...props
}: Omit<ComponentProps<'select'>, 'size'> & {
  size?: 'sm' | 'md'
  /** `dark` for a select on an ink bar, like the Kanban's edit bar. */
  tone?: 'light' | 'dark'
  /** Classes for the wrapper, which sizes it in its row. */
  className?: string
  /** Extra classes for the select itself, like a changed state's border. */
  selectClassName?: string
}) {
  const sm = size === 'sm'
  return (
    <span className={`relative inline-flex min-w-0 ${className}`}>
      <select
        {...props}
        className={`w-full min-w-0 cursor-pointer appearance-none truncate border outline-none transition ${
          tone === 'dark'
            ? 'border-transparent bg-cream/10 text-cream hover:bg-cream/15 focus:border-cream/40'
            : `bg-paper text-ink hover:border-ink/40 focus:border-ink ${selectClassName.includes('border-') ? '' : 'border-rule'}`
        } ${sm ? 'h-7 rounded-md pr-7 pl-2 text-[12.5px]' : 'h-9 rounded-lg pr-8 pl-3 text-[13px]'} ${selectClassName}`}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 12 12"
        aria-hidden
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${tone === 'dark' ? 'text-cream/60' : 'text-ink-faint'} ${sm ? 'right-2 size-2.5' : 'right-3 size-3'}`}
      >
        <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}
