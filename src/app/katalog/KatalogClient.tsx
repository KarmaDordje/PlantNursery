"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sun, Droplets, ShoppingBag } from "lucide-react";
import styles from "./page.module.css";
import homeStyles from "../page.module.css"; // Reuse card styles from home

type Plant = {
  id: number;
  name: string;
  latinName: string | null;
  price: string | null;
  category: string;
  sun: string | null;
  water: string | null;
  imageUrl: string | null;
  height: string | null;
  container: string | null;
};

export default function KatalogClient({ initialPlants }: { initialPlants: Plant[] }) {
  // Use DB plants if available, otherwise fallback to mock for initial visual
  const displayPlants = initialPlants.length > 0 ? initialPlants : [
    { id: 991, name: "Klon Palmowy 'Garnet'", latinName: "Acer palmatum", price: "120 PLN", category: "Drzewa Liściaste", sun: "Półcień", water: "Umiarkowane", imageUrl: "https://images.unsplash.com/photo-1601662916053-157d6b38c3aa?w=600&auto=format&fit=crop&q=60" }
  ];

  const categories = ["Wszystkie", "Iglaste", "Liściaste", "Byliny", "Trawy"];

  return (
    <div className="container">
      <div className={styles.headerArea}>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.pageTitle}
        >
          Katalog Roślin
        </motion.h1>
        <span className={styles.resultsCount}>Pokazuję 6 wyników</span>
      </div>

      <div className={styles.filterBar}>
        {categories.map(cat => (
          <button key={cat} className={styles.filterButton}>
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.katalogContainer}>
        {/* Filters Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.filtersSidebar}
        >
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Kategoria</h3>
            {['Drzewa Iglaste', 'Drzewa Liściaste', 'Krzewy Ozdobne', 'Róże', 'Trawy i Byliny'].map(cat => (
              <label key={cat} className={styles.filterLabel}>
                <input type="checkbox" className="accent-forest-green" /> {cat}
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Stanowisko</h3>
            {['Słońce', 'Półcień', 'Cień'].map(sun => (
              <label key={sun} className={styles.filterLabel}>
                <input type="checkbox" /> {sun}
              </label>
            ))}
          </div>
          
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Dostępność</h3>
            <label className={styles.filterLabel}>
              <input type="checkbox" defaultChecked /> Dostępne od ręki
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" /> Na zamówienie
            </label>
          </div>
        </motion.aside>

        {/* Product Grid */}
        <div className={styles.plantGrid}>
          {displayPlants.map((plant, i) => (
            <motion.div 
              key={plant.id} 
              className={homeStyles.plantCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/katalog/${plant.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={homeStyles.plantImageContainer}>
                  <Image src={plant.imageUrl!} alt={plant.name} fill className={homeStyles.plantImage} />
                </div>
                <div className={homeStyles.plantInfo}>
                  <h4 className={homeStyles.plantName}>{plant.name}</h4>
                  <span className={homeStyles.plantLatin}>{plant.latinName}</span>

                
                <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', color: 'var(--color-sage)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
                    <Sun size={14} /> {plant.sun || '-'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
                    <Droplets size={14} /> {plant.water || '-'}
                  </div>
                </div>

                {(plant.height || plant.container) && (
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    {plant.height && <span>Wys: {plant.height} cm </span>}
                    {plant.container && <span>Poj: {plant.container} dm³</span>}
                  </div>
                )}

                <div className={homeStyles.plantFooter}>
                  <span className={homeStyles.plantPrice}>{plant.price}</span>
                  <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>
                    <ShoppingBag size={16} style={{ marginRight: '6px' }} /> Dodaj
                  </button>
                </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
