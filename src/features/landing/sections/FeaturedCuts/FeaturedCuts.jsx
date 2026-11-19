import { site } from '@/content/site.config'
import { featuredCuts } from '@/content/haircuts'
import { buildWhatsAppLink } from '@/utils/links'
import { formatPrice } from '@/utils/format'
import Badge from '@/components/ui/Badge/Badge'
import Carousel from '@/components/ui/Carousel/Carousel'
import Container from '@/components/ui/Container/Container'
import Icon from '@/components/ui/Icon/Icon'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import styles from './FeaturedCuts.module.css'

function CutCard({ cut, index }) {
  const bookingHref = buildWhatsAppLink(
    site.contact.whatsapp,
    `¡Hola! Quiero reservar un turno para "${cut.name}".`,
  )

  return (
    <article className={styles.card}>
      <div className={styles.media} style={{ '--tone': cut.tone }}>
        <span className={styles.watermark} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        {cut.featured ? (
          <Badge tone="accent" className={styles.badge}>
            Más pedido
          </Badge>
        ) : null}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{cut.name}</h3>
        <p className={styles.description}>{cut.description}</p>

        <ul className={styles.tags}>
          {cut.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(cut.price)}</span>
          <a
            href={bookingHref}
            className={styles.cta}
            target="_blank"
            rel="noreferrer noopener"
          >
            Reservar
            <Icon name="arrowRight" size={14} />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function FeaturedCuts() {
  return (
    <Section id="cortes" hairline>
      <Container>
        <div className={styles.head}>
          <SectionHeading
            eyebrow={featuredCuts.eyebrow}
            title={featuredCuts.title}
            subtitle={featuredCuts.subtitle}
          />
        </div>

        <Carousel
          items={featuredCuts.items}
          ariaLabel="Cortes más solicitados"
          className={styles.carousel}
          renderItem={(cut, index) => <CutCard cut={cut} index={index} />}
        />
      </Container>
    </Section>
  )
}
