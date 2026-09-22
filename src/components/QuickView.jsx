import { X } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../lib/format'
import Rating from './Rating'
import SafeImage from './SafeImage'

export default function QuickView() {
  const { quickView: product, setQuickView, addToCart } = useShop()

  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      onClick={() => setQuickView(null)}
    >
      <div
        className="relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-cream shadow-2xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close quick view"
          onClick={() => setQuickView(null)}
          className="absolute right-4 top-4 z-10 bg-white/90 p-2"
        >
          <X size={18} />
        </button>
        <SafeImage
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover md:h-full md:min-h-[420px]"
        />
        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted">{product.type}</p>
          <h3 className="mt-1 font-serif text-3xl leading-tight">{product.name}</h3>
          <div className="mt-3">
            <Rating value={product.rating} reviews={product.reviews} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>
          <dl className="mt-5 space-y-1.5 text-xs uppercase tracking-[0.12em] text-muted">
            <div>
              <span className="text-gold-dark">Top · </span>
              {product.notes.top}
            </div>
            <div>
              <span className="text-gold-dark">Heart · </span>
              {product.notes.heart}
            </div>
            <div>
              <span className="text-gold-dark">Base · </span>
              {product.notes.base}
            </div>
          </dl>
          <p className="mt-auto pt-6 font-serif text-3xl">{formatPrice(product.price)}</p>
          <button
            type="button"
            onClick={() => {
              addToCart(product)
              setQuickView(null)
            }}
            className="btn-gold mt-5 w-full py-3.5"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
