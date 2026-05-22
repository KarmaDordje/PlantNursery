import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sun, Droplets, MapPin, Tag, ShoppingBag, Leaf, Ruler } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    if (isNaN(id)) return {};

    const plant = await prisma.plant.findUnique({ where: { id } });
    if (!plant) return {};

    return {
      title: `${plant.name} | Szkółka Wojtek Kotyrba`,
      description: `Kup ${plant.name} (${plant.latinName || ''}) w szkółce Wojtek Kotyrba w Bydgoszczy. Kategoria: ${plant.category}. Najwyższa jakość sadzonek.`,
      openGraph: {
        title: `${plant.name} - ${plant.category}`,
        description: `Wysokiej jakości sadzonka ${plant.name} dostępna w naszej szkółce.`,
        images: plant.imageUrl ? [plant.imageUrl] : [],
      },
    };
  } catch (error) {
    console.error("generateMetadata error:", error);
    return {
      title: "Szczegóły rośliny | Szkółka Wojtek Kotyrba"
    };
  }
}

export default async function PlantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    
    if (isNaN(id)) {
      notFound();
    }

    const plant = await prisma.plant.findUnique({
      where: { id }
    });

    if (!plant) {
      notFound();
    }

    return (
      <div className="bg-brand-dark-green min-h-screen pb-24">
        {/* HERO IMAGE SECTION */}
        <section className="relative w-full h-[55vh] min-h-[450px] overflow-hidden">
          {plant.imageUrl ? (
            <Image src={plant.imageUrl} alt={plant.name} fill sizes="100vw" className="object-cover" priority />
          ) : (
            <div className="absolute inset-0 bg-brand-green/40 flex items-center justify-center">
              <Leaf size={120} className="text-brand-sand/10" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-green via-brand-dark-green/50 to-transparent" />
          
          {/* Back button */}
          <div className="absolute top-6 left-4 md:left-8 z-20">
            <Link
              href="/katalog"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md hover:bg-brand-peach hover:text-brand-dark-green text-brand-sand transition-colors border border-white/10"
            >
              <ArrowLeft size={20} />
            </Link>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
            <div className="container-custom">
              <h1 className="font-serif text-4xl md:text-6xl text-brand-sand font-bold mb-2 tracking-tight">{plant.name}</h1>
              {plant.latinName && <p className="text-xl italic text-brand-sand/60 font-medium">{plant.latinName}</p>}
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <div className="container-custom relative z-10 -mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* About section */}
            <div className="lg:col-span-2 space-y-6 pt-12">
              <h2 className="font-serif text-3xl text-brand-peach font-bold mb-6">O roslinie</h2>
              <p className="text-brand-sand/80 text-lg leading-relaxed">
                {plant.name} to wspaniala roslina z kategorii {plant.category}. Jej elegancki pokroj i wyjatkowe walory
                dekoracyjne sprawiaja, ze stanowi doskonale uzupelnienie kazdego ogrodu.
                W naszej szkolce dbamy o to, aby kazda sadzonka byla zdrowa i silnie ukorzeniona przed sprzedaza.
              </p>
              <p className="text-brand-sand/80 text-lg leading-relaxed">
                Zalecamy przygotowanie przepuszczalnego podloza i regularne nawozenie w okresie wiosennym, aby zapewnic optymalny wzrost.
              </p>
            </div>

            {/* Details card */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 shadow-2xl h-fit sticky top-8">
              <div className="font-serif text-4xl font-bold text-brand-peach mb-8">{plant.price || 'Cena w szkolce'}</div>
              
              <ul className="list-none p-0 m-0 mb-8 divide-y divide-white/10">
                <li className="flex items-center gap-3 py-4 text-brand-sand font-medium text-base">
                  <Tag size={20} className="text-brand-peach shrink-0" /> {plant.category}
                </li>
                {plant.height && (
                  <li className="flex items-center gap-3 py-4 text-brand-sand font-medium text-base">
                    <Ruler size={20} className="text-brand-peach shrink-0" /> <span className="text-brand-sand/60">Wysokosc:</span> {plant.height} cm
                  </li>
                )}
                {plant.container && (
                  <li className="flex items-center gap-3 py-4 text-brand-sand font-medium text-base">
                    <Leaf size={20} className="text-brand-peach shrink-0" /> <span className="text-brand-sand/60">Pojemnik:</span> C{plant.container}
                  </li>
                )}
                <li className="flex items-center gap-3 py-4 text-brand-sand font-medium text-base">
                  <Sun size={20} className="text-amber-400 shrink-0" /> {plant.sun || 'Rozne naslonecznienie'}
                </li>
                <li className="flex items-center gap-3 py-4 text-brand-sand font-medium text-base">
                  <Droplets size={20} className="text-blue-400 shrink-0" /> {plant.water || 'Umiarkowane podlewanie'}
                </li>
                <li className="flex items-center gap-3 py-4 text-brand-sand font-medium text-base">
                  <MapPin size={20} className="text-brand-peach shrink-0" /> Dostepne w szkolce
                </li>
              </ul>

              <Link 
                href="/kontakt" 
                className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-brand-peach text-brand-dark-green font-bold text-lg rounded-full hover:bg-brand-sand transition-colors shadow-lg"
              >
                <ShoppingBag size={20} /> Zapytaj o dostepnosc
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("PlantDetailPage error:", error);
    return (
      <div className="bg-brand-dark-green min-h-screen py-24 flex items-center justify-center px-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] max-w-2xl w-full text-brand-sand shadow-2xl">
          <h1 className="text-2xl font-serif font-bold text-red-400 mb-4">Błąd ładowania szczegółów rośliny</h1>
          <p className="text-brand-sand/80 mb-6 text-base">Wystąpił problem podczas pobierania danych z bazy danych. Szczegóły błędu:</p>
          <pre className="bg-black/30 border border-white/10 p-4 rounded-xl overflow-auto text-xs font-mono text-brand-peach max-h-[300px] mb-6">
            {error?.stack || error?.message || String(error)}
          </pre>
          <a 
            href="/katalog" 
            className="mt-6 inline-block px-6 py-2.5 bg-brand-sand hover:bg-brand-peach text-brand-dark-green rounded-full font-medium transition-colors text-base"
          >
            Wróć do katalogu
          </a>
        </div>
      </div>
    );
  }
}
