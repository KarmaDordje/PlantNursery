import { prisma } from "@/lib/prisma";
import KatalogClient from "./KatalogClient";

export const dynamic = "force-dynamic";

export default async function KatalogPage() {
  try {
    const plants = await prisma.plant.findMany({
      take: 15,
      where: { isAvailable: true },
      orderBy: { name: 'asc' }
    });

    // Sanitize plants to ensure no non-serializable fields (like Date) are passed
    const sanitizedPlants = plants.map(plant => ({
      id: plant.id,
      name: plant.name,
      latinName: plant.latinName,
      price: plant.price,
      category: plant.category,
      sun: plant.sun,
      water: plant.water,
      imageUrl: plant.imageUrl,
      height: plant.height,
      container: plant.container,
    }));

    return <KatalogClient initialPlants={sanitizedPlants} />;
  } catch (error: any) {
    console.error("KatalogPage error:", error);
    return (
      <div className="bg-brand-dark-green min-h-screen py-24 flex items-center justify-center px-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] max-w-2xl w-full text-brand-sand shadow-2xl">
          <h1 className="text-2xl font-serif font-bold text-red-400 mb-4">Błąd ładowania katalogu (Load Error)</h1>
          <p className="text-brand-sand/80 mb-6 text-base">Wystąpił problem podczas pobierania danych roślin z bazy danych. Szczegóły błędu:</p>
          <pre className="bg-black/30 border border-white/10 p-4 rounded-xl overflow-auto text-xs font-mono text-brand-peach max-h-[300px] mb-6">
            {error?.stack || error?.message || String(error)}
          </pre>
          <div className="space-y-2 text-sm text-brand-sand/60 border-t border-white/10 pt-4">
            <div><strong>DATABASE_URL:</strong> {process.env.DATABASE_URL ? "Skonfigurowany (Defined)" : "Brak (Undefined)"}</div>
            <div><strong>DIRECT_URL:</strong> {process.env.DIRECT_URL ? "Skonfigurowany (Defined)" : "Brak (Undefined)"}</div>
          </div>
          <a 
            href="/katalog" 
            className="mt-6 inline-block px-6 py-2.5 bg-brand-sand hover:bg-brand-peach text-brand-dark-green rounded-full font-medium transition-colors text-base"
          >
            Spróbuj ponownie
          </a>
        </div>
      </div>
    );
  }
}
