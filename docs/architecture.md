# Arquitectura — Franco Barbería

Documento de referencia del sistema. Describe cómo está organizado el proyecto, qué decisiones se tomaron, qué contratos existen entre capas y en qué estado se encuentra el roadmap.

> Última actualización: noviembre 2026 · Estado: landing implementada, pendiente contenido real y auditoría final.

---

## 1. Resumen

Landing page de una sola vista para una barbería. Objetivo único: **convertir visitas en reservas** (WhatsApp / teléfono) y visitas al local.

- **Stack:** React 19 + Vite 8 + CSS Modules (JavaScript, sin TypeScript).
- **Sin dependencias de runtime extra:** no hay router, librería de UI, carrusel, animación ni estado global.
- **Contenido desacoplado:** todos los textos, precios, horarios e imágenes viven en `src/content/`.
- **Preparada para crecer:** la estructura permite agregar páginas, reserva online o una segunda sede sin reescribir componentes.

---

## 2. Decisiones técnicas

| Decisión | Elección | Motivo |
|---|---|---|
| Build | Vite 8 | Ya instalado, HMR rápido, CSS Modules nativo |
| UI | React 19 + JSX | Base existente del proyecto |
| Estilos | CSS Modules + design tokens | Aislamiento por componente, sin dependencias |
| TypeScript | No (por ahora) | El proyecto arrancó en JS; la estructura está lista para migrar archivo por archivo |
| Routing | No hay router | Una sola página; navegación por anclas |
| Reservas | Deep link de WhatsApp | No hay backend; evita un formulario que no envía nada |
| Mapa | Panel visual + link a Google Maps | Sin iframe: cero cookies de terceros, cero costo de carga |
| Estado global | Ninguno | Todo el estado es local (header, drawer, carrusel, acordeón) |
| Alias de imports | `@` → `src` | Evita rutas relativas frágiles (`../../..`) |
| Lint | oxlint | Ya configurado en el proyecto |

### Convención de imports

```js
import Button from '@/components/ui/Button/Button'   // capas compartidas
import { site } from '@/content/site.config'          // contenido
import styles from './Hero.module.css'                // hermano del componente
```

Regla: `@/` para todo lo que esté fuera de la carpeta del componente; rutas relativas solo para hermanos (`../Icon/Icon`, `./X.module.css`). Nunca se usa `../../..` para llegar a `content`, `utils` o `hooks`.

---

## 3. Principios de diseño

1. **Contenido ≠ presentación ≠ lógica.**
   Cambiar un precio = editar un archivo en `content/`. Cambiar un color global = editar `tokens.css`. Cambiar el comportamiento del carrusel = editar `useCarousel.js`.

2. **Cada sección tiene una única responsabilidad.**
   `Hero` no sabe de servicios; `Services` no sabe de FAQ. El orden de la página vive solo en `LandingPage.jsx`.

3. **Las primitivas de UI no conocen el negocio.**
   `Button`, `Carousel` o `Accordion` reciben props y no importan nada de `content/`.

4. **La lógica vive en hooks, no en JSX.**
   Scroll, foco, medición del carrusel y bloqueo de body están aislados y son reutilizables.

5. **La capa de I/O es una frontera explícita.**
   Ningún componente llama a `fetch`. Si mañana hay reserva online, se implementa en `services/` y la sección solo consume el hook.

---

## 4. Reglas de dependencia

```
app (App.jsx)
  ├─ layout (SiteHeader, MobileMenu, SiteFooter, PageShell)
  │    ├─ ui (Button, Icon, Logo, Container...)
  │    ├─ hooks
  │    ├─ utils
  │    └─ content (navigation, site)
  └─ features/landing
       ├─ sections (Hero, FeaturedCuts, Services, Faq, ContactLocation)
       ├─ ui, hooks, utils
       └─ content (el módulo de su propia sección)
```

Prohibiciones:

- `components/ui/**` **no** importa `content/`, `features/`, `services/` ni `hooks` de negocio.
- `content/**` no contiene JSX ni lógica.
- `features/**` no llama `fetch` directamente.
- Ninguna capa importa "hacia arriba" (UI nunca conoce una sección).
- Dos secciones no se importan entre sí; si comparten algo, se promueve a `ui/` o `utils/`.

---

## 5. Estructura de carpetas

```txt
francobarberia/
├─ public/
│  ├─ favicon.svg               # monograma "F"
│  ├─ robots.txt
│  └─ images/                   # fotos reales (vacía por ahora)
├─ src/
│  ├─ App.jsx                   # composition root: shell + pasaje de datos
│  ├─ main.jsx                  # bootstrap de React
│  ├─ index.css                 # importa styles/*
│  ├─ styles/
│  │  ├─ tokens.css             # design tokens (:root)
│  │  ├─ reset.css              # normalización
│  │  ├─ typography.css         # escala fluida + .eyebrow
│  │  └─ global.css             # scroll suave, selección, reduced motion
│  ├─ components/
│  │  ├─ ui/                    # primitivas sin conocimiento del negocio
│  │  │  ├─ Accordion/
│  │  │  ├─ Badge/
│  │  │  ├─ Button/
│  │  │  ├─ Carousel/
│  │  │  ├─ Container/
│  │  │  ├─ Icon/
│  │  │  ├─ Logo/
│  │  │  ├─ Section/
│  │  │  ├─ SectionHeading/
│  │  │  ├─ VisuallyHidden/
│  │  │  └─ index.js            # barrel de exports
│  │  └─ layout/                # estructura persistente de página
│  │     ├─ MobileMenu/
│  │     ├─ PageShell/
│  │     ├─ SiteFooter/
│  │     └─ SiteHeader/
│  ├─ features/
│  │  └─ landing/
│  │     ├─ LandingPage.jsx     # orden de secciones
│  │     ├─ Hero/
│  │     ├─ FeaturedCuts/
│  │     ├─ Services/
│  │     ├─ Faq/
│  │     └─ ContactLocation/
│  ├─ content/                  # datos y copy (sin JSX)
│  │  ├─ site.config.js
│  │  ├─ navigation.js
│  │  ├─ hero.js
│  │  ├─ haircuts.js
│  │  ├─ services.js
│  │  ├─ faqs.js
│  │  └─ contact.js
│  ├─ hooks/
│  │  ├─ useActiveSection.js
│  │  ├─ useCarousel.js
│  │  ├─ useMediaQuery.js
│  │  ├─ useReducedMotion.js
│  │  ├─ useScrollLock.js
│  │  └─ useScrolled.js
│  ├─ utils/
│  │  ├─ cn.js
│  │  ├─ format.js
│  │  └─ links.js
│  └─ services/
│     └─ README.md              # frontera de I/O (vacía a propósito)
├─ index.html                   # meta, OG y JSON-LD
└─ vite.config.js               # plugin React + alias @
```

### Carpetas reservadas para el futuro (no crear sin necesidad)

```
src/pages/                 # vistas de ruta
src/app/router.jsx         # cuando exista más de una página
src/features/booking/      # flujo de reserva
src/features/admin/        # panel interno
src/services/bookingService.js
```

---

## 6. Capas en detalle

### 6.1 `App.jsx` (composition root)

Es el único lugar que conoce el ensamblado completo. Hace tres cosas:

1. Deriva la marca (`brand`) desde `site.config.js`.
2. Pasa navegación y CTA al header.
3. Compone `PageShell → SiteHeader → main → LandingPage → SiteFooter`.

No contiene estilos ni lógica de negocio.

### 6.2 `content/`

Fuente única de verdad. Módulos planos con objetos exportados. Sin imports de React.

| Archivo | Contenido |
|---|---|
| `site.config.js` | Marca, contacto, dirección, horarios, redes, descripción |
| `navigation.js` | Links del navbar + CTA |
| `hero.js` | Título, subtítulo, CTAs, indicadores, disponibilidad, imagen opcional |
| `haircuts.js` | 7 cortes con tags, precio, `tone` del placeholder |
| `services.js` | 7 servicios con precio, duración, extras y destacado |
| `faqs.js` | 7 preguntas/respuestas + texto de cierre |
| `contact.js` | Copy de la sección de contacto |

Un cambio de contenido nunca requiere tocar un componente.

### 6.3 `features/landing/sections/`

Cada sección:

- importa su propio módulo de contenido;
- compone primitivas de `ui/`;
- tiene un único `X.module.css`;
- exporta un default `X.jsx`.

| Sección | id / ancla | Responsabilidad |
|---|---|---|
| `Hero` | `#inicio` | Propuesta de valor + CTA principal + prueba de confianza |
| `FeaturedCuts` | `#cortes` | Carrusel de trabajos con reserva directa por corte |
| `Services` | `#servicios` | Carta de precios y duración |
| `Faq` | `#faq` | Resolución de objeciones |
| `ContactLocation` | `#contacto` | Canales, horarios y ubicación |

### 6.4 `components/ui/`

Primitivas genéricas, reutilizables y sin datos. Ver catálogo en la sección 7.

### 6.5 `components/layout/`

| Componente | Responsabilidad |
|---|---|
| `PageShell` | Skip link + contenedor flex de página |
| `SiteHeader` | Sticky header, scroll-spy, estado del drawer, CTA |
| `MobileMenu` | Drawer: foco atrapado, Escape, scroll lock, restauración de foco |
| `SiteFooter` | Navegación secundaria, contacto, horarios, legales |

### 6.6 `hooks/`

| Hook | Contrato |
|---|---|
| `useCarousel(count)` | `trackRef`, `index`, `maxIndex`, `pageCount`, `next`, `prev`, `goTo`, `handleScroll`, `canPrev`, `canNext`. Mide cards reales para calcular items visibles |
| `useActiveSection(ids)` | id de la sección en el viewport (IntersectionObserver) |
| `useScrolled(threshold)` | `true` cuando `scrollY > threshold` |
| `useMediaQuery(query)` | booleano reactivo a cambios de media query |
| `useReducedMotion()` | wrapper de `prefers-reduced-motion: reduce` |
| `useScrollLock(locked)` | bloquea body y compensa el ancho de scrollbar |

### 6.7 `utils/`

| Utilidad | Función |
|---|---|
| `cn(...classes)` | Une clases ignorando falsy |
| `buildWhatsAppLink(number, message)` | `wa.me` con mensaje prellenado |
| `buildPhoneLink(phone)` | `tel:` normalizado |
| `buildMailtoLink(email, subject, body)` | `mailto:` con query |
| `formatPrice(value)` | `Intl.NumberFormat('es-AR', ARS)` → `$ 12.000` |
| `formatDuration(minutes)` | `45 min` / `1 h 30 min` |
| `formatSchedule(entry)` | `10:00 – 20:00` / `Cerrado` |

### 6.8 `services/`

Frontera de I/O deliberadamente vacía. Cuando se agregue formulario o reserva:

- `contactService.js`, `bookingService.js`, `analytics.js`;
- URLs y claves en `import.meta.env`;
- los componentes siguen sin llamar `fetch`.

---

## 7. Catálogo de componentes UI

| Componente | Props principales | Notas |
|---|---|---|
| `Button` | `href`, `variant` (`primary`/`secondary`/`ghost`), `size` (`sm`/`md`/`lg`), `fullWidth`, `iconRight`, `onClick` | Si recibe `href` renderiza `<a>`; si no, `<button type="button">` |
| `Container` | `as`, `size` (`default`/`narrow`/`wide`) | Ancho máximo + gutter fluido |
| `Section` | `id`, `as`, `spacing` (`default`/`compact`/`flush`), `tone` (`default`/`tinted`), `hairline` | Wrapper semántico con padding y divisor superior |
| `SectionHeading` | `eyebrow`, `title`, `subtitle`, `align`, `level`, `id` | h2 por defecto |
| `Carousel` | `items`, `renderItem`, `getKey`, `ariaLabel` | Scroll-snap nativo + flechas, dots y live region |
| `Accordion` | `items` (`{id,title,content}`), `defaultOpenId`, `allowMultiple` | Apertura simple, ARIA completo |
| `Badge` | `tone` (`default`/`accent`/`muted`) | Etiquetas cortas |
| `Icon` | `name`, `size`, `title` | Set inline; marcas con relleno |
| `Logo` | `href`, `name`, `sub`, `monogram`, `onClick` | Marca textual reutilizable |
| `VisuallyHidden` | `as`, `...rest` | Texto solo para lectores de pantalla |

Los imports pueden hacerse desde `@/components/ui` (barrel) o por ruta directa.

---

## 8. Flujo de datos

```
content/*.js ──► sección (features/landing/sections/*) ──► primitivas ui/*
      │                        │
      │                        ├── hooks (estado local / browser APIs)
      │                        └── utils (formato y links)
      │
      └──► App.jsx ──► layout (header / footer)
```

- No hay store global ni Context.
- El estado del carrusel vive en `useCarousel`.
- El estado del acordeón vive en `Accordion`.
- El estado del drawer vive en `SiteHeader` y el foco/scroll en `MobileMenu`.
- El scroll-spy del navbar consume `useActiveSection`.

---

## 9. Contrato de contenido por sección

### Global — `site.config.js`

```js
{
  name, shortName, monogram, tagline, description, established,
  contact: { phone, phoneHref, whatsapp, whatsappMessage, email,
             address: { street, area, city, postalCode, country },
             mapsUrl, notes },
  hours: [{ day, open, close, closed }],
  socials: [{ id, label, handle, href }]
}
```

### Navbar — `navigation.js`

`navLinks: [{ id, label, href }]` (ids usados por el scroll-spy) y `navCta: { label, href }`.

### Hero — `hero.js`

`eyebrow`, `titleLines[]`, `accentLine` (índice de la línea destacada), `lead`, `primaryCta`, `secondaryCta`, `availability`, `image: { src?, alt }`, `stats[] { value, label }`.

Si `image.src` existe, el hero renderiza foto real; si no, muestra el placeholder con monograma.

### Cortes — `haircuts.js`

`eyebrow`, `title`, `subtitle`, `items[]`:
`{ id, name, description, tags[], price, tone, featured? }`.

### Servicios — `services.js`

`eyebrow`, `title`, `subtitle`, `note`, `cta`, `items[]`:
`{ id, name, description, price, duration, includes?, featured? }`.

### FAQ — `faqs.js`

`eyebrow`, `title`, `subtitle`, `contactPrompt { label }`, `items[] { id, question, answer }`.

### Contacto — `contact.js`

`eyebrow`, `title`, `subtitle`, `whatsappLabel`, `callLabel`, `emailLabel`, `mapCta`, `mapCaption`, `mapAddress`, `hoursTitle`, `channelsTitle`.

---

## 10. Estrategia responsive

Mobile-first con `min-width`. Breakpoints reales:

| Token | Valor | Se usa para |
|---|---|---|
| base | 320–639 | móvil |
| `sm` | 640px | CTA del header, carrusel 2-up, footer 2 columnas, cards 4:5 |
| `md` | 768px | flechas del carrusel |
| `lg` | 1024px | navegación completa, hero 2 columnas, servicios 2 columnas, contacto 2 columnas |
| `xl` | 1280px | contenedor máximo |

Recursos:

- Tipografía fluida con `clamp()` (sin media queries por heading).
- Gutter fluido `clamp(1.15rem, 4vw, 2.5rem)`.
- `--section-padding: clamp(3.75rem, 9vw, 7rem)`.
- Alturas en `svh`/`dvh` (evita saltos por la barra del navegador móvil).
- Objetivos táctiles ≥ 44×44 px.
- Grids con `minmax(0, 1fr)` para evitar overflow por contenido largo.

Verificado en 390 px y 1440 px sin scroll horizontal (`scrollWidth === clientWidth`).

---

## 11. Accesibilidad

Implementado:

- Skip link a `#contenido`.
- Un solo `h1`; jerarquía h2/h3 por sección.
- Landmarks: `header`, `nav` con `aria-label`, `main`, `footer`.
- Header: `aria-current` en el link activo.
- Drawer: `role="dialog"`, `aria-modal`, foco atrapado, Escape, restauración de foco, scroll lock.
- Carrusel: `aria-roledescription`, `aria-label` por slide, dots con `aria-current`, live region con la posición, flechas con `disabled` real.
- Acordeón: `aria-expanded`, `aria-controls`, `aria-labelledby`, `aria-hidden` en paneles cerrados.
- Iconos decorativos con `aria-hidden`; iconos con significado aceptan `title`.
- Focus visible global (`outline` latón de 2 px).
- `prefers-reduced-motion`: desactiva scroll suave, transiciones y animaciones.

Pendiente: auditoría automatizada (axe/Lighthouse) con contenido definitivo.

---

## 12. Performance y SEO

- Bundle: ~254 kB JS (80 kB gzip) y ~27 kB CSS (6 kB gzip) en producción.
- Sin librerías de terceros: el costo es React + código propio.
- Imágenes: `loading="eager"` solo en hero; el resto `lazy` cuando se agreguen fotos. Usar `width`/`height` o `aspect-ratio` para CLS 0.
- `index.html` incluye `lang="es"`, meta description, Open Graph, Twitter card, `theme-color` y JSON-LD `HairSalon`.
- `public/robots.txt` con allow total.
- Mapa sin iframe (no bloquea render ni instala cookies).
- Fuentes del sistema: cero requests de fuentes, sin FOUT.

Pendiente: `og-image.jpg`, favicon de alta resolución, auditoría Lighthouse con fotos reales, sitemap si se agregan rutas.

---

## 13. Roadmap

| Fase | Alcance | Estado |
|---|---|---|
| 0. Setup | Estructura, tokens, alias `@`, limpieza del scaffold, metadata base | ✅ |
| 1. Base visual | reset, tokens, tipografía, Container, Section, SectionHeading, Button, Icon, Badge, VisuallyHidden | ✅ |
| 2. Shell | PageShell + skip link, SiteHeader sticky con scroll-spy, MobileMenu accesible, SiteFooter | ✅ |
| 3. Hero | Layout 2 columnas, CTAs, stats, placeholder/foto opcional, disponibilidad | ✅ |
| 4. Carrusel | `useCarousel` + `Carousel` genérico + cards de cortes | ✅ |
| 5. Servicios | Carta de precios responsive con aside sticky | ✅ |
| 6. FAQ | `Accordion` accesible + sección | ✅ |
| 7. Contacto | Canales, horarios, mapa liviano, CTA WhatsApp | ✅ (sin formulario, por decisión) |
| 8. Pulido | Responsive 390/1440, contraste, SEO, JSON-LD, build | 🟡 Parcial |
| 8b. Contenido real | Fotos, dirección, teléfono, precios y horarios definitivos | ⏳ Pendiente |
| 8c. QA final | Lighthouse, axe, 320/768, prueba en dispositivos reales | ⏳ Pendiente |
| 9. Futuro | Router, reserva online, testimonios, multi-sede, CMS | ⏳ No iniciado |

### Siguientes pasos recomendados

1. Reemplazar datos de ejemplo en `content/site.config.js` y `content/*`.
2. Agregar fotos en `public/images/` y setear `hero.image.src` + `tone` por corte.
3. Generar `og-image.jpg` (1200×630) y `og:image` en `index.html`.
4. Correr Lighthouse y axe; validar 320 px y tablet real.
5. Si se aprueba reserva online: crear `services/bookingService.js` + `features/booking/` y montar router.

---

## 14. Riesgos y deuda técnica

| Riesgo | Impacto | Mitigación actual / recomendada |
|---|---|---|
| Sin backend para reservas | CTA depende de WhatsApp | Decisión explícita; `services/` listo para conectar API |
| Fotos placeholder | Percepción y conversión | Reemplazar por fotos reales; el hero ya soporta `image.src` |
| Datos de ejemplo (teléfono, dirección) | No apto para producción | Centralizados en `content/site.config.js` |
| Mapa no embebido | Menos contexto visual | Panel + link a Google Maps; evaluar iframe diferido si se pide |
| Sin og-image | Compartidos pobres | Generar y declarar `og:image` |
| Contraste de `text-dim` | AA justo en textos pequeños | Ajustado a `#948b7d`; validar con las fuentes finales |
| Sin tests | Regresiones en hooks | Priorizar tests de `useCarousel`, `format` y `links` (Vitest) si el proyecto crece |
| Breakpoints literales | Repetición de valores | Convención documentada; `postcss-custom-media` si molesta |
| Migración a TS | Refactors costosos si se posterga mucho | Estructura ya tipable por archivo; migrar por capas |
| Autoplay/animaciones futuras | Accesibilidad | Cualquier animación debe respetar `useReducedMotion` |

---

## 15. Cómo extender el sistema

### Agregar una sección

1. Crear `src/features/landing/sections/Nueva/Nueva.jsx` + `Nueva.module.css`.
2. Usar `Section`, `Container` y `SectionHeading`.
3. Crear `src/content/nueva.js` con el copy.
4. Añadir el link en `content/navigation.js` si debe aparecer en el navbar.
5. Montarla en el orden deseado dentro de `LandingPage.jsx`.

### Agregar una página / reserva online

1. Instalar `react-router` (única dependencia justificada).
2. Crear `src/pages/` y `src/app/router.jsx`; mover `LandingPage` a una ruta.
3. Reutilizar `SiteHeader`, `SiteFooter` y `PageShell` en el layout de rutas.
4. Los `href` de navegación ya viven en `content/`, así que pasan de ancla a ruta sin tocar componentes.

### Cambiar la identidad visual

1. Editar `src/styles/tokens.css` (colores, tipografía, radios, sombras).
2. Ajustar `typography.css` solo si cambia la escala.
3. No tocar componentes: todos consumen tokens.

### Agregar fotos reales

1. Copiar archivos a `public/images/`.
2. Hero: setear `hero.image.src`.
3. Cortes: agregar `image` al item y renderizar `<img>` en `CutCard` (mismo patrón que el hero).
4. Mantener `aspect-ratio` y textos alternativos descriptivos.
