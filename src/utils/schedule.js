const toMinutes = (value) => {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

/**
 * Estado del local para el día de `date`, calculado desde `site.hours`.
 * Devuelve { state: 'open' | 'before' | 'after' | 'closed', open, close }.
 */
export function getScheduleStatus(hours, date = new Date()) {
  const entry = hours.find((item) => item.days?.includes(date.getDay()))

  if (!entry || entry.closed) {
    return { state: 'closed', open: null, close: null }
  }

  const now = date.getHours() * 60 + date.getMinutes()
  const open = toMinutes(entry.open)
  const close = toMinutes(entry.close)

  if (now < open) return { state: 'before', open: entry.open, close: entry.close }
  if (now < close) return { state: 'open', open: entry.open, close: entry.close }
  return { state: 'after', open: entry.open, close: entry.close }
}

const statusCopy = {
  open: (schedule) => `Abierto hasta las ${schedule.close}`,
  before: (schedule) => `Abre hoy a las ${schedule.open}`,
  after: () => 'Cerrado por hoy',
  closed: () => 'Hoy cerrado',
}

/** Texto del estado devuelto por getScheduleStatus, en un solo lugar. */
export function formatScheduleStatus(schedule) {
  return statusCopy[schedule.state](schedule)
}

/**
 * Fecha del día en formato corto rioplatense: "Sábado, 22 nov".
 */
export function formatTodayLabel(date = new Date()) {
  const label = new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  }).format(date)

  return label.charAt(0).toUpperCase() + label.slice(1)
}
