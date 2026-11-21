import { useCallback, useState } from 'react'
import { cn } from '@/utils/cn'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrolled } from '@/hooks/useScrolled'
import Container from '../../ui/Container/Container'
import Icon from '../../ui/Icon/Icon'
import Logo from '../../ui/Logo/Logo'
import MobileMenu from '../MobileMenu/MobileMenu'
import styles from './SiteHeader.module.css'

export default function SiteHeader({ links, brand }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(12)
  const activeId = useActiveSection(links.map((link) => link.id))

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header className={cn(styles.root, scrolled && styles.scrolled)}>
      <Container className={styles.inner}>
        <Logo
          name={brand.name}
          sub={brand.sub}
          className={styles.logo}
        />

        <nav className={styles.nav} aria-label="Navegación principal">
          <ul className={styles.list}>
            {links.map((link) => {
              const isActive = activeId === link.id
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={cn(styles.link, isActive && styles.linkActive)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </Container>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        links={links}
        brand={brand}
      />
    </header>
  )
}
