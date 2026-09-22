import { useState } from 'react'
import Reveal from './Reveal'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
    setEmail('')
  }

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-center text-cream md:py-24">
      <div className="map-grid absolute inset-0 opacity-40" />
      <div className="site-wrap relative">
        <Reveal>
          <p className="ornament justify-center text-gold">Letters</p>
          <h2 className="mt-4 font-sans text-3xl font-bold uppercase sm:text-5xl">The newsletter</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-cream/65">
            New editions, atelier hours, and the occasional bottle that never hits the shelf. Two letters
            a month. No noise.
          </p>
          {done ? (
            <p className="mt-8 font-serif text-xl italic text-gold">You are on the list.</p>
          ) : (
            <form
              onSubmit={submit}
              className="mx-auto mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="h-12 flex-1 border border-white/15 bg-white/5 px-5 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold"
              />
              <button type="submit" className="btn-gold h-12 px-8">
                Subscribe
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
