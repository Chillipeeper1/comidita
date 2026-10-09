'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/session';

// --- SUSCRIPTORES ---
export async function getSubscribers() {
  await requireAdmin();
  try {
    return await prisma.subscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error al obtener suscriptores:', error);
    return [];
  }
}

// --- MENÚS ---
export async function getMenus() {
  await requireAdmin();
  try {
    return await prisma.menu.findMany({
      include: {
        options: {
          orderBy: { position: 'asc' },
        },
      },
      orderBy: { weekStart: 'desc' },
    });
  } catch (error) {
    console.error('Error al obtener menús:', error);
    return [];
  }
}

type MenuOptionInput = {
  name?: string;
  description?: string;
  price?: number | string;
  position?: number;
};

type CreateMenuInput = {
  weekStart: string;
  orderDeadline: string;
  options?: MenuOptionInput[];
};

export async function createMenu(formData: CreateMenuInput) {
  await requireAdmin();
  try {
    // Normalizamos las fechas defensivamente
    const weekStartDate = new Date(formData.weekStart + 'T00:00:00.000Z');
    const orderDeadlineDate = new Date(formData.orderDeadline);

    const rawOptions = formData.options || [];
    const formattedOptions = rawOptions.map((opt, index) => ({
      name: String(opt.name || '').trim(),
      description: String(opt.description || '').trim(),
      price: Number(opt.price) || 0,
      position: Number(opt.position ?? index + 1),
    }));

    await prisma.menu.create({
      data: {
        weekStart: weekStartDate,
        orderDeadline: orderDeadlineDate,
        published: true,
        options: {
          create: formattedOptions,
        },
      },
    });
    
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error al crear menú:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al guardar en base de datos',
    };
  }
}

// --- ZONAS ---
export async function getZones() {
  await requireAdmin();
  try {
    return await prisma.zone.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    console.error('Error al obtener zonas:', error);
    return [];
  }
}

export async function createZone(data: { name: string; deliveryWindow: string }) {
  await requireAdmin();
  try {
    await prisma.zone.create({
      data,
    });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Error al crear zona:', error);
    return { success: false, error: 'No se pudo crear la zona' };
  }
}