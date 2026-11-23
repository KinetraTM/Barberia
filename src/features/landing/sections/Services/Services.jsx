import { services } from "@/content/services";
import { serviceBookingHref } from "@/content/booking";
import { formatDuration, formatPrice } from "@/utils/format";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import Stamp from "@/components/ui/Stamp/Stamp";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <Section id="servicios" tone="tinted">
      <Container>
        <div className={styles.head}>
          <SectionHeading title={services.title} subtitle={services.subtitle} />

          <p className={styles.note}>{services.note}</p>
        </div>

        <ul className={styles.list}>
          {services.items.map((service) => (
            <li key={service.id} className={styles.item}>
              <div className={styles.itemTop}>
                <h3 className={styles.name}>{service.name}</h3>
                <span className={styles.leader} aria-hidden="true" />
                <span className={styles.price}>
                  {formatPrice(service.price)}
                </span>
              </div>

              <p className={styles.description}>{service.description}</p>

              <div className={styles.meta}>
                <span>{formatDuration(service.duration)}</span>
                {service.includes?.length ? (
                  <span>
                    Incluye {service.includes.join(", ").toLowerCase()}
                  </span>
                ) : null}
                {service.featured ? <Stamp>Favorito</Stamp> : null}
              </div>

              <a
                className={styles.book}
                href={serviceBookingHref(service.name)}
                target="_blank"
                rel="noreferrer noopener"
              >
                Reservar este servicio
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
