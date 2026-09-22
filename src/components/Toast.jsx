import { useShop } from '../context/ShopContext'

export default function Toast() {
  const { toast } = useShop()
  if (!toast) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm text-gold shadow-xl">
      {toast}
    </div>
  )
}
