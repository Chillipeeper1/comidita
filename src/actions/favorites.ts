'use server'

import { prisma as db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function toggleFavorite(subscriberId: string, menuOptionId: string) {
  try {
    const existing = await db.favorite.findUnique({
      where: {
        subscriberId_menuOptionId: { subscriberId, menuOptionId }
      }
    })

    if (existing) {
      await db.favorite.delete({
        where: { id: existing.id }
      })
      revalidatePath('/menu')
      return { success: true, isFavorite: false }
    } else {
      await db.favorite.create({
        data: { subscriberId, menuOptionId }
      })
      revalidatePath('/menu')
      return { success: true, isFavorite: true }
    }
  } catch (error) {
    console.error("Error al actualizar favoritos:", error)
    return { success: false, error: "No se pudo actualizar el favorito" }
  }
}