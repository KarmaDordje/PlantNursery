"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowLeft } from "lucide-react";

export default function KontaktPage() {
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
              Kontakt
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-sand/80 leading-relaxed font-medium"
            >
              Odwiedz nasza szkolke, zadzwon lub napisz. Jestesmy do Twojej dyspozycji!
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-10 md:p-12 shadow-2xl"
          >
            <h2 className="font-serif text-3xl text-brand-peach font-bold mb-10">Dane Kontaktowe</h2>

            <ul className="flex flex-col gap-8">
              <li className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-peach/10 flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-brand-peach" />
                </div>
                <div>
                  <strong className="block text-lg text-brand-sand mb-1 font-bold">Adres Szkolki</strong>
                  <p className="text-brand-sand/70 text-base leading-relaxed">Wojciech Kotyrba<br />ul. Leczycka 17<br />85-737 Bydgoszcz</p>
                </div>
              </li>

              <li className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-peach/10 flex items-center justify-center shrink-0">
                  <Phone size={24} className="text-brand-peach" />
                </div>
                <div>
                  <strong className="block text-lg text-brand-sand mb-1 font-bold">Szkolka (Wojciech Kotyrba)</strong>
                  <p className="text-brand-sand/70 text-base mb-4">
                    <a href="tel:503935055" className="hover:text-brand-peach transition-colors">tel. 503 935 055</a>
                  </p>
                  <strong className="block text-lg text-brand-sand mb-1 font-bold">Zakladanie ogrodow (Maciej Kotyrba)</strong>
                  <p className="text-brand-sand/70 text-base">
                    <a href="tel:608361675" className="hover:text-brand-peach transition-colors">tel. 608 361 675</a>
                  </p>
                </div>
              </li>

              <li className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-peach/10 flex items-center justify-center shrink-0">
                  <Mail size={24} className="text-brand-peach" />
                </div>
                <div>
                  <strong className="block text-lg text-brand-sand mb-1 font-bold">E-mail</strong>
                  <p className="text-brand-sand/70 text-base leading-relaxed">
                    <a href="mailto:info@wojtekogrodnik.pl" className="hover:text-brand-peach transition-colors">info@wojtekogrodnik.pl</a><br/>
                    <a href="mailto:maciej_kotyrba@wp.pl" className="hover:text-brand-peach transition-colors">maciej_kotyrba@wp.pl</a> (Ogrodnictwo)
                  </p>
                </div>
              </li>

              <li className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-full bg-brand-peach/10 flex items-center justify-center shrink-0">
                  <Clock size={24} className="text-brand-peach" />
                </div>
                <div>
                  <strong className="block text-lg text-brand-sand mb-1 font-bold">Godziny Otwarcia (1 kwietnia - 31 pazdziernika)</strong>
                  <p className="text-brand-sand/70 text-base leading-relaxed">Poniedzialek - Piatek: 10:00 - 17:00<br />Sobota: 10:00 - 14:00<br />Niedziela: Nieczynne</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col min-h-[500px]"
          >
            <div className="flex-1 bg-brand-green/20 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-brand-peach/10 flex items-center justify-center mb-6">
                <MapPin size={36} className="text-brand-peach" />
              </div>
              <h3 className="font-serif text-3xl text-brand-sand font-bold mb-4">Mapa Dojazdu</h3>
              <p className="text-brand-sand/60 text-lg">ul. Leczycka 17, 85-737 Bydgoszcz</p>
            </div>
          </motion.div>
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
