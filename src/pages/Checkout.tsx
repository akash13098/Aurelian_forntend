import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, Smartphone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { productImages } from "@/data/productImages";

const steps = ["Information", "Shipping", "Payment"] as const;

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { isAuthenticated, user, addOrder } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const shipping = total >= 999 ? 0 : 79;
  const grandTotal = total + shipping;

  const handlePlace = () => {
    addOrder({
      items: items.map((i) => ({ productId: i.productId, name: i.name, price: i.price, quantity: i.quantity })),
      total: grandTotal,
    });
    clearCart();
    setShowSuccess(true);
    setTimeout(() => navigate("/"), 3000);
  };

  if (items.length === 0 && !showSuccess) {
    navigate("/shop");
    return null;
  }

  if (showSuccess) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-full gold-shimmer flex items-center justify-center mx-auto mb-6"
          >
            <Check size={32} className="text-charcoal" />
          </motion.div>
          <h1 className="font-serif text-3xl mb-3">Order Confirmed</h1>
          <p className="font-sans text-muted-foreground">Your royal ritual is on its way. Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-4xl">
        <h1 className="font-serif text-3xl text-center mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              {i > 0 && <div className={`h-px w-12 ${i <= step ? "bg-gold" : "bg-border"}`} />}
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans ${
                  i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-sm font-sans hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="info" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <h2 className="font-serif text-xl mb-4">Contact Information</h2>
                  {(["name", "email", "phone"] as const).map((field) => (
                    <div key={field}>
                      <label className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-1 block">{field}</label>
                      <input
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  ))}
                  <button onClick={() => setStep(1)} className="w-full bg-primary text-primary-foreground py-3 font-sans text-sm tracking-[0.2em] uppercase hover:bg-emerald-light transition-colors mt-4">
                    Continue to Shipping
                  </button>
                </motion.div>
              )}
              {step === 1 && (
                <motion.div key="ship" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <h2 className="font-serif text-xl mb-4">Shipping Address</h2>
                  {(["address", "city", "pincode"] as const).map((field) => (
                    <div key={field}>
                      <label className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-1 block">{field}</label>
                      <input
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                  ))}
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => setStep(0)} className="flex-1 border border-border py-3 font-sans text-sm tracking-[0.1em] uppercase hover:bg-muted transition-colors">Back</button>
                    <button onClick={() => setStep(2)} className="flex-1 bg-primary text-primary-foreground py-3 font-sans text-sm tracking-[0.2em] uppercase hover:bg-emerald-light transition-colors">Continue to Payment</button>
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="pay" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                  <h2 className="font-serif text-xl mb-4">Payment</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setPaymentMethod("upi")}
                      className={`flex-1 border p-4 flex flex-col items-center gap-2 transition-all ${paymentMethod === "upi" ? "border-gold bg-gold/5" : "border-border"}`}
                    >
                      <Smartphone size={20} className={paymentMethod === "upi" ? "text-gold" : "text-muted-foreground"} />
                      <span className="font-sans text-sm">Pay with UPI</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`flex-1 border p-4 flex flex-col items-center gap-2 transition-all ${paymentMethod === "card" ? "border-gold bg-gold/5" : "border-border"}`}
                    >
                      <CreditCard size={20} className={paymentMethod === "card" ? "text-gold" : "text-muted-foreground"} />
                      <span className="font-sans text-sm">Credit/Debit Card</span>
                    </button>
                  </div>
                  {paymentMethod === "upi" && (
                    <div>
                      <label className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-1 block">UPI ID</label>
                      <input placeholder="name@upi" className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  )}
                  {paymentMethod === "card" && (
                    <div className="space-y-3">
                      <input placeholder="Card Number" className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors" />
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="MM/YY" className="border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors" />
                        <input placeholder="CVV" className="border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors" />
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => setStep(1)} className="flex-1 border border-border py-3 font-sans text-sm tracking-[0.1em] uppercase hover:bg-muted transition-colors">Back</button>
                    <button onClick={handlePlace} className="flex-1 gold-shimmer text-charcoal py-3 font-sans text-sm tracking-[0.2em] uppercase font-medium">
                      Pay ₹{grandTotal.toLocaleString("en-IN")}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-card p-6 sticky top-28">
              <h3 className="font-serif text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <img src={productImages[item.productId] || item.image} alt={item.name} className="w-14 h-14 object-cover rounded" width={56} height={56} />
                    <div className="flex-1">
                      <p className="font-sans text-sm leading-tight">{item.name}</p>
                      <p className="text-xs text-muted-foreground font-sans">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-sans text-sm">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm font-sans">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="font-sans text-sm font-medium">Total</span>
                  <span className="font-serif text-xl">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
