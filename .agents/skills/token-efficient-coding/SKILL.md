---
name: Código eficiente en tokens
description: Genera y modifica código gastando el mínimo de tokens y de mensajes. Úsala siempre que vayas a escribir, editar o revisar código, especialmente en planes con límite diario de mensajes o de contexto.
---

# Código eficiente en tokens

Objetivo: **terminar la tarea en la menor cantidad de rondas posible**, sin perder calidad. Cada ida y vuelta vuelve a enviar el contexto y consume tu límite diario. Un mensaje bien gastado = estudiar + cambiar + verificar en un solo flujo continuo.

> Esta skill no cambia el límite de tu plan: solo hace que cada mensaje rinda mucho más. Si se agota el límite diario, cambia de modelo o espera al reset. Si se agota la ventana de contexto, usa `/compact` y retoma desde el resumen en vez de releerlo todo.

## Reglas de oro

1. **Planifica antes de escribir.** Decide de antemano qué archivos tocar y qué cambiar en cada uno. Nunca escribas código "a ver qué sale" ni hagas borradores iterativos.
2. **Lee una vez, edita para siempre.** No vuelvas a leer un archivo que ya leíste en esta sesión. Guarda mentalmente su contenido.
3. **Precisiones, no volcados.** Usa `grep`/`glob` y `read` con `offset`/`limit` para ver solo lo necesario. Prohibido leer archivos grandes enteros "por si acaso".
4. **Edita, no reescribas.** Usa `edit` con un `oldString` corto y único. Reserva `write` para archivos nuevos. Usa `replaceAll` para renombrados globales.
5. **Agrupa en paralelo.** Todas las lecturas/búsquedas independientes en el mismo mensaje (varias tool calls, o `execute` con `Promise.allSettled`). Igual para los `edit` de archivos distintos.
6. **Verifica una sola vez, al final.** Un solo `build`/`lint`/`test` al terminar. Nada de verificar después de cada cambio.
7. **No devuelvas código en el chat.** El código va a los archivos. La respuesta final es un resumen de 2–4 líneas.
8. **Cambio mínimo (YAGNI).** Solo lo que pide la tarea. Sin refactors extra, comentarios innecesarios ni documentación que no se solicitó.

## Flujo de trabajo

### 1. Estudio (barato)
- `glob` para localizar archivos; `grep` con patrones concretos para ubicar símbolos.
- `read` con `offset`/`limit` para ventanas específicas; hoja de estilos y constantes: solo el bloque relevante.
- Si la tarea es ambigua, **pregunta una vez al inicio** (con `question`) en vez de rehacer trabajo después.
- Lanza todas las búsquedas independientes juntas en un solo mensaje.

### 2. Escritura (una pasada)
- Agrupa todos los cambios de un mismo archivo en un solo `edit` (o en los menos posibles) usando bloques `oldString` precisos.
- Escribe la versión final correcta directamente: nombres, imports y estilos coherentes a la primera.
- Para patrones repetidos, un solo `edit` con `replaceAll: true`.
- Crea solo los archivos nuevos que hagan falta; no generes andamiaje que ya existe.

### 3. Verificación (una vez)
- Ejecuta **una sola** orden de comprobación del proyecto (`pnpm build`, `pnpm lint`, etc.) al final de todos los cambios.
- Si falla, corrige con `edit` y vuelve a ejecutar **esa misma** orden. No encadenes más comprobaciones.
- No hagas `git status`/`git diff` de forma repetitiva; uno solo si hace falta confirmar el resultado.

## Anti-patrones (evitar siempre)

- Volcar el contenido de un archivo completo en la respuesta o en un `write` para cambiar dos líneas.
- Releer el mismo archivo varias veces "para confirmar" tras cada `edit`.
- `grep` amplio seguido de `read` de todos los resultados.
- Lanzar subagentes para tareas pequeñas: duplican contexto y suelen costar más de lo que ahorran. Úsalos solo para trabajo grande y verdaderamente paralelo.
- Explicaciones largas, listas de todo lo que se hizo, o repetir el código en el chat.
- Ejecutar `build` + `lint` + `test` + `status` cuando con una basta.

## Modo código (`execute`)

Cuando tengas 2+ llamadas independientes a herramientas, usa `execute` con `Promise.allSettled` para agruparlas en un único mensaje. No abuses de él para encadenar pasos dependientes: esos necesitan su propio mensaje.

## Si el presupuesto se está agotando

- Cambia a un modelo más barato/rápido con `/models`, o espera al reset diario.
- Usa `/compact` para resumir la conversación y liberar contexto; continúa desde el resumen sin releer archivos.
- Prioriza entregar la parte funcional completa antes que pulir detalles: markdown, Tests y estilos se pueden dejar para el siguiente mensaje.

## Checklist rápido

- [ ] ¿Leí solo lo necesario y una sola vez?
- [ ] ¿Usé `edit` en vez de `write` para archivos existentes?
- [ ] ¿Agrupé las operaciones independientes en paralelo?
- [ ] ¿Verifiqué una sola vez al final?
- [ ] ¿Mi respuesta final es breve y no contiene código?
