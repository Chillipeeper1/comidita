// Datos de prueba: se usan si no hay DATABASE_URL y como semilla (prisma/seed.ts).
export const sampleMenu = {
  weekStart: "2026-10-12",
  orderDeadline: "2026-10-11T18:00:00-06:00",
  options: [
    {
      name: "Pollo al limón con arroz integral",
      description: "Pechuga a la plancha marinada en limón y hierbas, arroz integral y verduras al vapor.",
      imageUrl: "/menu/pollo.svg",
    },
    {
      name: "Albóndigas en caldillo de jitomate",
      description: "Receta de la abuela con carne magra, calabacita y una porción de frijoles de la olla.",
      imageUrl: "/menu/albondigas.svg",
    },
    {
      name: "Bowl vegetariano de garbanzo",
      description: "Garbanzos especiados, quinoa, aguacate, pepino y aderezo de yogur con menta.",
      imageUrl: "/menu/bowl.svg",
    },
  ],
};

export const deliveryZones = [
  { name: "Centro", deliveryWindow: "13:00 a 13:30 h" },
  { name: "Zona financiera", deliveryWindow: "13:00 a 13:30 h" },
  { name: "Colonias residenciales del norte", deliveryWindow: "13:30 a 14:00 h" },
  { name: "Parque industrial", deliveryWindow: "13:30 a 14:00 h" },
];
