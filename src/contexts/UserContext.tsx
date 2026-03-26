import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface Order {
  id: string;
  date: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  status: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  orders: Order[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("aurelian_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("aurelian_orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem("aurelian_user", JSON.stringify(user));
    else localStorage.removeItem("aurelian_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("aurelian_orders", JSON.stringify(orders));
  }, [orders]);

  const signup = (name: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("aurelian_users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    const newUser = { id: crypto.randomUUID(), name, email };
    users.push({ ...newUser, password });
    localStorage.setItem("aurelian_users", JSON.stringify(users));
    setUser(newUser);
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("aurelian_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return false;
    const { password: _, ...userData } = found;
    setUser(userData);
    return true;
  };

  const logout = () => setUser(null);

  const updateProfile = (data: Partial<User>) => {
    if (user) setUser({ ...user, ...data });
  };

  const addOrder = (order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID().slice(0, 8).toUpperCase(),
      date: new Date().toISOString(),
      status: "Confirmed",
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated: !!user, orders, login, signup, logout, updateProfile, addOrder }}>
      {children}
    </UserContext.Provider>
  );
};
