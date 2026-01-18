"use client";

import { motion } from "framer-motion";
import {
  Github,
  Zap,
  Plus,
  RefreshCcw,
  ShieldCheck,
  MapPin,
  Building,
  Link as LinkIcon,
  Calendar,
  ExternalLink,
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
  const completion =
    (user.name ? 20 : 0) +
    (user.bio ? 20 : 0) +
    (user.company ? 15 : 0) +
    (user.location ? 15 : 0) +
    (user.blog ? 15 : 0) +
    (user.avatar_url ? 15 : 0);

  return (
    <motion.header
      style={{ y: headerY, opacity: headerOpacity }}
      className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background to-muted/20 p-8 shadow-xl"
    >
      <div className="flex flex-col lg:flex-row gap-6 justify-between">
        <div className="flex gap-6">
          <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>
              {user.login?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-4xl font-bold">{user.name || user.login}</h1>
              <Badge variant="secondary">
                <Zap className="h-3 w-3 mr-1" />
                {user.plan?.name || "Free"}
              </Badge>
            </div>

            <a
              href={user.html_url}
              target="_blank"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <Github className="h-4 w-4" />
              @{user.login}
              <ExternalLink className="h-3 w-3" />
            </a>

            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
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
                  href={user.blog}
                  target="_blank"
                  className="flex items-center gap-1 hover:text-primary"
                >
                  <LinkIcon className="h-3 w-3" />
                  Blog
                </a>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Joined GitHub
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Profile Completion</span>
                <span className="font-semibold">{completion}%</span>
              </div>
              <Progress value={completion} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 flex-col">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                disabled={refreshing}
              >
                <RefreshCcw
                  className={`h-4 w-4 mr-2 ${
                    refreshing ? "animate-spin" : ""
                  }`}
                />
                Sync Profile
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh GitHub data</TooltipContent>
          </Tooltip>

          <Button size="sm" onClick={onGenerate}>
            <Plus className="h-4 w-4 mr-2" />
            Create README
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
