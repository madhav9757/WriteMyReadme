"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileCode,
  LayoutDashboard,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import GitHubLoginButton from "@/components/auth/GitHubLoginButton";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4">
      {/* Dynamic Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-[10%] top-[20%] h-[250px] w-[250px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <Card className="overflow-hidden border-muted-foreground/20 bg-background/60 shadow-2xl backdrop-blur-xl">
          <CardHeader className="items-center space-y-6 pt-12 text-center">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-inner"
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>

            {!user ? (
              <div className="space-y-3">
                <Badge variant="outline" className="mb-2 border-primary/30 bg-primary/5 text-primary">
                  AI-Powered Documentation
                </Badge>
                <CardTitle className="text-5xl font-extrabold tracking-tight">
                  Repo<span className="text-primary">Sensei</span>
                </CardTitle>
                <CardDescription className="mx-auto max-w-[280px] text-base leading-relaxed text-muted-foreground">
                  Transform messy codebases into professional documentation in seconds.
                </CardDescription>
              </div>
            ) : (
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold tracking-tight">
                  Welcome back, <span className="text-primary">{user.login}</span>
                </CardTitle>
                <CardDescription className="flex items-center justify-center gap-2 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Your workspace is ready
                </CardDescription>
              </div>
            )}
          </CardHeader>

          <CardContent className="px-8 pb-12 pt-4">
            <div className="relative mb-10">
              <Separator className="bg-muted-foreground/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  {user ? "Next Steps" : "Getting Started"}
                </span>
              </div>
            </div>

            {!user ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-5"
              >
                <GitHubLoginButton />
                <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground/60 uppercase tracking-tight">
                  <GithubIcon className="h-3 w-3" />
                  Authorized via GitHub OAuth
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                <Button
                  size="lg"
                  className="group h-12 gap-2 shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px]"
                  onClick={() => navigate("/generate")}
                >
                  <FileCode className="h-4 w-4" />
                  Generate
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 gap-2 border-muted-foreground/20 bg-background/50 transition-all hover:bg-muted"
                  onClick={() => navigate("/dashboard")}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="mt-12 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
            Powered by GPT-4o & Remark
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function GithubIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}