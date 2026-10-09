"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

// HU-13: Esquema de validación con Zod
const subscriberSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  contact: z.string().min(8, "Ingresa un número de teléfono o WhatsApp válido"),
  zone: z.string().min(2, "Selecciona o escribe tu zona de entrega"),
  schedule: z.string().min(2, "Especifica un horario preferido"),
});

export type FormState = {
  success?: boolean;
  error?: string;
  data?: {
    name: string;
    contact: string;
    zone: string;
    schedule: string;
  };
};

export async function registerSubscriber(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = {
    name: formData.get("name") as string,
    contact: formData.get("contact") as string,
    zone: formData.get("zone") as string,
    schedule: formData.get("schedule") as string,
  };

  // Validar con Zod (HU-13)
  const validation = subscriberSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0].message,
    };
  }

  try {
    // HU-17: Evitar suscripciones duplicadas
    const existing = await prisma.subscriber.findUnique({
      where: { contact: validation.data.contact },
    });

    if (existing) {
      return {
        success: false,
        error: "Este número o contacto ya se encuentra registrado.",
      };
    }

    // HU-15: Guardar suscriptor en la base de datos
    await prisma.subscriber.create({
      data: validation.data,
    });

    return {
      success: true,
      data: validation.data,
    };
  } catch (error) {
    console.error("Error al guardar suscriptor:", error);
    return {
      success: false,
      error: "Ocurrió un error al guardar tu suscripción. Inténtalo nuevamente.",
    };
  }
}