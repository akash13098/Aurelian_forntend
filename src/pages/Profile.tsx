import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { LogOut, Package, User } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const { user, isAuthenticated, logout, updateProfile, orders } = useUser();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", address: user?.address || "" });

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
    toast.success("Profile updated");
  };

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 py-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-1">Your Account</p>
              <h1 className="font-serif text-3xl">Welcome, {user?.name}</h1>
            </div>
            <button onClick={() => { logout(); navigate("/"); }} className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-destructive transition-colors">
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-card p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <User size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-sans text-sm font-medium">{user?.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <button onClick={() => setEditing(!editing)} className="text-xs font-sans text-gold hover:underline">
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>
            {editing && (
              <div className="space-y-3 mt-4">
                {(["name", "phone", "address"] as const).map((field) => (
                  <div key={field}>
                    <label className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-1 block">{field}</label>
                    <input
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                ))}
                <button onClick={handleSave} className="bg-primary text-primary-foreground px-6 py-2.5 font-sans text-sm tracking-[0.1em] uppercase hover:bg-emerald-light transition-colors">
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Orders */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package size={18} className="text-gold" />
              <h2 className="font-serif text-xl">Order History</h2>
            </div>
            {orders.length === 0 ? (
              <p className="text-sm font-sans text-muted-foreground">No orders yet. Begin your ritual today.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-card p-4 flex items-center justify-between">
                    <div>
                      <p className="font-sans text-sm font-medium">Order #{order.id}</p>
                      <p className="font-sans text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
                      <p className="font-sans text-xs text-muted-foreground">{order.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif">₹{order.total.toLocaleString("en-IN")}</p>
                      <span className="text-[10px] font-sans tracking-wider uppercase bg-primary/10 text-primary px-2 py-0.5">{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
