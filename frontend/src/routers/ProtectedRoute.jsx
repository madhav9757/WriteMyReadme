"use client";

import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react"; // Assuming you have lucide-react (standard with shadcn)

export default function ProtectedRoute({ children, redirectTo = "/" }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col justify-center items-center min-h-[400px] space-y-4"
      >
        {/* 1. Animated Spinner with a subtle glow */}
        <div className="relative">
          <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full animate-pulse" />
          <Loader2 className="h-10 w-10 animate-spin text-primary relative z-10" />
        </div>
        
        {/* 2. Better Typography */}
        <p className="text-sm font-medium text-muted-foreground animate-pulse tracking-wide">
          Securing your session...
        </p>
      </motion.div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // 3. Wrap children in a motion div for a smooth entrance once auth is confirmed
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}