/**
 * Configuración global del sitio.
 * Única fuente de verdad para marca, contacto, horarios y redes.
 * Ningún componente debe hardcodear estos datos.
 */
export const site = {
  name: 'Franco Barbería',
  shortName: 'Franco',
  tagline: 'Barbería clásica en Palermo',
  description:
    'Cortes, barba y afeitado a navaja con la calma de un oficio que se aprende con los años.',
  established: 2015,

  /* Editá estos datos cuando tengas la foto y el apellido reales */
  barber: {
    name: 'Franco',
    surname: 'Martínez',
    role: 'Barbero y fundador',
    photo: '/images/barbero.jpg',
  },

  contact: {
    phone: '+54 11 5555 1234',
    phoneHref: '+541155551234',
    whatsapp: '5491155551234',
    whatsappMessage: '¡Hola! Quiero reservar un turno en Franco Barbería.',
    email: 'hola@francobarberia.com',
    address: {
      street: 'Av. Thames 1234',
      area: 'Palermo Soho',
      city: 'CABA',
      postalCode: 'C1414',
      country: 'Argentina',
    },
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Av.+Thames+1234,+Palermo,+CABA',
    notes: 'A dos cuadras de Plaza Serrano. Estacionamiento con descuento en Thames y Gorriti.',
  },

  hours: [
    { day: 'Lunes', days: [1], open: null, close: null, closed: true },
    { day: 'Martes a viernes', days: [2, 3, 4, 5], open: '10:00', close: '20:00' },
    { day: 'Sábado', days: [6], open: '09:00', close: '19:00' },
    { day: 'Domingo', days: [0], open: null, close: null, closed: true },
  ],

  legalLinks: [
    {
      id: 'terminos',
      label: 'Términos y condiciones',
      href: 'legal/terminos.html',
    },
    {
      id: 'privacidad',
      label: 'Política de privacidad',
      href: 'legal/privacidad.html',
    },
  ],

  socials: [
    {
      id: 'instagram',
      label: 'Instagram',
      handle: '@francobarberia',
      href: 'https://instagram.com/',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      handle: 'Franco Barbería',
      href: 'https://facebook.com/',
    },
  ],
}
