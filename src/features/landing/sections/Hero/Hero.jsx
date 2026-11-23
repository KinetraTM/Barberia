import { useState } from 'react'
import { site } from '@/content/site.config'
import { hero } from '@/content/hero'
import { bookingHref } from '@/content/booking'
import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Container/Container'
import styles from './Hero.module.css'

function BarberPortrait({ barber }) {
  const [failed, setFailed] = useState(false)
  const initials = `${barber.name.charAt(0)}${barber.surname.charAt(0)}`

  return (
    <div className={styles.profile}>
      <div className={styles.portrait}>
        {failed ? (
          <span className={styles.monogram} aria-hidden="true">
            {initials}
          </span>
        ) : (
          <img
            src={barber.photo}
            alt={`${barber.name} ${barber.surname}, ${barber.role}`}
            onError={() => setFailed(true)}
          />
        )}
      </div>

      <div className={styles.profileCaption}>
        <p className={styles.barberName}>
          {barber.name} {barber.surname}
        </p>
        <p className={styles.barberRole}>{barber.role}</p>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="inicio" className={styles.root} aria-labelledby="hero-title">
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h1 id="hero-title" className={styles.title}>
              {hero.titleLines.map((line) => (
                <span key={line} className={styles.line}>
                  {line}
                </span>
              ))}
            </h1>

            <p className={styles.lead}>{hero.lead}</p>

            <div className={styles.actions}>
              <Button
                href={bookingHref}
                target="_blank"
                rel="noreferrer noopener"
                size="lg"
              >
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>

          <BarberPortrait barber={site.barber} />
        </div>
      </Container>
    </section>
  );
}
