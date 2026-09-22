import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../data/products'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'
import Rating from './Rating'
import SafeImage from './SafeImage'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(id)
  }, [paused])

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)
  const item = testimonials[index]

  return (
    <section className="section-pad bg-parchment">
      <div className="site-wrap">
        <SectionHeader kicker="Clientele" title="Testimonials" copy="Reviews, ratings, and faces from the people who wear Velora." />

        <Reveal delay={120} className="relative mt-12">
          <article
            className="bg-white px-5 py-12 text-center sm:px-16 sm:py-16"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div key={item.id} className="animate-fade-in">
              <SafeImage
                src={item.photo}
                alt={item.name}
                className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-gold/40"
              />
              <div className="mt-4 flex justify-center text-gold">
                <Rating value={item.rating} size={14} showValue={false} />
              </div>
              <p className="mx-auto mt-6 max-w-3xl font-serif text-xl italic leading-snug text-ink sm:text-3xl">
                “{item.quote}”
              </p>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gold-dark">{item.name}</p>
              <p className="mt-1 text-xs text-muted">{item.role}</p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous review"
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center border border-gold/40 text-ink transition hover:border-gold hover:text-gold"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-label={`Show review ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? 'w-8 bg-gold' : 'w-2 bg-gold/30 hover:bg-gold/60'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next review"
                onClick={next}
                className="flex h-10 w-10 items-center justify-center border border-gold/40 text-ink transition hover:border-gold hover:text-gold"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
