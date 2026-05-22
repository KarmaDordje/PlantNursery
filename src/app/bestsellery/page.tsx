"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Leaf } from "lucide-react";

export default function BestselleryPage() {
  const bestPlants = [
    {
      name: "Żywotnik Zachodni (Tuja) 'Smaragd'",
      price: "19 zł",
      desc: "Najpopularniejsza odmiana na żywopłoty. Charakteryzuje się pięknym, szmaragdowym kolorem przez cały rok i regularnym pokrojem.",
      image: "/images/plants/zywotnik_zachodni_smaragd_120.jpg"
    },
    {
      name: "Laurowiśnia Wschodnia 'Caucasica'",
      price: "29 zł",
      desc: "Zimozielony krzew o błyszczących, ciemnozielonych liściach. Tworzy gęste, eleganckie i nowoczesne żywopłoty.",
      image: "/images/plants/laurowisnia_wschodnia.jpg"
    },
    {
      name: "Trawa Ozdobna Miskant Chiński 'Zebrinus'",
      price: "24 zł",
      desc: "Charakterystyczna trawa o poprzecznych, żółtych paskach na zielonych liściach. Dodaje lekkości i nowoczesności kompozycjom ogrodowym.",
      image: "/images/plants/miskant_chinski.jpg"
    }
  ];

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
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-peach/10 border border-brand-peach/20 text-brand-peach text-sm font-semibold mb-4"
            >
              <Star size={14} fill="currentColor" /> Najczęściej Kupowane
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif text-brand-peach font-bold mb-6 tracking-tight"
            >
              Nasze<br />Bestsellery
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-brand-sand/80 text-lg md:text-xl leading-relaxed font-sans font-medium"
            >
              Wybierz sprawdzone rośliny doceniane przez setki naszych klientów. Cechują się wysoką mrozoodpornością, łatwością w pielęgnacji oraz wspaniałym wyglądem.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ITEMS SECTION */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestPlants.map((plant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10 overflow-hidden group shadow-lg"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={plant.image}
                  alt={plant.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-brand-peach text-brand-dark-green font-bold px-3 py-1 rounded-full text-sm shadow-md flex items-center gap-1">
                  <Star size={14} fill="currentColor" /> Bestseller
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-brand-sand mb-3 font-serif">{plant.name}</h3>
                <p className="text-brand-sand/60 text-sm leading-relaxed mb-6 font-medium">
                  {plant.desc}
                </p>
                <div className="flex justify-between items-baseline mt-auto">
                  <span className="text-brand-peach font-bold text-3xl">{plant.price}</span>
                  <Link 
                    href="/katalog"
                    className="inline-flex items-center gap-1.5 text-brand-sand text-sm font-semibold hover:text-brand-peach transition-colors"
                  >
                    <Leaf size={16} /> Zobacz w katalogu
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global utility for diagonal clip path */}
      <style jsx global>{`
        .clip-path-diagonal {
          clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
        @media (max-width: 768px) {
          .clip-path-diagonal {
            clip-path: none;
          }
        }
      `}</style>
    </div>
  );
}
