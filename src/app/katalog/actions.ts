"use server";

import { prisma } from "@/lib/prisma";

export async function fetchPlants(page: number, limit: number = 15, searchQuery?: string, categories?: string[]) {
  const skip = (page - 1) * limit;
  
  const conditions: Record<string, unknown>[] = [];
  
  if (searchQuery) {
    conditions.push({
      OR: [
        { name: { contains: searchQuery, mode: 'insensitive' as const } },
        { latinName: { contains: searchQuery, mode: 'insensitive' as const } },
      ]
    });
  }
  
  if (categories && categories.length > 0) {
    conditions.push({ category: { in: categories } });
  }

  const where = conditions.length > 0 ? { AND: conditions } : {};

  const plants = await prisma.plant.findMany({
    skip,
    take: limit,
    where,
    orderBy: { name: "asc" },
  });
  return plants;
}
