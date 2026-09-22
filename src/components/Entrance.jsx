import { useEffect, useRef, useState } from 'react'

const LETTERS = 'VELORA'.split('')

export default function Entrance({ onComplete }) {
  const [phase, setPhase] = useState('boot')
  const done = useRef(false)

  const finish = () => {
    if (done.current) return
    done.current = true
    onComplete()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      const t = setTimeout(finish, 200)
      return () => {
        clearTimeout(t)
        document.body.style.overflow = ''
      }
    }

    const timers = [
      setTimeout(() => setPhase('bloom'), 180),
      setTimeout(() => setPhase('name'), 1100),
      setTimeout(() => setPhase('exit'), 3800),
      setTimeout(finish, 4900),
    ]
    return () => {
      timers.forEach(clearTimeout)
      document.body.style.overflow = ''
    }
  }, [])

  const skip = () => {
    setPhase('exit')
    window.setTimeout(finish, 900)
  }

  return (
    <div className={`entrance ${phase === 'exit' ? 'is-exiting' : ''}`} role="dialog" aria-label="Velora entrance">
      <button type="button" className="entrance-skip" onClick={skip}>
        Skip
      </button>

      <div className="entrance-glow" />
      <div className="entrance-orbs" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={`scent-orb orb-${i}`} />
        ))}
      </div>
      <div className="entrance-ripples" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="entrance-droplets" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
      </div>

      <div className={`entrance-stage ${phase}`}>
        <p className="entrance-kicker">Lisbon · Est. 2019</p>
        <h1 className="entrance-wordmark">
          {LETTERS.map((ch, i) => (
            <span key={ch} style={{ animationDelay: `${1.15 + i * 0.09}s` }}>
              {ch}
            </span>
          ))}
        </h1>
        <p className="entrance-tag">The air remembers</p>
        <button type="button" className="entrance-enter" onClick={skip}>
          Enter the atelier
        </button>
      </div>
    </div>
  )
}
