import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Clear existing (if any) to prevent duplicates during seed
    await prisma.plant.deleteMany({});

    const seededPlants = await Promise.all([
      prisma.plant.create({
        data: {
          name: "Klon Palmowy 'Garnet'",
          latinName: "Acer palmatum",
          category: "Drzewa Liściaste",
          price: "150 PLN",
          sun: "Słońce / Półcień",
          water: "Umiarkowane",
          height: "120",
          container: "5",
          imageUrl: "https://images.unsplash.com/photo-1599598425947-3300262b7ae4?q=80&w=2070&auto=format&fit=crop"
        }
      }),
      prisma.plant.create({
        data: {
          name: "Hortensja Bukietowa 'Limelight'",
          latinName: "Hydrangea paniculata",
          category: "Krzewy Ozdobne",
          price: "45 PLN",
          sun: "Półcień",
          water: "Wysokie",
          height: "60",
          container: "3",
          imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be01f6?q=80&w=1974&auto=format&fit=crop"
        }
      }),
      prisma.plant.create({
        data: {
          name: "Sosna Czarna",
          latinName: "Pinus nigra",
          category: "Drzewa Iglaste",
          price: "85 PLN",
          sun: "Słońce",
          water: "Niskie",
          height: "150",
          container: "10",
          imageUrl: "https://images.unsplash.com/photo-1513689125086-6c432170e843?q=80&w=2069&auto=format&fit=crop"
        }
      }),
      prisma.plant.create({
        data: {
          name: "Trawa Pampasowa",
          latinName: "Cortaderia selloana",
          category: "Trawy i Byliny",
          price: "35 PLN",
          sun: "Słońce",
          water: "Umiarkowane",
          height: "80",
          container: "2",
          imageUrl: "https://images.unsplash.com/photo-1505322747495-6afdd3b70760?q=80&w=2070&auto=format&fit=crop"
        }
      }),
      prisma.plant.create({
        data: {
          name: "Róża Pnąca 'Sympathie'",
          latinName: "Rosa",
          category: "Róże",
          price: "55 PLN",
          sun: "Słońce",
          water: "Umiarkowane",
          height: "100",
          container: "4",
          imageUrl: "https://images.unsplash.com/photo-1588661642872-9742eb5183db?q=80&w=1973&auto=format&fit=crop"
        }
      }),
    ]);

    return NextResponse.json({
      message: "Database seeded successfully!",
      count: seededPlants.length,
      plants: seededPlants
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
