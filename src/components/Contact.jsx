import { useState } from 'react'
import Reveal from './Reveal'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="bg-parchment pt-28 sm:pt-32">
      <div className="grid lg:grid-cols-2">
        <div className="site-wrap flex flex-col justify-center pb-16 pt-4 lg:pb-24 lg:pt-8">
          <Reveal className="max-w-xl">
            <p className="ornament text-gold-dark">The atelier</p>
            <h2 className="mt-4 scroll-mt-28 font-sans text-4xl font-bold uppercase leading-[1.05] sm:text-5xl">
              Visit & contact
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              The atelier sits on Rua Garrett in Chiado. Walk-ins for discovery; appointments for
              private blending.
            </p>
            <dl className="mt-10 grid gap-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">Address</dt>
                <dd className="mt-1 text-ink">18 Rua Garrett, 1200-204 Lisboa, Portugal</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">Hours</dt>
                <dd className="mt-1 text-ink">Wed – Sat · 12:00 – 19:00</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">Studio</dt>
                <dd className="mt-1 text-ink">studio@velora.com · +351 21 342 1909</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120} className="bg-white">
          {sent ? (
            <div className="flex h-full min-h-[360px] items-center justify-center px-8 py-16 text-center">
              <p className="font-serif text-2xl italic text-ink">
                Message received. We will write back from the atelier.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex h-full flex-col justify-center px-4 py-12 sm:px-12 lg:px-16">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
                  Name
                  <input name="name" required className="field" />
                </label>
                <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
                  Email
                  <input name="email" type="email" required className="field" />
                </label>
              </div>
              <label className="mt-4 block text-[11px] uppercase tracking-[0.16em] text-muted">
                Message
                <textarea name="message" required rows={5} className="field !h-auto py-3" />
              </label>
              <button type="submit" className="btn-gold mt-6 w-full py-3.5">
                Send message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
