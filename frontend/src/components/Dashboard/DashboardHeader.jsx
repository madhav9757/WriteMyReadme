"use client";

import { motion } from "framer-motion";
import {
  Github,
  Plus,
  RefreshCcw,
  MapPin,
  Building,
  Link as LinkIcon,
  Calendar,
  ExternalLink,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DashboardHeader({
  user,
  headerY,
  headerOpacity,
  refreshing,
  onRefresh,
  onGenerate,
}) {
  return (
    <motion.header
      style={{ y: headerY, opacity: headerOpacity }}
      className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-background/80 via-background/40 to-primary/5 p-8 shadow-2xl backdrop-blur-xl"
    >
      <div className="absolute top-0 right-0 -transtale-y-1/2 translate-x-1/3 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative group">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary to-blue-600 opacity-30 blur group-hover:opacity-60 transition duration-500" />
            <Avatar className="h-24 w-24 border-4 border-background relative">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="text-2xl font-bold bg-muted">
                {user.login?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-green-500 border-4 border-background" />
          </div>

          <div className="space-y-4 max-w-xl">
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{user.name || user.login}</h1>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Zap className="h-3 w-3 mr-1 fill-current" />
                  {user.plan?.name || "Free Plan"}
                </Badge>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                rel="noreferrer"
              >
                <Github className="h-3.5 w-3.5" />
                @{user.login}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-muted-foreground/80">
              {user.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {user.location}
                </span>
              )}
              {user.company && (
                <span className="flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5" />
                  {user.company}
                </span>
              )}
              {user.blog && (
                <a
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  rel="noreferrer"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto min-w-[200px]">
          {/* API Usage Section */}
          <div className="space-y-2 bg-background/50 p-4 rounded-xl border border-border/50">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">API Usage</span>
              <span className="text-primary">65%</span>
            </div>
            <Progress value={65} className="h-2" />
            <p className="text-[10px] text-muted-foreground text-right">650 / 1000 tokens</p>
          </div>

          <div className="flex gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 lg:flex-none border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
                  onClick={onRefresh}
                  disabled={refreshing}
                >
                  <RefreshCcw
                    className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""
                      }`}
                  />
                  <span className="lg:hidden">Sync</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Sync GitHub Profile</TooltipContent>
            </Tooltip>

            <Button onClick={onGenerate} className="flex-1 lg:flex-none shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
