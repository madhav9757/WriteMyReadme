"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-background text-foreground p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 12 }}
        className="mb-6"
      >
        <AlertTriangle className="w-24 h-24 text-destructive" />
      </motion.div>

      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-6xl font-extrabold mb-2"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="text-lg text-muted-foreground mb-6"
      >
        Oops! The page you are looking for does not exist.
      </motion.p>

      <Button
        onClick={() => navigate("/")}
        className="px-6 py-3"
        variant="default"
      >
        Go Back Home
      </Button>
    </div>
  );
}
