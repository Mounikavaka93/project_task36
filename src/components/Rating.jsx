import { Star } from 'lucide-react'

export default function Rating({ value = 0, reviews, size = 13, showValue = true }) {
  return (
    <div className="flex items-center gap-1 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < Math.round(value) ? 'currentColor' : 'none'}
          className={i < Math.round(value) ? '' : 'text-muted/35'}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-xs tracking-wide text-muted">
          {Number(value).toFixed(1)}
          {reviews != null ? ` · ${reviews}` : ''}
        </span>
      )}
    </div>
  )
}
