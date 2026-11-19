import { cn } from '@/utils/cn'
import styles from './Container.module.css'

export default function Container({
  as: Tag = 'div',
  size = 'default',
  className,
  children,
  ...rest
}) {
  return (
    <Tag className={cn(styles.root, styles[size], className)} {...rest}>
      {children}
    </Tag>
  )
}
