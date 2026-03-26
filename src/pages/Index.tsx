import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Sparkles, Shield } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroSerum from "@/assets/hero-serum.jpg";
import heroSunshield from "@/assets/hero-sunshield.jpg";
import heroGlow from "@/assets/hero-glow.jpg";

const slides = [
  {
    image: heroSerum,
    title: "The Elixir",
    subtitle: "24K Gold & Squalane Serum",
    description: "Where ancient alchemy meets modern science",
    cta: "Discover The Elixir",
    link: "/product/24k-gold-squalane-serum",
  },
  {
    image: heroSunshield,
    title: "The Sun Shield",
    subtitle: "Royal SPF 50+ Protection",
    description: "Invisible armour for luminous skin",
    cta: "Shop Sun Shield",
    link: "/product/royal-sun-shield-spf-50",
  },
  {
    image: heroGlow,
    title: "The Royal Glow",
    subtitle: "Vitamin C Concentrate",
    description: "Reveal your skin's inner radiance",
    cta: "Unlock The Glow",
    link: "/product/royal-glow-vitamin-c",
  },
];

const philosophyItems = [
  { icon: Leaf, title: "Pure Intention", desc: "Every ingredient is chosen with purpose. No fillers, no compromises." },
  { icon: Sparkles, title: "Royal Craft", desc: "Small-batch formulations that honour the art of skincare." },
  { icon: Shield, title: "Clinical Trust", desc: "Dermatologist-tested. Clinically proven. Transparently sourced." },
];

const Homepage = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0 }}
            className="absolute inset-0"
          >
            <img src={slides[current].image} alt={slides[current].title} className="w-full h-full object-cover" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-xl"
              >
                <p className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-3">{slides[current].subtitle}</p>
                <h1 className="font-serif text-5xl lg:text-7xl text-alabaster mb-4 leading-[1.1]">{slides[current].title}</h1>
                <p className="font-sans text-alabaster/80 text-lg font-light mb-8">{slides[current].description}</p>
                <Link
                  to={slides[current].link}
                  className="inline-flex items-center gap-3 bg-gold/90 hover:bg-gold text-charcoal px-8 py-3.5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300 group"
                >
                  {slides[current].cta}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-0.5 transition-all duration-500 ${i === current ? "w-10 bg-gold" : "w-5 bg-alabaster/40"}`}
            />
          ))}
        </div>

        <button onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-alabaster/60 hover:text-gold transition-colors hidden lg:block">
          <ChevronLeft size={32} />
        </button>
        <button onClick={() => setCurrent((p) => (p + 1) % slides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-alabaster/60 hover:text-gold transition-colors hidden lg:block">
          <ChevronRight size={32} />
        </button>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-3">Our Philosophy</p>
            <h2 className="font-serif text-3xl lg:text-5xl mb-6">The Aurelian Standard</h2>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              We believe skincare should be an act of reverence — for your skin, for the earth, and for the ancient wisdom that guides our formulations.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {philosophyItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-8"
              >
                <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-5">
                  <item.icon size={22} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-2">Curated Selection</p>
              <h2 className="font-serif text-3xl lg:text-4xl">Bestsellers</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-sans tracking-[0.15em] uppercase text-foreground hover:text-gold transition-colors group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-sans tracking-[0.15em] uppercase text-foreground hover:text-gold transition-colors">
              View All Products <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 lg:py-32 bg-primary text-primary-foreground text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto px-4"
        >
          <p className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-4">The Royal Ritual</p>
          <h2 className="font-serif text-3xl lg:text-5xl mb-6 max-w-3xl mx-auto leading-tight">
            Your skin deserves more than products. It deserves a ritual.
          </h2>
          <p className="font-sans font-light text-primary-foreground/70 max-w-xl mx-auto mb-8">
            Discover our curated sets and build a routine that transforms not just your skin, but your daily practice of self-care.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 border border-gold text-gold hover:bg-gold hover:text-charcoal px-8 py-3.5 font-sans text-sm tracking-[0.15em] uppercase transition-all duration-300"
          >
            Begin Your Ritual <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Homepage;
