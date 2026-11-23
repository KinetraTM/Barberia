import React from 'react';
import { buildWhatsAppLink } from '../../../utils/links';

export function WhatsAppButton({ 
  message, 
  children = 'Contactar por WhatsApp',
  className = '' 
}) {
  const whatsappUrl = buildWhatsAppLink(message)
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Iniciar conversación en WhatsApp"
      className={`btn-whatsapp ${className}`}
    >
      {children}
    </a>
  );
}