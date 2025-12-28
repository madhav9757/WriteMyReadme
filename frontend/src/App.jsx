"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import AppRouter from "./routers/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/theme-provider";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Preload critical fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
            <div className="relative h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          </div>
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Loading RepoSensei...
          </p>
        </motion.div>
      </div>
    );
  }

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
              {/* Animated background grid */}
              <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--foreground))_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] animate-[grid_20s_linear_infinite]" />
                
                {/* Gradient orbs */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]"
                />
              </div>

              <AppRouter />

              <Toaster
                richColors
                closeButton
                position="top-right"
                expand={false}
                visibleToasts={3}
                toastOptions={{
                  className:
                    "border border-border bg-background text-foreground shadow-lg backdrop-blur-xl",
                  style: {
                    backdropFilter: "blur(12px)",
                  },
                }}
              />
            </motion.div>
          </AnimatePresence>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

// Add keyframes for grid animation in your CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes grid {
    0% { transform: translate(0, 0); }
    100% { transform: translate(16px, 16px); }
  }
`;
document.head.appendChild(style);