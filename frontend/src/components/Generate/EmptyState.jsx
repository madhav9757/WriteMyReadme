import React from "react";
import { motion } from "framer-motion";
import { Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmptyState({ navigate }) {
  return (
    <div className="flex h-screen items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 max-w-sm"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Info className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold">No README Found</h3>
        <p className="text-sm text-muted-foreground">Please generate a README first.</p>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      </motion.div>
    </div>
  );
}
