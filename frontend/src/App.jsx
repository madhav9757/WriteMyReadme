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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary-foreground"
            >
              <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(hsl(var(--foreground))_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03]" />

              <AppRouter />

              <Toaster
                richColors
                closeButton
                position="top-right"
                toastOptions={{
                  className:
                    "border border-border bg-background text-foreground shadow-lg",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}