"use client";

import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Sparkles,
  FileCode,
  LayoutDashboard,
  ShieldCheck,
  Github,
  Zap,
  Lock,
  CheckCircle2,
  Code2,
  GitBranch,
  Star,
  Terminal,
  Cpu,
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6">
        <div className="w-full max-w-md space-y-4 text-center">
          <Skeleton className="h-20 w-20 rounded-3xl mx-auto animate-pulse" />
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Cpu,
      text: "Neural Engine",
      description: "Context-aware code parsing",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Terminal,
      text: "Developer First",
      description: "Clean Markdown & MDX",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: ShieldCheck,
      text: "Enterprise Grade",
      description: "Secure OAuth integration",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-10">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.08)_0,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-5xl"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column: Hero Text */}
          <motion.div variants={fadeInUp} className="flex flex-col justify-center space-y-8 lg:col-span-7">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit border-primary/20 bg-primary/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">
                <Sparkles className="mr-2 h-3 w-3 fill-primary" />
                Now Powered by GPT-4o
              </Badge>
              <h1 className="text-6xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
                Repo<span className="bg-gradient-to-b from-primary to-primary/60 bg-clip-text text-transparent">Sensei</span>
              </h1>
              <p className="max-w-xl text-balance text-lg font-medium text-muted-foreground md:text-xl">
                The intelligent layer for your codebase. Transform complex repositories into elegant, readable documentation in seconds.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {!user ? (
                <GitHubLoginButton />
              ) : (
                <div className="flex gap-4">
                  <Button size="lg" className="h-14 px-8 text-base font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold backdrop-blur-sm transition-all hover:bg-background/80" onClick={() => navigate("/generate")}>
                    Start Generating
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground/60">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted" />
                ))}
              </div>
              <span>Joined by 2,000+ developers</span>
            </div>
          </motion.div>

          {/* Right Column: User Card or Features */}
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <Card className="relative overflow-hidden border-border/40 bg-background/40 shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
              
              <CardContent className="p-8">
                {user ? (
                  <div className="space-y-8">
                    <div className="flex items-center gap-5">
                      <Avatar className="h-20 w-20 border-4 border-background shadow-2xl">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback className="text-xl font-bold">{user.login?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-2xl font-bold">{user.name || user.login}</h3>
                        <p className="text-sm font-medium text-muted-foreground">@{user.login}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Repos", val: user.public_repos },
                        { label: "Stars", val: user.followers },
                        { label: "Follow", val: user.following }
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl bg-muted/30 p-4 text-center border border-border/20">
                          <p className="text-xl font-bold">{stat.val || 0}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Account Status</span>
                        <span className="flex items-center gap-1.5 font-bold text-emerald-500">
                          <CheckCircle2 className="h-4 w-4" /> Pro Plan
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: "65%" }} 
                          className="h-full bg-primary" 
                        />
                      </div>
                      <p className="text-[10px] text-center text-muted-foreground uppercase font-bold">Usage: 650 / 1000 tokens</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {features.map((f, i) => (
                      <div key={i} className="group flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-muted/50">
                        <div className={`mt-1 rounded-xl p-2.5 ${f.bg} ${f.color} transition-transform group-hover:scale-110`}>
                          <f.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold">{f.text}</h4>
                          <p className="text-sm text-muted-foreground">{f.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer Logos */}
        <motion.div 
          variants={fadeInUp}
          className="mt-24 flex flex-col items-center gap-8 border-t border-border/40 pt-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground/40">
            Engineered for modern workflows
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale transition-all hover:opacity-100 hover:grayscale-0">
             <div className="flex items-center gap-2 text-xl font-black"><GitBranch className="text-primary"/> GitFlow</div>
             <div className="flex items-center gap-2 text-xl font-black"><Code2 className="text-primary"/> CodeSync</div>
             <div className="flex items-center gap-2 text-xl font-black"><Star className="text-primary"/> OpenSource</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}