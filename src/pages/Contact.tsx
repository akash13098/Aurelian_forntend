import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent. Our Royal Support team will respond shortly.");
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-2">Royal Support</p>
          <h1 className="font-serif text-4xl lg:text-5xl">Get in Touch</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <div className="space-y-6 mb-8">
              {[
                { icon: Mail, label: "hello@aurelianskin.com" },
                { icon: Phone, label: "+91 98765 43210" },
                { icon: MapPin, label: "Mumbai, India" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
                    <item.icon size={16} className="text-gold" />
                  </div>
                  <span className="font-sans text-sm">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Our Royal Support team responds within 24 hours. For urgent inquiries, please call us during business hours (10 AM – 7 PM IST).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {["Name", "Email"].map((field) => (
              <div key={field}>
                <label className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-1 block">{field}</label>
                <input required type={field === "Email" ? "email" : "text"} className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors" />
              </div>
            ))}
            <div>
              <label className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-1 block">Message</label>
              <textarea required rows={5} className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors resize-none" />
            </div>
            <button type="submit" disabled={sent} className="w-full bg-primary text-primary-foreground py-3.5 font-sans text-sm tracking-[0.2em] uppercase hover:bg-emerald-light transition-colors disabled:opacity-50">
              {sent ? "Message Sent ✓" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
