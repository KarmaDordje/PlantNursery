"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Ruler, Sprout, CheckCircle2, ArrowRight, ArrowLeft, Building2 } from "lucide-react";

export default function UslugiPage() {
  return (
    <div className="bg-brand-dark-green min-h-screen pb-24">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[50vh] flex items-center overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0 clip-path-diagonal opacity-80">
          <Image 
            src="/hero-leaf-bg-ultra.jpg" 
            alt="Leaf texture" 
            fill 
            sizes="(max-width: 768px) 100vw, 65vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-dark-green" />
        </div>

        <div className="container-custom relative z-10 pt-20">
          <div className="flex items-center gap-4 md:gap-6 mb-6">
            <Link
              href="/"
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-peach hover:text-brand-dark-green text-brand-sand transition-colors border border-white/10 shrink-0"
            >
              <ArrowLeft size={20} />
            </Link>
          </div>
          <div className="max-w-[600px]">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif text-brand-peach font-bold mb-6 tracking-tight"
            >
              Nasze<br/>Usługi
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-sand/80 leading-relaxed font-medium"
            >
              Nie tylko sprzedajemy rośliny, ale również pomagamy stworzyć z nich piękne i funkcjonalne przestrzenie. Sprawdź, co możemy dla Ciebie zrobić.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container-custom relative z-10">
        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: Ruler,
              title: "Projektowanie Ogrodów",
              desc: "Oferujemy profesjonalne usługi projektowania ogrodów przydomowych i terenów zieleni. Nasz zespół krajobrazowy przygotuje dla Ciebie unikalny projekt 2D i 3D uwzględniający Twoje preferencje, warunki glebowe oraz nasłonecznienie działki.",
              color: "bg-brand-green/80",
            },
            {
              icon: Sprout,
              title: "Zakładanie Ogrodów",
              desc: "Przenosimy projekty do rzeczywistości. Oferujemy kompleksowe zakładanie ogrodów - od niwelacji terenu i przygotowania gleby, po sadzenie naszych najlepszych roślin, montaż systemów nawadniających oraz układanie trawników z rolki.",
              color: "bg-[#593c28]/80",
            },
            {
              icon: Leaf,
              title: "Porady Pielęgnacyjne",
              desc: "Masz problem z rośliną? Nie wiesz jak ją przyciąć lub jaki nawóz zastosować? Nasi specjaliści chętnie udzielą fachowej porady. Pomożemy Ci dobrać odpowiednie preparaty i harmonogram pielęgnacji.",
              color: "bg-brand-light-green/40",
            },
          ].map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`${service.color} backdrop-blur-md border border-white/10 rounded-[32px] p-10 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 rounded-[32px] pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-brand-dark-green shadow-[8px_8px_16px_rgba(0,0,0,0.3)] flex items-center justify-center mb-8 text-brand-peach group-hover:scale-110 transition-transform">
                  <service.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-brand-sand font-bold mb-4">{service.title}</h3>
                <p className="text-brand-sand/70 text-base leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GARDEN IMAGE GALLERY */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?q=80&w=2000&auto=format&fit=crop", alt: "Ogród przydomowy z trawnikiem" },
              { src: "https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?q=80&w=2000&auto=format&fit=crop", alt: "Projekt ogrodu z kamiennymi ścieżkami" },
              { src: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2000&auto=format&fit=crop", alt: "Ogród z krzewami ozdobnymi" },
              { src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop", alt: "Nasadzenia przy budynku" },
              { src: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=2071&auto=format&fit=crop", alt: "Nowoczesny ogród z trawami" },
              { src: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=1974&auto=format&fit=crop", alt: "Nasadzenia iglaste" },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative h-[280px] rounded-[24px] overflow-hidden shadow-2xl group cursor-pointer"
              >
                <Image 
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-green/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-brand-sand text-sm font-medium">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TRUSTED BY SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-10 md:p-16 shadow-2xl mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Building2 className="text-brand-peach" size={28} />
            <h2 className="font-serif text-4xl text-brand-peach font-bold text-center m-0">Zaufali nam profesjonaliści</h2>
          </div>
          <p className="text-lg text-center text-brand-sand/80 max-w-[800px] mx-auto mb-10">
            Z naszych usług korzystają zarówno osoby prywatne, jak i wspólnoty mieszkaniowe, firmy budowlane i deweloperskie:
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["AWZ Deweloper", "ARKADA Invest", "Moderator Inwestycje", "BAUPOL Sp z.o.o", "SM Budowlani", "PW LECH Sp z.o.o", "DOLMAR Sp z.o.o"].map(company => (
              <span key={company} className="px-5 py-2.5 bg-brand-peach/10 border border-brand-peach/20 rounded-full text-brand-peach font-medium text-sm">
                {company}
              </span>
            ))}
          </div>

          <h3 className="text-2xl text-brand-sand font-serif font-bold mb-8 text-center">Wybrane realizacje w Bydgoszczy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto mb-16">
            {[
              "Osiedle Nowoczesne - ul. Graniczna 6 (Rodźko Dewelopment)",
              "Energooszczędny budynek wielorodzinny - ul. Słowiańska 1",
              "Osiedle mieszkaniowe Aura Park - ul. Siedlecka 47 (IQ Deweloper)",
              "Osiedle City Park III - ul. Chodkiewicza 19 (IQ Deweloper)",
              'Budynek wielorodzinny "Awiator" - ul. Koszalińska (AWZ Deweloper)',
              'Osiedle "Perłowa Dolina" (PW LECH)',
              'Osiedle "INDUSTRIA" - ul. Pomorska 81-85 (Moderator Inwestycje)',
              'Osiedle "Leszczyńskiego PARK" - ul. Leszczyńskiego 18a',
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={18} className="text-brand-peach shrink-0 mt-1" />
                <span className="text-brand-sand/80 text-base">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <h2 className="font-serif text-3xl text-brand-peach font-bold mb-4">Masz pytania? Chcesz wycenić projekt?</h2>
            <p className="text-lg text-brand-sand/70 mb-8">Proponujemy wykonanie darmowej wyceny przykładowej inwestycji!</p>
            <Link href="/kontakt" className="btn-primary inline-flex items-center gap-2 group">
              Przejdź do kontaktu
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .clip-path-diagonal {
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 0% 100%);
        }
        @media (max-width: 768px) {
          .clip-path-diagonal {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
          }
        }
      `}} />
    </div>
  );
}
