"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GitHubLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={handleLogin}
        disabled={isLoading}
        size="sm"
        variant="outline"
        className="group relative h-9 px-4 gap-2 font-medium transition-all duration-200 hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-900 overflow-hidden"
      >
        <div className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Github className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-[360deg]" />
          )}
          <span className="text-xs">
            {isLoading ? "Connecting..." : "Continue with GitHub"}
          </span>
        </div>

        {/* Subtle background glow effect */}
        {!isLoading && (
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
        )}
      </Button>
    </motion.div>
  );
}