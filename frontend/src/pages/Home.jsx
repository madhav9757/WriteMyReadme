"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Terminal,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  GitBranch,
  Code2,
  Star,
  Zap,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import GitHubLoginButton from "@/components/auth/GitHubLoginButton";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="relative mx-auto h-24 w-24">
            <div className="absolute inset-0 rounded-3xl bg-primary/20 animate-ping" />
            <Skeleton className="h-24 w-24 rounded-3xl" />
          </div>
          <Skeleton className="h-8 w-64 mx-auto rounded-full" />
          <Skeleton className="h-4 w-48 mx-auto rounded-full" />
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Cpu,
      text: "Multi-Model AI Engine",
      description: "Switch between Gemini, Mistral, and Llama.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      icon: Terminal,
      text: "Context-Aware Parsing",
      description: "Reads your file tree to write better docs.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      icon: ShieldCheck,
      text: "Enterprise Security",
      description: "No code storage. Ephemeral processing.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-10">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.15)_0,transparent_70%)] opacity-50 blur-3xl" />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full px-4 md:px-12 lg:px-24"
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-center">

          {/* Left Column: Hero Text */}
          <motion.div variants={fadeInUp} className="flex flex-col justify-center space-y-8 lg:col-span-7">
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-fit"
              >
                <Badge variant="outline" className="border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md shadow-[0_0_15px_-3px_rgba(var(--primary-rgb),0.3)]">
                  <Sparkles className="mr-2 h-3.5 w-3.5 fill-primary animate-pulse" />
                  Powered by Advanced AI
                </Badge>
              </motion.div>

              <h1 className="text-6xl font-extrabold tracking-tight md:text-7xl lg:text-8xl leading-[0.9]">
                Write My <span className="gradient-primary">Readme</span>
              </h1>

              <p className="max-w-2xl text-balance text-lg font-medium text-muted-foreground md:text-xl leading-relaxed">
                Stop writing documentation manually. Let our intelligent agents parse your codebase and generate <span className="text-foreground font-semibold">beautiful, comprehensive READMEs</span> in seconds.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {!user ? (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                  <div className="relative bg-background rounded-lg">
                    <GitHubLoginButton />
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Button size="lg" className="h-14 px-8 text-base font-bold shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base font-bold backdrop-blur-sm transition-all hover:bg-accent hover:text-accent-foreground border-primary/20" onClick={() => navigate("/generate")}>
                    <Zap className="mr-2 h-4 w-4 text-amber-500" />
                    Generate Now
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground/80 pt-4">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`h-9 w-9 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold shadow-sm z-${10 - i}`}>
                    {i === 3 ? "2k+" : ""}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-xs mt-0.5">Trusted by developers worldwide</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: User Card or Features */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 perspective-1000">
            <Card className="card-enhanced relative overflow-hidden backdrop-blur-3xl bg-background/30 border-white/10 dark:border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/5" />

              <CardContent className="p-8 relative">
                {user ? (
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary to-blue-500 blur-sm opacity-50" />
                        <Avatar className="h-24 w-24 border-4 border-background relative shadow-xl">
                          <AvatarImage src={user.avatar_url} />
                          <AvatarFallback className="text-2xl font-bold bg-muted">{user.login?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-green-500 border-4 border-background" />
                      </div>
                      <div className="space-y-1">
                        <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary hover:bg-primary/20">
                          {user.plan?.name || "Free Tier"}
                        </Badge>
                        <h3 className="text-3xl font-bold tracking-tight">{user.name || user.login}</h3>
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                          <GitBranch className="h-3.5 w-3.5" />
                          @{user.login}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Repos", val: user.public_repos, icon: Code2 },
                        { label: "Stars", val: user.followers, icon: Star },
                        { label: "Used", val: "12", icon: Zap }
                      ].map((stat) => (
                        <div key={stat.label} className="group relative overflow-hidden rounded-2xl bg-muted/40 p-4 text-center border border-border/10 transition-all hover:bg-muted/60 hover:scale-105">
                          <div className="flex justify-center mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <stat.icon className="h-5 w-5" />
                          </div>
                          <p className="text-xl font-bold">{stat.val || 0}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-muted-foreground">Monthly Tokens</span>
                        <span>650 / 1000</span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden relative">
                        <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "65%" }}
                          className="h-full bg-gradient-to-r from-primary to-blue-500 relative"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-5">
                    {features.map((f, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        key={i}
                        className={`group flex items-start gap-4 rounded-2xl p-4 transition-all hover:bg-muted/50 border border-transparent hover:border-border/50 ${f.bg} bg-opacity-30`}
                      >
                        <div className={`mt-1 rounded-xl p-3 bg-background shadow-sm ${f.color}`}>
                          <f.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{f.text}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                        </div>
                      </motion.div>
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
          className="mt-32 flex flex-col items-center gap-8 border-t border-border/20 pt-16"
        >
          <div className="flex flex-wrap justify-center gap-16 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0 duration-700">
            <div className="flex items-center gap-3 text-2xl font-black font-mono tracking-tighter"><GitBranch className="h-8 w-8 text-primary" /> GitFlow</div>
            <div className="flex items-center gap-3 text-2xl font-black font-mono tracking-tighter"><Code2 className="h-8 w-8 text-blue-500" /> CodeSync</div>
            <div className="flex items-center gap-3 text-2xl font-black font-mono tracking-tighter"><Terminal className="h-8 w-8 text-purple-500" /> DevTools</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}