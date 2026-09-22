import { useEffect, useState } from 'react'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useShop } from '../context/ShopContext'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#perfumes', label: 'Perfumes' },
  { href: '#collections', label: 'Collections' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const { cartCount, setCartOpen, setSearchOpen, menuOpen, setMenuOpen } = useShop()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = links.map((l) => l.href.slice(1))
      let current = '#home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 220) current = `#${id}`
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (href) => {
    setMenuOpen(false)
    setActive(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? 'bg-ink/92 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="site-wrap flex h-16 items-center justify-between sm:h-[4.25rem]">
        <a href="#home" className="flex items-center gap-2 text-cream" onClick={() => go('#home')}>
          <span className="font-serif italic text-gold text-xl leading-none">V</span>
          <span className="font-sans text-sm font-bold uppercase leading-none tracking-[0.18em] sm:text-base sm:tracking-[0.28em]">
            Velora
          </span>
        </a>

        <ul className="hidden h-full items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => go(link.href)}
                className={`nav-link text-cream/85 hover:text-gold ${active === link.href ? 'active text-gold' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="p-2 text-cream/90 transition hover:text-gold"
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-cream/90 transition hover:text-gold"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center bg-gold px-1 text-[10px] font-semibold text-ink">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
            className="p-2 text-cream lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-white/10 bg-ink transition-all duration-500 lg:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="site-wrap flex flex-col py-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => go(link.href)}
                className="block py-3 font-sans text-xl font-semibold text-cream/90 transition hover:text-gold sm:text-2xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
