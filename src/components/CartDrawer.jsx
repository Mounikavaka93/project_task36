import { Minus, Plus, X } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../lib/format'
import SafeImage from './SafeImage'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setCheckoutOpen, cartTotal, updateQty, removeFromCart } = useShop()

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm transition duration-300 ${
          cartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-500 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <h2 className="font-sans text-2xl font-bold uppercase">Your cart</h2>
          <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}>
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <p className="pt-16 text-center text-sm text-muted">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="font-serif text-lg leading-tight">{item.name}</p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted hover:text-ink"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted">{item.type}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-black/10 px-2 py-1">
                        <button type="button" aria-label="Decrease quantity" onClick={() => updateQty(item.id, item.qty - 1)}>
                          <Minus size={14} />
                        </button>
                        <span className="w-5 text-center text-sm">{item.qty}</span>
                        <button type="button" aria-label="Increase quantity" onClick={() => updateQty(item.id, item.qty + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-serif">{formatPrice(item.price * item.qty)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-black/10 px-6 py-5">
          <div className="flex justify-between font-serif text-xl">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <button
            type="button"
            disabled={!cart.length}
            onClick={() => {
              setCartOpen(false)
              setCheckoutOpen(true)
            }}
            className="btn-gold mt-4 w-full py-3.5 disabled:opacity-40"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  )
}
