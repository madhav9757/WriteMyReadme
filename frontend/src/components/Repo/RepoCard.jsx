"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  BookOpen,
  Loader2,
  Circle,
  Eye,
  ExternalLink,
  GitBranch,
  Clock,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const languageColors = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  Python: "bg-blue-600",
  Java: "bg-orange-600",
  Go: "bg-cyan-500",
  Rust: "bg-orange-700",
  Ruby: "bg-red-600",
  PHP: "bg-purple-500",
  C: "bg-gray-600",
  "C++": "bg-pink-600",
  "C#": "bg-green-600",
  Swift: "bg-orange-500",
  Kotlin: "bg-purple-700",
  Dart: "bg-teal-500",
  Shell: "bg-green-500",
  HTML: "bg-orange-500",
  CSS: "bg-blue-400",
};

export default function RepoCard({ repo }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleGenerate = async () => {
    if (loading || !user?.login || !repo?.name) return;
    
    setLoading(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const res = await api.post("/readme/generate", {
        owner: user.login,
        repo: repo.name,
      });
      
      setProgress(100);
      
      if (res.data?.success) {
        toast.success("README Generated!", {
          description: `Documentation ready for ${repo.name}`,
        });
        
        setTimeout(() => {
          navigate("/generate", {
            state: { 
              readme: res.data.data, 
              repo: repo.name,
              owner: user.login,
            },
          });
        }, 500);
      }
    } catch (error) {
      toast.error("Generation Failed", {
        description: error.response?.data?.message || "Please try again",
      });
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  const languageColor = languageColors[repo.language] || "bg-gray-500";

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="h-full"
    >
      <Card
        className={`
          group relative flex h-full flex-col
          overflow-hidden
          border transition-all duration-300
          ${hovered 
            ? 'border-primary/60 shadow-2xl shadow-primary/10' 
            : 'border-border/40 shadow-md'
          }
          bg-card/40 backdrop-blur-md
        `}
      >
        {/* Animated gradient overlay */}
        <motion.div 
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10"
        />

        {/* Glow effect */}
        <motion.div
          animate={{
            opacity: hovered ? 0.5 : 0,
          }}
          className="pointer-events-none absolute -inset-[1px] rounded-lg bg-gradient-to-r from-primary via-blue-500 to-purple-500 blur-sm"
        />

        {/* Progress bar */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 right-0 z-20"
            >
              <Progress value={progress} className="h-1 rounded-none" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------- HEADER ---------- */}
        <CardHeader className="relative z-10 pb-3">
          <div className="flex items-start justify-between gap-3 min-w-0">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardTitle
                      className="truncate text-sm font-semibold tracking-tight hover:text-primary transition-colors cursor-pointer"
                      title={repo.name}
                      onClick={() => window.open(repo.html_url, "_blank")}
                    >
                      {repo.name}
                    </CardTitle>
                  </TooltipTrigger>
                  <TooltipContent>View on GitHub</TooltipContent>
                </Tooltip>
                
                {repo.private && (
                  <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">
                    Private
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap">
                {repo.language && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center gap-1.5 truncate group/lang cursor-default">
                        <span className={`h-2.5 w-2.5 rounded-full ${languageColor} group-hover/lang:scale-110 transition-transform`} />
                        <span className="font-medium">{repo.language}</span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Primary language</TooltipContent>
                  </Tooltip>
                )}

                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="flex items-center gap-1 shrink-0 hover:text-amber-500 transition-colors cursor-default">
                      <Star className="h-3 w-3" />
                      {repo.stargazers_count || 0}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Stars</TooltipContent>
                </Tooltip>

                {repo.forks_count > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center gap-1 shrink-0 hover:text-blue-500 transition-colors cursor-default">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Forks</TooltipContent>
                  </Tooltip>
                )}

                {repo.watchers_count > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center gap-1 shrink-0 hover:text-green-500 transition-colors cursor-default">
                        <Eye className="h-3 w-3" />
                        {repo.watchers_count}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Watchers</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>

            <Badge
              variant={repo.fork ? "secondary" : "outline"}
              className="shrink-0 text-[10px] h-5 px-2"
            >
              {repo.fork ? (
                <span className="flex items-center gap-1">
                  <GitFork className="h-3 w-3" /> Fork
                </span>
              ) : (
                "Source"
              )}
            </Badge>
          </div>
        </CardHeader>

        {/* ---------- CONTENT ---------- */}
        <CardContent className="relative z-10 flex-1 min-h-0 px-4 pb-3">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {repo.description ||
              "No description provided. Ready for AI-powered documentation generation."}
          </p>

          {/* Metadata footer */}
          <div className="flex items-center gap-3 mt-3 text-[10px] text-muted-foreground">
            {repo.updated_at && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 cursor-default">
                    <Clock className="h-3 w-3" />
                    Updated {formatDate(repo.updated_at)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Last updated</TooltipContent>
              </Tooltip>
            )}
            
            {repo.default_branch && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 cursor-default">
                    <GitBranch className="h-3 w-3" />
                    {repo.default_branch}
                  </span>
                </TooltipTrigger>
                <TooltipContent>Default branch</TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>

        {/* ---------- FOOTER ---------- */}
        <CardFooter className="relative z-10 flex gap-2 pt-3 pb-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 border-border/60 hover:border-primary/40 hover:bg-accent/50 transition-all"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub repository"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Open in GitHub</TooltipContent>
          </Tooltip>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="h-9 flex-1 font-semibold relative overflow-hidden group/btn transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
              animate={{
                x: loading ? ['-100%', '200%'] : 0,
              }}
              transition={{
                duration: 1.5,
                repeat: loading ? Infinity : 0,
                ease: 'linear',
              }}
            />
            
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center relative z-10"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing {progress}%
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center relative z-10"
                >
                  <BookOpen className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                  Generate README
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}