import { site } from '@/content/site.config'
import { location } from '@/content/location'
import Container from '@/components/ui/Container/Container'
import Icon from '@/components/ui/Icon/Icon'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import styles from './ContactLocation.module.css'

export default function ContactLocation() {
  const { address } = site.contact

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
            <div className={styles.mapGrid} aria-hidden="true" />

            <div className={styles.mapContent}>
              <span className={styles.pin} aria-hidden="true">
                <Icon name="pin" size={24} />
              </span>
              <p className={styles.mapCaption}>{location.mapCaption}</p>
              <p className={styles.mapSub}>{address.area}</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
