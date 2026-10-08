import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Comidita · Comida casera en tu oficina",
    short_name: "Comidita",
    description: "Menú semanal de almuerzos saludables cocinados en casa.",
    lang: "es-MX",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfaf4",
    theme_color: "#217146",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
