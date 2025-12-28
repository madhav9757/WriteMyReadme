"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
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
  MapPin,
  Building,
  Link as LinkIcon,
  Calendar,
  TrendingUp,
  Award,
  Activity,
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
import { Progress } from "@/components/ui/progress";
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
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    }
  },
};

export default function Dashboard() {
  const { user, loading, refreshUser } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshUser();
    setTimeout(() => setRefreshing(false), 1000);
  };

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto space-y-8 p-4 md:p-8">
        <div className="flex items-center gap-6">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-3 flex-1">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
        <Skeleton className="h-[600px] rounded-xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <ShieldCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-semibold mb-2">Authentication Required</p>
            <p className="text-sm text-muted-foreground mb-4">
              Please log in to view your dashboard
            </p>
            <Button onClick={() => navigate("/login")} className="w-full">
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const stats = [
    {
      label: "Repositories",
      value: user.public_repos || 0,
      icon: GitBranch,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      sublabel: "Public repos",
      trend: "+12%",
    },
    {
      label: "Followers",
      value: user.followers || 0,
      icon: Star,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10",
      sublabel: `Following ${user.following || 0}`,
      trend: "+8%",
    },
    {
      label: "Account Plan",
      value: user.plan?.name || "Free",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      sublabel: "Current tier",
      badge: true,
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

  const profileCompletion = () => {
    let score = 0;
    if (user.name) score += 20;
    if (user.bio) score += 20;
    if (user.company) score += 15;
    if (user.location) score += 15;
    if (user.blog) score += 15;
    if (user.avatar_url) score += 15;
    return score;
  };

  const completion = profileCompletion();

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1400px] mx-auto space-y-8 p-4 md:p-8"
      >
        {/* Profile Header with Parallax */}
        <motion.header
          style={{ y: headerY, opacity: headerOpacity }}
          variants={itemVariants}
          className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-background to-muted/20 p-8 shadow-xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-blue-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                <Avatar className="h-24 w-24 border-4 border-background shadow-2xl relative z-10">
                  <AvatarImage src={user.avatar_url} alt={user.login} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {user.name?.slice(0, 2).toUpperCase() || user.login?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-lg border-2 border-background"
                >
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                </motion.div>
              </motion.div>

              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
                    {user.name || user.login}
                  </h1>
                  <Badge
                    variant="secondary"
                    className="h-6 px-3 font-mono text-xs bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20"
                  >
                    <Zap className="mr-1 h-3 w-3" />
                    {user.plan?.name || "Free"}
                  </Badge>
                </div>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground max-w-2xl">
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors w-fit group"
                  >
                    <Github className="h-4 w-4" />
                    <span className="font-medium">@{user.login}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  {user.bio && (
                    <p className="text-sm leading-relaxed">{user.bio}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-xs">
                    {user.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {user.location}
                      </span>
                    )}
                    {user.company && (
                      <span className="flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-primary" />
                        {user.company}
                      </span>
                    )}
                    {user.blog && (
                      <a
                        href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 hover:text-primary transition-colors"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                        {user.blog.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                    {user.created_at && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        Joined {formatDate(user.created_at)}
                      </span>
                    )}
                  </div>

                  {/* Profile Completion */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">Profile Completion</span>
                      <span className="font-bold text-primary">{completion}%</span>
                    </div>
                    <Progress value={completion} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 hover:border-primary/40 transition-all"
                    onClick={handleRefresh}
                    disabled={refreshing}
                  >
                    <RefreshCcw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Sync Profile</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Refresh your data from GitHub</TooltipContent>
              </Tooltip>

              <Button
                size="sm"
                className="gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={() => navigate("/generate")}
              >
                <Plus className="h-4 w-4" />
                Create README
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Stats Grid with Enhanced Cards */}
        <motion.div
          variants={itemVariants}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="overflow-hidden border-muted/60 shadow-lg hover:shadow-xl transition-all relative group">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                <CardContent className="flex items-center gap-5 p-6 relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${stat.bgColor} shadow-inner relative overflow-hidden group`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                    <stat.icon className={`h-8 w-8 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                  </motion.div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
                        {stat.label}
                      </p>
                      {stat.trend && (
                        <Badge variant="secondary" className="h-5 px-2 text-[10px] text-emerald-600 dark:text-emerald-400">
                          <TrendingUp className="h-2.5 w-2.5 mr-1" />
                          {stat.trend}
                        </Badge>
                      )}
                    </div>
                    <p className="text-3xl font-bold tabular-nums tracking-tight">
                      {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                    </p>
                    {stat.sublabel && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {stat.sublabel}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Repository Section */}
        <motion.section variants={itemVariants}>
          <Card className="border-muted/60 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-muted/30 via-muted/20 to-background pb-6 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <LayoutDashboard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Your Repositories</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        Select a project to generate high-quality documentation using AI
                      </CardDescription>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className="bg-background/80 backdrop-blur-sm font-mono text-sm h-10 px-4"
                  >
                    <Award className="mr-2 h-4 w-4 text-primary" />
                    {user.public_repos || 0}
                  </Badge>
                </div>
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

        {/* Footer Stats */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="font-medium">Active Session</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-xs">Last synced: {formatDate(new Date().toISOString())}</span>
        </motion.div>
      </motion.div>
    </TooltipProvider>
  );
}