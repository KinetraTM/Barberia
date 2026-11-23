import { site } from './site.config'
import { buildWhatsAppLink } from '@/utils/links'

/**
 * Único lugar donde se arman los enlaces de reserva. Si cambia el canal,
 * se cambia acá y no en los seis componentes que lo usan.
 */
export const bookingHref = buildWhatsAppLink(
  site.contact.whatsapp,
  site.contact.whatsappMessage,
)

/** Mensaje distinto según el servicio que elija el usuario en Precios. */
export function serviceBookingHref(serviceName) {
  return buildWhatsAppLink(
    site.contact.whatsapp,
    `¡Hola! Quiero reservar un turno para ${serviceName}.`,
  )
}

export const availabilityHref = buildWhatsAppLink(
  site.contact.whatsapp,
  '¡Hola! Quiero consultar la disponibilidad de turnos.',
)

