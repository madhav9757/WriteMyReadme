"use client";

import { AnimatePresence, motion } from "framer-motion";

import AppRouter from "./routers/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/theme-provider";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider delayDuration={150}>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <motion.div
              key="app-root"
              className="min-h-screen bg-background text-foreground antialiased"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <AppRouter />
              <Toaster richColors closeButton />
            </motion.div>
          </AnimatePresence>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
