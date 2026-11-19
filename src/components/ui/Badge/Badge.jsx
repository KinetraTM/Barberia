import { cn } from '@/utils/cn'
import styles from './Badge.module.css'

export default function Badge({ tone = 'default', className, children }) {
  return (
    <span className={cn(styles.root, styles[tone], className)}>{children}</span>
  )
}
