"use client";

import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

import Header from "@/components/Layout/Header";
import Dashboard from "@/pages/Dashboard";
import Generate from "@/components/Generate/Generate";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <div className="h-screen">
      <Header />

      <Separator />

      <ScrollArea className="flex-1">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className="container mx-auto max-w-7xl px-6 py-6"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute redirectTo="/">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/generate"
                element={
                  <ProtectedRoute redirectTo="/">
                    <Generate />
                  </ProtectedRoute>
                }
              />

              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
}
