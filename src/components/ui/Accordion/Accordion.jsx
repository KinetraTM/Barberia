import { useId, useState } from 'react'
import { cn } from '@/utils/cn'
import styles from './Accordion.module.css'

/**
 * Acordeón accesible. `items`: [{ id, title, content }].
 * Apertura simple por defecto; `allowMultiple` habilita varias abiertas.
 */
export default function Accordion({
  items,
  defaultOpenId = null,
  allowMultiple = false,
  className,
}) {
  const uid = useId()
  const [openIds, setOpenIds] = useState(() =>
    defaultOpenId ? [defaultOpenId] : [],
  )

  const toggle = (id) => {
    setOpenIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      return allowMultiple ? [...current, id] : [id]
    })
  }

  return (
    <div className={cn(styles.root, className)}>
      {items.map((item) => {
        const open = openIds.includes(item.id)
        const triggerId = `${uid}-trigger-${item.id}`
        const panelId = `${uid}-panel-${item.id}`

        return (
          <div
            key={item.id}
            className={cn(styles.item, open && styles.itemOpen)}
          >
            <h3 className={styles.heading}>
              <button
                type="button"
                id={triggerId}
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span className={styles.question}>{item.title}</span>
                <span className={styles.plus} aria-hidden="true" />
              </button>
            </h3>

            <div
              id={panelId}
              className={styles.panel}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!open}
            >
              <div className={styles.panelInner}>
                <p className={styles.answer}>{item.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
