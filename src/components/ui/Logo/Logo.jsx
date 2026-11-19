import { cn } from '@/utils/cn'
import styles from './Logo.module.css'

/**
 * Marca textual. Recibe los datos por props para no acoplarse a `content/`.
 */
export default function Logo({
  href = '#inicio',
  name = 'Franco',
  sub = 'Barbería',
  monogram = 'F',
  className,
  onClick,
}) {
  return (
    <a
      href={href}
      className={cn(styles.root, className)}
      onClick={onClick}
      aria-label={`${name} ${sub} — inicio`}
    >
      <span className={styles.mark} aria-hidden="true">
        {monogram}
      </span>
      <span className={styles.wordmark}>
        <span className={styles.name}>{name}</span>
        <span className={styles.sub}>{sub}</span>
      </span>
    </a>
  )
}
