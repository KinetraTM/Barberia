import { cn } from '@/utils/cn'
import styles from './Carousel.module.css'

/**
 * Marquee continuo: duplica los items y desplaza la pista de forma lineal
 * e infinita con CSS. Al llegar a la mitad, la copia es idéntica a la
 * original, así que el reinicio es invisible. Sin timers ni saltos.
 */
export default function Carousel({
  items,
  renderItem,
  getKey = (item) => item.id,
  ariaLabel = 'Galería',
  duration = 34,
  className,
}) {
  if (items.length === 0) return null

  const doubled = [...items, ...items]

  return (
    <div className={cn(styles.root, className)}>
      <div
        className={styles.viewport}
        role="group"
        aria-roledescription="carrusel"
        aria-label={ariaLabel}
      >
        <div
          className={styles.track}
          style={{ '--marquee-duration': `${duration}s` }}
        >
          {doubled.map((item, position) => (
            <div
              key={`${getKey(item)}-${position}`}
              className={styles.slide}
              aria-hidden={position >= items.length ? 'true' : undefined}
            >
              {renderItem(item, position % items.length)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
