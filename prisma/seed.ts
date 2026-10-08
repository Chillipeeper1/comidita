import { PrismaClient } from "@prisma/client";
import { sampleMenu, deliveryZones } from "../src/lib/sample-data";

const prisma = new PrismaClient();

async function main() {
  for (const zone of deliveryZones) {
    await prisma.zone.upsert({
      where: { name: zone.name },
      update: { deliveryWindow: zone.deliveryWindow },
      create: zone,
    });
  }

  const weekStart = new Date(sampleMenu.weekStart);
  await prisma.menu.deleteMany({ where: { weekStart } });
  await prisma.menu.create({
    data: {
      weekStart,
      orderDeadline: new Date(sampleMenu.orderDeadline),
      published: true,
      options: {
        create: sampleMenu.options.map((option, index) => ({
          name: option.name,
          description: option.description,
          imageUrl: option.imageUrl,
          position: index + 1,
        })),
      },
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
