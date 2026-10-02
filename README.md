# Comidita

Sitio web para un servicio de **almuerzos saludables cocinados en casa**, con entrega en oficinas y zonas residenciales en un horario fijo, mediante **suscripción semanal**.

Proyecto de la materia de Ingeniería de Software, desarrollado con metodología Agile en 3 sprints de una semana.

## Problema e hipótesis

Muchos oficinistas comen comida rápida o de restaurante por falta de opciones prácticas.

**Hipótesis a validar:** los oficinistas prefieren comida casera real antes que comida rápida o de restaurante.

## Enfoque del MVP

- Menú cerrado de 3 opciones, publicado cada viernes para los pedidos de la semana siguiente.
- Pedidos recibidos por WhatsApp o Instagram.
- Cocina bajo demanda para no desperdiciar alimentos.
- El sitio presenta el menú, capta suscriptores (nombre, contacto, zona y horario) y permite administrar el menú y la lista de suscriptores.

## Funcionalidades

- Landing page con propuesta de valor
- Menú semanal con 3 opciones
- Formulario de suscripción
- Panel de administración (menú y suscriptores)
- Diseño responsive (móvil primero)

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend y backend | Next.js (App Router) + TypeScript |
| Estilos | Tailwind CSS |
| Base de datos | PostgreSQL en Supabase |
| ORM | Prisma |
| Validación | Zod |
| Despliegue | Vercel |
| Gestión Agile | GitHub Projects |

## Equipo

| Integrante | Responsabilidad |
|---|---|
| Zabdiel Rios Cervantes | Landing page, menú semanal y diseño UI |
| Abraham Raul Gomez Marvan | Panel admin e infraestructura |
| Cesar Eduardo Garcia Garcia | Flujo de suscripción |

## Metodología

Scrum con 3 sprints de 1 semana. El Scrum Master rota cada sprint. La evidencia (backlog, tablero, retrospectivas) está en la carpeta `/docs` y en GitHub Projects.

## Instalación

```bash
git clone [url-del-repo]
cd [nombre-del-proyecto]
npm install
cp .env.example .env   # agregar DATABASE_URL de Supabase
npx prisma migrate dev
npm run dev
```

## Estructura de ramas

- `main`: versión estable
- `feature/landing`, `feature/subscription`, `feature/admin`: una rama por funcionalidad, con merge a `main` al cierre de cada sprint
