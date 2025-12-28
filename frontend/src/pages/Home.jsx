"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-4">
        <Card className="w-full max-w-lg border-muted-foreground/20 bg-background/60 shadow-2xl backdrop-blur-xl">
          <CardHeader className="items-center space-y-6 pt-12 text-center">
            <Skeleton className="h-16 w-16 rounded-2xl" />
            <div className="space-y-3 w-full">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-12 pt-4">
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const features = [
    { icon: Zap, text: "AI-powered analysis" },
    { icon: Lock, text: "Secure GitHub OAuth" },
    { icon: CheckCircle2, text: "Professional docs" },
  ];

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
              whileHover={{ rotate: 15, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                <CardDescription className="mx-auto max-w-[300px] text-base leading-relaxed text-muted-foreground">
                  Transform messy codebases into professional documentation in seconds.
                </CardDescription>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={user.avatar_url} alt={user.login} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name?.slice(0, 2).toUpperCase() || user.login?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <CardTitle className="text-2xl font-bold tracking-tight">
                      Welcome back,
                    </CardTitle>
                    <p className="text-lg text-primary font-semibold">
                      {user.name || user.login}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <CardDescription className="text-sm font-medium">
                    Your workspace is ready · {user.public_repos || 0} repositories
                  </CardDescription>
                </div>

                {user.bio && (
                  <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
                    {user.bio}
                  </p>
                )}
              </div>
            )}
          </CardHeader>

          <CardContent className="px-8 pb-12 pt-4">
            <div className="relative mb-10">
              <Separator className="bg-muted-foreground/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-background px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  {user ? "Quick Actions" : "Getting Started"}
                </span>
              </div>
            </div>

            {!user ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <GitHubLoginButton />
                
                <div className="space-y-3">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <feature.icon className="h-4 w-4 text-primary" />
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground/60 uppercase tracking-tight justify-center pt-2">
                  <Github className="h-3 w-3" />
                  Authorized via GitHub OAuth
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <Button
                  size="lg"
                  className="w-full group h-12 gap-2 shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px]"
                  onClick={() => navigate("/dashboard")}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-12 gap-2 border-muted-foreground/20 bg-background/50 transition-all hover:bg-muted"
                  onClick={() => navigate("/generate")}
                >
                  <FileCode className="h-4 w-4" />
                  Generate README
                </Button>

                {/* User Stats */}
                <div className="grid grid-cols-3 gap-2 pt-4 text-center">
                  <div className="space-y-1">
                    <p className="text-lg font-bold">{user.public_repos || 0}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Repos</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-bold">{user.followers || 0}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Followers</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-bold">{user.following || 0}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Following</p>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="mt-12 text-center space-y-2"
        >
          {user && (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback className="text-[8px]">
                  {user.login?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>Logged in as @{user.login}</span>
            </div>
          )}
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/40">
            Powered by GPT-4o & GitHub
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}