/**
 * The portfolio's design tokens. Every theme answers the same semantic
 * questions (what's the page, what's ink, what's the accent, which face
 * sets a headline and how tightly, how round is a card, what decorates the
 * background) in both a light and a dark mode. Components only ever ask for
 * the semantic name, so a theme is a set of answers and nothing else.
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
  /** Eyebrows, links, the big numbers. 4.5:1 on surface, since eyebrows are small. */
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
    /** A font variable from src/app/layout.tsx, and the family's name for the token table. */
    display: { var: string; family: string }
    body: { var: string; family: string }
    displayWeight: number
    displayTracking: string
    displayLeading: number
    /** How large a hero headline sets, against the shared fluid size. Wide faces need less. */
    displayScale: number
    /** Variable font axes for headlines, or "normal". */
    displayAxes: string
  }
  shape: { radius: string }
  /** The background decoration, drawn in src/app/globals.css from the tokens above. */
  motif: 'grid' | 'grain' | 'leaves' | 'stage'
}

const bricolage = { var: '--ff-bricolage', family: 'Bricolage Grotesque' }
const instrumentSans = { var: '--ff-instrument-sans', family: 'Instrument Sans' }
const instrumentSerif = { var: '--ff-instrument-serif', family: 'Instrument Serif' }
const youngSerif = { var: '--ff-young-serif', family: 'Young Serif' }

export const themes: Theme[] = [
  {
    id: 'studio',
    name: 'Studio',
    mood: 'A working grotesk on a measured grid. The default.',
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
    type: {
      display: bricolage,
      body: instrumentSans,
      displayWeight: 600,
      displayTracking: '-0.035em',
      displayLeading: 0.92,
      displayScale: 1,
      displayAxes: '"wdth" 80, "opsz" 96',
    },
    shape: { radius: '14px' },
    motif: 'grid',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    mood: 'A literary serif, oxblood ink and paper grain.',
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
    type: {
      display: instrumentSerif,
      body: instrumentSans,
      displayWeight: 400,
      displayTracking: '-0.015em',
      displayLeading: 1,
      displayScale: 1,
      displayAxes: 'normal',
    },
    shape: { radius: '3px' },
    motif: 'grain',
  },
  {
    id: 'fall',
    name: 'Fall',
    mood: 'Rust and moss, a sturdy serif, leaves on their way down.',
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
    type: {
      display: youngSerif,
      body: instrumentSans,
      displayWeight: 400,
      displayTracking: '-0.025em',
      displayLeading: 1.02,
      displayScale: 0.8,
      displayAxes: 'normal',
    },
    shape: { radius: '22px' },
    motif: 'leaves',
  },
  {
    id: 'deck',
    name: 'Deck',
    mood: 'The interview deck: heavy type, a violet to orange spotlight.',
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
    type: {
      display: bricolage,
      body: instrumentSans,
      displayWeight: 780,
      displayTracking: '-0.045em',
      displayLeading: 0.94,
      displayScale: 0.92,
      displayAxes: '"wdth" 100, "opsz" 96',
    },
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
      `--font-display:var(${t.type.display.var})`,
      `--font-body:var(${t.type.body.var})`,
      `--display-weight:${t.type.displayWeight}`,
      `--display-tracking:${t.type.displayTracking}`,
      `--display-leading:${t.type.displayLeading}`,
      `--display-scale:${t.type.displayScale}`,
      `--display-axes:${t.type.displayAxes}`,
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
