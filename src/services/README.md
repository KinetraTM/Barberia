# Capa de servicios (I/O)

Frontera única para hablar con el exterior. En esta fase está intencionalmente vacía:
la landing resuelve la conversión con enlaces de WhatsApp, teléfono y mapa.

Cuando exista reserva online o formulario, acá viven los módulos:

```
services/
├─ contactService.js   # envío del formulario de contacto
├─ bookingService.js   # disponibilidad y creación de turnos
└─ analytics.js        # eventos de conversión (si se aprueba tracking)
```

Reglas:

- Ningún componente de `features/` o `components/` llama a `fetch` directamente.
- Los servicios devuelven datos planos o lanzan errores tipados; el manejo de estado
  (loading, error, success) queda en el hook de la feature.
- Las URLs y claves viven en variables de entorno de Vite (`import.meta.env`).
