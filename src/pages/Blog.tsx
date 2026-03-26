import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    slug: "the-golden-hour-ritual",
    title: "The Golden Hour Ritual",
    excerpt: "How to build an evening skincare routine that transforms your skin while you sleep.",
    date: "March 15, 2026",
    category: "Rituals",
    readTime: "5 min read",
  },
  {
    slug: "decoding-vitamin-c",
    title: "Decoding Vitamin C: A Royal Guide",
    excerpt: "Not all Vitamin C is created equal. Learn why L-Ascorbic Acid reigns supreme.",
    date: "March 8, 2026",
    category: "Ingredients",
    readTime: "7 min read",
  },
  {
    slug: "sunscreen-myths",
    title: "5 Sunscreen Myths Debunked",
    excerpt: "From white cast to SPF numbers — separating fact from fiction in sun protection.",
    date: "February 28, 2026",
    category: "Education",
    readTime: "4 min read",
  },
];

const Blog = () => (
  <div className="pt-20 lg:pt-24 min-h-screen">
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <p className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-2">The Aurelian Journal</p>
        <h1 className="font-serif text-4xl lg:text-5xl">Stories & Science</h1>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-0">
        {posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border-b border-border py-10 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-gold">{post.category}</span>
              <span className="text-muted-foreground text-xs font-sans">·</span>
              <span className="text-xs font-sans text-muted-foreground">{post.date}</span>
              <span className="text-muted-foreground text-xs font-sans">·</span>
              <span className="text-xs font-sans text-muted-foreground">{post.readTime}</span>
            </div>
            <h2 className="font-serif text-2xl mb-3 group-hover:text-gold transition-colors cursor-pointer">{post.title}</h2>
            <p className="font-sans text-muted-foreground font-light leading-relaxed mb-4">{post.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-sm font-sans text-foreground group-hover:text-gold transition-colors cursor-pointer">
              Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.article>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;
