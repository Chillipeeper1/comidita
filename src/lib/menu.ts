import { sampleMenu } from "./sample-data";

export type MenuOptionView = {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
};

export type WeeklyMenu = {
  weekStart: Date;
  orderDeadline: Date;
  options: MenuOptionView[];
};

function getSampleMenu(): WeeklyMenu {
  return {
    weekStart: new Date(`${sampleMenu.weekStart}T00:00:00Z`),
    orderDeadline: new Date(sampleMenu.orderDeadline),
    options: sampleMenu.options.map((option, index) => ({ id: `sample-${index}`, ...option })),
  };
}

/**
 * Devuelve el menú publicado más reciente, o null si no hay ninguno.
 * Sin DATABASE_URL (desarrollo local sin Supabase) usa datos de prueba.
 */
export async function getWeeklyMenu(): Promise<WeeklyMenu | null> {
  if (!process.env.DATABASE_URL) return getSampleMenu();

  const { prisma } = await import("./prisma");
  try {
    const menu = await prisma.menu.findFirst({
      where: { published: true },
      orderBy: { weekStart: "desc" },
      include: { options: { orderBy: { position: "asc" } } },
    });
    if (!menu || menu.options.length === 0) return null;
    return {
      weekStart: menu.weekStart,
      orderDeadline: menu.orderDeadline,
      options: menu.options.map(({ id, name, description, imageUrl }) => ({ id, name, description, imageUrl })),
    };
  } catch (error) {
    console.error("No se pudo leer el menú semanal:", error);
    return null;
  }
}

const TIME_ZONE = "America/Mexico_City";

export function formatDeadline(date: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(date);
}

// weekStart es una columna DATE (medianoche UTC), por eso se formatea en UTC.
export function formatWeek(date: Date) {
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", timeZone: "UTC" }).format(date);
}
