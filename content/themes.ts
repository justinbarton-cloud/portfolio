/**
 * The portfolio's design tokens. Every theme answers the same semantic
 * questions (what's the page, what's ink, what's the accent, what does the
 * main button look like, which face sets a headline, how round is a card,
 * what happens when you press something, what moves in the background) in
 * both a light and a dark mode. Components only ever ask for the semantic
 * name, so a theme is a set of answers and nothing else.
 *
 * Three themes borrow from products whose design systems say something
 * clear: Showroom from Tesla, Field from Teenage Engineering's OP-1 field,
 * Paper from reMarkable. They borrow the feeling, never a logo or an asset.
 *
 * Reading comes first in all of them. Body text is always Atkinson
 * Hyperlegible Next, drawn by the Braille Institute for low-vision readers.
 * A theme may set headlines and labels in another face, but only one from
 * the short list in `faces` below, each picked because it reads well big.
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
  /** Headlines and body text. 7:1 on surface and raised. */
  ink: string
  /** Secondary text. 4.5:1 on surface and raised. */
  inkMuted: string
  /** Captions and meta. 3:1 on surface. */
  inkSubtle: string
  /** Hairlines and borders. */
  line: string
  /** Kickers, links and focus rings. 4.5:1 on surface, since kickers are small. */
  accent: string
  /** A second colour, for gradients and motifs. 3:1 on surface. */
  accentAlt: string
  /** Text set on the accent. 4.5:1 on accent. */
  onAccent: string
  /** The one main button on a page. */
  action: string
  /** Text on the main button. 4.5:1 on action. */
  onAction: string
}

/** The faces a theme may use for headlines and labels. Body text is always Atkinson. */
export const faces = {
  atkinson: { var: '--ff-sans', family: 'Atkinson Hyperlegible Next' },
  atkinsonMono: { var: '--ff-mono', family: 'Atkinson Hyperlegible Mono' },
  jost: { var: '--ff-jost', family: 'Jost' },
  literata: { var: '--ff-literata', family: 'Literata' },
  martian: { var: '--ff-martian', family: 'Martian Mono' },
} as const
export type Face = keyof typeof faces

/** What a button does under your finger. Drawn in themeCss() below. */
export type Press = 'lift' | 'dim' | 'sink' | 'invert'

export type Theme = {
  id: string
  name: string
  /** One line, under the theme in Customize. */
  mood: string
  /** The product the look borrows from, if it borrows from one. */
  inspiredBy?: string
  /** The mode a first-time visitor gets in this theme, unless their system says otherwise. */
  defaultMode: Mode
  color: Record<Mode, ColorTokens>
  type: {
    display: Face
    displayWeight: number
    displayTracking: string
    /** The hero headline's size against the shared fluid size. Wide faces need less. */
    displayScale: number
    /** The hero headline's line height. Mono faces need more room. */
    displayLeading: number
    /** Kickers and small labels. */
    label: Face
    labelCaps: boolean
  }
  shape: { radius: string }
  press: Press
  /** The background decoration, drawn in src/app/globals.css from the tokens above. */
  motif: 'none' | 'grain' | 'leaves' | 'stage' | 'floor' | 'panel'
}

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
        action: '#0e0f12',
        onAction: '#f1f0eb',
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
        action: '#f1f1ee',
        onAction: '#0d0e11',
      },
    },
    type: { display: 'atkinson', displayWeight: 700, displayTracking: '-0.03em', displayScale: 1, displayLeading: 1.02, label: 'atkinson', labelCaps: false },
    shape: { radius: '12px' },
    press: 'lift',
    motif: 'none',
  },
  {
    id: 'showroom',
    name: 'Showroom',
    mood: 'A gallery, not a dashboard. White space, square corners, one blue for the next step.',
    inspiredBy: 'Tesla',
    defaultMode: 'light',
    color: {
      light: {
        surface: '#ffffff',
        raised: '#f4f4f4',
        ink: '#171a20',
        inkMuted: '#393c41',
        inkSubtle: '#5c5e62',
        line: '#e2e3e3',
        accent: '#3457b1',
        accentAlt: '#3e6ae1',
        onAccent: '#ffffff',
        action: '#3e6ae1',
        onAction: '#ffffff',
      },
      dark: {
        surface: '#000000',
        raised: '#111214',
        ink: '#f4f4f4',
        inkMuted: '#c9cacc',
        inkSubtle: '#8e9094',
        line: '#2a2c31',
        accent: '#7d9bf0',
        accentAlt: '#5a83f0',
        onAccent: '#000000',
        action: '#3e6ae1',
        onAction: '#ffffff',
      },
    },
    type: { display: 'jost', displayWeight: 500, displayTracking: '-0.01em', displayScale: 0.92, displayLeading: 1.06, label: 'jost', labelCaps: true },
    shape: { radius: '4px' },
    press: 'dim',
    motif: 'floor',
  },
  {
    id: 'field',
    name: 'Field',
    mood: 'An instrument, not an app. Brushed gray panels, mono labels, one orange key.',
    inspiredBy: 'Teenage Engineering OP-1 field',
    defaultMode: 'light',
    color: {
      light: {
        surface: '#e3e3e0',
        raised: '#f2f2ef',
        ink: '#101010',
        inkMuted: '#45453f',
        inkSubtle: '#66665f',
        line: '#c4c4bf',
        accent: '#a33600',
        accentAlt: '#2a56c9',
        onAccent: '#ffffff',
        action: '#ff6a13',
        onAction: '#101010',
      },
      dark: {
        surface: '#0a0a0a',
        raised: '#151515',
        ink: '#f2f2ef',
        inkMuted: '#a8a8a3',
        inkSubtle: '#7a7a76',
        line: '#2c2c2c',
        accent: '#ff8a45',
        accentAlt: '#6f93ec',
        onAccent: '#101010',
        action: '#ff6a13',
        onAction: '#101010',
      },
    },
    type: { display: 'martian', displayWeight: 500, displayTracking: '-0.05em', displayScale: 0.7, displayLeading: 1.14, label: 'martian', labelCaps: true },
    shape: { radius: '8px' },
    press: 'sink',
    motif: 'panel',
  },
  {
    id: 'paper',
    name: 'Paper',
    mood: 'E-paper: warm stock, black ink lines, a book face, and no glow at all.',
    inspiredBy: 'reMarkable',
    defaultMode: 'light',
    color: {
      light: {
        surface: '#f5f4ef',
        raised: '#fbfaf6',
        ink: '#111111',
        inkMuted: '#46463f',
        inkSubtle: '#6d6c66',
        line: '#bdbbb2',
        accent: '#111111',
        accentAlt: '#874630',
        onAccent: '#f5f4ef',
        action: '#111111',
        onAction: '#f5f4ef',
      },
      dark: {
        surface: '#242422',
        raised: '#2c2c2a',
        ink: '#e8e6df',
        inkMuted: '#b8b6ae',
        inkSubtle: '#8f8e87',
        line: '#4a4a44',
        accent: '#e8e6df',
        accentAlt: '#c98d72',
        onAccent: '#1a1a18',
        action: '#e8e6df',
        onAction: '#1a1a18',
      },
    },
    type: { display: 'literata', displayWeight: 500, displayTracking: '-0.015em', displayScale: 0.95, displayLeading: 1.02, label: 'atkinson', labelCaps: false },
    shape: { radius: '2px' },
    press: 'invert',
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
        action: '#2a1a12',
        onAction: '#f3e9da',
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
        action: '#f4e8d8',
        onAction: '#1b1410',
      },
    },
    type: { display: 'atkinson', displayWeight: 650, displayTracking: '-0.025em', displayScale: 1, displayLeading: 1.04, label: 'atkinson', labelCaps: false },
    shape: { radius: '20px' },
    press: 'lift',
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
        action: '#0b0b0c',
        onAction: '#f6f5fa',
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
        action: '#f4f2ee',
        onAction: '#0b0b0c',
      },
    },
    type: { display: 'atkinson', displayWeight: 800, displayTracking: '-0.04em', displayScale: 1, displayLeading: 1.0, label: 'atkinson', labelCaps: false },
    shape: { radius: '16px' },
    press: 'lift',
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
  action: '--action',
  onAction: '--on-action',
}

/** What each press token does to an element marked .press, while it's held down. */
const pressCss: Record<Press, string> = {
  lift: 'transform:translateY(1px) scale(.985)',
  dim: 'filter:brightness(.88)',
  sink: 'transform:translateY(2px);box-shadow:inset 0 2px 0 rgb(0 0 0 / .25)',
  invert: 'filter:invert(1)',
}

/** Every theme, in both modes, as one stylesheet. Studio light is also the fallback. */
export function themeCss() {
  const block = (t: Theme, m: Mode) => {
    const c = t.color[m]
    const vars = [
      ...Object.entries(colorVars).map(([k, v]) => `${v}:${c[k as keyof ColorTokens]}`),
      `--font-display:var(${faces[t.type.display].var})`,
      `--font-label:var(${faces[t.type.label].var})`,
      `--display-weight:${t.type.displayWeight}`,
      `--display-tracking:${t.type.displayTracking}`,
      `--display-scale:${t.type.displayScale}`,
      `--display-leading:${t.type.displayLeading}`,
      `--label-case:${t.type.labelCaps ? 'uppercase' : 'none'}`,
      `--label-tracking:${t.type.labelCaps ? '0.12em' : '0'}`,
      `--label-size:${t.type.labelCaps ? '12.5px' : '15px'}`,
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
    ...themes.map((t) => `html[data-theme="${t.id}"] .press:active{${pressCss[t.press]}}`),
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
      need('onAction', 'action', 4.5)
    }
  return out
}
