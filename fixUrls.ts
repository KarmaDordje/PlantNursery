import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const plants = await prisma.plant.findMany();
  let count = 0;

  for (const plant of plants) {
    if (plant.imageUrl && plant.imageUrl.startsWith('docs/')) {
      const newUrl = plant.imageUrl.replace('docs/', '/images/plants/');
      await prisma.plant.update({
        where: { id: plant.id },
        data: { imageUrl: newUrl }
      });
      count++;
      console.log(`Updated ${plant.name}: ${plant.imageUrl} -> ${newUrl}`);
    } else if (plant.imageUrl && !plant.imageUrl.startsWith('/') && !plant.imageUrl.startsWith('http')) {
      const newUrl = `/${plant.imageUrl}`;
      await prisma.plant.update({
        where: { id: plant.id },
        data: { imageUrl: newUrl }
      });
      count++;
      console.log(`Fixed missing leading slash for ${plant.name}: ${plant.imageUrl} -> ${newUrl}`);
    }
  }

  console.log(`Fixed ${count} image URLs in the database.`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
