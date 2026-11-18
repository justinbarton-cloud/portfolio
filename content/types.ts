/**
 * The shape of every record in the portfolio. One case per file in
 * content/work/<id>.ts, named for its id.
 */

/**
 * Who may see it. Everything is internal until Justin marks it public. The
 * internal site sits behind Toast sign-in; a public cut, built later, keeps
 * only what's marked public and fails if any of it would leak.
 */
/**
 * Who can see a case. internal: only in the private drafts repo. protected:
 * sealed into the site's vault, readable with the password. public: on the
 * open site.
 */
export type Share = 'internal' | 'protected' | 'public'

/** Where in the career it happened. Chapters run newest first on the page. */
export type ChapterId = 'toast' | 'hpe' | 'earlier'

/** What kind of work it shows, for the index's filters. */
export type Tag =
  | 'design-leadership'
  | 'product-design'
  | 'systems'
  | 'ux-architecture'
  | 'innovation'
  | 'accessibility'
  | 'ai'
  | 'strategy'

/** A picture with its real size, so the page never shifts as it loads. */
export type Picture = { src: string; w: number; h: number; alt: string; caption?: string }

export type Link = { label: string; href: string }

/**
 * A piece of work you can click through, played in a device frame on the
 * case page. Each step is one real screen, what to notice on it, and the
 * spot to press to go on, so a reader moves through the work the way its
 * user would. Hotspots are percentages of the screen, so they land on the
 * same place at any size.
 */
export type Walkthrough = {
  device: 'browser'
  /** One line over the stage on the home page. */
  intro: string
  steps: {
    screen: Picture
    /** The address bar, as the product would show it. */
    url?: string
    /** What this screen shows, in a few words. */
    title: string
    /** What to notice, and why it matters. One or two sentences. */
    caption: string
    /** Where to press to go to the next step. The last step has none. */
    hotspot?: { x: number; y: number; w: number; h: number; label: string }
  }[]
}

/**
 * Impact is a union, never a bare string, so a projection can't read as a
 * measurement. Measured numbers carry where they came from and when.
 */
export type Impact =
  | { kind: 'measured'; text: string; source: string }
  | { kind: 'expected'; text: string }
  | { kind: 'qualitative'; text: string }

/**
 * The body of a case, in reading order. Imported cases arrive as these; new
 * ones can be written the same way. A list item's `lead` is its short label,
 * like "Ongoing advocacy".
 */
export type Block =
  | { kind: 'h'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'list'; ordered?: true; items: { lead?: string; text: string }[] }
  | { kind: 'figure'; picture: Picture }
  | { kind: 'quote'; text: string; attribution: string }

export type Case = {
  id: string
  /**
   * The people who did the work, by name, with what each did. A leader's
   * case says what he set up and who carried it, so the credit sits here
   * beside the story rather than buried in it.
   */
  team?: { name: string; role: string; did: string }[]
  /** The work, playable. Shown in place of the cover on the case page, and on the home page. */
  walkthrough?: Walkthrough
  /** Names the problem or the outcome, so it reads to someone with no context. */
  title: string
  /** One line, about twenty words: what changed, for whom. */
  summary: string
  chapter: ChapterId
  company: string
  /** Justin's role on this work, in his words. */
  role: string
  /** As written, like "2022 to 2025" or "Ongoing". */
  timeframe: string
  /** YYYY-MM of the most recent work, for ordering. */
  date: string
  tags: Tag[]
  share: Share
  /** Leads the home page and gets the full case page treatment. */
  deep?: true
  cover?: Picture
  body?: Block[]
  impact?: Impact[]
  links?: Link[]
  /** Where it came from, when it was imported. Kept so it can be re-imported. */
  source?: string
}
