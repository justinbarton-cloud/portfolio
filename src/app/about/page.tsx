import type { Metadata } from 'next'
import { about } from '../../../content/about'
import { Pic } from '../../components/Pic'

export const metadata: Metadata = { title: 'About' }

export default function About() {
  return (
    <main className="mx-auto max-w-[1240px] px-6 pt-16 sm:px-10 sm:pt-24">
      <section className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[28px] ring-1 ring-rule">
            <Pic p={about.photo} sizes="(min-width: 1024px) 460px, 100vw" priority />
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <div className="eyebrow">About</div>
          <h1 className="display mt-5 text-[48px] leading-[1.02] text-ink sm:text-[64px]">{about.name}</h1>
          <p className="mt-3 text-[18px] text-ink-soft">
            {about.role}, {about.company}. {about.location}.
          </p>
          <p className="mt-8 text-[19px] leading-relaxed text-ink-soft">{about.intro}</p>
          <p className="mt-5 text-[19px] leading-relaxed text-ink-soft">{about.bio}</p>
        </div>
      </section>

      <section className="mt-24 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="eyebrow border-t border-ink pt-5">Experience</h2>
          <ol className="mt-6">
            {about.experience.map((e) => (
              <li key={e.company + e.title} className="grid grid-cols-[1fr_auto] gap-4 border-b border-rule py-4">
                <div>
                  <div className="display text-[21px] text-ink">{e.company}</div>
                  <div className="text-[15px] text-ink-soft">{e.title}</div>
                </div>
                <div className="pt-1 text-[14px] text-ink-faint">{e.years}</div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="eyebrow border-t border-ink pt-5">Education</h2>
          <ol className="mt-6">
            {about.education.map((e) => (
              <li key={e.school + e.program} className="grid grid-cols-[1fr_auto] gap-4 border-b border-rule py-4">
                <div>
                  <div className="display text-[21px] text-ink">{e.school}</div>
                  <div className="text-[15px] text-ink-soft">{e.program}</div>
                </div>
                <div className="pt-1 text-[14px] text-ink-faint">{e.year}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="testimonials" className="mt-24 scroll-mt-24">
        <h2 className="eyebrow border-t border-ink pt-5">From people I&rsquo;ve led and worked with</h2>
        <div className="mt-10 columns-1 gap-10 md:columns-2 lg:columns-3">
          {about.testimonials.map((q) => (
            <figure key={q.who} className="mb-10 break-inside-avoid">
              <blockquote className="display text-[21px] leading-snug text-ink">&ldquo;{q.text}&rdquo;</blockquote>
              <figcaption className="mt-3 text-[14px] text-ink-faint">
                {q.who}, {q.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  )
}
