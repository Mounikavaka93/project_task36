import { useState } from 'react'
import { Check, CreditCard, Lock, X } from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { formatPrice } from '../lib/format'
import SafeImage from './SafeImage'

const METHODS = [
  { id: 'card', label: 'Card' },
  { id: 'apple', label: 'Apple Pay' },
  { id: 'google', label: 'Google Pay' },
  { id: 'paypal', label: 'PayPal' },
]

function formatCard(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value) {
  const d = value.replace(/\D/g, '').slice(0, 4)
  if (d.length < 3) return d
  return `${d.slice(0, 2)}/${d.slice(2)}`
}

function cardBrand(num) {
  const n = num.replace(/\s/g, '')
  if (n.startsWith('4')) return 'Visa'
  if (/^5[1-5]/.test(n) || /^2[2-7]/.test(n)) return 'Mastercard'
  if (/^3[47]/.test(n)) return 'Amex'
  return 'Card'
}

function shipCostFor(subtotal, ship) {
  if (ship === 'express') return 28
  return subtotal >= 250 ? 0 : 18
}

export default function Checkout() {
  const { cart, cartTotal, checkoutOpen, setCheckoutOpen, clearCart } = useShop()
  const [step, setStep] = useState('details')
  const [method, setMethod] = useState('card')
  const [ship, setShip] = useState('standard')
  const [orderId, setOrderId] = useState('')
  const [receipt, setReceipt] = useState(null)
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zip: '',
    country: 'Portugal',
    card: '',
    expiry: '',
    cvc: '',
  })

  const shipCost = shipCostFor(cartTotal, ship)
  const tax = Math.round(cartTotal * 0.08)
  const total = cartTotal + shipCost + tax
  const summaryItems = receipt?.items ?? cart
  const summarySub = receipt?.subtotal ?? cartTotal
  const summaryShip = receipt?.shipping ?? shipCost
  const summaryTax = receipt?.tax ?? tax
  const summaryTotal = receipt?.total ?? total

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const pay = (e) => {
    e.preventDefault()
    const snapshot = {
      items: cart.map((item) => ({ ...item })),
      subtotal: cartTotal,
      shipping: shipCost,
      tax,
      total,
    }
    setReceipt(snapshot)
    setStep('processing')
    window.setTimeout(() => {
      setOrderId(`VEL-${Math.floor(100000 + Math.random() * 900000)}`)
      setStep('success')
      clearCart()
    }, 1800)
  }

  const close = () => {
    setCheckoutOpen(false)
    window.setTimeout(() => {
      setStep('details')
      setMethod('card')
      setReceipt(null)
    }, 300)
  }

  if (!checkoutOpen) return null

  return (
    <div
      className="fixed inset-0 z-[85] flex items-stretch justify-center bg-ink/70 p-0 backdrop-blur-sm md:p-6"
      onClick={close}
    >
      <div
        className="relative grid h-full w-full max-w-5xl overflow-hidden bg-cream shadow-2xl md:h-auto md:max-h-[92vh] md:grid-cols-[1.15fr_0.85fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close checkout"
          onClick={close}
          className="absolute right-4 top-4 z-10 bg-white/90 p-2"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <p className="font-serif italic text-gold">Velora</p>
          <h2 className="mt-1 font-sans text-2xl font-bold uppercase">Checkout</h2>

          {step === 'success' ? (
            <div className="mt-10 max-w-md">
              <div className="flex h-12 w-12 items-center justify-center bg-gold text-ink">
                <Check />
              </div>
              <h3 className="mt-5 font-sans text-3xl font-bold uppercase">Order confirmed</h3>
              <p className="mt-3 text-sm text-muted">
                Thank you. A confirmation is on its way to your email. Your order number is{' '}
                <span className="font-semibold text-ink">{orderId}</span>.
              </p>
              <p className="mt-2 text-xs text-muted">Arrives in 3–6 business days. Track from your inbox.</p>
              <button type="button" onClick={close} className="btn-gold mt-8 px-8 py-3.5">
                Continue shopping
              </button>
            </div>
          ) : step === 'processing' ? (
            <div className="mt-16 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
              <p className="mt-5 font-serif text-xl italic">Authorizing payment…</p>
              <p className="mt-2 text-xs text-muted">Secure connection · 256-bit encryption</p>
            </div>
          ) : (
            <form onSubmit={pay} className="mt-6 space-y-6">
              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Contact</h3>
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={set('email')}
                  className="field"
                />
              </section>

              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Shipping</h3>
                <input required placeholder="Full name" value={form.name} onChange={set('name')} className="field" />
                <input required placeholder="Address" value={form.address} onChange={set('address')} className="field" />
                <div className="grid gap-3 sm:grid-cols-3">
                  <input required placeholder="City" value={form.city} onChange={set('city')} className="field" />
                  <input required placeholder="Postal code" value={form.zip} onChange={set('zip')} className="field" />
                  <select value={form.country} onChange={set('country')} className="field">
                    <option>Portugal</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>France</option>
                    <option>India</option>
                    <option>United Arab Emirates</option>
                  </select>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center justify-between border px-4 py-3 text-sm ${
                      ship === 'standard' ? 'border-gold bg-white' : 'border-black/10'
                    }`}
                  >
                    <span>
                      <input
                        type="radio"
                        name="ship"
                        className="sr-only"
                        checked={ship === 'standard'}
                        onChange={() => setShip('standard')}
                      />
                      Standard · 5–7 days
                    </span>
                    <span className="font-serif">{cartTotal >= 250 ? 'Free' : formatPrice(18)}</span>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center justify-between border px-4 py-3 text-sm ${
                      ship === 'express' ? 'border-gold bg-white' : 'border-black/10'
                    }`}
                  >
                    <span>
                      <input
                        type="radio"
                        name="ship"
                        className="sr-only"
                        checked={ship === 'express'}
                        onChange={() => setShip('express')}
                      />
                      Express · 1–2 days
                    </span>
                    <span className="font-serif">{formatPrice(28)}</span>
                  </label>
                </div>
              </section>

              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Payment</h3>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      className={`border px-2 py-3 text-[11px] font-semibold uppercase tracking-wider ${
                        method === m.id ? 'border-gold bg-white text-ink' : 'border-black/10 text-muted'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {method === 'card' && (
                  <div className="mt-4 space-y-3">
                    <div className="relative">
                      <CreditCard size={16} className="pointer-events-none absolute left-3 top-[1.85rem] text-muted" />
                      <label className="block text-[11px] uppercase tracking-[0.14em] text-muted">
                        Card number
                        <input
                          required
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="ACCT-000015"
                          value={form.card}
                          onChange={(e) => setForm((f) => ({ ...f, card: formatCard(e.target.value) }))}
                          className="field pl-9"
                        />
                      </label>
                      <span className="absolute right-3 top-[2.05rem] text-[10px] uppercase tracking-wider text-gold">
                        {cardBrand(form.card)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="block text-[11px] uppercase tracking-[0.14em] text-muted">
                        Expiry
                        <input
                          required
                          autoComplete="cc-exp"
                          placeholder="MM/YY"
                          value={form.expiry}
                          onChange={(e) => setForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                          className="field"
                        />
                      </label>
                      <label className="block text-[11px] uppercase tracking-[0.14em] text-muted">
                        CVC
                        <input
                          required
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          maxLength={4}
                          placeholder="123"
                          value={form.cvc}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))
                          }
                          className="field"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {method === 'apple' && (
                  <p className="mt-4 border border-black/10 bg-white px-4 py-4 text-sm text-muted">
                    Continue with Apple Pay. Touch ID or Face ID will confirm on your device.
                  </p>
                )}
                {method === 'google' && (
                  <p className="mt-4 border border-black/10 bg-white px-4 py-4 text-sm text-muted">
                    You will be redirected to Google Pay to complete this purchase.
                  </p>
                )}
                {method === 'paypal' && (
                  <p className="mt-4 border border-black/10 bg-white px-4 py-4 text-sm text-muted">
                    You will be redirected to PayPal to log in and approve the payment.
                  </p>
                )}
              </section>

              <button type="submit" className="btn-gold w-full py-3.5">
                Pay {formatPrice(total)}
              </button>
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted">
                <Lock size={12} /> Encrypted checkout · Demo only, no charge is made
              </p>
            </form>
          )}
        </div>

        <aside className="overflow-y-auto border-t border-black/10 bg-parchment p-6 sm:p-8 md:border-l md:border-t-0">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Order summary</h3>
          <ul className="mt-4 space-y-4">
            {summaryItems.length === 0 ? (
              <li className="text-sm text-muted">Your bottles are on their way.</li>
            ) : (
              summaryItems.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <SafeImage src={item.image} alt="" className="h-16 w-12 object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-serif leading-tight">{item.name}</p>
                    <p className="text-xs text-muted">Qty {item.qty}</p>
                  </div>
                  <p className="font-serif text-sm">{formatPrice(item.price * item.qty)}</p>
                </li>
              ))
            )}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-black/10 pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <dt>Subtotal</dt>
              <dd>{formatPrice(summarySub)}</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Shipping</dt>
              <dd>{summaryShip === 0 ? 'Free' : formatPrice(summaryShip)}</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Tax</dt>
              <dd>{formatPrice(summaryTax)}</dd>
            </div>
            <div className="flex justify-between pt-2 font-serif text-xl text-ink">
              <dt>Total</dt>
              <dd>{formatPrice(summaryTotal)}</dd>
            </div>
          </dl>
          {summarySub >= 250 && step !== 'success' && (
            <p className="mt-3 text-xs text-gold-dark">Complimentary standard shipping on this order.</p>
          )}
        </aside>
      </div>
    </div>
  )
}
