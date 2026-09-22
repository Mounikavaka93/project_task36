import Reveal from './Reveal'
import SafeImage from './SafeImage'

export default function About() {
  return (
    <section id="about" className="bg-ink pt-28 text-cream sm:pt-32">
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative min-h-[420px] lg:min-h-[640px]">
          <SafeImage
            src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1600&q=85"
            alt="Velora atelier in Lisbon"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute bottom-6 left-6 border border-gold/40 bg-ink/85 px-6 py-5">
            <p className="font-sans text-4xl font-bold text-gold">2019</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/70">The year we opened</p>
          </div>
        </Reveal>

        <div className="site-wrap flex flex-col justify-center pb-16 pt-4 lg:pb-24 lg:pt-8">
          <Reveal delay={120} className="max-w-xl">
            <p className="ornament text-gold">About the brand</p>
            <h2 className="mt-4 scroll-mt-28 font-sans text-4xl font-bold uppercase leading-[1.05] sm:text-5xl">
              About Velora
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-cream/70 sm:text-base">
              Velora began in a tiled studio in Chiado, Lisbon. A botanist and a perfumer shared a
              wall — then a theory: a scent should bloom the way evening light does, slowly, then all
              at once. We still compose that way, layering orris, salt, and smoked clay against the
              hour they should be worn.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/70 sm:text-base">
              There is no house code of “quiet luxury.” There is a still, a garden of raw materials,
              and a refusal to smell like every other gold bottle on the shelf.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {[
                ['2019', 'Founded'],
                ['36', 'Raw materials'],
                ['4', 'Families'],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-sans text-2xl font-bold text-gold sm:text-3xl">{n}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-cream/55">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
