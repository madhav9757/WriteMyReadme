"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  GitBranch,
  Star,
  Zap,
  Github,
  Plus,
  RefreshCcw,
  ExternalLink,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

import RepoList from "@/components/Repo/RepoList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;

  const stats = [
    { label: "Repositories", value: user.public_repos ?? 0, icon: GitBranch, color: "text-blue-500" },
    { label: "Followers", value: user.followers ?? 0, icon: Star, color: "text-amber-500" },
    { label: "Account Plan", value: user.plan?.name ?? "Free", icon: Zap, color: "text-purple-500" },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto space-y-8 p-4 md:p-8"
      >
        {/* Header Section */}
        <motion.header
          variants={itemVariants}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar className="h-16 w-16 border-2 border-background shadow-xl">
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback className="bg-muted text-lg">
                  {user.login?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-sm border">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Overview
                </h1>
                <Badge variant="secondary" className="h-5 px-1.5 font-mono text-[10px] uppercase">
                  PRO
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>github.com/{user.login}</span>
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                  <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sync Profile Data</TooltipContent>
            </Tooltip>
            
            <Button size="sm" className="h-9 gap-2 shadow-sm shadow-primary/20">
              <Plus className="h-4 w-4" />
              <span>Create README</span>
            </Button>
          </div>
        </motion.header>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid gap-4 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <Card key={stat.label} className="overflow-hidden border-muted/60 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold tabular-nums tracking-tight">
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content Section */}
        <motion.section variants={itemVariants}>
          <Card className="border-muted/60 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 bg-muted/20 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                  <CardTitle className="text-xl">Repositories</CardTitle>
                </div>
                <CardDescription>
                  Select a project to generate high-quality documentation using AI.
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-background font-mono text-[11px]">
                  {(user.public_repos ?? 0) + (user.total_private_repos ?? 0)}
                </Badge>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Total Assets</span>
              </div>
            </CardHeader>
            
            <Separator className="opacity-60" />

            <CardContent className="p-0">
              <div className="px-6 py-8 md:px-10">
                <RepoList />
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </TooltipProvider>
  );
}