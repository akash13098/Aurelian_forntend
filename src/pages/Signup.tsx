import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup(name, email, password)) {
      toast.success("Welcome to the Aurelian family");
      navigate("/profile");
    } else {
      toast.error("An account with this email already exists");
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-gold font-sans text-xs tracking-[0.4em] uppercase mb-2">Join Us</p>
          <h1 className="font-serif text-3xl">Create Account</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-1 block">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors" />
          </div>
          <div>
            <label className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors" />
          </div>
          <div>
            <label className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground mb-1 block">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full border border-border bg-background px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors" />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3.5 font-sans text-sm tracking-[0.2em] uppercase hover:bg-emerald-light transition-colors">
            Create Account
          </button>
        </form>
        <p className="text-center mt-6 text-sm font-sans text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-gold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
