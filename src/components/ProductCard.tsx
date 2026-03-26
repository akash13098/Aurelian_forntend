import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { Product } from "@/data/products";
import { productImages } from "@/data/productImages";
import { useCart } from "@/contexts/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-card aspect-square mb-4">
          <img
            src={productImages[product.id]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            width={400}
            height={400}
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-sans px-3 py-1">
              {product.badge}
            </span>
          )}
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              addItem({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: productImages[product.id],
              });
            }}
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-3 left-3 right-3 bg-primary text-primary-foreground py-2.5 text-xs tracking-[0.2em] uppercase font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} />
            Quick Add
          </motion.button>
        </div>
      </Link>
      <Link to={`/product/${product.slug}`}>
        <h3 className="font-serif text-sm lg:text-base mb-1">{product.name}</h3>
        <div className="flex items-center gap-1 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={11} className={i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"} />
          ))}
          <span className="text-[11px] text-muted-foreground font-sans ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-sans text-sm font-medium">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="font-sans text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
