import { useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'
import Icon from '@/components/ui/Icon/Icon'
import styles from './Carousel.module.css'

const TWEEN_MS = 340
const MAX_FRAME_MS = 64

const wrap = (value, half) => ((value % half) + half) % half

/**
 * Marquee continuo controlable: duplica los items y desplaza la pista en bucle
 * infinito con requestAnimationFrame. Los botones y el arrastre mueven el mismo
 * offset, así que la navegación manual se suma al movimiento automático sin
 * reiniciarlo ni saltar.
 */
export default function Carousel({
  items,
  renderItem,
  getKey = (item) => item.id,
  ariaLabel = 'Galería',
  duration = 34,
  labels = { previous: 'Anterior', next: 'Siguiente' },
  className,
}) {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const offsetRef = useRef(0)
  const halfRef = useRef(0)
  const stepRef = useRef(0)
  const frameRef = useRef(0)
  const tweenRef = useRef(0)
  const lastTimeRef = useRef(0)
  const dragRef = useRef(null)
  const reducedRef = useRef(false)
  const pausedRef = useRef({ hover: false, focus: false, drag: false, tween: false })

  const count = items.length
  const doubled = [...items, ...items]

  const apply = () => {
    const track = trackRef.current
    if (!track) return
    track.style.transform = reducedRef.current
      ? ''
      : `translate3d(${-offsetRef.current}px, 0, 0)`
  }

  useEffect(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!track) return

    const measure = () => {
      const slides = track.children
      let half = 0
      for (let index = 0; index < count; index += 1) {
        half += slides[index]?.getBoundingClientRect().width ?? 0
      }
      halfRef.current = half
      stepRef.current = slides[0]?.getBoundingClientRect().width ?? 0
      offsetRef.current = half ? wrap(offsetRef.current, half) : 0
      apply()
    }

    const tick = (time) => {
      frameRef.current = requestAnimationFrame(tick)
      const half = halfRef.current
      if (!half) return
      const delta = lastTimeRef.current
        ? Math.min(time - lastTimeRef.current, MAX_FRAME_MS)
        : 0
      lastTimeRef.current = time
      const paused = pausedRef.current
      if (!paused.hover && !paused.focus && !paused.drag && !paused.tween) {
        offsetRef.current = wrap(
          offsetRef.current + (half / (duration * 1000)) * delta,
          half,
        )
      }
      apply()
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const start = () => {
      cancelAnimationFrame(frameRef.current)
      lastTimeRef.current = 0
      frameRef.current = requestAnimationFrame(tick)
    }

    const stop = () => {
      cancelAnimationFrame(frameRef.current)
      track.style.transform = ''
    }

    reducedRef.current = motionQuery.matches
    measure()
    if (!reducedRef.current) start()

    const observer = new ResizeObserver(measure)
    observer.observe(track)

    const onMotionChange = (event) => {
      reducedRef.current = event.matches
      if (event.matches) {
        stop()
        if (viewport) viewport.scrollLeft = offsetRef.current
      } else {
        start()
      }
      apply()
    }

    motionQuery.addEventListener('change', onMotionChange)

    return () => {
      cancelAnimationFrame(frameRef.current)
      cancelAnimationFrame(tweenRef.current)
      observer.disconnect()
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [count, duration])

  const stepBy = (direction) => {
    const half = halfRef.current
    const step = stepRef.current
    if (!half || !step) return

    if (reducedRef.current) {
      viewportRef.current?.scrollBy({
        left: direction * step,
        behavior: 'smooth',
      })
      return
    }

    cancelAnimationFrame(tweenRef.current)
    const start = offsetRef.current
    const target = start + direction * step
    const startedAt = performance.now()
    pausedRef.current.tween = true

    const animate = (now) => {
      const progress = Math.min(1, (now - startedAt) / TWEEN_MS)
      const eased = 1 - (1 - progress) ** 3
      // Envolver en cada frame es invisible: la copia duplicada hace que la
      // posición `offset` y `offset ± media pista` se rendericen igual.
      offsetRef.current = wrap(start + (target - start) * eased, half)
      apply()
      if (progress < 1) {
        tweenRef.current = requestAnimationFrame(animate)
        return
      }
      pausedRef.current.tween = false
    }

    tweenRef.current = requestAnimationFrame(animate)
  }

  const handlePointerEnter = (event) => {
    if (event.pointerType === 'mouse') pausedRef.current.hover = true
  }

  const handlePointerLeave = (event) => {
    if (event.pointerType === 'mouse') pausedRef.current.hover = false
    endDrag(event)
  }

  const handleFocus = (event) => {
    let visible = true
    try {
      visible = event.target.matches(':focus-visible')
    } catch {
      visible = false
    }
    if (visible) pausedRef.current.focus = true
  }

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      pausedRef.current.focus = false
    }
  }

  const handlePointerDown = (event) => {
    if (reducedRef.current) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    cancelAnimationFrame(tweenRef.current)
    pausedRef.current.tween = false
    pausedRef.current.drag = true
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      offset: offsetRef.current,
    }
    viewportRef.current?.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    const half = halfRef.current
    if (!half) return
    offsetRef.current = wrap(drag.offset + (drag.x - event.clientX), half)
    apply()
  }

  function endDrag(event) {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    dragRef.current = null
    pausedRef.current.drag = false
    if (viewportRef.current?.hasPointerCapture(event.pointerId)) {
      viewportRef.current.releasePointerCapture(event.pointerId)
    }
  }

  if (count === 0) return null

  return (
    <div className={cn(styles.root, className)}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        role="group"
        aria-roledescription="carrusel"
        aria-label={ariaLabel}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <div ref={trackRef} className={styles.track}>
          {doubled.map((item, position) => (
            <div
              key={`${getKey(item)}-${position}`}
              className={styles.slide}
              aria-hidden={position >= count ? 'true' : undefined}
            >
              {renderItem(item, position % count)}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          onClick={() => stepBy(-1)}
          aria-label={labels.previous}
        >
          <Icon name="arrowLeft" size={16} />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => stepBy(1)}
          aria-label={labels.next}
        >
          <Icon name="arrowRight" size={16} />
        </button>
      </div>
    </div>
  )
}
