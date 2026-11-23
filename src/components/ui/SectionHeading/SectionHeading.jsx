import { cn } from '@/utils/cn'
import styles from './SectionHeading.module.css'

export default function SectionHeading({
  title,
  subtitle,
  align = 'start',
  level = 2,
  id,
  className,
}) {
  const Heading = `h${level}`

  return (
    <div className={cn(styles.root, styles[align], className)}>
      <Heading className={styles.title} id={id}>
        {title}
      </Heading>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  )
}
