# Comidita

Sitio web para un servicio de almuerzos saludables cocinados en casa, con entrega en oficinas y zonas residenciales en un horario fijo, mediante suscripción semanal.

Proyecto de la materia de Ingeniería de Software, desarrollado con metodología Agile en 3 sprints de una semana.

## Problema e hipótesis

Muchos oficinistas comen comida rápida o de restaurante por falta de opciones prácticas.

Hipótesis a validar: los oficinistas prefieren comida casera real antes que comida rápida o de restaurante.

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
- Diseño responsive

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

## Cómo correr el proyecto

Requisitos: Node.js 20 o superior.

```bash
    npm install
```
``` bash
    cp .env.example .env
```
```bash
    npm run dev
```

Con la base de datos de Supabase configurada en .env:
```bash
    npm run db:migrate
```
```bash
    npm run db:seed
```

## Estructura

```txt
    src/
      app/                  rutas (App Router): / , /suscribirse, manifest PWA
      components/
        ui/                 Button, Card, Badge, Container, SectionHeading
        layout/             Navbar y Footer
        sections/           secciones de la landing (Hero, WeeklyMenu, ...)
      lib/
        menu.ts             getWeeklyMenu(): lee el menú publicado con Prisma
        site.ts             datos del negocio y enlaces de WhatsApp/Instagram
        sample-data.ts      datos de prueba y semilla
    prisma/                 schema.prisma y seed.ts
    docs/                   diagramas, wireframes y documentación Agile
```

## Componentes UI

Todos están en src/components/ui y aceptan className para ajustes puntuales.

```txt
    import { Button, ButtonLink } from "@/components/ui/Button";
    import { Card } from "@/components/ui/Card";
    import { Badge } from "@/components/ui/Badge";
    import { Container } from "@/components/ui/Container";

    <Container>                                      {/* ancho máximo y márgenes laterales */}
      <Badge tone="accent">Nuevo</Badge>          {/* tone: "brand" | "accent" */}
      <Card className="p-6">Contenido</Card>
      <ButtonLink href="/suscribirse">Suscríbete</ButtonLink>
      <Button size="lg" type="submit" variant="secondary">Enviar</Button>
    </Container>                                     {/* variant: primary | secondary | ghost · size: md | lg */}
```
### Tema

Tailwind CSS v4 define el tema en src/app/globals.css con @theme (sustituye a tailwind.config):

| Token | Uso | Clases |
|---|---|---|
| brand (verde) | botones, enlaces, acentos | bg-brand-600, text-brand-700 |
| accent (terracota) | avisos y destacados | bg-accent-100, text-accent-600 |
| cream | fondos de sección | bg-cream-100 |
| ink | texto | text-ink-900, text-ink-700 |
| font-display (Fraunces) | títulos | font-display |
| font-sans (Inter) | texto general | por defecto |

## Equipo

| Integrante | Responsabilidad |
|---|---|
| Zabdiel Rios Cervantes | Landing page, menú semanal y diseño UI |
| Abraham Raul Gomez Marvan | Panel admin e infraestructura |
| Cesar Eduardo Garcia Garcia | Flujo de suscripción |

## Metodología

Scrum con 3 sprints de 1 semana. El Scrum Master rota cada sprint. La evidencia (backlog, tablero, retrospectivas) está en la carpeta /docs y en GitHub Projects.

## Instalación
```bash
    git clone [url-del-repo]
```
```bash
    cd [nombre-del-proyecto]
```
```bash
    npm install
```
```bash
    cp .env.example .env
```
```bash
    npx prisma migrate dev
```
```bash
    npm run dev
```
## Estructura de ramas

- `main`: versión estable
- `Panel_admin_infra/features`: rama de características para panel de administración e infraestructura
- `feature/subscription`: rama para el flujo de suscripción
- `feature/landing`: rama para la landing page