import { useEffect } from 'react'

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function clearance() {
  const nav = document.querySelector('header nav')
  const bar = nav?.getBoundingClientRect().height ?? 72
  // Bar + room so the kicker/title cannot sit under the fixed header
  // (Reveal also uses translateY, which jumps the block up after it appears.)
  return bar + 120
}

function documentY(el) {
  return el.getBoundingClientRect().top + window.scrollY
}

function animateScrollTo(target) {
  const start = window.scrollY
  const dist = target - start
  if (Math.abs(dist) < 1) return

  const duration = Math.min(1100, Math.max(450, Math.abs(dist) * 0.45))
  const t0 = performance.now()

  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration)
    window.scrollTo(0, start + dist * easeInOutCubic(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function scrollToId(id) {
  const raw = id.replace('#', '')
  const el = document.getElementById(raw)
  if (!el) return

  if (raw === 'home') {
    animateScrollTo(0)
    return
  }

  const block = el.querySelector('.ornament') || el.querySelector('h1, h2') || el
  animateScrollTo(Math.max(0, documentY(block) - clearance()))
}

export default function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href || href === '#') return
      const section = document.getElementById(href.slice(1))
      if (!section) return
      e.preventDefault()
      window.setTimeout(() => scrollToId(href), 120)
      history.pushState(null, '', href)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [enabled])
}
