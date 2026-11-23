/**
 * Construcción de enlaces externos. Centralizado para que ningún componente
 * arme URLs a mano y el día que cambie el canal de reserva se toque un solo lugar.
 */
//==================WHATSAPP==================
const DEFAULT_MESSAGE = '¡Hola! Quiero reservar un turno en Franco Barbería.'

export function buildWhatsAppLink(message = DEFAULT_MESSAGE) {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE;
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
//=============================================

//==================DIRECCION=====================
const DEFAULT_ADDRESS = import.meta.env.VITE_BUSINESS_ADDRESS;

export function getGoogleMapsEmbedUrl(address = DEFAULT_ADDRESS) {
  const encodedAddress = encodeURIComponent(address);
  return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
}

export function getGoogleMapsDirectionsUrl(address = DEFAULT_ADDRESS) {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
}
//=============================================

export function buildPhoneLink(phone) {
  return `tel:${String(phone).replace(/[^\d+]/g, "")}`;
}

export function buildMailtoLink(email, subject = "", body = "") {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${email}${query ? `?${query}` : ""}`;
}
