"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Leaf, Clock, MapPin, Phone, ArrowLeft } from "lucide-react";

export default function ONasPage() {
  return (
    <div className="bg-brand-dark-green min-h-screen pb-24">
      {/* HERO SECTION FOR O NAS */}
      <section className="relative w-full min-h-[50vh] flex items-center overflow-hidden mb-16">
        {/* Diagonal split background - Leaf image on the right */}
        <div className="absolute top-0 right-0 w-full md:w-[65%] h-full z-0 clip-path-diagonal opacity-80">
          <Image 
            src="/hero-leaf-bg-ultra.jpg" 
            alt="Macro leaf texture" 
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
              Poznaj Naszą <br/>Historię
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-brand-sand/80 leading-relaxed font-medium"
            >
              Nasze gospodarstwo zajmuje się produkcją ogrodniczą już od trzech pokoleń. Dzięki wieloletniemu doświadczeniu oferujemy rośliny najwyższej jakości.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Main Content Column */}
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg prose-invert max-w-none text-brand-sand/80"
            >
              <p className="text-xl leading-relaxed mb-8">
                Prowadzimy sprzedaż hurtową i detaliczną roślin ozdobnych iglastych i liściastych. 
                W naszej ofercie znajdą Państwo rośliny zarówno do małych, jak i dużych ogrodów.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-12 backdrop-blur-sm">
                <h3 className="text-2xl font-serif font-bold text-brand-peach mb-6 flex items-center gap-3">
                  <Leaf className="text-brand-light-green" />
                  Co znajdziesz w naszej szkółce?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Drzewa i krzewy iglaste', 'Drzewa i krzewy liściaste', 'Róże (także formy pienne)', 'Rośliny wrzosowate', 'Pnącza', 'Byliny na skalniaki', 'Trawy i turzyce'].map((item, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      key={item} 
                      className="flex items-center gap-3 text-brand-sand"
                    >
                      <CheckCircle2 size={18} className="text-brand-peach shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <h2 className="font-serif text-4xl text-brand-peach font-bold mt-16 mb-8">
                Nasza Oferta
              </h2>
              
              <div className="space-y-6">
                <p>
                  Początkowo podstawę naszej produkcji stanowiły rośliny iglaste, m.in. tuje, cyprysiki, jałowce, sosny i świerki – także formy karłowe i szczepione. Z roku na rok zwiększaliśmy także ofertę roślin liściastych. Bogactwo gatunków i odmian o różnym pokroju, barwie liści czy sile wzrostu pozwala wybrać rośliny idealne do Państwa ogrodu.
                </p>
                <div className="relative h-[400px] w-full rounded-[32px] overflow-hidden my-10 shadow-2xl">
                  <Image 
                    src="/images/plants/sosna_czarna_100_120cm.jpg"
                    alt="Sadzonki w naszej szkółce"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-green/40 to-transparent" />
                </div>
                <p>
                  Wszystkie rośliny produkujemy w doniczkach - są w pełni ukorzenione. Dzięki temu mogą je Państwo sadzić przez cały sezon. Kilku- i kilkunastoletnie rośliny można obejrzeć w naszym pokazowym ogrodzie.
                </p>
                <p>
                  Odbiorcom hurtowym i stałym klientom udzielamy korzystnych rabatów. Przyjmujemy płatności gotówką oraz kartą.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar / Info Column */}
          <div className="w-full lg:w-[400px] shrink-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-8 bg-gradient-to-b from-brand-light-green/20 to-brand-green/40 border border-white/10 p-8 rounded-[32px] backdrop-blur-md shadow-2xl"
            >
              <h3 className="font-serif text-3xl text-brand-sand font-bold mb-8">
                Zapraszamy
              </h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-peach/10 flex items-center justify-center shrink-0">
                    <Clock className="text-brand-peach" size={24} />
                  </div>
                  <div>
                    <h4 className="text-brand-peach font-bold text-lg mb-1">Godziny otwarcia</h4>
                    <p className="text-brand-sand/80 text-sm leading-relaxed">
                      Sprzedaż prowadzimy od<br/>
                      <strong className="text-brand-sand">1 kwietnia do 31 października</strong>
                    </p>
                    <p className="text-brand-sand/60 text-sm mt-2">
                      Pn-Pt: 10.00 - 17.00<br/>
                      Sobota: 10.00 - 14.00
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-peach/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-peach" size={24} />
                  </div>
                  <div>
                    <h4 className="text-brand-peach font-bold text-lg mb-1">Lokalizacja</h4>
                    <p className="text-brand-sand/80 text-sm leading-relaxed">
                      ul. Łęczycka 17<br/>
                      85-737 Bydgoszcz
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-peach/10 flex items-center justify-center shrink-0">
                    <Phone className="text-brand-peach" size={24} />
                  </div>
                  <div>
                    <h4 className="text-brand-peach font-bold text-lg mb-1">Kontakt</h4>
                    <p className="text-brand-sand/80 text-sm leading-relaxed">
                      Tel: <a href="tel:503935055" className="hover:text-brand-peach transition-colors">503 935 055</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <a href="/katalog" className="btn-primary w-full text-center group">
                  <span>Przejdź do katalogu</span>
                </a>
              </div>
            </motion.div>
          </div>

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
