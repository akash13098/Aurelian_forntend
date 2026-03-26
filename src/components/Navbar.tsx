import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, setIsOpen } = useCart();
  const { isAuthenticated } = useUser();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const headerBg = scrolled || !isHome
    ? "bg-primary/95 glass-header"
    : "bg-transparent";

  const textColor = scrolled || !isHome ? "text-primary-foreground" : "text-primary-foreground";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className={`font-serif text-xl lg:text-2xl tracking-wider ${textColor}`}>
              <span className="gold-text">AURELIAN</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm tracking-[0.2em] uppercase font-sans font-light ${textColor} hover:text-gold transition-colors duration-300`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link to={isAuthenticated ? "/profile" : "/login"} className={`${textColor} hover:text-gold transition-colors`}>
                <User size={20} />
              </Link>
              <button onClick={() => setIsOpen(true)} className={`${textColor} hover:text-gold transition-colors relative`}>
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-charcoal text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileOpen(true)} className={`lg:hidden ${textColor}`}>
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-primary flex flex-col items-center justify-center"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-primary-foreground">
              <X size={28} />
            </button>
            <Link to="/" className="font-serif text-3xl gold-text mb-12">AURELIAN</Link>
            <nav className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="text-lg tracking-[0.3em] uppercase text-primary-foreground hover:text-gold transition-colors font-sans font-light"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Link
                  to={isAuthenticated ? "/profile" : "/login"}
                  className="text-lg tracking-[0.3em] uppercase text-gold font-sans font-light"
                >
                  {isAuthenticated ? "My Account" : "Sign In"}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
