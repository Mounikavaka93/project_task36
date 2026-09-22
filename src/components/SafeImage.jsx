import { useEffect, useState } from 'react'

const FALLBACK =
  'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85'

export default function SafeImage({ src, alt, className = '', ...props }) {
  const [url, setUrl] = useState(src)

  useEffect(() => {
    setUrl(src)
  }, [src])

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => {
        if (url !== FALLBACK) setUrl(FALLBACK)
      }}
      {...props}
    />
  )
}
