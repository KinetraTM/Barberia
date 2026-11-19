const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export function formatPrice(value) {
  if (typeof value !== 'number') return value
  return priceFormatter.format(value)
}

export function formatDuration(minutes) {
  if (!minutes) return ''
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest ? `${hours} h ${rest} min` : `${hours} h`
}

export function formatSchedule({ open, close, closed }) {
  if (closed) return 'Cerrado'
  return `${open} – ${close}`
}
