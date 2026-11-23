---
name: Auditoría de estructura web
description: Audita y optimiza la estructura general de un sitio web —arquitectura de información, recorridos del usuario, jerarquía de contenidos, consistencia de UI, accesibilidad y responsive— y aplica los cambios priorizados. Úsala cuando pidan mejorar "cómo está armada" una web, no solo su estética o un componente puntual.
---

# Auditoría de estructura web

Objetivo: dejar el sitio con una estructura **intencional, no acumulada**. El entregable no es un informe bonito: es una lista priorizada de cambios aplicados.

## Cuándo usarla

- "Optimizá la estructura de la web", "está desordenada", "no fluye", "mejorá la UX".
- Antes de agregar o reordenar secciones.
- Cuando haya síntomas de contenido repetido, CTAs compitiendo o nav que no coincide con la página.

## Los 6 ejes

### 1. Arquitectura de información
- Inventario: una línea por sección con su **única responsabilidad**.
- Cada sección responde a una pregunta del usuario. Si dos responden lo mismo, fusionar.
- El orden sigue el recorrido: contexto → prueba → oferta → objeciones → acción.
- Nav: etiquetas en el idioma del usuario, mismo orden que el DOM, sin secciones huérfanas.

### 2. Flujos y conversión
- Definir **una** acción principal y verificar que sea la más visible en cada sección clave.
- Contar los pasos hasta el objetivo: cada clic extra es pérdida.
- Un solo CTA dominante por pantalla; los demás, secundarios o de texto.
- El destino del CTA debe existir y no exigir scroll largo.

### 3. Jerarquía y scannability
- Un solo `h1`; `h2` por sección, `h3` por ítem, sin saltos.
- Párrafos cortos, línea < 80 caracteres, conclusión primero.
- Los títulos se entienden solos al hojear solo los encabezados.

### 4. Sistema UI
- Inventario de componentes y tokens: ¿existe ya un primitivo antes de crear otro?
- Extraer lógica repetida (formateo, textos de estado, enlaces) a `utils`/`hooks`/`content`.
- Un componente, una responsabilidad; composición antes que props booleanas (ver `vercel-composition-patterns`).
- Tokens antes que valores literales repetidos en CSS.

### 5. Accesibilidad y responsive
- Foco visible, orden de tabulación lógico, `aria-*` solo cuando aporta.
- Semántica: `nav` / `main` / `section` / headings / listas / `figure`.
- `prefers-reduced-motion` respetado.
- Mobile primero: una columna, CTA al alcance del pulgar, sin scroll horizontal involuntario.

### 6. Contenido
- Voz consistente, segunda persona, verbos activos.
- Borrar texto que no ayude a decidir.
- Etiquetas de CTA que digan qué pasa ("Reservar turno"), no "Enviar".

## Proceso

1. **Leer una vez**: nav, footer, página compuesta, `content/`, tokens y primitivos. Usar `grep` para **medir** repetición, no para volcar archivos.
2. **Mapa**: inventario de secciones + flujo principal en 5–10 líneas.
3. **Hallazgos**: P0 (rompe flujo o accesibilidad), P1 (fricción/duplicación clara), P2 (pulido). Cada hallazgo lleva archivo y cambio concreto.
4. **Aplicar**: P0 y P1 en una sola pasada de `edit`/`write`. P2 solo si se pidió.
5. **Verificar una vez**: un solo `build`/`lint` al final.

## Reglas

- No reordenar secciones sin chequear nav y footer: los tres deben coincidir.
- Si quitás un canal de contacto, quitálo en **todas** partes (footer incluido).
- No crear abstracciones para dos usos: extraer recién a partir del tercero, salvo texto de estado (siempre centralizar).
- No confundir con rediseño: `frontend-design` decide estética; esta skill decide estructura.
- Encadenar con `token-efficient-coding`: una lectura, una escritura, una verificación.

## Entregable

Resumen de 2–4 líneas con lo corregido en P0/P1 y lo que queda como P2. Sin pegar código en el chat.
