import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h3 className="font-serif text-2xl gold-text mb-4">AURELIAN</h3>
          <p className="text-sm font-sans font-light leading-relaxed opacity-80">
            The Gold Standard of Minimalist Skincare. Formulated with intention, crafted with reverence.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-xs tracking-[0.3em] uppercase mb-4 text-gold">Shop</h4>
          <div className="flex flex-col gap-2">
            {["Serums", "Cleansers", "Sunscreens", "Combos"].map((item) => (
              <Link key={item} to="/shop" className="text-sm font-sans font-light opacity-70 hover:opacity-100 hover:text-gold transition-all">
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-sans text-xs tracking-[0.3em] uppercase mb-4 text-gold">Company</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: "Our Story", href: "/about" },
              { label: "The Journal", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link key={item.href} to={item.href} className="text-sm font-sans font-light opacity-70 hover:opacity-100 hover:text-gold transition-all">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-sans text-xs tracking-[0.3em] uppercase mb-4 text-gold">Connect</h4>
          <div className="flex gap-4 mb-4">
            <a href="#" className="opacity-70 hover:opacity-100 hover:text-gold transition-all"><Instagram size={18} /></a>
            <a href="#" className="opacity-70 hover:opacity-100 hover:text-gold transition-all"><Twitter size={18} /></a>
          </div>
          <p className="text-xs font-sans font-light opacity-60">hello@aurelianskin.com</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center">
        <p className="text-xs font-sans font-light opacity-50">
          © 2026 Aurelian Skin. All rights reserved. The Gold Standard of Skincare.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
