import { cn } from '@/utils/cn'
import { getGoogleMapsEmbedUrl } from '@/utils/links'
import styles from './LocationMap.module.css'

export function LocationMap({
  address,
  title = 'Ubicación del local',
  className,
}) {
  const embedUrl = getGoogleMapsEmbedUrl(address)

  return (
    <div className={cn(styles.root, className)}>
      <iframe
        className={styles.frame}
        title={title}
        src={embedUrl}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
