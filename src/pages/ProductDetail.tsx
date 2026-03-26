import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowLeft, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { productImages } from "@/data/productImages";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";

const tabs = ["The Ritual", "The Alchemy", "Clinical Results"] as const;

const ProductDetail = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("The Ritual");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl mb-4">Product not found</h1>
          <Link to="/shop" className="text-gold hover:underline font-sans text-sm">Return to Shop</Link>
        </div>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);
  const subscriptionPrice = Math.round(product.price * 0.85);

  const tabContent: Record<typeof tabs[number], string> = {
    "The Ritual": product.howToUse,
    "The Alchemy": product.ingredients,
    "Clinical Results": product.clinicalResults,
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="aspect-square bg-card overflow-hidden">
            <img src={productImages[product.id]} alt={product.name} className="w-full h-full object-cover" width={800} height={800} />
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            {product.badge && (
              <span className="inline-block bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-sans px-3 py-1 mb-4">
                {product.badge}
              </span>
            )}
            <h1 className="font-serif text-3xl lg:text-4xl mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-sans">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <p className="font-sans text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Pricing */}
            <div className="border border-border p-5 mb-6 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="purchase" defaultChecked className="accent-primary" />
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-sans text-sm">One-time purchase</span>
                  <div className="flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through font-sans">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                    )}
                    <span className="font-serif text-lg">₹{product.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </label>
              <div className="border-t border-border" />
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="purchase" className="accent-primary" />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <span className="font-sans text-sm">Royal Subscription</span>
                    <span className="ml-2 text-[10px] font-sans tracking-wider uppercase bg-gold/20 text-gold-dark px-2 py-0.5">Save 15%</span>
                  </div>
                  <span className="font-serif text-lg">₹{subscriptionPrice.toLocaleString("en-IN")}</span>
                </div>
              </label>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-3 mb-8">
              <div className="flex items-center border border-border">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-3 hover:bg-muted transition-colors">
                  <Minus size={14} />
                </button>
                <span className="px-4 font-sans text-sm">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-3 hover:bg-muted transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addItem({ productId: product.id, name: product.name, price: product.price, image: productImages[product.id] });
                  }
                }}
                className="flex-1 bg-primary text-primary-foreground py-3 font-sans text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-emerald-light transition-colors"
              >
                <ShoppingBag size={16} /> Add to Ritual
              </button>
            </div>

            {/* Tabs */}
            <div className="border-t border-border pt-6">
              <div className="flex gap-6 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-sans text-sm pb-2 border-b-2 transition-all ${
                      activeTab === tab ? "border-gold text-foreground" : "border-transparent text-muted-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{tabContent[activeTab]}</p>
            </div>
          </motion.div>
        </div>

        {/* Related */}
        <div className="mt-20 lg:mt-28">
          <h2 className="font-serif text-2xl lg:text-3xl mb-8 text-center">Complete Your Ritual</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
