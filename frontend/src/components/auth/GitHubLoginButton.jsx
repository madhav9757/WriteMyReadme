"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

export default function GitHubLoginButton() {
  const handleLogin = () => {
    // Redirect to backend GitHub OAuth
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={handleLogin}
        variant="default"
        className="flex items-center gap-2"
      >
        <Github className="w-5 h-5" />
        Login with GitHub
      </Button>
    </motion.div>
  );
}
