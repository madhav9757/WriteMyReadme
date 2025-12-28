"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
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
  Users,
  GitFork,
  Calendar,
  MapPin,
  Building,
  Link as LinkIcon,
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
import { Skeleton } from "@/components/ui/skeleton";
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
  const { user, loading, refreshUser } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto space-y-8 p-4 md:p-8">
        <div className="flex items-center gap-5">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-[600px]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Please log in to view dashboard</p>
      </div>
    );
  }

  const stats = [
    { 
      label: "Repositories", 
      value: user.public_repos || 0, 
      icon: GitBranch, 
      color: "text-blue-500",
      sublabel: "Public repos"
    },
    { 
      label: "Followers", 
      value: user.followers || 0, 
      icon: Star, 
      color: "text-amber-500",
      sublabel: `Following ${user.following || 0}`
    },
    { 
      label: "Account Plan", 
      value: user.plan?.name || "Free", 
      icon: Zap, 
      color: "text-purple-500",
      sublabel: "Current tier"
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto space-y-8 p-4 md:p-8"
      >
        {/* Header Section with User Info */}
        <motion.header
          variants={itemVariants}
          className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative group">
              <Avatar className="h-20 w-20 border-2 border-primary/20 shadow-xl transition-transform group-hover:scale-105">
                <AvatarImage src={user.avatar_url} alt={user.login} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user.name?.slice(0, 2).toUpperCase() || user.login?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-md border-2 border-background">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-3xl font-bold tracking-tight">
                  {user.name || user.login}
                </h1>
                <Badge variant="secondary" className="h-5 px-2 font-mono text-[10px] uppercase">
                  {user.plan?.name || "Free"}
                </Badge>
              </div>
              
              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors w-fit"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>@{user.login}</span>
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
                
                {user.bio && (
                  <p className="text-sm max-w-md leading-relaxed">{user.bio}</p>
                )}
                
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                  {user.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {user.location}
                    </span>
                  )}
                  {user.company && (
                    <span className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {user.company}
                    </span>
                  )}
                  {user.blog && (
                    <a 
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <LinkIcon className="h-3 w-3" />
                      {user.blog.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                  {user.created_at && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Joined {formatDate(user.created_at)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-9 w-9"
                  onClick={refreshUser}
                >
                  <RefreshCcw className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sync Profile Data</TooltipContent>
            </Tooltip>
            
            <Button 
              size="sm" 
              className="h-9 gap-2 shadow-sm shadow-primary/20"
              onClick={() => navigate("/generate")}
            >
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
            <Card 
              key={stat.label} 
              className="overflow-hidden border-muted/60 shadow-sm transition-all hover:shadow-md hover:border-primary/20"
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold tabular-nums tracking-tight">
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </p>
                  {stat.sublabel && (
                    <p className="text-[10px] text-muted-foreground">
                      {stat.sublabel}
                    </p>
                  )}
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
                  <CardTitle className="text-xl">Your Repositories</CardTitle>
                </div>
                <CardDescription>
                  Select a project to generate high-quality documentation using AI.
                </CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-background font-mono text-[11px]">
                  {user.public_repos || 0}
                </Badge>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">
                  Total Repositories
                </span>
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