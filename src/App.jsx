import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Featured from './components/Featured'
import Collections from './components/Collections'
import BestSellers from './components/BestSellers'
import About from './components/About'
import FragranceNotes from './components/FragranceNotes'
import SpecialOffer from './components/SpecialOffer'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import SearchModal from './components/SearchModal'
import QuickView from './components/QuickView'
import Toast from './components/Toast'
import Entrance from './components/Entrance'
import Checkout from './components/Checkout'
import useSmoothScroll from './hooks/useSmoothScroll'

export default function App() {
  const [entered, setEntered] = useState(false)
  const enter = useCallback(() => setEntered(true), [])
  useSmoothScroll(entered)

  useEffect(() => {
    document.documentElement.classList.toggle('is-entering', !entered)
    return () => document.documentElement.classList.remove('is-entering')
  }, [entered])

  return (
    <div className="min-w-0 overflow-x-hidden bg-cream">
      {!entered && <Entrance onComplete={enter} />}
      <Navbar />
      <main>
        <Hero />
        <Featured />
        <Collections />
        <BestSellers />
        <About />
        <FragranceNotes />
        <SpecialOffer />
        <Testimonials />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <Checkout />
      <SearchModal />
      <QuickView />
      <Toast />
    </div>
  )
}
