import { useEffect, useState } from 'react'
import Reveal from './Reveal'

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function SpecialOffer() {
  const [left, setLeft] = useState({ d: 2, h: 14, m: 36, s: 8 })

  useEffect(() => {
    const end = Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000
    const tick = () => {
      const diff = Math.max(0, end - Date.now())
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    [left.d, 'Days'],
    [left.h, 'Hours'],
    [left.m, 'Mins'],
    [left.s, 'Secs'],
  ]

  return (
    <section id="offer" className="grain relative overflow-hidden bg-charcoal py-20 text-cream md:py-28">
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-center bg-fixed opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1800&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/55" />

      <div className="site-wrap relative text-center">
        <Reveal>
          <p className="ornament justify-center text-gold">Limited window</p>
          <h2 className="mt-5 font-sans text-3xl font-bold uppercase leading-[1.05] sm:text-5xl md:text-6xl">
            Solstice edit
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-cream/70 sm:text-base">
            Twenty-five percent off Clay Latitude, Polar Resin, and the four-family discovery set —
            until the light shifts.
          </p>
          <p className="mt-3 font-serif text-3xl italic text-gold">25% Off</p>
        </Reveal>

        <Reveal delay={150} className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-4">
          {units.map(([value, label]) => (
            <div
              key={label}
              className="min-w-[56px] border border-gold/30 bg-ink/60 px-2 py-3 backdrop-blur-sm sm:min-w-[88px] sm:px-3 sm:py-4"
            >
              <p className="font-serif text-3xl text-gold sm:text-4xl">{pad(value)}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/60">{label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={250} className="mt-10">
          <a href="#perfumes" className="btn-gold inline-block px-8 py-3.5 sm:px-10">
            Shop Now
          </a>
        </Reveal>
      </div>
    </section>
  )
}
