import { Eye } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../lib/format'
import Rating from './Rating'
import Reveal from './Reveal'
import SafeImage from './SafeImage'

export default function ProductCard({ product, delay = 0, priority = false, index = 0 }) {
  const { addToCart, setQuickView } = useShop()
  const plot = String(index + 1).padStart(2, '0')

  return (
    <Reveal delay={delay} className="h-full min-w-0">
      <article className="group relative flex h-full flex-col overflow-hidden border border-ink/10 bg-white transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_rgba(13,31,28,0.12)]">
        <div className="relative aspect-[3/4] overflow-hidden bg-parchment">
          <SafeImage
            src={product.image}
            alt={product.name}
            className="product-img h-full w-full object-cover object-center"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
          <span className="absolute right-4 top-4 font-sans text-xs font-bold text-cream mix-blend-difference">
            {plot}
          </span>
          {product.badge && (
            <span className="absolute left-4 top-4 bg-ink/88 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gold">
              {product.badge}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-3 justify-center p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
            <button
              type="button"
              onClick={() => setQuickView(product)}
              className="flex items-center gap-2 bg-cream/95 px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] text-ink shadow-lg backdrop-blur"
            >
              <Eye size={14} /> Quick View
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col px-4 py-5 sm:px-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{product.type}</p>
          <h3 className="mt-1 font-serif text-2xl font-normal leading-tight text-ink">{product.name}</h3>
          <div className="mt-2">
            <Rating value={product.rating} reviews={product.reviews} />
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-5 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
            <p className="font-serif text-xl text-ink">{formatPrice(product.price)}</p>
            <button type="button" onClick={() => addToCart(product)} className="btn-gold px-4 py-2.5">
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
