"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Mock API Call to Plant Database (e.g., Trefle or Perenual)
async function fetchPlantCareInfo(latinName: string) {
  // In a real app, you would do: await fetch(`https://perenual.com/api/species-list?key=XYZ&q=${latinName}`)
  console.log(`[API MOCK] Fetching care info for ${latinName}`);
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    sun: latinName.toLowerCase().includes('pinus') ? 'Słońce' : 'Półcień',
    water: latinName.toLowerCase().includes('acer') ? 'Duże' : 'Umiarkowane'
  };
}

export async function addPlantAction(formData: FormData) {
  const name = formData.get("name") as string;
  const latinName = formData.get("latinName") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string;

  // Auto-fetch care instructions based on Latin Name
  const careInfo = await fetchPlantCareInfo(latinName);

  await prisma.plant.create({
    data: {
      name,
      latinName,
      price,
      category,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1598531406691-11d88cb62f03?w=600&auto=format&fit=crop&q=60",
      sun: careInfo.sun,
      water: careInfo.water,
    }
  });

  // Revalidate catalog page so the new plant appears immediately
  revalidatePath("/katalog");
  
  return { success: true };
}

import * as Papa from "papaparse";

export async function uploadFileAction(formData: FormData) {
  const file = formData.get("csvFile") as File; // Reusing the same form field name
  if (!file) throw new Error("No file uploaded");

  if (file.name.toLowerCase().endsWith(".pdf")) {
    const pdfParse = require("pdf-parse");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const pdfData = await pdfParse(buffer);
    
    const lines = pdfData.text.split('\n').filter(l => l.trim() !== '');
    const plantsData = [];

    // Heuristic parsing for PDF lines
    for (const line of lines) {
      // Look for a price at the end (e.g., 45,00 or 45)
      const priceMatch = line.match(/(\d+[.,]?\d*)\s*(zł|pln)?\s*$/i);
      if (priceMatch && priceMatch[1].length > 0) {
        let price = priceMatch[1];
        let rest = line.substring(0, priceMatch.index).trim();
        
        let container = null;
        const containerMatch = rest.match(/\b([CP]\d+(\.\d+)?)\b/i);
        if (containerMatch) {
          container = containerMatch[1];
          rest = rest.replace(containerMatch[0], '').trim();
        }
        
        let height = null;
        const heightMatch = rest.match(/\b(\d+-\d+|\d+|Pa\d+)\b(?!.*\b\d+\b)/i);
        if (heightMatch) {
          height = heightMatch[1];
          rest = rest.replace(heightMatch[0], '').trim();
        }
        
        // Clean up any double spaces or trailing punctuation
        const name = rest.replace(/\s+/g, ' ').replace(/[-;,]$/, '').trim() || "Nieznana roślina";
        
        // Only add if it's a reasonable name length, to filter out garbage header lines
        if (name.length > 3) {
          plantsData.push({
            name,
            height,
            container,
            price: `${price} zł`,
            category: "Z importu PDF",
            imageUrl: "https://images.unsplash.com/photo-1598531406691-11d88cb62f03?w=600&auto=format&fit=crop&q=60"
          });
        }
      }
    }

    if (plantsData.length > 0) {
      await prisma.plant.createMany({ data: plantsData });
      revalidatePath("/katalog");
    }
    return { success: true, count: plantsData.length };
  } else {
    // CSV Handling
    const text = await file.text();
    const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
    
    const plantsData = parsed.data.map((row: any) => ({
      name: row["Gatunek, odmiana"] || row["Name"] || "Nieznana roślina",
      height: row["Wysokość (cm)"] || row["Height"] || null,
      container: row["Pojemnik (dm3)"] || row["Container"] || null,
      price: row["Cena (zł)"] || row["Price"] ? `${row["Cena (zł)"] || row["Price"]} zł` : null,
      category: "Z importu CSV", // Default
      imageUrl: "https://images.unsplash.com/photo-1598531406691-11d88cb62f03?w=600&auto=format&fit=crop&q=60"
    }));

    if (plantsData.length > 0) {
      await prisma.plant.createMany({ data: plantsData });
      revalidatePath("/katalog");
    }

    return { success: true, count: plantsData.length };
  }
}

export async function togglePlantAvailability(plantId: number) {
  const plant = await prisma.plant.findUnique({ where: { id: plantId } });
  if (!plant) return { success: false };

  await prisma.plant.update({
    where: { id: plantId },
    data: { isAvailable: !plant.isAvailable },
  });

  revalidatePath("/admin");
  revalidatePath("/katalog");
  return { success: true, isAvailable: !plant.isAvailable };
}
