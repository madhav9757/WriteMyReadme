"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      toast({ title: "Logged out successfully", type: "info" });
    } catch (err) {
      console.error("Logout failed:", err);
      toast({ title: "Logout failed", type: "error" });
    }
  };

  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
