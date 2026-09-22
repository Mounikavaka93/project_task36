import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ShopContext = createContext(null)

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [quickView, setQuickView] = useState(null)
  const [toast, setToast] = useState(null)
  const [collectionFilter, setCollectionFilter] = useState(null)

  const showToast = useCallback((message) => {
    setToast(message)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 2400)
  }, [])

  const addToCart = useCallback(
    (product, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id)
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + qty } : item,
          )
        }
        return [...prev, { ...product, qty }]
      })
      showToast(`${product.name} added to cart`)
    },
    [showToast],
  )

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateQty = useCallback((id, qty) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty } : item))
        .filter((item) => item.qty > 0),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setCartOpen(false)
      setCheckoutOpen(false)
      setSearchOpen(false)
      setQuickView(null)
      setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const lock = cartOpen || checkoutOpen || searchOpen || menuOpen || quickView
    if (lock) document.body.style.overflow = 'hidden'
    else if (!document.documentElement.classList.contains('is-entering')) {
      document.body.style.overflow = ''
    }
    return () => {
      if (!document.documentElement.classList.contains('is-entering')) {
        document.body.style.overflow = ''
      }
    }
  }, [cartOpen, checkoutOpen, searchOpen, menuOpen, quickView])

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      cartOpen,
      setCartOpen,
      checkoutOpen,
      setCheckoutOpen,
      searchOpen,
      setSearchOpen,
      menuOpen,
      setMenuOpen,
      quickView,
      setQuickView,
      toast,
      collectionFilter,
      setCollectionFilter,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      showToast,
    }),
    [
      cart,
      cartCount,
      cartTotal,
      cartOpen,
      checkoutOpen,
      searchOpen,
      menuOpen,
      quickView,
      toast,
      collectionFilter,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      showToast,
    ],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used within ShopProvider')
  return ctx
}
