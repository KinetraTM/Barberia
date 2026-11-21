/**
 * Muestrario de trabajos reales del sillón.
 * Las fotos van en `public/images/trabajos/` con el nombre de `image`.
 * Mientras no existan, el fondo de tono + textura hace las veces de placeholder.
 */
export const featuredCuts = {
  title: 'Trabajos que salen del sillón',
  subtitle:
    'Acá no elegís de una lista. Vemos ejemplos, charlamos qué te gusta y lo adaptamos a tu pelo. Estos son algunos trabajos de Franco.',
  items: [
    {
      id: 'fade-clasico',
      name: 'Fade clásico',
      detail: 'Degradé prolijo y terminación a navaja',
      image: '/images/trabajos/fade-clasico.jpg',
      alt: 'Fade clásico con terminación a navaja',
      tone: '#3b3024',
    },
    {
      id: 'taper-fade',
      name: 'Taper fade',
      detail: 'Patillas y nuca suaves, más largo arriba',
      image: '/images/trabajos/taper-fade.jpg',
      alt: 'Taper fade con transición suave en patillas',
      tone: '#2f3336',
    },
    {
      id: 'crop-texturizado',
      name: 'Crop texturizado',
      detail: 'Flequillo recto y textura con fibra mate',
      image: '/images/trabajos/crop-texturizado.jpg',
      alt: 'Crop texturizado con flequillo recto',
      tone: '#36302f',
    },
    {
      id: 'pompadour',
      name: 'Pompadour',
      detail: 'Volumen al frente y laterales ajustados',
      image: '/images/trabajos/pompadour.jpg',
      alt: 'Pompadour con volumen al frente',
      tone: '#3d3527',
    },
    {
      id: 'corte-barba',
      name: 'Corte + barba',
      detail: 'Corte a medida y barba perfilada',
      image: '/images/trabajos/corte-barba.jpg',
      alt: 'Corte de cabello combinado con barba perfilada',
      tone: '#332a26',
    },
    {
      id: 'afeitado-navaja',
      name: 'Afeitado a navaja',
      detail: 'Toalla caliente, aceite y navaja',
      image: '/images/trabajos/afeitado-navaja.jpg',
      alt: 'Afeitado clásico a navaja con toalla caliente',
      tone: '#2b3230',
    },
    {
      id: 'barba-completa',
      name: 'Barba completa',
      detail: 'Perfilado, recorte y aceite',
      image: '/images/trabajos/barba-completa.jpg',
      alt: 'Barba completa perfilada y con aceite',
      tone: '#3a2d23',
    },
  ],
}
