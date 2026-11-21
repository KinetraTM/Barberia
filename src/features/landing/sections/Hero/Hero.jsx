import { site } from "@/content/site.config";
import { hero } from "@/content/hero";
import { buildWhatsAppLink } from "@/utils/links";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button/Button";
import Container from "@/components/ui/Container/Container";
import styles from "./Hero.module.css";

export default function Hero() {
  // Nueva firma: buildWhatsAppLink(message). Sin argumentos usa DEFAULT_MESSAGE
  // y el número sale de VITE_WHATSAPP_PHONE.
  const whatsappHref = buildWhatsAppLink();

  return (
    <section id="inicio" className={styles.root} aria-labelledby="hero-title">
      <Container>
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className="eyebrow">{hero.eyebrow}</p>

            <h1 id="hero-title" className={styles.title}>
              {hero.titleLines.map((line, index) => (
                <span
                  key={line}
                  className={cn(
                    styles.line,
                    index === hero.accentLine && styles.accentLine,
                  )}
                >
                  {line}
                </span>
              ))}
            </h1>

            <p className={styles.lead}>{hero.lead}</p>

            <div className={styles.actions}>
              <Button
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                size="lg"
                iconRight="arrowRight"
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

            <ul className={styles.stats}>
              {hero.stats.map((stat) => (
                <li key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.media}>
            <div className={styles.frame}>
              {hero.image.src ? (
                <img
                  className={styles.photo}
                  src={hero.image.src}
                  alt={hero.image.alt}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <>
                  <span className={styles.stripes} aria-hidden="true" />
                  <span className={styles.monogram} aria-hidden="true">
                    {site.monogram}
                  </span>
                </>
              )}

              <div className={styles.availability}>
                <span className={styles.dot} aria-hidden="true" />
                <span>{hero.availability}</span>
              </div>
            </div>

            <span className={styles.est} aria-hidden="true">
              Est. {site.established}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
