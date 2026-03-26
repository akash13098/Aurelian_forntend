import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { productImages } from "@/data/productImages";

const FREE_SHIPPING_THRESHOLD = 999;

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, itemCount } = useCart();
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 z-[70]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-[70] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-serif text-lg">Your Ritual ({itemCount})</h2>
              <button onClick={() => setIsOpen(false)} className="text-foreground hover:text-gold transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Free shipping bar */}
            <div className="px-6 py-3 bg-muted">
              <div className="flex justify-between text-xs font-sans mb-1.5">
                <span>{remaining > 0 ? `₹${remaining} away from free shipping` : "🎉 Free shipping unlocked!"}</span>
                <span>₹{FREE_SHIPPING_THRESHOLD}</span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full gold-shimmer rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-muted-foreground mb-4" />
                  <p className="font-serif text-lg mb-2">Your ritual awaits</p>
                  <p className="text-sm text-muted-foreground font-sans">Add products to begin your skincare journey</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <img
                        src={productImages[item.productId] || item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                        loading="lazy"
                        width={80}
                        height={80}
                      />
                      <div className="flex-1">
                        <h4 className="font-serif text-sm leading-tight">{item.name}</h4>
                        <p className="text-sm font-sans text-gold font-medium mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-6 h-6 rounded border border-border flex items-center justify-center hover:border-gold transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-sans w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-6 h-6 rounded border border-border flex items-center justify-center hover:border-gold transition-colors">
                            <Plus size={12} />
                          </button>
                          <button onClick={() => removeItem(item.productId)} className="ml-auto text-xs text-muted-foreground hover:text-destructive font-sans">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex justify-between mb-4">
                  <span className="font-sans text-sm">Subtotal</span>
                  <span className="font-serif text-lg">₹{total.toLocaleString("en-IN")}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-primary text-primary-foreground text-center py-3.5 font-sans text-sm tracking-[0.2em] uppercase hover:bg-emerald-light transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
