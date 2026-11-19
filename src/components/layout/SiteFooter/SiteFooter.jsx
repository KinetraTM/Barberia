import { buildMailtoLink, buildPhoneLink, buildWhatsAppLink } from '@/utils/links'
import { formatSchedule } from '@/utils/format'
import Container from '../../ui/Container/Container'
import Icon from '../../ui/Icon/Icon'
import Logo from '../../ui/Logo/Logo'
import styles from './SiteFooter.module.css'

export default function SiteFooter({ site, links, services }) {
  const year = new Date().getFullYear()
  const { contact } = site

  return (
    <footer className={styles.root}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo
              name={site.name.split(' ')[0]}
              sub={site.name.split(' ').slice(1).join(' ')}
              monogram={site.monogram}
            />
            <p className={styles.description}>{site.description}</p>
            <p className={styles.established}>
              Desde {site.established} · {site.contact.address.area}
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
              Navegación
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
            <h2 className={styles.title}>Contacto</h2>
            <ul className={styles.list}>
              <li>
                <a
                  className={styles.link}
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {contact.address.street}, {contact.address.area}
                </a>
              </li>
              <li>
                <a className={styles.link} href={buildPhoneLink(contact.phoneHref)}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  className={styles.link}
                  href={buildWhatsAppLink(
                    contact.whatsapp,
                    contact.whatsappMessage,
                  )}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  className={styles.link}
                  href={buildMailtoLink(contact.email)}
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.hours}>
          <p className={styles.hoursTitle}>Horarios</p>
          <ul className={styles.hoursList}>
            {site.hours.map((entry) => (
              <li key={entry.day} className={styles.hoursItem}>
                <span>{entry.day}</span>
                <span className={entry.closed ? styles.closed : undefined}>
                  {formatSchedule(entry)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <a href="#inicio" className={styles.backToTop}>
            Volver arriba
            <Icon name="arrowRight" size={14} className={styles.upIcon} />
          </a>
        </div>
      </Container>
    </footer>
  )
}
