'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// --- SUSCRIPTORES ---
export async function getSubscribers() {
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

export async function createMenu(formData: any) {
  try {
    // Normalizamos las fechas defensivamente
    const weekStartDate = new Date(formData.weekStart + 'T00:00:00.000Z');
    const orderDeadlineDate = new Date(formData.orderDeadline);

    // Mapeo ultra defensivo que acepta múltiples posibles nombres de propiedades del frontend
    const rawOptions = formData.options || [];
    const formattedOptions = rawOptions.map((opt: any, index: number) => ({
      name: String(opt.name || opt.nombre || '').trim(),
      description: String(opt.description || opt.descripcion || '').trim(),
      price: parseFloat(opt.price ?? opt.precio ?? 0) || 0,
      position: Number(opt.position ?? opt.orden ?? index + 1),
    }));

    console.log('Datos procesados a enviar a Prisma:', {
      weekStart: weekStartDate,
      orderDeadline: orderDeadlineDate,
      options: formattedOptions,
    });

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
  } catch (error: any) {
    console.error('ERROR DE PRISMA DETALLADO:', error);
    return { success: false, error: error?.message || 'Error desconocido al guardar en base de datos' };
  }
}

// --- ZONAS ---
export async function getZones() {
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