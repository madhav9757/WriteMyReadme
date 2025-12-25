import React from "react";
import { motion } from "framer-motion";
import { FileQuestion, ArrowLeft, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmptyState({ navigate }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-dashed bg-muted/30">
          <CardContent className="flex flex-col items-center pt-12 pb-10 px-6 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.1 
              }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/20 bg-background shadow-sm">
                <FileQuestion className="h-10 w-10 text-muted-foreground/60" />
              </div>
            </motion.div>

            <h3 className="text-xl font-semibold tracking-tight">
              No Content Available
            </h3>
            
            <p className="mt-2 mb-8 text-sm text-muted-foreground leading-relaxed">
              We couldn't find any README data to display. Please return to the generator to create or import your documentation.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <Button 
                onClick={() => navigate("/")} 
                variant="default"
                className="w-full gap-2 shadow-sm shadow-primary/20"
              >
                <PlusCircle className="h-4 w-4" />
                Generate README
              </Button>
              <Button 
                onClick={() => navigate(-1)} 
                variant="ghost"
                className="w-full gap-2 text-muted-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-xs text-muted-foreground/60 uppercase tracking-widest font-medium"
        >
          Documentation Engine v1.0
        </motion.p>
      </motion.div>
    </div>
  );
}