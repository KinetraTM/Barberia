import { location } from '@/content/location'
import Container from '../../ui/Container/Container'
import Icon from '../../ui/Icon/Icon'
import styles from './SiteFooter.module.css'

export default function SiteFooter({ site, links, services }) {
  const year = new Date().getFullYear()
  const { contact } = site

  return (
    <footer className={styles.root}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a
              href="#inicio"
              className={styles.signoff}
              aria-label={`${site.name}, inicio`}
            >
              <span className={styles.signoffName}>Franco</span>
              <span className={styles.signoffSub}>Barbería</span>
            </a>

            <p className={styles.description}>{site.description}</p>

            <p className={styles.established}>
              Desde {site.established} en {contact.address.area}.
            </p>

            <ul className={styles.socials}>
              {site.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    className={styles.social}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${social.label}: ${social.handle}`}
                  >
                    <Icon name={social.id} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className={styles.column} aria-labelledby="footer-nav">
            <h2 id="footer-nav" className={styles.title}>
              Secciones
            </h2>
            <ul className={styles.list}>
              {links.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.title}>Servicios</h2>
            <ul className={styles.list}>
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#servicios" className={styles.link}>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.title}>Ubicación</h2>
            <ul className={styles.list}>
              <li>
                <a
                  className={styles.link}
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {contact.address.street}
                </a>
              </li>
              <li className={styles.plain}>
                {contact.address.area}, {contact.address.city}
              </li>
              <li>
                <a
                  className={styles.link}
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {location.mapCta}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>

          <ul className={styles.legal}>
            {site.legalLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} className={styles.legalLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#inicio" className={styles.backToTop}>
            Volver arriba
            <Icon name="arrowRight" size={14} className={styles.upIcon} />
          </a>
        </div>
      </Container>
    </footer>
  )
}
