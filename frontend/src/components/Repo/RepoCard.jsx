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

  const handleGenerate = async () => {
    if (loading || !user?.login) return;
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? 90 : p + 10));
    }, 300);

    try {
      const res = await api.post("/readme/generate", {
        owner: user.login,
        repo: repo.name,
      });

      setProgress(100);

      if (res.data?.success) {
        toast.success("README Generated");
        navigate("/generate", {
          state: { readme: res.data.data, repo: repo.name },
        });
      }
    } catch {
      toast.error("Generation Failed");
    } finally {
      clearInterval(interval);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 400);
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "Recent";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full min-w-0"
    >
      <Card className="relative flex h-full flex-col overflow-hidden border border-border/60 bg-card">
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-0 z-20"
            >
              <Progress value={progress} className="h-1 rounded-none" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <CardHeader className="p-4 pb-2 min-w-0">
          <div className="flex items-start justify-between gap-2 min-w-0">
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate text-sm font-semibold">
                {repo.name}
              </CardTitle>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                {repo.language && (
                  <span className="flex items-center gap-1 truncate">
                    <span
                      className={`h-2 w-2 rounded-full ${languageColors[repo.language] || "bg-gray-400"}`}
                    />
                    {repo.language}
                  </span>
                )}

                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {repo.stargazers_count}
                </span>

                {repo.forks_count > 0 && (
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {repo.forks_count}
                  </span>
                )}

                {repo.watchers_count > 0 && (
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {repo.watchers_count}
                  </span>
                )}
              </div>
            </div>

            <Badge variant="outline" className="shrink-0 text-[10px]">
              {repo.fork ? "Fork" : "Source"}
            </Badge>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-1 min-h-0 px-4 py-2">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {repo.description || "AI-ready repository documentation"}
          </p>

          <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(repo.updated_at)}
            </span>

            {repo.default_branch && (
              <span className="flex items-center gap-1">
                <GitBranch className="h-3 w-3" />
                {repo.default_branch}
              </span>
            )}
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex gap-2 p-4 pt-2">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
          >
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="h-9 flex-1 truncate"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <BookOpen className="mr-2 h-4 w-4" />
                Generate README
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
