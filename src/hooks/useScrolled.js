import { useEffect, useState } from 'react'

/**
 * Indica si la página ya se desplazó más allá de `threshold` píxeles.
 * Se usa para el fondo sólido del header sticky.
 * @param {number} threshold
 * @returns {boolean}
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
