/**
 * Construcción de enlaces externos. Centralizado para que ningún componente
 * arme URLs a mano y el día que cambie el canal de reserva se toque un solo lugar.
 */

const DEFAULT_MESSAGE =
  "Hola Kinetra, me gustaría consultar por un desarrollo web.";
  
export function buildWhatsAppLink(message = DEFAULT_MESSAGE) {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE;
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

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
