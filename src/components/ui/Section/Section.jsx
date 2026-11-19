import { cn } from '@/utils/cn'
import styles from './Section.module.css'

/**
 * Envoltorio semántico de sección: id para anclas, scroll-margin para el header
 * sticky y variantes de espaciado/fondo. No renderiza títulos.
 */
export default function Section({
  id,
  as: Tag = 'section',
  spacing = 'default',
  tone = 'default',
  hairline = false,
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      id={id}
      className={cn(
        styles.root,
        styles[spacing],
        styles[tone],
        hairline && styles.hairline,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
