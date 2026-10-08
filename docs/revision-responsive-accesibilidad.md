# HU-10: Revisión responsive y de accesibilidad

Fecha: 7 de octubre de 2026 · Rama `feature/landing`

## Lighthouse (móvil, build de producción)

| Categoría | Puntaje |
|---|---|
| Rendimiento | 98 |
| Accesibilidad | 100 |
| Buenas prácticas | 100 |
| SEO | 100 |

Meta propuesta al equipo: 90 o más en las cuatro categorías.

## Revisión por tamaño de pantalla

| Ancho | Resultado |
|---|---|
| 390 px (celular) | Navbar con menú colapsable, botones a ancho completo, tarjetas en una columna |
| 768 px (tablet) | Menú colapsable, menú semanal y pasos en 3 columnas, beneficios en 2 |
| 1280 px (escritorio) | Hero en 2 columnas, menú y pasos en 3 columnas, beneficios en 4 |

## Accesibilidad

- Todas las imágenes tienen texto alternativo; los íconos decorativos usan `aria-hidden`.
- Enlace "Saltar al contenido" al presionar Tab.
- Menú móvil con `aria-expanded`, `aria-controls` y cierre con Escape.
- Preguntas frecuentes con `<details>/<summary>`: se abren con Enter o Espacio.
- Contraste corregido en badges de color terracota y en el horario de entrega.
- `lang="es-MX"` en el documento y `prefers-reduced-motion` respetado en el scroll.
