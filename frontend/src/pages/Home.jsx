"use client";

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Sparkles,
  FileCode,
  LayoutDashboard,
  ArrowRight,
  ShieldCheck,
  Github,
  Zap,
  Lock,
  CheckCircle2,
  Rocket,
  Code2,
  GitBranch,
  Star,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import GitHubLoginButton from "@/components/auth/GitHubLoginButton";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: [0.21, 0.45, 0.32, 0.9],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6">
        <Card className="w-full max-w-lg border-border/50 bg-background/50 backdrop-blur-xl">
          <CardHeader className="items-center space-y-4 pt-10">
            <Skeleton className="h-16 w-16 rounded-2xl" />
            <div className="space-y-2 text-center">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
          </CardHeader>
          <CardContent className="pb-10 pt-4">
            <Skeleton className="h-12 w-full rounded-lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const features = [
    {
      icon: Zap,
      text: "AI Analysis",
      description: "Neural codebase parsing",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      icon: Lock,
      text: "OAuth 2.0",
      description: "Scoped GitHub access",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: CheckCircle2,
      text: "Standards",
      description: "MDX & GFM compliant",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4 py-20">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <div className="absolute inset-0 bg-[grid-linear-gradient(to_right,#80808012_1px,transparent_1px),grid-linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl"
      >
        <Card className="relative overflow-hidden border-border/60 bg-background/80 shadow-2xl backdrop-blur-md">
          <div className="absolute top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <CardHeader className="items-center space-y-6 pt-16 pb-8 text-center">
            <AnimatePresence mode="wait">
              {!user ? (
                <motion.div
                  key="unauth-header"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border bg-gradient-to-b from-background to-muted shadow-sm">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="rounded-full px-4 py-1 text-[10px] uppercase tracking-widest font-bold border-primary/10">
                      v2.0 Documentation Engine
                    </Badge>
                    <CardTitle className="text-5xl md:text-6xl font-bold tracking-tight">
                      Repo<span className="text-primary">Sensei</span>
                    </CardTitle>
                    <CardDescription className="mx-auto max-w-md text-balance text-lg">
                      Elevate your repositories with high-fidelity, AI-generated documentation powered by LLMs.
                    </CardDescription>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="auth-header"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <Avatar className="h-20 w-20 border-2 border-background ring-2 ring-primary/20 shadow-lg">
                    <AvatarImage src={user.avatar_url} alt={user.login} />
                    <AvatarFallback className="text-lg">
                      {user.login?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-3xl font-bold">Welcome, {user.name || user.login}</CardTitle>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm font-medium">Verified Developer Instance</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>

          <CardContent className="px-6 md:px-16 pb-12">
            {!user ? (
              <div className="space-y-10">
                <div className="flex flex-col items-center justify-center gap-4">
                  <GitHubLoginButton />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tighter flex items-center gap-1.5">
                    <Lock className="h-3 w-3" /> No write access required for public repos
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {features.map((feature, i) => (
                    <Card key={i} className="border-border/40 bg-muted/30 transition-colors hover:bg-muted/50">
                      <CardContent className="p-5 flex flex-col items-center text-center space-y-2">
                        <div className={`p-2 rounded-lg ${feature.bg}`}>
                          <feature.icon className={`h-5 w-5 ${feature.color}`} />
                        </div>
                        <h4 className="text-sm font-semibold">{feature.text}</h4>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    className="h-16 gap-3 text-base shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => navigate("/dashboard")}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Console Dashboard
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-16 gap-3 text-base bg-background/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    onClick={() => navigate("/generate")}
                  >
                    <FileCode className="h-5 w-5 text-primary" />
                    New Generator
                  </Button>
                </div>

                <div className="rounded-xl border border-border/50 bg-muted/20 p-6">
                  <div className="grid grid-cols-3 divide-x divide-border/50">
                    <div className="px-4 text-center">
                      <p className="text-2xl font-bold">{user.public_repos || 0}</p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Repos</p>
                    </div>
                    <div className="px-4 text-center">
                      <p className="text-2xl font-bold">{user.followers || 0}</p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Followers</p>
                    </div>
                    <div className="px-4 text-center">
                      <p className="text-2xl font-bold">{user.following || 0}</p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Following</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <Separator className="bg-border/40" />
          
          <CardFooter className="justify-center py-6 bg-muted/10">
            <div className="flex items-center gap-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      <Github className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Open Source on GitHub</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="h-4 w-[1px] bg-border/60" />
              <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System Operational: GPT-4o
              </div>
            </div>
          </CardFooter>
        </Card>

        <motion.div 
          variants={itemVariants}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/50">
            Trusted by developers at
          </p>
          <div className="flex flex-wrap justify-center gap-8 grayscale opacity-30 hover:opacity-100 transition-opacity">
             <div className="flex items-center gap-2 font-bold text-lg italic"><GitBranch className="h-5 w-5"/> GitFlow</div>
             <div className="flex items-center gap-2 font-bold text-lg italic"><Code2 className="h-5 w-5"/> CodeSync</div>
             <div className="flex items-center gap-2 font-bold text-lg italic"><Star className="h-5 w-5"/> OpenSource</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}