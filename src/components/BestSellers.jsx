import { useMemo, useState } from 'react'
import { products } from '../data/products'
import { useShop } from '../context/ShopContext'
import ProductGrid from './ProductGrid'
import SectionHeader from './SectionHeader'

const tabs = [
  { id: 'best', label: 'Best Sellers' },
  { id: 'new', label: 'New Arrivals' },
]

const titles = {
  men: 'Men',
  women: 'Women',
  unisex: 'Unisex',
  luxury: 'Luxury Collection',
}

export default function BestSellers() {
  const [tab, setTab] = useState('best')
  const { collectionFilter, setCollectionFilter } = useShop()

  const list = useMemo(() => {
    if (collectionFilter) {
      return products.filter(
        (p) => p.collection === collectionFilter || p.category === collectionFilter,
      )
    }
    return products.filter((p) => (tab === 'best' ? p.bestseller : p.newArrival))
  }, [tab, collectionFilter])

  return (
    <section id="arrivals" className="section-pad bg-cream">
      <div className="site-wrap">
        <SectionHeader
          kicker="The edit"
          title={collectionFilter ? titles[collectionFilter] : 'Best Sellers / New Arrivals'}
          copy="An attractive grid with hover zoom and quick view on every bottle."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setCollectionFilter(null)
                setTab(t.id)
              }}
              className={`rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] transition sm:px-6 sm:text-[11px] sm:tracking-[0.18em] ${
                !collectionFilter && tab === t.id
                  ? 'bg-ink text-gold'
                  : 'bg-white text-muted hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
          {collectionFilter && (
            <button
              type="button"
              onClick={() => setCollectionFilter(null)}
              className="rounded-full bg-ink px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-gold sm:px-6 sm:text-[11px]"
            >
              {titles[collectionFilter]} · Clear
            </button>
          )}
        </div>

        <div className="mt-12">
          {list.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">No bottles in this edit yet.</p>
          ) : (
            <ProductGrid key={collectionFilter || tab} products={list} />
          )}
        </div>
      </div>
    </section>
  )
}
