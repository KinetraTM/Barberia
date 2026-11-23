import { faqs } from "@/content/faqs";
import Accordion from "@/components/ui/Accordion/Accordion";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import styles from "./Faq.module.css";

export default function Faq() {
  const items = faqs.items.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }));

  return (
    <Section id="faq">
      <Container>
        <div className={styles.layout}>
          <div className={styles.aside}>
            <SectionHeading title={faqs.title} subtitle={faqs.subtitle} />
          </div>

          <Accordion
            items={items}
            defaultOpenId={items[0]?.id}
            className={styles.accordion}
          />
        </div>
      </Container>
    </Section>
  );
}
