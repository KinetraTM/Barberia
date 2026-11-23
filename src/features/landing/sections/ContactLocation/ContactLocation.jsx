import { site } from '@/content/site.config'
import { location } from '@/content/location'
import { contact } from '@/content/contact'
import {
  buildMailtoLink,
  buildPhoneLink,
  buildWhatsAppLink,
} from '@/utils/links'
import { formatSchedule } from '@/utils/format'
import Container from '@/components/ui/Container/Container'
import { LocationMap } from '@/components/ui/LocationMap/LocationMap'
import Icon from '@/components/ui/Icon/Icon'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import styles from './ContactLocation.module.css'

export default function ContactLocation() {
  const { address } = site.contact

  const fullAddress = [
    address.street,
    address.area,
    address.city,
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .join(', ')

  const channels = [
    {
      id: 'whatsapp',
      icon: 'whatsapp',
      label: contact.whatsappLabel,
      value: site.contact.phone,
      href: buildWhatsAppLink(site.contact.whatsappMessage),
      external: true,
    },
    {
      id: 'phone',
      icon: 'phone',
      label: contact.callLabel,
      value: site.contact.phone,
      href: buildPhoneLink(site.contact.phoneHref),
    },
    {
      id: 'mail',
      icon: 'mail',
      label: contact.emailLabel,
      value: site.contact.email,
      href: buildMailtoLink(site.contact.email),
    },
  ]

  return (
    <Section id="ubicacion">
      <Container>
        <SectionHeading title={location.title} subtitle={location.subtitle} />

        <div className={styles.layout}>
          <div className={styles.address}>
            <p className={styles.street}>{address.street}</p>
            <p className={styles.city}>
              {address.area}, {address.city} · {address.postalCode}
            </p>
            <p className={styles.notes}>{site.contact.notes}</p>

            <a
              className={styles.directions}
              href={site.contact.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon name="pin" size={18} />
              {location.mapCta}
            </a>
          </div>

          <div className={styles.map}>
            <LocationMap address={fullAddress} />

            <div className={styles.mapOverlay}>
              <span className={styles.pin} aria-hidden="true">
                <Icon name="pin" size={20} />
              </span>
              <div>
                <p className={styles.mapCaption}>{contact.mapCaption}</p>
                <p className={styles.mapAddress}>
                  {address.area} · {address.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
