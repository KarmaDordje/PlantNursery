"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, BookOpen, Sprout, Briefcase, Leaf } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-brand-dark-green min-h-screen">
      <header className="absolute top-0 left-0 w-full z-50 py-6">
        <nav className="container-custom flex justify-between items-center">
          <Link href="/" className="text-brand-peach font-serif text-2xl font-bold tracking-tight">
            Wojtek Kotyrba
          </Link>
        </nav>
      </header>
      
      {/* SECTION A: HERO */}
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
        {/* Diagonal split background - Leaf image on the right */}
        <div className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0 clip-path-diagonal">
          <Image 
            src="/hero-leaf-bg-ultra.jpg" 
            alt="Macro leaf texture" 
            fill 
            sizes="(max-width: 768px) 100vw, 65vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 md:bg-black/10" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-[500px] bg-brand-dark-green/60 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-3xl md:rounded-none border border-white/10 md:border-none shadow-xl md:shadow-none">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-sans font-bold text-brand-peach leading-[1.1] mb-6 tracking-tight"
            >
              Szkółka<br/>Roślin
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-brand-sand md:text-brand-sand/80 text-lg md:text-xl leading-relaxed mb-10 font-sans font-medium"
            >
              Odkryj naszą starannie wyselekcjonowaną kolekcję roślin ozdobnych i owocowych. Z pasją tworzymy piękno dla Twojego ogrodu, oferując najwyższej jakości sadzonki.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/katalog" className="btn-primary inline-block">
                Zobacz Katalog
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS WRAPPER WITH NEW TEXTURED BACKGROUND */}
      <div className="relative w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/section-bg.jpg" 
            alt="Organic geometric texture" 
            fill 
            sizes="100vw"
            className="object-cover opacity-60 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 pt-10">
          {/* SECTION B: FEATURES BANNER */}
          <section className="relative z-20 -mt-20 container-custom pb-20">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-green/90 backdrop-blur-md rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 md:p-12 overflow-hidden relative"
            >
              {/* Simulated layered background waves */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-50" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                {[
                  { icon: Users, title: "O nas", desc: "Poznaj naszą pasję do roślin i wieloletnie doświadczenie w branży ogrodniczej.", href: "/o-nas" },
                  { icon: Sprout, title: "Katalog Roślin", desc: "Przeglądaj naszą bogatą ofertę drzew, krzewów i kwiatów do Twojego ogrodu.", href: "/katalog" },
                  { icon: Briefcase, title: "Usługi", desc: "Oferujemy profesjonalne doradztwo, projektowanie i pielęgnację terenów zielonych.", href: "/uslugi" },
                  { icon: BookOpen, title: "Porady", desc: "Sprawdź nasze artykuły i porady ogrodnicze, aby Twoje rośliny rosły zdrowo i pięknie.", href: "/porady" },
                ].map((item, i) => (
                  <Link href={item.href} key={i} className="flex flex-col items-center text-center px-4 py-4 -my-4 relative group cursor-pointer hover:bg-white/5 transition-colors rounded-3xl">
                    {/* Column dividers mimicking the mockup's organic overlaps */}
                    {i !== 0 && (
                      <div className="hidden lg:block absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                    )}
                    
                    <div className="w-16 h-16 rounded-full border-2 border-brand-sand/30 flex items-center justify-center mb-6 text-brand-sand">
                      <item.icon size={28} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-brand-sand font-bold text-xl mb-4">{item.title}</h2>
                    <p className="text-brand-sand/60 text-sm leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </section>

          {/* SECTION C: 3x2 SQUARE GRID */}
          <section className="container-custom pb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="aspect-square bg-brand-light-green/95 backdrop-blur-sm rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-[#193126] shadow-[8px_8px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-brand-sand mb-8 group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8 rounded-full border-4 border-dashed border-brand-sand" />
                </div>
                <h2 className="text-brand-sand font-bold text-xl mb-4">Wiosenne Promocje</h2>
                <p className="text-brand-sand/70 text-sm leading-relaxed px-4 font-medium">
                  Skorzystaj z naszych wyjątkowych ofert na sezon wiosenny. Najlepsze odmiany krzewów owocowych w atrakcyjnych cenach na rozpoczęcie sezonu.
                </p>
                <Link href="/promocje" className="absolute inset-0 z-10" aria-label="Wiosenne Promocje" />
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="aspect-square bg-[#593c28]/95 backdrop-blur-sm rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-[#193126] shadow-[8px_8px_16px_rgba(0,0,0,0.4)] flex items-center justify-center text-brand-sand mb-8 group-hover:scale-110 transition-transform">
                  <Leaf size={32} fill="currentColor" />
                </div>
                <h2 className="text-brand-sand font-bold text-xl mb-4">Nowości</h2>
                <p className="text-brand-sand/70 text-sm leading-relaxed px-4 font-medium">
                  Odkryj najnowsze gatunki roślin, które właśnie dotarły do naszej szkółki. Stale poszerzamy naszą ofertę o unikalne i rzadkie okazy botaniczne.
                </p>
                <Link href="/nowosci" className="absolute inset-0 z-10" aria-label="Nowości" />
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="aspect-square bg-brand-brown/95 backdrop-blur-sm rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-[#193126] shadow-[8px_8px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-brand-peach mb-8 group-hover:scale-110 transition-transform">
                  <div className="flex gap-1">
                    <div className="w-2 h-6 bg-current rounded-full rotate-45" />
                    <div className="w-2 h-6 bg-current rounded-full -rotate-45" />
                  </div>
                </div>
                <h2 className="text-brand-sand font-bold text-xl mb-4">Bestsellery</h2>
                <p className="text-brand-sand/70 text-sm leading-relaxed px-4 font-medium">
                  Najchętniej wybierane rośliny przez naszych klientów. Sprawdzone, odporne i pięknie prezentujące się odmiany, które ozdobią każdy ogród.
                </p>
                <Link href="/bestsellery" className="absolute inset-0 z-10" aria-label="Bestsellery" />
              </motion.div>

              {/* Card 4 (Image) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="aspect-square rounded-[32px] overflow-hidden shadow-lg relative cursor-pointer"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=1974&auto=format&fit=crop"
                  alt="Sunlight through forest"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>

              {/* Card 5 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="aspect-square bg-[#3d291b]/95 backdrop-blur-sm rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-[#f2dac4] shadow-[8px_8px_16px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#3d291b] mb-8 group-hover:scale-110 transition-transform">
                  <div className="grid grid-cols-2 gap-1 rotate-45">
                    <div className="w-3 h-3 bg-current rounded-full" />
                    <div className="w-3 h-3 bg-current rounded-full" />
                    <div className="w-3 h-3 bg-current rounded-full" />
                    <div className="w-3 h-3 bg-current rounded-full" />
                  </div>
                </div>
                <h2 className="text-brand-sand font-bold text-xl mb-4">Nasz Zespół</h2>
                <p className="text-brand-sand/70 text-sm leading-relaxed px-4 font-medium">
                  Poznaj ekspertów, którzy codziennie dbają o najwyższą jakość naszych roślin. Zawsze chętnie doradzimy Ci w doborze idealnych gatunków do Twojego ogrodu.
                </p>
                <Link href="/o-nas" className="absolute inset-0 z-10" aria-label="Nasz Zespół" />
              </motion.div>

              {/* Card 6 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="aspect-square bg-brand-peach/95 backdrop-blur-sm rounded-[32px] p-10 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-[#593c28] shadow-[8px_8px_16px_rgba(89,60,40,0.4)] flex items-center justify-center text-brand-peach mb-8 group-hover:scale-110 transition-transform">
                  <div className="flex flex-col gap-1.5">
                    <div className="w-6 h-1 bg-current rounded-full" />
                    <div className="w-8 h-1 bg-current rounded-full" />
                    <div className="w-6 h-1 bg-current rounded-full" />
                  </div>
                </div>
                <h2 className="text-[#3d291b] font-bold text-xl mb-4">Kontakt</h2>
                <p className="text-[#3d291b]/70 text-sm leading-relaxed px-4 font-medium">
                  Masz pytania dotyczące naszej oferty lub potrzebujesz wsparcia w projektowaniu ogrodu? Skontaktuj się z nami bezpośrednio poprzez formularz lub zadzwoń.
                </p>
                <Link href="/kontakt" className="absolute inset-0 z-10" aria-label="Kontakt" />
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* Global utility for diagonal clip path used in hero */}
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
