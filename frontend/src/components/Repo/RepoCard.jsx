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
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";

export default function RepoCard({ repo }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (loading || !user?.login || !repo?.name) return;
    setLoading(true);
    try {
      const res = await api.post("/readme/generate", {
        owner: user.login,
        repo: repo.name,
      });
      if (res.data?.success) {
        navigate("/generate", {
          state: { readme: res.data.data, repo: repo.name },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="h-full"
    >
      <Card
        className="
          group relative flex h-full flex-col
          overflow-hidden
          border-border/40 bg-card/40 backdrop-blur-md
          transition-all hover:border-primary/40
        "
      >
        {/* Hover gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* ---------- HEADER ---------- */}
        <CardHeader className="relative z-10 pb-2">
          <div className="flex items-start justify-between gap-3 min-w-0">
            <div className="min-w-0 flex-1">
              <CardTitle
                className="truncate text-sm font-semibold tracking-tight"
                title={repo.name}
              >
                {repo.name}
              </CardTitle>

              <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                {repo.language && (
                  <span className="flex items-center gap-1 truncate">
                    <Circle className="h-2 w-2 fill-primary text-primary" />
                    {repo.language}
                  </span>
                )}

                <span className="flex items-center gap-1 shrink-0">
                  <Star className="h-3 w-3 text-amber-500" />
                  {repo.stargazers_count || 0}
                </span>
              </div>
            </div>

            <Badge
              variant={repo.fork ? "secondary" : "outline"}
              className="shrink-0 text-[10px]"
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
        <CardContent className="relative z-10 flex-1 min-h-0 px-4">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {repo.description ||
              "Ready for clean, high-quality README generation."}
          </p>
        </CardContent>

        {/* ---------- FOOTER ---------- */}
        <CardFooter className="relative z-10 flex gap-2 pt-2">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-9 w-9 shrink-0"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="h-9 w-[80%] font-semibold active:scale-[0.97]"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center"
                >
                  <BookOpen className="mr-2 h-4 w-2" />
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
