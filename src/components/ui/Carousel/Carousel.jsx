import { cn } from '@/utils/cn'
import { useCarousel } from '@/hooks/useCarousel'
import Icon from '../Icon/Icon'
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden'
import styles from './Carousel.module.css'

/**
 * Carrusel genérico. No conoce el contenido: recibe items + renderItem.
 * El desplazamiento es scroll nativo con snap (swipe en móvil y trackpad en desktop).
 */
export default function Carousel({
  items,
  renderItem,
  getKey = (item) => item.id,
  ariaLabel = 'Carrusel',
  className,
}) {
  const {
    trackRef,
    index,
    pageCount,
    next,
    prev,
    goTo,
    handleScroll,
    canPrev,
    canNext,
  } = useCarousel(items.length)

  if (!items || items.length === 0) return null

  return (
    <div className={cn(styles.root, className)}>
      <div
        ref={trackRef}
        className={styles.viewport}
        onScroll={handleScroll}
        role="group"
        aria-roledescription="carrusel"
        aria-label={ariaLabel}
        tabIndex={0}
      >
        {items.map((item, position) => (
          <div
            key={getKey(item)}
            className={styles.item}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${position + 1} de ${items.length}`}
          >
            {renderItem(item, position)}
          </div>
        ))}
      </div>

      <VisuallyHidden aria-live="polite">
        {`Posición ${index + 1} de ${pageCount}`}
      </VisuallyHidden>

      <div className={styles.toolbar}>
        <div className={styles.dots}>
          {Array.from({ length: pageCount }, (_, position) => (
            <button
              key={position}
              type="button"
              className={cn(
                styles.dot,
                position === index && styles.dotActive,
              )}
              onClick={() => goTo(position)}
              aria-label={`Ir a la posición ${position + 1} de ${pageCount}`}
              aria-current={position === index ? 'true' : undefined}
            />
          ))}
        </div>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={prev}
            disabled={!canPrev}
            aria-label="Ver anteriores"
          >
            <Icon name="chevronLeft" size={18} />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={next}
            disabled={!canNext}
            aria-label="Ver siguientes"
          >
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
