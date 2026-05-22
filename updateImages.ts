import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\w\sółżźćńąę]/gi, '') // remove special chars except polish letters
    .replace(/\s+/g, '_') // replace spaces with underscores
    .replace(/ł/g, 'l')
    .replace(/ó/g, 'o')
    .replace(/ż/g, 'z')
    .replace(/ź/g, 'z')
    .replace(/ć/g, 'c')
    .replace(/ń/g, 'n')
    .replace(/ą/g, 'a')
    .replace(/ę/g, 'e');
}

async function main() {
  const imageDir = path.join(process.cwd(), 'public/images/plants');
  const files = fs.readdirSync(imageDir).filter(f => f.endsWith('.png'));

  console.log('Found images:', files);

  const plants = await prisma.plant.findMany();
  let updatedCount = 0;

  for (const plant of plants) {
    const normalized = normalizeName(plant.name);
    console.log(`Trying to match plant: ${plant.name} -> ${normalized}`);

    // Try an exact match with the filename (without .png)
    let match = files.find(f => f.replace('.png', '') === normalized);

    // If no exact match, try a loose match (e.g., if image name is a substring of the normalized name or vice versa)
    if (!match) {
        match = files.find(f => {
            const fileName = f.replace('.png', '');
            return normalized.includes(fileName) || fileName.includes(normalized);
        });
    }

    if (match) {
      console.log(`Found match! updating ${plant.name} with ${match}`);
      await prisma.plant.update({
        where: { id: plant.id },
        data: { imageUrl: `/images/plants/${match}` }
      });
      updatedCount++;
    }
  }

  console.log(`Updated ${updatedCount} plants with images.`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
