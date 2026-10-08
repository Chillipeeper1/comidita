export const site = {
  name: "Comidita",
  tagline: "Comida casera de verdad, en tu oficina",
  deliveryTime: "13:00 a 14:00\u00a0h",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5210000000000",
  instagramUser: process.env.NEXT_PUBLIC_INSTAGRAM_USER ?? "comidita",
  email: "hola@comidita.mx",
};

export function whatsappLink(message = "¡Hola Comidita! Quiero pedir el menú de esta semana.") {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function instagramLink() {
  return `https://instagram.com/${site.instagramUser}`;
}
