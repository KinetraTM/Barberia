# Sistema de estilos — Franco Barbería

Referencia visual y técnica del proyecto. Todo valor relevante vive en `src/styles/tokens.css`; este documento explica **qué se usa, dónde y por qué**.

> Estética: barbería clásica contemporánea. Fondo casi negro cálido, latón como único acento, tipografía serif editorial para títulos y sans del sistema para interfaz.

---

## 1. Principios visuales

1. **Oscuro cálido, no negro puro.** El fondo (`#0b0a09`) tiene temperatura marrón para evitar el look "tech".
2. **Un solo acento: latón.** El dorado (`#c9a86a`) se reserva para jerarquía, precios, foco y CTAs. Nunca se usa en bloques grandes.
3. **Contraste por capas.** Fondo → superficie → superficie elevada. Las cards se separan con bordes de baja opacidad, no con sombras fuertes.
4. **Serif para emoción, sans para acción.** Títulos en serif con itálica en la palabra clave; navegación, botones y etiquetas en sans mayúscula con tracking amplio.
5. **Aire.** Secciones con padding vertical fluido y mucho espacio entre bloques; el lujo se percibe en el vacío.
6. **Detalles de oficio.** Líneas de 1 px, numeración editorial (`01`, `02`), marco desplazado en la imagen del hero, grillas de mapa.

---

## 2. Design tokens

Ubicación: `src/styles/tokens.css`, declarados en `:root`.

### 2.1 Color

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#0b0a09` | Fondo base de página |
| `--color-bg-soft` | `#100e0c` | Secciones alternas (servicios, contacto, footer) |
| `--color-surface` | `#17140f` | Cards, canales de contacto |
| `--color-surface-raised` | `#201c16` | Hover de cards |
| `--color-line` | `rgba(233,222,203,.12)` | Bordes y separadores |
| `--color-line-strong` | `rgba(233,222,203,.24)` | Bordes interactivos, botón secundario |
| `--color-text` | `#f3eee5` | Texto principal |
| `--color-text-muted` | `#a79e91` | Párrafos y descripciones |
| `--color-text-dim` | `#948b7d` | Microcopy, labels, metadatos |
| `--color-accent` | `#c9a86a` | Latón: CTA, eyebrows, precios |
| `--color-accent-soft` | `#e0c794` | Hover, itálicas, precios destacados |
| `--color-accent-ink` | `#16120b` | Texto sobre latón |
| `--color-focus` | `#e6c98f` | Anillo de foco |
| `--color-online` | `#7fbf87` | Punto de "abierto ahora" |

Regla: **ningún hex fuera de `tokens.css`**. Las únicas excepciones son gradientes decorativos con `rgba()` dentro del módulo que los usa.

### 2.2 Espaciado

Escala fija de 4 px:

| Token | Valor |
|---|---|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.25rem` |
| `--space-6` | `1.5rem` |
| `--space-8` | `2rem` |
| `--space-10` | `2.5rem` |
| `--space-12` | `3rem` |
| `--space-16` | `4rem` |

Los módulos pueden usar valores intermedios (0.85rem, 1.15rem) cuando el ritmo tipográfico lo pide, pero la estructura general usa la escala.

### 2.3 Layout

| Token | Valor | Uso |
|---|---|---|
| `--container-max` | `1200px` | Ancho de contenido |
| `--container-narrow` | `820px` | FAQ y bloques de lectura |
| `--gutter` | `clamp(1.15rem, 4vw, 2.5rem)` | Padding lateral fluido |
| `--header-height` | `4.5rem` | Header sticky y offsets |
| `--section-padding` | `clamp(3.75rem, 9vw, 7rem)` | Aire vertical de secciones |

### 2.4 Radios

| Token | Valor | Uso |
|---|---|---|
| `--radius-xs` | `2px` | Foco |
| `--radius-sm` | `6px` | Monograma, skip link |
| `--radius-md` | `12px` | Cards, paneles, canales |
| `--radius-lg` | `20px` | Media del hero, mapa |
| `--radius-pill` | `999px` | Botones, badges, dots |

### 2.5 Sombras

| Token | Valor | Uso |
|---|---|---|
| `--shadow-card` | `0 18px 40px -28px rgba(0,0,0,.9)` | Reservado para cards flotantes |
| `--shadow-float` | `0 30px 70px -30px rgba(0,0,0,.85)` | Panel del hero |

### 2.6 Movimiento

| Token | Valor |
|---|---|
| `--ease-out` | `cubic-bezier(.22,.61,.36,1)` |
| `--dur-fast` | `160ms` |
| `--dur-base` | `260ms` |
| `--dur-slow` | `480ms` |

### 2.7 Capas

| Token | Valor | Uso |
|---|---|---|
| `--z-header` | `60` | Header sticky |
| `--z-overlay` | `70` | Backdrop del drawer |
| `--z-drawer` | `80` | Panel del menú móvil |

El skip link usa `z-index: 999` puntual y justificado.

---

## 3. Tipografía

### 3.1 Familias

```css
--font-display: 'Iowan Old Style', 'Palatino Linotype', Palatino,
                'Book Antiqua', Georgia, serif;
--font-body: system-ui, -apple-system, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, sans-serif;
```

Sin webfonts: cero requests, cero FOUT/FOIT, cero CLS por fuentes. La serif se elige por disponibilidad en macOS/iOS/Windows y cae elegantemente a Georgia.

### 3.2 Escala fluida

| Nivel | Tamaño | Line-height | Letter-spacing |
|---|---|---|---|
| body | `clamp(1rem, .96rem + .2vw, 1.0625rem)` | `1.6` | normal |
| `h1` | `clamp(2.6rem, 1.5rem + 4.8vw, 4.75rem)` | `1.04` | `-.015em` |
| `h2` | `clamp(2rem, 1.45rem + 2.4vw, 3.15rem)` | `1.04` | `-.015em` |
| `h3` | `clamp(1.25rem, 1.12rem + .6vw, 1.55rem)` | `1.04` | `-.015em` |
| `h4` | `1.0625rem` | `1.04` | `-.015em` |

Pesos: títulos en `500` (nunca bold). El contraste de peso se reemplaza por tamaño y color.

### 3.3 Overrides por contexto

- **Hero:** `clamp(2.7rem, 1.5rem + 5vw, 5rem)`, `line-height: .98`, `letter-spacing: -.03em`.
- **Línea destacada del hero:** `.accentLine` usa `--color-accent-soft` + `font-style: italic`.
- **Títulos de card / servicio:** `1.32rem` en serif.
- **Precios:** serif `1.08–1.15rem` en `--color-accent-soft`.
- **Preguntas del acordeón:** `clamp(1.1rem, 1.02rem + .35vw, 1.3rem)`.

### 3.4 Microtipografía

| Patrón | Reglas |
|---|---|
| `.eyebrow` (global) | `0.72rem`, `600`, `letter-spacing: .2em`, uppercase, color latón, línea de `1.75rem` antes |
| Navegación | `0.72rem`, `600`, `.16em`, uppercase |
| Botones | `0.76rem`, `600`, `.13em`, uppercase |
| Badges / tags | `0.6–0.66rem`, `600`, `.13–.14em`, uppercase |
| Labels de formulario/canal | `0.62rem`, `600`, `.16em`, uppercase |
| Footer titles | `0.66rem`, `600`, `.22em`, uppercase |

`.eyebrow` es **la única clase global** (definida en `typography.css`), porque es un patrón puramente tipográfico repetido en todas las secciones.

---

## 4. Layout y estructura

### 4.1 Container

```css
width: 100%;
max-width: calc(var(--container-max) + var(--gutter) * 2);
margin-inline: auto;
padding-inline: var(--gutter);
```

Variantes: `narrow` (820px) para FAQ, `wide` (1440px) reservado.

### 4.2 Section

- `padding-block: var(--section-padding)`.
- `tone="tinted"` → `--color-bg-soft`.
- `hairline` → línea superior de 1 px con gradiente que se desvanece en los bordes.
- `id` obligatorio en secciones anclables.

### 4.3 Grillas principales

| Sección | Base | `lg` (1024px) |
|---|---|---|
| Hero | 1 columna | `1.05fr / .95fr` |
| Servicios | 1 columna | `.85fr / 1.15fr` con aside sticky |
| Contacto | 1 columna | `.9fr / 1.1fr` |
| Footer | 1 col → 2 col (`sm`) | `1.4fr / .8fr / .9fr / 1fr` |

Siempre `minmax(0, …)` para evitar desbordes por contenido largo.

### 4.4 Breakpoints

Se escriben literales en cada módulo (CSS Modules no admite variables en `@media`):

| Token | Valor | Qué cambia |
|---|---|---|
| base | 320–639 | 1 columna, menú hamburguesa, cards 1:1 |
| `sm` | 640px | CTA del header, carrusel 2-up, footer 2 col, cards 4:5 |
| `md` | 768px | Flechas del carrusel |
| `lg` | 1024px | Nav completa, hero/servicios/contacto en 2 col, “Est. 2015” vertical |
| `xl` | 1280px | Solo referencia de ancho máximo |

---

## 5. Componentes

### 5.1 Button

| Aspecto | Valor |
|---|---|
| Base | `inline-flex`, gap `.55rem`, `min-height: 2.9rem`, padding `.85rem 1.6rem` |
| Forma | `border-radius: 999px`, borde transparente de 1 px |
| Texto | `.76rem`, `600`, `.13em`, uppercase, `white-space: nowrap` |
| Transición | color, fondo, borde, `transform` (160–260 ms) |

Variantes:

- `primary`: fondo latón, texto `--color-accent-ink`. Hover: `--color-accent-soft`.
- `secondary`: borde `--color-line-strong`, texto claro. Hover: borde latón + fondo `rgba(201,168,106,.08)` + texto `--color-accent-soft`.
- `ghost`: sin fondo ni borde, texto latón. Hover: texto claro.

Tamaños: `sm` (2.4rem / `.7rem`), `md`, `lg` (3.15rem / `.8rem`).

Micro-interacción: el icono de la derecha se desplaza `2px` en hover; el botón baja `1px` en `:active`.

### 5.2 Navbar

- Altura fija `4.5rem`, `position: sticky`, fondo transparente al inicio.
- Al scrollear (>12 px): fondo `rgba(11,10,9,.82)`, `backdrop-filter: blur(14px) saturate(140%)` y borde inferior.
- Links con subrayado latón que crece desde la izquierda; estado activo por scroll-spy (`aria-current="true"`).
- CTA visible desde 640 px; hamburguesa circular de `2.75rem` hasta 1023 px.

### 5.3 Drawer móvil

- Ancho `min(24rem, 90vw)`, alto completo, borde izquierdo.
- Backdrop `rgba(0,0,0,.62)` + `blur(4px)`.
- Entrada: `slideIn` de 260 ms + `fadeIn` del backdrop.
- Links serif de `1.5rem` con numeración `01–04` en latón `.62rem`.
- CTA full-width al pie + tagline de marca.

### 5.4 Hero

- Fondo con dos radiales latón de baja opacidad (12 % y 6 %).
- Título en dos líneas, la segunda en itálica latón.
- Stats separados por `border-top`, valor serif `1.55rem`, label `.66rem` con `.15em`.
- Media: `aspect-ratio: 4/5`, `max-width: 30rem`, borde y `--shadow-float`.
- Marco decorativo desplazado: `inset: .9rem -.7rem -.7rem .9rem` con borde latón al 18 %.
- Textura de rayas diagonales al 3.5 % + monograma gigante al 16 % (placeholder).
- Pill de disponibilidad: vidrio `rgba(11,10,9,.72)` + blur, punto verde con halo.
- “Est. 2015” vertical solo en `lg`, rotado 180°.

### 5.5 Cards de cortes

- Media `1:1` en móvil, `4:5` desde 640 px.
- Fondo por degradé radial usando `--tone` (definido por item de contenido).
- Velo inferior `linear-gradient` para dar profundidad.
- Watermark numérico serif de `5.5rem` al 10 % de opacidad; sube 6 px en hover.
- Badge “Más pedido” arriba a la izquierda.
- Body: nombre `1.32rem`, descripción `.9rem`, tags pill `.6rem`.
- Footer de card con borde superior, precio latón y link “Reservar →”.

### 5.6 Carrusel

- Track `overflow-x: auto` + `scroll-snap-type: x mandatory`, sin scrollbar visible.
- Gap `1.25rem`; 1 card / 2 (640 px) / 3 (1024 px).
- Toolbar inferior: dots a la izquierda, flechas a la derecha (solo ≥768 px).
- Dot inactivo `.45rem` gris; activo se estira a `1.5rem` y toma latón.
- Flechas circulares de `2.75rem` con borde tenue; hover latón; `disabled` al 35 %.

### 5.7 Acordeón

- Filas con borde superior e inferior de 1 px.
- Trigger full-width, texto serif a la izquierda, icono `+` a la derecha.
- Icono: dos barras de 1.5 px; la vertical rota 90° al abrir.
- Apertura animada con `grid-template-rows: 0fr → 1fr` (260 ms).
- Respuesta: `.98rem`, line-height `1.7`, máximo `62ch`.

### 5.8 Servicios

- Aside sticky en `lg` (`top: header + 2rem`).
- Lista tipo carta: fila con nombre y precio alineados por baseline, borde superior.
- Descripción `.92rem` máximo `46ch`.
- Meta: duración con icono de reloj `.66rem` + badges de extras.
- Hover: el nombre pasa a latón.
- Nota de precios `.8rem` en `text-dim`.

### 5.9 Contacto

- Canales como tarjetas clicables: icono en círculo de `2.5rem`, label micro, valor, flecha que se desplaza 2 px en hover.
- Horarios en panel con filas `border-bottom: dashed`.
- Panel de mapa: grilla de 46 px en latón al 7 %, viñeta radial, pin circular con anillo de halo de 10 px.
- Sin iframe: fondo oscuro + contenido centrado + CTA a Google Maps.

### 5.10 Footer

- Fondo `--color-bg-soft`, borde superior.
- 4 columnas en desktop: marca, navegación, servicios, contacto.
- Redes como círculos de `2.5rem`.
- Franja de horarios en una línea (wrap) separada por borde.
- Barra legal con copyright dinámico y “Volver arriba” con flecha rotada −90°.

---

## 6. Estados e interacción

| Estado | Tratamiento |
|---|---|
| Hover | Borde latón al 35–40 %, texto latón suave, desplazamientos de 1–2 px |
| Focus visible | `outline: 2px solid var(--color-focus)`, `outline-offset: 3px` |
| Active | `translateY(1px)` en botones |
| Disabled | `opacity: .35` + `cursor: not-allowed` (flechas del carrusel) |
| Activo (nav) | Subrayado latón + `aria-current="true"` |
| Selección de texto | Fondo latón, texto `--color-accent-ink` |
| Drawer abierto | Backdrop + blur + scroll bloqueado |

Hover solo tiene sentido con puntero: los efectos no dependen de `:hover` para funciones críticas.

---

## 7. Movimiento

- Duración estándar `260ms` con `--ease-out`; entradas cortas `160ms`; desplazamientos largos `480ms`.
- Animaciones existentes: entrada del drawer, apertura del acordeón, subrayado del nav, dots, hover de cards.
- **No hay autoplay** en el carrusel (decisión de accesibilidad y performance).
- `prefers-reduced-motion: reduce` desactiva scroll suave y reduce todas las transiciones/animaciones a ~0.
- El scroll suave se define en `html` y también se anula con reduced motion.

---

## 8. Accesibilidad visual

- Contraste objetivo AA:
  - texto principal `#f3eee5` sobre `#0b0a09` ≈ 16:1;
  - texto muted ≈ 7.5:1;
  - texto dim `#948b7d` ≈ 5.8:1;
  - latón sobre fondo ≈ 8.7:1;
  - texto sobre botón latón ≈ 8:1.
- Áreas táctiles mínimas de 44×44 px (botones, flechas, redes, cierre del drawer).
- Foco siempre visible, incluso sobre fondos con imagen o gradiente.
- Información nunca depende solo del color (badges y textos acompañan).
- Iconos decorativos con `aria-hidden="true"`; iconos con significado aceptan `title`.
- Placeholders de imagen mantienen `aspect-ratio` para evitar saltos de layout.

---

## 9. Convenciones de CSS Modules

1. Un archivo `Componente.module.css` por componente, junto a su `.jsx`.
2. Clases semánticas en camelCase: `.root`, `.inner`, `.title`, `.media`, `.actions`, `.footer`.
3. Variantes por mapa explícito (`styles[variant]`), nunca con template strings.
4. Sin `!important`. Sin anidamiento profundo. Sin selectores de etiqueta dentro de módulos.
5. `:global` solo en `src/styles/*.css`.
6. Los valores visuales repetidos se promueven a token; los puntuales pueden quedar locales.
7. La única utilidad global es `.eyebrow`.

### Orden recomendado dentro de un módulo

1. Layout (display, grid, flex, position).
2. Caja (padding, margin, width, border, radius).
3. Tipografía y color.
4. Estados (hover, focus, active, disabled).
5. Media queries al final del bloque que afectan.

---

## 10. Placeholders de imagen

Mientras no existan fotos reales:

- **Hero:** degradé latón + rayas diagonales + monograma “F”. Al setear `hero.image.src`, la foto reemplaza el placeholder sin tocar CSS.
- **Cortes:** degradé radial por `--tone`, velo inferior y número editorial.

Tones actuales (`content/haircuts.js`): `#3b3024`, `#2f3336`, `#36302f`, `#3d3527`, `#332a26`, `#2b3230`, `#3a2d23`.

Al incorporar fotos: mantener `aspect-ratio`, agregar `width`/`height`, `loading="lazy"` (excepto hero) y `alt` descriptivo.

---

## 11. Checklist para una sección nueva

- [ ] Usa `Section` con `id` y `hairline` cuando corresponda.
- [ ] Usa `Container` (default o `narrow` para lectura).
- [ ] Usa `SectionHeading` con eyebrow, título y subtítulo.
- [ ] El contenido proviene de `content/`, no está hardcodeado.
- [ ] 1 columna en móvil; layout en 2 columnas recién en `lg`.
- [ ] Sin scroll horizontal a 320 px.
- [ ] Textos con `text-wrap: balance` (títulos) y `pretty` (párrafos) — ya aplicado globalmente.
- [ ] Estados de hover/focus/active definidos.
- [ ] Funciona con teclado y con `prefers-reduced-motion`.
- [ ] No introduce hex nuevos fuera de tokens.
- [ ] Probada en 390 px, 768 px y 1440 px.

---

## 12. Anti-patrones evitados

- ❌ Librerías de carrusel, animación o UI para problemas que CSS resuelve.
- ❌ Colores hardcodeados en componentes.
- ❌ Textos de negocio dentro de JSX.
- ❌ `!important`, `z-index: 9999` o `position: absolute` sin contenedor relativo.
- ❌ Sombras grandes para separar bloques (se usa borde + capas de fondo).
- ❌ Autoplay de carrusel.
- ❌ Iframe de Google Maps cargado en el primer render.
- ❌ Tipografías externas sin self-hosting.
- ❌ Grids con `1fr` sin `minmax(0, 1fr)` (causa overflow con contenido largo).
