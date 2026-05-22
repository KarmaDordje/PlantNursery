import { prisma } from "@/lib/prisma";
import KatalogClient from "./KatalogClient";

export const dynamic = "force-dynamic";

export default async function KatalogPage() {
  const plants = await prisma.plant.findMany({
    take: 15,
    where: { isAvailable: true },
    orderBy: { name: 'asc' }
  });

  return <KatalogClient initialPlants={plants} />;
}
