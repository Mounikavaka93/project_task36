const quick = [
  { href: '#home', label: 'Home' },
  { href: '#perfumes', label: 'Perfumes' },
  { href: '#collections', label: 'Collections' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const socials = [
  {
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4V10c0-.6.4-1 1-1Z" />
      </svg>
    ),
  },
  {
    label: 'X',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M17.5 4h2.4l-5.3 6.1L21 20h-4.7l-3.7-4.8L8.4 20H6l5.7-6.5L3.5 4h4.8l3.3 4.4L17.5 4Zm-.8 14.4h1.3L7.4 5.5H6L16.7 18.4Z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="site-wrap grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <p className="font-sans text-lg font-bold uppercase tracking-[0.18em]">
            <span className="font-serif italic text-gold">V</span> Velora
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            A Lisbon perfume atelier. We compose scent the way dusk arrives — slowly, then all at
            once, and impossible to forget.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#contact"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-cream/80 transition hover:border-gold hover:text-gold"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {quick.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Atelier</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>Private blending</li>
            <li>Discovery sets</li>
            <li>Seasonal editions</li>
            <li>Residencies</li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li>18 Rua Garrett</li>
            <li>1200-204 Lisboa, Portugal</li>
            <li className="break-all">studio@velora.com</li>
            <li>+351 21 342 1909</li>
          </ul>
        </div>
      </div>
      <div className="gold-line" />
      <p className="site-wrap py-6 text-center text-[11px] uppercase tracking-[0.18em] text-cream/45">
        © {new Date().getFullYear()} Velora. Composed, not copied.
      </p>
    </footer>
  )
}
