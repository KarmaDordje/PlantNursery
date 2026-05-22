import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function downloadImage(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const plants = await prisma.plant.findMany({
    where: { imageUrl: null },
    take: 20 // Let's do 20 at a time
  });

  const publicDir = path.join(__dirname, 'public/images/plants');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const plant of plants) {
    const filename = `${normalizeName(plant.name)}.jpg`;
    const dest = path.join(publicDir, filename);
    const searchTerm = encodeURIComponent(plant.name);
    // loremflickr uses tags to find a related image
    const url = `https://loremflickr.com/800/600/${searchTerm}`;

    try {
      console.log(`Downloading image for ${plant.name}...`);
      await downloadImage(url, dest);
      
      await prisma.plant.update({
        where: { id: plant.id },
        data: { imageUrl: `/images/plants/${filename}` }
      });
      console.log(`Successfully updated ${plant.name}`);
    } catch (error) {
      console.error(`Failed to download image for ${plant.name}:`, error);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
