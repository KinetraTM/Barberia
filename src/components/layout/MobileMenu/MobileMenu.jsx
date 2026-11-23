import { useEffect, useRef } from 'react'
import { useScrollLock } from '@/hooks/useScrollLock'
import Icon from '../../ui/Icon/Icon'
import Logo from '../../ui/Logo/Logo'
import styles from './MobileMenu.module.css'

/**
 * Drawer de navegación móvil.
 * Responsabilidades: foco atrapado, cierre con Escape, bloqueo de scroll
 * y cierre al navegar. La lógica de apertura vive en SiteHeader.
 */
export default function MobileMenu({ open, onClose, links, brand }) {
  const panelRef = useRef(null)
  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const previousFocus = document.activeElement
    const focusables = panel.querySelectorAll(
      'a[href], button:not([disabled])',
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    first?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || focusables.length === 0) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.root} id="menu-movil">
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Cerrar menú"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div className={styles.top}>
          <Logo
            name={brand.name}
            sub={brand.sub}
            onClick={onClose}
          />
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <nav aria-label="Navegación móvil">
          <ul className={styles.list}>
            {links.map((link) => (
              <li key={link.id}>
                <a href={link.href} className={styles.link} onClick={onClose}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          <p className={styles.note}>
            {brand.name}. {brand.tagline}.
          </p>
        </div>
      </div>
    </div>
  )
}
