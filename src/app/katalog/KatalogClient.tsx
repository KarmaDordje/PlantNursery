"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Filter, Leaf, ArrowLeft, Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchPlants } from "./actions";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [plants, setPlants] = useState(initialPlants);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialPlants.length === 15);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(initialPlants.length === 15);
  
  // Track IDs of newly loaded cards so only they animate in
  const [newCardIds, setNewCardIds] = useState<Set<number>>(new Set(initialPlants.map(p => p.id)));
  
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debouncedSearchRef = useRef("");
  const isFirstMount = useRef(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const selectedCategoriesRef = useRef<string[]>([]);

  const allCategories = [
    'Drzewa Iglaste', 'Drzewa Liściaste', 'Krzewy Liściaste',
    'Krzewy Iglaste', 'Trawy i Byliny', 'Rośliny Wrzosowate',
    'Pnącza', 'Róże', 'Owoce',
  ];

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => {
      const next = prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat];
      selectedCategoriesRef.current = next;
      return next;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    debouncedSearchRef.current = debouncedSearch;
    const fetchFiltered = async () => {
      setIsLoading(true);
      loadingRef.current = true;
      try {
        const cats = selectedCategoriesRef.current.length > 0 ? selectedCategoriesRef.current : undefined;
        const results = await fetchPlants(1, 15, debouncedSearch, cats);
        setPlants(results);
        setNewCardIds(new Set(results.map(p => p.id)));
        setPage(1);
        pageRef.current = 1;
        setHasMore(results.length === 15);
        hasMoreRef.current = results.length === 15;
      } catch (error) {
        console.error("Failed to fetch results:", error);
      } finally {
        setIsLoading(false);
        loadingRef.current = false;
      }
    };
    fetchFiltered();
  }, [debouncedSearch, selectedCategories]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;
    setIsLoading(true);
    loadingRef.current = true;
    try {
      const nextPage = pageRef.current + 1;
      const cats = selectedCategoriesRef.current.length > 0 ? selectedCategoriesRef.current : undefined;
      const nextPlants = await fetchPlants(nextPage, 15, debouncedSearchRef.current, cats);
      if (nextPlants.length < 15) {
        setHasMore(false);
        hasMoreRef.current = false;
      }
      setNewCardIds(new Set(nextPlants.map(p => p.id)));
      setPlants(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const uniqueNext = nextPlants.filter(p => !existingIds.has(p.id));
        return [...prev, ...uniqueNext];
      });
      setPage(nextPage);
      pageRef.current = nextPage;
    } catch (error) {
      console.error("Failed to load more plants:", error);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, []); // stable — no deps, uses refs

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  const displayPlants = plants.length > 0 ? plants : (searchQuery ? [] : [
    { id: 991, name: "Klon Palmowy 'Garnet'", latinName: "Acer palmatum", price: "120 PLN", category: "Drzewa Liściaste", sun: "Półcień", water: "Umiarkowane", imageUrl: "https://images.unsplash.com/photo-1601662916053-157d6b38c3aa?w=600&auto=format&fit=crop&q=60", height: "120", container: "5" }
  ]);

  const categories = ["Wszystkie", "Iglaste", "Liściaste", "Byliny", "Trawy"];

  return (
    <div className="bg-brand-dark-green min-h-screen py-12 relative overflow-hidden">
      
      {/* Global Light Source Overlay (Background only) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
        style={{
          background: 'radial-gradient(circle at 20% 0%, rgba(245, 222, 179, 0.25), transparent 70%)'
        }}
      />

      <div className="w-full px-4 md:px-8 2xl:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4 md:gap-6">
            <Link 
              href="/" 
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-peach hover:text-brand-dark-green text-brand-sand transition-colors border border-white/10 shrink-0"
              title="Wróć do strony głównej"
            >
              <ArrowLeft size={20} />
            </Link>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-serif text-brand-sand font-bold m-0"
            >
              Katalog Roślin
            </motion.h1>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex items-center gap-2 mt-2 md:mt-0 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-brand-sand transition-colors border border-white/10 text-base"
            >
              <Filter size={18} />
              {isSidebarOpen ? "Ukryj filtry" : "Pokaż filtry"}
            </button>
          </div>
          <span className="text-brand-sand/60 mt-2 md:mt-0 font-medium text-lg">Pokazuję {displayPlants.length} wyników</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
            {categories.map((cat, i) => (
              <button key={cat} className={`whitespace-nowrap px-6 py-2.5 text-base rounded-full font-medium transition-colors ${i === 0 ? 'bg-brand-sand text-brand-dark-green' : 'bg-white/5 text-brand-sand border border-white/10 hover:bg-white/10'}`}>
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-sand/50" size={20} />
            <input 
              type="text" 
              placeholder="Szukaj rośliny (np. Hortensja)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-brand-sand rounded-full pl-12 pr-6 py-3 focus:outline-none focus:border-brand-peach focus:ring-1 focus:ring-brand-peach transition-all placeholder:text-brand-sand/40 text-base"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.aside 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 text-brand-sand overflow-hidden"
              >
                <div className="w-[280px]">
                  <div className="mb-8 border-b border-white/10 pb-6">
                    <h2 className="font-serif text-xl font-bold mb-4">Kategoria</h2>
                    <div className="flex flex-col gap-3">
                      {allCategories.map(cat => (
                        <div key={cat} className="flex items-center gap-3">
                          <Checkbox
                            id={`cat-${cat}`}
                            checked={selectedCategories.includes(cat)}
                            onCheckedChange={() => toggleCategory(cat)}
                            className="w-5 h-5 rounded border-white/20 bg-white/5 data-[state=checked]:bg-brand-peach data-[state=checked]:text-brand-dark-green data-[state=checked]:border-brand-peach"
                          />
                          <label htmlFor={`cat-${cat}`} onClick={() => toggleCategory(cat)} className="cursor-pointer text-brand-sand hover:text-white transition-colors text-sm font-medium leading-none">
                            {cat}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8 border-b border-white/10 pb-6">
                    <h2 className="font-serif text-xl font-bold mb-4">Stanowisko</h2>
                    <div className="flex flex-col gap-3">
                      {['Słońce', 'Półcień', 'Cień'].map(sun => (
                        <div key={sun} className="flex items-center gap-3">
                          <Checkbox id={`sun-${sun}`} className="w-5 h-5 rounded border-white/20 bg-white/5 data-[state=checked]:bg-brand-peach data-[state=checked]:text-brand-dark-green data-[state=checked]:border-brand-peach" />
                          <label htmlFor={`sun-${sun}`} className="cursor-pointer text-brand-sand hover:text-white transition-colors text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {sun}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="font-serif text-xl font-bold mb-4">Dostępność</h2>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Checkbox id="avail-now" defaultChecked className="w-5 h-5 rounded border-white/20 bg-white/5 data-[state=checked]:bg-brand-peach data-[state=checked]:text-brand-dark-green data-[state=checked]:border-brand-peach" />
                        <label htmlFor="avail-now" className="cursor-pointer text-brand-sand hover:text-white transition-colors text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Dostępne od ręki
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <Checkbox id="avail-order" className="w-5 h-5 rounded border-white/20 bg-white/5 data-[state=checked]:bg-brand-peach data-[state=checked]:text-brand-dark-green data-[state=checked]:border-brand-peach" />
                        <label htmlFor="avail-order" className="cursor-pointer text-brand-sand hover:text-white transition-colors text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Na zamówienie
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid and Spinner Wrapper */}
          <div className="flex-1 flex flex-col gap-8">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${isSidebarOpen ? 'xl:grid-cols-4 2xl:grid-cols-5' : 'xl:grid-cols-5 2xl:grid-cols-6'} gap-6 content-start`}>
              {displayPlants.map((plant) => {
                const isNew = newCardIds.has(plant.id);
                return (
                <motion.div 
                  key={plant.id} 
                  className="bg-[#2a4d3e]/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group cursor-pointer relative"
                  initial={isNew ? { opacity: 0, y: 20 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                <Link href={`/katalog/${plant.id}`} className="flex flex-col h-full z-10">
                  <div className="relative w-full mb-6 flex flex-col items-center pt-4">
                    
                    {/* The Image */}
                    <div className="relative w-[90%] aspect-square z-20 overflow-hidden rounded-[24px] border border-white/10 bg-black/20 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                      {plant.imageUrl ? (
                        <Image 
                          src={plant.imageUrl} 
                          alt={plant.name} 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                          className="object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-sand/30">
                          <Leaf size={48} />
                        </div>
                      )}
                    </div>

                    {/* The 3D Shelf Emulation - sits below the image */}
                    <div className="relative w-[90%] mt-2 z-10">
                      <div className="w-full h-6 bg-[#3d6550] rounded-full border-t border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.6)]"></div>
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[95%] h-6 bg-black/60 rounded-[100%] blur-[10px] -z-10"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-auto pt-2">
                    <div className="flex flex-col">
                      <h2 className="text-2xl text-brand-sand font-bold m-0 tracking-tight mb-1">{plant.name}</h2>
                      <span className="text-sm text-brand-sand/60 mb-3">{plant.latinName || plant.category}</span>
                      <span className="font-bold text-lg text-brand-peach">{plant.price}</span>
                    </div>
                    
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-sand hover:bg-brand-peach hover:text-brand-dark-green transition-colors shrink-0">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </Link>

                {/* Card Highlight Overlay (from LLM CSS) */}
                <div 
                  className="absolute top-0 right-0 w-full h-full pointer-events-none rounded-[32px]"
                  style={{
                    background: 'linear-gradient(to bottom left, rgba(255, 255, 255, 0.2) 0%, transparent 40%)'
                  }}
                />

                {/* Subtle gradient overlay to enhance the glass look */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 rounded-[32px] pointer-events-none z-0" />
              </motion.div>
              );
              })}
            </div>
            
            {/* Infinite Scroll Trigger */}
            {hasMore && (
              <div ref={observerTarget} className="w-full flex justify-center py-8 mt-auto">
                <div className="w-8 h-8 border-4 border-brand-peach border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
