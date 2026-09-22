import SafeImage from './SafeImage'

export default function Hero() {
  return (
    <section id="home" className="grain map-grid relative min-h-[100svh] overflow-hidden bg-ink text-cream">
      <div className="pointer-events-none absolute inset-y-0 left-[12%] hidden w-px bg-gold/25 lg:block" />

      <div className="site-wrap relative grid min-h-[100svh] items-center gap-10 pb-10 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pt-24">
        <div className="relative max-w-2xl">
          <p className="animate-fade-up writing-side absolute -left-10 top-4 hidden text-gold/80 xl:block">
            Lisbon · 2019
          </p>
          <p className="ornament animate-fade-up mb-6 text-gold">Atelier · Distilled at dusk</p>
          <h1
            className="animate-fade-up font-sans text-4xl font-extrabold uppercase leading-[0.88] tracking-tight text-cream sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '120ms' }}
          >
            Scent
            <span className="mt-1 block font-serif text-[0.78em] font-normal italic normal-case tracking-normal text-gold">
              that lingers
            </span>
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base"
            style={{ animationDelay: '240ms' }}
          >
            Velora composes perfume as living air — warm botanicals, mineral woods, and a dry-down
            that stays with you past midnight. An atelier in Lisbon, not another gold-on-black maison.
          </p>
          <div className="animate-fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: '360ms' }}>
            <a href="#perfumes" className="btn-gold px-8 py-3.5">
              Shop Now
            </a>
            <a href="#collections" className="btn-outline px-8 py-3.5 text-cream hover:bg-cream hover:text-ink">
              Explore Collection
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="compass-frame mx-auto aspect-square max-w-[420px] overflow-hidden rounded-full">
            <SafeImage
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85"
              alt="Velora signature perfume bottle"
              className="animate-float h-full w-full object-cover"
              fetchPriority="high"
            />
          </div>
          <div
            className="animate-fade-up absolute -bottom-2 right-0 border border-gold/40 bg-ink/90 px-5 py-4 sm:right-4"
            style={{ animationDelay: '500ms' }}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Signature</p>
            <p className="font-serif text-xl italic text-cream">Orris Fold</p>
            <p className="text-xs text-cream/60">Eau de Parfum · 50ml</p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden border-y border-gold/20 bg-ink py-3.5">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.32em] text-gold/85">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-10 px-5">
              <span>Orris</span>
              <span>Salt</span>
              <span>Clay</span>
              <span>Vetiver</span>
              <span>Fig leaf</span>
              <span>Gaiac</span>
              <span>Neroli</span>
              <span>Smoke</span>
              <span>Amber</span>
              <span>Lisbon</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
