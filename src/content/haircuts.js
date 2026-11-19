/**
 * Cortes más solicitados (carrusel).
 * `tone` alimenta el degradé del placeholder visual hasta que existan fotos reales.
 */
export const featuredCuts = {
  eyebrow: 'Los más pedidos',
  title: 'Cortes que se repiten',
  subtitle:
    'Los estilos que más nos piden en el sillón. Todos incluyen asesoramiento según tu tipo de pelo y rutina.',
  items: [
    {
      id: 'fade-clasico',
      name: 'Fade clásico',
      description: 'Degradé prolijo a máquina y tijera, con terminación a navaja.',
      tags: ['Fade', 'Clásico'],
      price: 12000,
      tone: '#3b3024',
      featured: true,
    },
    {
      id: 'taper-fade',
      name: 'Taper fade',
      description: 'Transición suave en patillas y nuca, más largo arriba.',
      tags: ['Taper', 'Textura'],
      price: 13000,
      tone: '#2f3336',
    },
    {
      id: 'crop-texturizado',
      name: 'Crop texturizado',
      description: 'Flequillo recto y textura desordenada con fibra mate.',
      tags: ['Textura', 'Moderno'],
      price: 13500,
      tone: '#36302f',
    },
    {
      id: 'pompadour',
      name: 'Pompadour',
      description: 'Volumen al frente, laterales ajustados y fijación firme.',
      tags: ['Clásico', 'Volumen'],
      price: 14000,
      tone: '#3d3527',
    },
    {
      id: 'corte-barba',
      name: 'Corte + barba',
      description: 'El combo completo: corte a medida y barba perfilada.',
      tags: ['Combo', 'Barba'],
      price: 18000,
      tone: '#332a26',
      featured: true,
    },
    {
      id: 'afeitado-navaja',
      name: 'Afeitado a navaja',
      description: 'Toalla caliente, aceite y navaja. El ritual de siempre.',
      tags: ['Ritual', 'Navaja'],
      price: 14000,
      tone: '#2b3230',
    },
    {
      id: 'barba-completa',
      name: 'Barba completa',
      description: 'Perfilado, recorte y aceite para mantener la forma.',
      tags: ['Barba', 'Perfilado'],
      price: 9000,
      tone: '#3a2d23',
    },
  ],
}
