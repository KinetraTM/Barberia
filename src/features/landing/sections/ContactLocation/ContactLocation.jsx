import { site } from '@/content/site.config'
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
    <Section id="contacto" tone="tinted" hairline>
      <Container>
        <SectionHeading
          eyebrow={contact.eyebrow}
          title={contact.title}
          subtitle={contact.subtitle}
        />

        <div className={styles.layout}>
          <div className={styles.info}>
            <ul className={styles.channels}>
              {channels.map((channel) => (
                <li key={channel.id}>
                  <a
                    className={styles.channel}
                    href={channel.href}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                  >
                    <span className={styles.channelIcon} aria-hidden="true">
                      <Icon name={channel.icon} size={19} />
                    </span>
                    <span className={styles.channelBody}>
                      <span className={styles.channelLabel}>
                        {channel.label}
                      </span>
                      <span className={styles.channelValue}>
                        {channel.value}
                      </span>
                    </span>
                    <Icon
                      name="arrowRight"
                      size={16}
                      className={styles.channelArrow}
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.hours}>
              <h3 className={styles.hoursTitle}>{contact.hoursTitle}</h3>
              <ul className={styles.hoursList}>
                {site.hours.map((entry) => (
                  <li key={entry.day} className={styles.hoursRow}>
                    <span>{entry.day}</span>
                    <span
                      className={
                        entry.closed ? styles.hoursClosed : styles.hoursValue
                      }
                    >
                      {formatSchedule(entry)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className={styles.notes}>{site.contact.notes}</p>
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
