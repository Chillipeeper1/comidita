'use client'

import { useState } from "react"
import { toggleFavorite } from "@/actions/favorites"

interface FavoriteButtonProps {
  subscriberId: string
  menuOptionId: string
  initialIsFavorite?: boolean // <-- Hecho opcional con '?'
}

export function FavoriteButton({ subscriberId, menuOptionId, initialIsFavorite = false }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    const res = await toggleFavorite(subscriberId, menuOptionId)
    if (res.success && res.isFavorite !== undefined) {
      setIsFavorite(res.isFavorite)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-full transition-colors ${
        isFavorite ? "text-accent-600 bg-accent-100" : "text-ink-400 bg-cream-100 hover:text-ink-700"
      }`}
      aria-label="Guardar en favoritos"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={isFavorite ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  )
}