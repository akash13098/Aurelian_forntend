import React, { useState } from "react";
import { motion } from "framer-motion";
import { products, categories, concerns } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Filter, X } from "lucide-react";

const Shop = () => {
  const [category, setCategory] = useState("All");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = products.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (selectedConcerns.length > 0 && !selectedConcerns.some((c) => p.concern.includes(c))) return false;
    return true;
  });

  const toggleConcern = (c: string) => {
    setSelectedConcerns((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-2">The Collection</p>
          <h1 className="font-serif text-4xl lg:text-5xl">Shop All</h1>
        </motion.div>

        {/* Category tabs */}
        <div className="flex items-center justify-center gap-4 lg:gap-6 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`font-sans text-sm tracking-[0.1em] uppercase pb-1 border-b-2 transition-all ${
                category === cat ? "border-gold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-1 text-sm font-sans text-muted-foreground">
            <Filter size={14} /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-56 flex-shrink-0`}>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-gold">Skin Concern</h3>
                <button onClick={() => setShowFilters(false)} className="lg:hidden"><X size={16} /></button>
              </div>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {concerns.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleConcern(c)}
                    className={`text-left text-sm font-sans px-3 py-1.5 rounded transition-all ${
                      selectedConcerns.includes(c)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {selectedConcerns.length > 0 && (
                <button onClick={() => setSelectedConcerns([])} className="mt-3 text-xs font-sans text-gold hover:underline">
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-sans mb-6">{filtered.length} products</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-serif text-xl mb-2">No products found</p>
                <p className="text-sm text-muted-foreground font-sans">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
