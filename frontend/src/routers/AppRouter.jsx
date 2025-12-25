"use client";

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

import Header from "@/components/Layout/Header";
import Dashboard from "@/pages/Dashboard";
import Generate from "@/components/Generate/Generate";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function AppRouter() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div className="relative flex h-screen w-screen flex-col bg-background text-foreground antialiased">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Header />
        <Separator />
      </header>

      <main className="relative flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                "container mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col px-4 py-6 md:px-8"
              )}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />

                <Route
                  path="/login"
                  element={ <Login />}
                />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute >
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/generate"
                  element={
                    <ProtectedRoute>
                      <Generate />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </ScrollArea>
      </main>
    </div>
  );
}
