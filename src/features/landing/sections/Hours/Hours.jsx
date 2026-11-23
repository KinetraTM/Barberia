import { cn } from '@/utils/cn'
import { site } from '@/content/site.config'
import { hoursContent } from '@/content/hours'
import { availabilityHref } from '@/content/booking'
import { formatSchedule } from '@/utils/format'
import { formatScheduleStatus, getScheduleStatus } from '@/utils/schedule'
import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Container/Container'
import Section from '@/components/ui/Section/Section'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading'
import styles from './Hours.module.css'

export default function Hours() {
  const today = new Date().getDay()
  const schedule = getScheduleStatus(site.hours, new Date())

  return (
    <Section id="horarios" tone="tinted">
      <Container>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <SectionHeading
              title={hoursContent.title}
              subtitle={hoursContent.subtitle}
            />

            <p className={styles.live} data-state={schedule.state}>
              <span className={styles.dot} aria-hidden="true" />
              {formatScheduleStatus(schedule)}
            </p>

            <p className={styles.hint}>
              Los horarios pueden variar en feriados. Confirmanos antes de venir.
            </p>

            <Button
              href={availabilityHref}
              target="_blank"
              rel="noreferrer noopener"
              variant="secondary"
            >
              {hoursContent.ctaLabel}
            </Button>
          </div>

          <ul className={styles.list}>
            {site.hours.map((entry) => (
              <li
                key={entry.day}
                className={styles.row}
                data-today={
                  entry.days?.includes(today) ? 'true' : undefined
                }
              >
                <span className={styles.day}>
                  {entry.day}
                  {entry.days?.includes(today) ? (
                    <span className={styles.todayTag}>Hoy</span>
                  ) : null}
                </span>
                <span
                  className={cn(
                    styles.value,
                    entry.closed && styles.closed,
                  )}
                >
                  {entry.closed
                    ? hoursContent.closedLabel
                    : formatSchedule(entry)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
