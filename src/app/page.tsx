"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Sun, Droplets } from "lucide-react";
import styles from "./page.module.css";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        {/* Note: In a real app, use a high-res video or optimized image here */}
        <div className={styles.heroBackground}>
          <Image 
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop"
            alt="Lush green plant nursery"
            fill
            className={styles.categoryImage}
            priority
          />
        </div>
        <div className={styles.heroOverlay} />
        
        <div className={styles.heroContent}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeUp} className={styles.heroTitle}>
              Trzy Pokolenia Pasji do Ogrodów
            </motion.h1>
            <motion.p variants={fadeUp} className={styles.heroSubtitle}>
              Szkółka Wojciecha Kotyrby to tradycja od 1980 roku. 
              Oferujemy najwyższej jakości rośliny ozdobne oraz profesjonalne zakładanie ogrodów w Bydgoszczy i okolicach.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <a href="/katalog" className="btn btn-primary">
                Przeglądaj Katalog <ArrowRight size={18} style={{ marginLeft: '8px' }}/>
              </a>
              <a href="#kategorie" className="btn btn-secondary">
                Odkryj Kategorie
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="kategorie" className={styles.section} style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.sectionTitle}
          >
            Nasze Specjalności
          </motion.h2>
          
          <motion.div 
            className={styles.categoriesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { title: "Drzewa Iglaste", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=60" },
              { title: "Krzewy Ozdobne", img: "https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=600&auto=format&fit=crop&q=60" },
              { title: "Róże & Byliny", img: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=600&auto=format&fit=crop&q=60" },
            ].map((cat, i) => (
              <motion.div key={i} variants={fadeUp} className={styles.categoryCard}>
                <Image src={cat.img} alt={cat.title} fill className={styles.categoryImage} />
                <div className={styles.categoryOverlay}>
                  <h3 className={styles.categoryName}>{cat.title}</h3>
                  <ArrowRight color="white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={styles.section} style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}
          >
            <h2 className={styles.sectionTitle} style={{ marginBottom: 0 }}>Polecane w Tym Sezonie</h2>
            <a href="/katalog" style={{ display: 'flex', alignItems: 'center', fontWeight: 600, color: 'var(--color-forest-green)' }}>
              Zobacz wszystkie <ArrowRight size={18} style={{ marginLeft: '4px' }}/>
            </a>
          </motion.div>

          <div className={styles.featuredGrid}>
            {[
              { name: "Klon Palmowy 'Garnet'", latin: "Acer palmatum", price: "120 PLN", badge: "Polecane", img: "https://images.unsplash.com/photo-1601662916053-157d6b38c3aa?w=600&auto=format&fit=crop&q=60" },
              { name: "Sosna Górska 'Pumilio'", latin: "Pinus mugo", price: "45 PLN", badge: "Nowość", img: "https://images.unsplash.com/photo-1517502693892-0692f8ef25ff?w=600&auto=format&fit=crop&q=60" },
              { name: "Hortensja Bukietowa 'Limelight'", latin: "Hydrangea paniculata", price: "65 PLN", img: "https://images.unsplash.com/photo-1628156108169-1836f6d0f6cc?w=600&auto=format&fit=crop&q=60" },
              { name: "Trawa Rozplenica Japońska", latin: "Pennisetum alopecuroides", price: "35 PLN", badge: "Polecane", img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&auto=format&fit=crop&q=60" },
            ].map((plant, i) => (
              <motion.div 
                key={i} 
                className={styles.plantCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.plantImageContainer}>
                  {plant.badge && (
                    <div className={styles.badgeContainer}>
                      <span className={`badge ${plant.badge === 'Nowość' ? 'badge-new' : 'badge-recommended'}`}>
                        {plant.badge}
                      </span>
                    </div>
                  )}
                  <Image src={plant.img} alt={plant.name} fill className={styles.plantImage} />
                </div>
                <div className={styles.plantInfo}>
                  <h4 className={styles.plantName}>{plant.name}</h4>
                  <span className={styles.plantLatin}>{plant.latin}</span>
                  
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', color: 'var(--color-sage)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
                      <Sun size={14} /> Pełne słońce
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
                      <Droplets size={14} /> Umiarkowane
                    </div>
                  </div>

                  <div className={styles.plantFooter}>
                    <span className={styles.plantPrice}>{plant.price}</span>
                    <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                      Wybierz
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
