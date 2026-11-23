import { cn } from '@/utils/cn'
import {
  getGoogleMapsDirectionsUrl,
  getGoogleMapsEmbedUrl,
} from '@/utils/links'
import styles from './LocationMap.module.css'

export function LocationMap({
  address,
  title = 'Ubicación del local',
  className,
}) {
  const embedUrl = getGoogleMapsEmbedUrl(address)
  const directionsUrl = getGoogleMapsDirectionsUrl(address)

  return (
    <div className={cn(styles.root, className)}>
      {/* 1. Mini mapa visual (sin captura de clics para evitar bloqueo del enlace) */}
      <iframe
        className={styles.frame}
        title={title}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* 2. Capa clicable transparente que cubre todo el mapa */}
      <a
        className={styles.link}
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir ubicación en Google Maps para iniciar ruta"
      >
        <span className={styles.cta}>Cómo llegar →</span>
      </a>
    </div>
  )
}
