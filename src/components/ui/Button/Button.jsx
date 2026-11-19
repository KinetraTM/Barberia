import { cn } from '@/utils/cn'
import Icon from '../Icon/Icon'
import styles from './Button.module.css'

/**
 * Acción de la interfaz. Si recibe `href` se renderiza como <a>.
 * No conoce el negocio: variantes y tamaños son puramente visuales.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconRight,
  children,
  className,
  ...rest
}) {
  const Component = href ? 'a' : 'button'

  return (
    <Component
      className={cn(
        styles.root,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...(href ? { href } : { type: 'button' })}
      {...rest}
    >
      <span>{children}</span>
      {iconRight ? (
        <Icon name={iconRight} size={16} className={styles.icon} />
      ) : null}
    </Component>
  )
}
