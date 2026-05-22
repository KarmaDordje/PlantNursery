import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\w\sółżźćńąę]/gi, '') 
    .replace(/\s+/g, '_')
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
  const plants = await prisma.plant.findMany({ where: { imageUrl: null } });

  let updatedCount = 0;

  for (const plant of plants) {
    const normalized = normalizeName(plant.name);
    
    // Very loose matching: match by the first two words (e.g., "hortensja bukietowa")
    const words = normalized.split('_');
    if (words.length >= 2) {
      const searchKey = `${words[0]}_${words[1]}`;
      const match = files.find(f => f.includes(searchKey));
      
      if (match) {
        console.log(`Fuzzy match found! updating ${plant.name} with ${match}`);
        await prisma.plant.update({
          where: { id: plant.id },
          data: { imageUrl: `/images/plants/${match}` }
        });
        updatedCount++;
      }
    }
  }

  console.log(`Updated ${updatedCount} more plants with loose matching.`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
