import { useState } from 'react'
import { fragranceNotes } from '../data/products'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

export default function FragranceNotes() {
  const [active, setActive] = useState(fragranceNotes[0].id)

  return (
    <section id="notes" className="section-pad bg-cream">
      <div className="site-wrap">
        <SectionHeader
          kicker="Fragrance experience"
          title="How a scent travels"
          copy="Top, heart, and base — tap a card to follow the bloom from first air to last hour."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {fragranceNotes.map((note) => (
            <button
              key={note.id}
              type="button"
              onClick={() => setActive(note.id)}
              className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.16em] transition sm:px-5 sm:text-[11px] ${
                active === note.id ? 'bg-ink text-gold' : 'bg-white text-muted hover:text-ink'
              }`}
            >
              {note.title}
            </button>
          ))}
        </div>

        <div className="relative mt-10">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {fragranceNotes.map((note, i) => {
              const on = active === note.id
              return (
                <Reveal key={note.id} delay={i * 100} className="h-full">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(note.id)}
                    className={`relative h-full w-full border p-6 text-left transition duration-500 sm:p-8 ${
                      on
                        ? '-translate-y-1 border-gold bg-white shadow-[0_18px_40px_rgba(13,31,28,0.1)]'
                        : 'border-ink/10 bg-white/70 hover:border-gold/40'
                    }`}
                  >
                    <span className="font-sans text-5xl font-extrabold text-gold/40">0{i + 1}</span>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
                      {note.time}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl italic text-ink">{note.title}</h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed text-muted transition-opacity ${
                        on ? 'opacity-100' : 'opacity-80'
                      }`}
                    >
                      {note.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {note.notes.map((n) => (
                        <li
                          key={n}
                          className={`border px-3 py-1 text-xs text-ink transition ${
                            on ? 'border-gold/40 bg-parchment' : 'border-ink/10 bg-parchment/80'
                          }`}
                        >
                          {n}
                        </li>
                      ))}
                    </ul>
                  </button>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
