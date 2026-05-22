"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, ArrowLeft } from "lucide-react";

export default function PoradyPage() {
  const articles = [
    {
      id: 1,
      title: "Jak prawidlowo sadzic drzewa owocowe?",
      excerpt: "Jesien i wiosna to najlepsze pory na sadzenie drzew. Dowiedz sie, jak przygotowac podloze i zabezpieczyc mlode drzewka na zime.",
    },
    {
      id: 2,
      title: "Nawozenie wiosenne - od czego zaczac?",
      excerpt: "Wiosna to czas budzenia sie roslin do zycia. Zobacz, jakie nawozy wybrac do trawnika, a jakie do krzewow kwitnacych.",
    },
    {
      id: 3,
      title: "Zwalczanie szkodnikow w sposob ekologiczny",
      excerpt: "Mszyce na rozach? Przedziorki na iglakach? Poznaj naturalne metody walki ze szkodnikami, bezpieczne dla owadow zapylajacych.",
    }
  ];

  return (
    <div className="bg-brand-dark-green min-h-screen pb-24">
      {/* HERO */}
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
              Porady<br/>Ogrodnicze
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-sand/80 leading-relaxed font-medium"
            >
              Dzielimy sie nasza wiedza i wieloletnim doswiadczeniem. Zobacz nasze praktyczne poradniki dotyczace pielegnacji, sadzenia i ochrony roslin.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#2a4d3e]/60 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 transition-all duration-300 flex flex-col group cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 rounded-[32px] pointer-events-none" />
              <div className="w-full h-48 bg-brand-green/40 flex items-center justify-center relative z-10">
                <BookOpen size={48} className="text-brand-sand/30 group-hover:text-brand-peach group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="p-8 flex flex-col flex-1 relative z-10">
                <h2 className="font-serif text-2xl text-brand-sand font-bold mb-4">{article.title}</h2>
                <p className="text-brand-sand/70 text-base leading-relaxed mb-8 flex-1">{article.excerpt}</p>
                <span className="inline-flex items-center font-semibold text-brand-peach hover:text-brand-sand transition-colors mt-auto text-base">
                  Czytaj wiecej <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
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
