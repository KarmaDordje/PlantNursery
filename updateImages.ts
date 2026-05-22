import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    .replace(/ę/g, 'e')
    .replace(/ś/g, 's');
}

async function main() {
  const imageDir = path.join(__dirname, 'public/images/plants');
  const files = fs.readdirSync(imageDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));

  console.log('Found images:', files);

  const plants = await prisma.plant.findMany();
  let updatedCount = 0;

  for (const plant of plants) {
    const normalized = normalizeName(plant.name);
    console.log(`Trying to match plant: ${plant.name} -> ${normalized}`);

    // Try an exact match with the filename (without .png)
    let match = files.find(f => f.replace('.png', '') === normalized);

    // If no exact match, try a loose match
    if (!match) {
        match = files.find(f => {
            const fileName = f.replace(/\.(png|jpg|jpeg)$/, '');
            // Check if plant name starts with the image name (e.g., 'magnolia' matches 'magnolia susan')
            return normalized.startsWith(fileName) || fileName.startsWith(normalized);
        });
    }

    if (!match) {
        // Even looser: try the first word of the plant name
        const firstWord = normalized.split('_')[0];
        if (firstWord.length > 3) {
            match = files.find(f => f.startsWith(firstWord));
        }
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
