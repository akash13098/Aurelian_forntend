import React from "react";
import { motion } from "framer-motion";
import { Leaf, Sparkles, Heart, Globe } from "lucide-react";

const values = [
  { icon: Leaf, title: "Clean Beauty", desc: "Every formula is free from parabens, sulfates, and synthetic fragrances. We choose ingredients that honour both your skin and the earth." },
  { icon: Sparkles, title: "Efficacy First", desc: "We don't believe in marketing-driven skincare. Every product is backed by clinical testing and dermatologist approval." },
  { icon: Heart, title: "Cruelty-Free", desc: "We will never test on animals. Our commitment to compassion is non-negotiable and certified by Leaping Bunny." },
  { icon: Globe, title: "Sustainable Practice", desc: "From recyclable packaging to carbon-neutral shipping, we're building a brand that gives back more than it takes." },
];

const About = () => (
  <div className="pt-20 lg:pt-24 min-h-screen">
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-3">Our Story</p>
          <h1 className="font-serif text-4xl lg:text-6xl mb-8">Born from Reverence</h1>
          <p className="font-sans text-muted-foreground leading-relaxed text-lg font-light max-w-2xl mx-auto mb-6">
            Aurelian was born from a simple belief: your skin deserves more than mass-produced formulas. It deserves intention, craft, and the finest ingredients nature and science can offer.
          </p>
          <p className="font-sans text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
            Founded in 2024, we set out to create "quiet luxury" skincare — products that speak through results, not noise. Every bottle carries the weight of research, the warmth of natural botanicals, and the brilliance of clinical innovation.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-16 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-serif text-3xl text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0">
                <v.icon size={20} className="text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-lg mb-2">{v.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
