import { cn } from '@/utils/cn'
import styles from './Stamp.module.css'

/**
 * Sello de goma: marca información real (favorito, más pedido).
 * No es una etiqueta decorativa; se usa con moderación.
 */
export default function Stamp({ tone = 'accent', className, children }) {
  return (
    <span className={cn(styles.root, styles[tone], className)}>{children}</span>
  )
}
