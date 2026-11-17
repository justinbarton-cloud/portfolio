/**
 * The portfolio's design tokens. Every theme answers the same semantic
 * questions (what's the page, what's ink, what's the accent, how heavy is a
 * headline, how round is a card, what moves in the background) in both a
 * light and a dark mode. Components only ever ask for the semantic name, so
 * a theme is a set of answers and nothing else.
 *
 * Type stays the same in every theme: Atkinson Hyperlegible Next, drawn by
 * the Braille Institute for low-vision readers. A theme can change how heavy
 * and tight a headline sets, never whether it's easy to read.
 *
 * Themes and modes are independent: any theme in either mode. The build
 * turns these into CSS variables on <html data-theme data-mode>, and checks
 * every text colour against the page it sits on.
 */

export type Mode = 'light' | 'dark'

export type ColorTokens = {
  /** The page. */
  surface: string
  /** Cards, panels and figure frames that sit on the page. */
  raised: string
  /** Headlines and body text. 4.5:1 on surface and raised. */
  ink: string
  /** Secondary text. 4.5:1 on surface. */
  inkMuted: string
  /** Captions and meta. 3:1 on surface. */
  inkSubtle: string
  /** Hairlines and borders. */
  line: string
  /** Kickers, links and focus rings. 4.5:1 on surface, since kickers are small. */
  accent: string
  /** The gradient's far end, where a theme has one. Same as accent otherwise. */
  accentAlt: string
  /** Text set on the accent. 4.5:1 on accent. */
  onAccent: string
}

export type Theme = {
  id: string
  name: string
  /** One line, under the theme in Customize. */
  mood: string
  /** The mode a first-time visitor gets in this theme, unless their system says otherwise. */
  defaultMode: Mode
  color: Record<Mode, ColorTokens>
  type: {
    displayWeight: number
    displayTracking: string
  }
  shape: { radius: string }
  /** The background decoration, drawn in src/app/globals.css from the tokens above. */
  motif: 'none' | 'grain' | 'leaves' | 'stage'
}

/** The one family, for the token table. */
export const TYPE_FAMILY = 'Atkinson Hyperlegible Next'

export const themes: Theme[] = [
  {
    id: 'studio',
    name: 'Studio',
    mood: 'Cobalt on warm white, and nothing else. The default.',
    defaultMode: 'light',
    color: {
      light: {
        surface: '#f1f0eb',
        raised: '#ffffff',
        ink: '#0e0f12',
        inkMuted: '#3d4049',
        inkSubtle: '#686c76',
        line: '#d5d4cd',
        accent: '#2440f0',
        accentAlt: '#2440f0',
        onAccent: '#ffffff',
      },
      dark: {
        surface: '#0d0e11',
        raised: '#17181c',
        ink: '#f1f1ee',
        inkMuted: '#b7b9c0',
        inkSubtle: '#878b95',
        line: '#2a2c32',
        accent: '#93a3ff',
        accentAlt: '#93a3ff',
        onAccent: '#0d0e11',
      },
    },
    type: { displayWeight: 700, displayTracking: '-0.03em' },
    shape: { radius: '12px' },
    motif: 'none',
  },
  {
    id: 'paper',
    name: 'Paper',
    mood: 'Oxblood ink on cream stock, with the grain left in.',
    defaultMode: 'light',
    color: {
      light: {
        surface: '#f5f0e6',
        raised: '#fbf7ef',
        ink: '#1a1410',
        inkMuted: '#4d433a',
        inkSubtle: '#776b5f',
        line: '#dcd2c2',
        accent: '#8e1b2c',
        accentAlt: '#8e1b2c',
        onAccent: '#ffffff',
      },
      dark: {
        surface: '#15110e',
        raised: '#1f1914',
        ink: '#f3ece1',
        inkMuted: '#c2b6a6',
        inkSubtle: '#938778',
        line: '#332a22',
        accent: '#e8909a',
        accentAlt: '#e8909a',
        onAccent: '#15110e',
      },
    },
    type: { displayWeight: 500, displayTracking: '-0.02em' },
    shape: { radius: '2px' },
    motif: 'grain',
  },
  {
    id: 'fall',
    name: 'Fall',
    mood: 'Rust and moss, and a few leaves on their way down.',
    defaultMode: 'light',
    color: {
      light: {
        surface: '#f3e9da',
        raised: '#faf3e8',
        ink: '#2a1a12',
        inkMuted: '#59412f',
        inkSubtle: '#80664f',
        line: '#dfcdb6',
        accent: '#a33c16',
        accentAlt: '#55632a',
        onAccent: '#ffffff',
      },
      dark: {
        surface: '#1b1410',
        raised: '#251c16',
        ink: '#f4e8d8',
        inkMuted: '#cdb9a2',
        inkSubtle: '#9c8670',
        line: '#3a2d23',
        accent: '#ec8a59',
        accentAlt: '#a9b86b',
        onAccent: '#1b1410',
      },
    },
    type: { displayWeight: 650, displayTracking: '-0.025em' },
    shape: { radius: '22px' },
    motif: 'leaves',
  },
  {
    id: 'deck',
    name: 'Deck',
    mood: 'The deck that won me the job: heavy type under a drifting spotlight.',
    defaultMode: 'dark',
    color: {
      light: {
        surface: '#f6f5fa',
        raised: '#ffffff',
        ink: '#0b0b0c',
        inkMuted: '#45444c',
        inkSubtle: '#6c6b75',
        line: '#dedce6',
        accent: '#5b3fd6',
        accentAlt: '#c45a17',
        onAccent: '#ffffff',
      },
      dark: {
        surface: '#0b0b0c',
        raised: '#161618',
        ink: '#f4f2ee',
        inkMuted: '#bdb9b2',
        inkSubtle: '#8c8881',
        line: '#2a2a2d',
        accent: '#a78bfa',
        accentAlt: '#f59e5b',
        onAccent: '#0b0b0c',
      },
    },
    type: { displayWeight: 800, displayTracking: '-0.04em' },
    shape: { radius: '18px' },
    motif: 'stage',
  },
]

export const DEFAULT_THEME = 'studio'
export const themeById: Record<string, Theme> = Object.fromEntries(themes.map((t) => [t.id, t]))

/** The CSS variable each color token writes. Components use these through Tailwind. */
export const colorVars: Record<keyof ColorTokens, string> = {
  surface: '--surface',
  raised: '--raised',
  ink: '--ink',
  inkMuted: '--ink-muted',
  inkSubtle: '--ink-subtle',
  line: '--line',
  accent: '--accent',
  accentAlt: '--accent-alt',
  onAccent: '--on-accent',
}

/** Every theme, in both modes, as one stylesheet. Studio light is also the fallback. */
export function themeCss() {
  const block = (t: Theme, m: Mode) => {
    const c = t.color[m]
    const vars = [
      ...Object.entries(colorVars).map(([k, v]) => `${v}:${c[k as keyof ColorTokens]}`),
      `--display-weight:${t.type.displayWeight}`,
      `--display-tracking:${t.type.displayTracking}`,
      `--radius:${t.shape.radius}`,
      `color-scheme:${m}`,
    ]
    return vars.join(';')
  }
  const studio = themeById[DEFAULT_THEME]
  return [
    `:root{${block(studio, 'light')}}`,
    ...themes.flatMap((t) =>
      (['light', 'dark'] as const).map((m) => `html[data-theme="${t.id}"][data-mode="${m}"]{${block(t, m)}}`),
    ),
  ].join('\n')
}

// --------------------------------------------------------------- contrast
const lum = (hex: string) => {
  const ch = (i: number) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * ch(1) + 0.7152 * ch(3) + 0.0722 * ch(5)
}
export const contrast = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** Every readable pair, in every theme and mode. Returns the failures. */
export function contrastProblems() {
  const out: string[] = []
  for (const t of themes)
    for (const m of ['light', 'dark'] as const) {
      const c = t.color[m]
      const need = (fg: keyof ColorTokens, bg: keyof ColorTokens, min: number) => {
        const r = contrast(c[fg], c[bg])
        if (r < min) out.push(`${t.name} ${m}: ${fg} on ${bg} is ${r.toFixed(2)}:1, needs ${min}:1`)
      }
      need('ink', 'surface', 7)
      need('ink', 'raised', 7)
      need('inkMuted', 'surface', 4.5)
      need('inkMuted', 'raised', 4.5)
      need('inkSubtle', 'surface', 3)
      need('accent', 'surface', 4.5)
      need('accentAlt', 'surface', 3)
      need('onAccent', 'accent', 4.5)
    }
  return out
}
