import { featuredCuts } from '@/content/haircuts'
import Carousel from '@/components/ui/Carousel/Carousel'
import Container from '@/components/ui/Container/Container'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import styles from './FeaturedCuts.module.css'

function WorkSlide({ work }) {
  return (
    <figure className={styles.slide}>
      <div
        className={styles.photo}
        style={{ '--photo': `url("${work.image}")`, '--tone': work.tone }}
        role="img"
        aria-label={work.alt}
      />
      <figcaption className={styles.caption}>
        <span className={styles.name}>{work.name}</span>
        <span className={styles.detail}>{work.detail}</span>
      </figcaption>
    </figure>
  )
}

export default function FeaturedCuts() {
  return (
    <Section id="cortes">
      <Container>
        <div className={styles.intro}>
          <SectionHeading
            title={featuredCuts.title}
            subtitle={featuredCuts.subtitle}
          />
        </div>

        <Carousel
          items={featuredCuts.items}
          renderItem={(work) => <WorkSlide work={work} />}
          ariaLabel="Trabajos realizados en Franco Barbería"
        />
      </Container>
    </Section>
  )
}
