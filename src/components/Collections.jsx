import { collections } from '../data/products'
import { useShop } from '../context/ShopContext'
import SectionHeader from './SectionHeader'
import SafeImage from './SafeImage'

export default function Collections() {
  const { setCollectionFilter } = useShop()

  return (
    <section id="collections" className="bg-parchment">
      <div className="site-wrap section-pad pb-10">
        <SectionHeader
          align="left"
          kicker="Shop by category"
          title="Perfume Collections"
          copy="Men, Women, Unisex, and the Luxury Collection. Choose a family and the grid below follows."
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        {collections.map((col, i) => (
          <a
            key={col.id}
            href="#arrivals"
            onClick={() => setCollectionFilter(col.id)}
            className="group relative block aspect-[4/5] overflow-hidden bg-ink sm:aspect-[3/4]"
          >
            <SafeImage
              src={col.image}
              alt={col.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent transition duration-500 group-hover:from-ink/90" />
            <span className="writing-side absolute left-3 top-5 hidden text-gold sm:left-4 sm:top-6 sm:block">
              0{i + 1}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 lg:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold sm:text-[11px] sm:tracking-[0.2em]">
                {col.subtitle}
              </p>
              <h3 className="mt-1 font-sans text-lg font-bold uppercase leading-tight text-cream sm:text-2xl lg:text-3xl">
                {col.title}
              </h3>
              <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-cream/0 transition duration-500 group-hover:text-cream/80 sm:mt-3">
                View collection
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
