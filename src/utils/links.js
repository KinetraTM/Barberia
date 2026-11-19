/**
 * Construcción de enlaces externos. Centralizado para que ningún componente
 * arme URLs a mano y el día que cambie el canal de reserva se toque un solo lugar.
 */

export function buildWhatsAppLink(number, message = '') {
  const digits = String(number).replace(/\D/g, '')
  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${digits}${query}`
}

export function buildPhoneLink(phone) {
  return `tel:${String(phone).replace(/[^\d+]/g, '')}`
}

export function buildMailtoLink(email, subject = '', body = '') {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  return `mailto:${email}${query ? `?${query}` : ''}`
}
