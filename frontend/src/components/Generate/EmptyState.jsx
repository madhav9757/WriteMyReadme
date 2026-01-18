import React from "react";
import { motion } from "framer-motion";
import { FileQuestion, ArrowLeft, PlusCircle, Sparkles, Github, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EmptyState({ navigate }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-lg"
      >
        <Card className="border-dashed border-2 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden">
          <CardContent className="flex flex-col items-center pt-16 pb-12 px-8 text-center relative">

            {/* Decorative gradient orb */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />

            {/* Animated icon */}
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{
                scale: [0.8, 1, 0.9, 1],
                rotate: [-10, 0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-2xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-background/80 backdrop-blur-sm shadow-xl">
                <FileQuestion className="h-12 w-12 text-muted-foreground/70" />
              </div>
            </motion.div>

            {/* Content */}
            <div className="space-y-3 mb-8">
              <Badge variant="outline" className="mb-2 border-primary/30 bg-primary/5 text-primary">
                No Content Found
              </Badge>
              <h3 className="text-2xl font-bold tracking-tight">
                Where's the README?
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                It looks like there's no README content to display. Generate one from your repository or navigate back to try again.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <Button
                onClick={() => navigate("/dashboard")}
                className="group w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <PlusCircle className="h-4 w-4 transition-transform group-hover:rotate-90" />
                Generate README
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-1"
                >
                  <Sparkles className="h-3 w-3" />
                </motion.div>
              </Button>

              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full sm:w-auto gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>

            {/* Helpful tips */}
            <div className="mt-10 w-full space-y-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Quick Tips
              </div>
              <div className="grid gap-3 text-left">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors cursor-default"
                >
                  <Github className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Select a Repository</p>
                    <p className="text-xs text-muted-foreground">Choose from your GitHub repos to generate docs</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors cursor-default"
                >
                  <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">AI-Powered Analysis</p>
                    <p className="text-xs text-muted-foreground">We analyze your code to create perfect documentation</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors cursor-default"
                >
                  <RefreshCcw className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Regenerate Anytime</p>
                    <p className="text-xs text-muted-foreground">Not satisfied? Generate a new version instantly</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center space-y-2"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
            Write My Readme Documentation Engine
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/60">
            <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
            <span>Powered by AI · Built for Developers</span>
            <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}