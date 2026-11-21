import { faqs } from '@/content/faqs'
import { buildWhatsAppLink } from '@/utils/links'
import Accordion from '@/components/ui/Accordion/Accordion'
import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Container/Container'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import styles from './Faq.module.css'

export default function Faq() {
  const items = faqs.items.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }))

  return (
    <Section id="faq" hairline>
      <Container size="narrow">
        <SectionHeading
          eyebrow={faqs.eyebrow}
          title={faqs.title}
          subtitle={faqs.subtitle}
          align="center"
        />

        <Accordion
          items={items}
          defaultOpenId={items[0]?.id}
          className={styles.accordion}
        />

        <div className={styles.prompt}>
          <p className={styles.promptText}>{faqs.contactPrompt.label}</p>
          <Button
            href={buildWhatsAppLink(
              '¡Hola! Tengo una consulta sobre los servicios.',
            )}
            target="_blank"
            rel="noreferrer noopener"
            variant="ghost"
            iconRight="arrowRight"
          >
            Escribir por WhatsApp
          </Button>
        </div>
      </Container>
    </Section>
  )
}
