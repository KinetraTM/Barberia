import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/**
 * Lógica del carrusel basada en scroll nativo + scroll-snap.
 * - Sin librerías ni handlers de drag propios: el swipe lo resuelve el navegador.
 * - Mide el ancho real de las cards para calcular cuántas entran por vista,
 *   así funciona con el responsive definido en CSS.
 *
 * @param {number} count cantidad de items
 */
export function useCarousel(count) {
  const trackRef = useRef(null)
  const metrics = useRef({ step: 0 })
  const frame = useRef(0)
  const reducedMotion = useReducedMotion()

  const [index, setIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(Math.max(0, count - 1))

  const measure = useCallback(() => {
    const track = trackRef.current
    const firstItem = track?.firstElementChild
    if (!track || !firstItem) return

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const step = firstItem.getBoundingClientRect().width + gap
    if (step <= 0) return

    const perView = Math.min(
      Math.max(Math.round(track.clientWidth / step), 1),
      count,
    )

    metrics.current.step = step
    setMaxIndex(Math.max(0, count - perView))
    setIndex((current) => Math.min(current, Math.max(0, count - perView)))
  }, [count])

  useEffect(() => {
    const track = trackRef.current
    measure()

    const observer = new ResizeObserver(measure)
    if (track) observer.observe(track)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(frame.current)
    }
  }, [measure])

  const goTo = useCallback(
    (target) => {
      const track = trackRef.current
      if (!track) return

      const clamped = Math.min(Math.max(target, 0), maxIndex)
      track.scrollTo({
        left: clamped * metrics.current.step,
        behavior: reducedMotion ? 'auto' : 'smooth',
      })
      setIndex(clamped)
    },
    [maxIndex, reducedMotion],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const track = trackRef.current
      const { step } = metrics.current
      if (!track || !step) return

      const current = Math.round(track.scrollLeft / step)
      setIndex(Math.min(Math.max(current, 0), maxIndex))
    })
  }, [maxIndex])

  return {
    trackRef,
    index,
    maxIndex,
    next,
    prev,
    goTo,
    handleScroll,
    canPrev: index > 0,
    canNext: index < maxIndex,
    pageCount: maxIndex + 1,
  }
}
