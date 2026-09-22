import { useEffect, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { products } from '../data/products'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../lib/format'
import SafeImage from './SafeImage'

export default function SearchModal() {
  const { searchOpen, setSearchOpen, setQuickView } = useShop()
  const [q, setQ] = useState('')

  useEffect(() => {
    if (!searchOpen) setQ('')
  }, [searchOpen])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return products.slice(0, 5)
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.type.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term),
    )
  }, [q])

  if (!searchOpen) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/70 px-4 pt-24 backdrop-blur-sm"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden bg-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-black/10 px-5 py-4">
          <Search size={18} className="text-muted" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search fragrances…"
            className="h-10 flex-1 bg-transparent text-sm outline-none"
          />
          <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
            <X />
          </button>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted">No fragrances found.</li>
          )}
          {results.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false)
                  setQuickView(p)
                }}
                className="flex w-full items-center gap-4 p-3 text-left transition hover:bg-parchment"
              >
                <SafeImage src={p.image} alt="" className="h-14 w-12 object-cover" />
                <div>
                  <p className="font-serif text-lg leading-tight">{p.name}</p>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {p.type} · {formatPrice(p.price)}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
