import { site } from '@/content/site.config'
import { services } from '@/content/services'
import { buildWhatsAppLink } from '@/utils/links'
import { formatDuration, formatPrice } from '@/utils/format'
import Badge from '@/components/ui/Badge/Badge'
import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Container/Container'
import Icon from '@/components/ui/Icon/Icon'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import styles from './Services.module.css'

export default function Services() {
  return (
    <Section id="servicios" tone="tinted" hairline>
      <Container>
        <div className={styles.layout}>
          <div className={styles.aside}>
            <SectionHeading
              eyebrow={services.eyebrow}
              title={services.title}
              subtitle={services.subtitle}
            />

            <div className={styles.actions}>
              <Button
                href={buildWhatsAppLink(site.contact.whatsappMessage)}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
                iconRight="arrowRight"
              >
                {services.cta.label}
              </Button>
              <p className={styles.note}>{services.note}</p>
            </div>
          </div>

          <div className={styles.list}>
            {services.items.map((service) => (
              <article
                key={service.id}
                className={styles.item}
                aria-labelledby={`servicio-${service.id}`}
              >
                <div className={styles.itemHeader}>
                  <h3
                    id={`servicio-${service.id}`}
                    className={styles.name}
                  >
                    {service.name}
                  </h3>
                  <span className={styles.price}>
                    {formatPrice(service.price)}
                  </span>
                </div>

                <p className={styles.description}>{service.description}</p>

                <div className={styles.meta}>
                  <span className={styles.duration}>
                    <Icon name="clock" size={13} />
                    {formatDuration(service.duration)}
                  </span>

                  {service.includes?.map((item) => (
                    <Badge key={item} tone="muted">
                      {item}
                    </Badge>
                  ))}

                  {service.featured ? (
                    <Badge tone="accent">Favorito</Badge>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
