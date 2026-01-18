"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Search,
  RefreshCcw,
  FolderOpen,
  FilterX,
  AlertCircle,
  Layers,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import RepoCard from "./RepoCard";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function RepoList() {
  const { user, loading: authLoading } = useAuth();

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  /* ---------------- Fetch Repositories ---------------- */
  const fetchRepos = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/repos");
      setRepos(res.data?.repos ?? []);
    } catch (e) {
      setError(
        e.response?.status === 401
          ? "Session expired. Please sign in again."
          : "Unable to sync repositories from GitHub."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) fetchRepos();
  }, [authLoading, user]);

  /* ---------------- Filtering ---------------- */
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return repos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.language?.toLowerCase().includes(q)
    );
  }, [repos, query]);

  /* ---------------- Loading Skeleton ---------------- */
  if (loading || authLoading) {
    return (
      <div className="flex h-full flex-col gap-8 p-1">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Skeleton className="h-10 w-full max-w-md rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- Main UI ---------------- */
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex h-full min-h-0 flex-col overflow-hidden">
        {/* ---------------- Action Bar ---------------- */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between min-w-0">
          {/* Search */}
          <div className="relative w-full max-w-md min-w-0 group">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary" />

            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repositories..."
              className="h-10 rounded-lg pl-9 pr-9 bg-muted/30 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary/30"
            />

            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-muted"
                >
                  <X className="h-3 w-3 text-muted-foreground" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <Badge
              variant="outline"
              className="h-10 px-3 bg-background/50 border-dashed text-muted-foreground"
            >
              <Layers className="mr-2 h-3.5 w-3.5 opacity-60" />
              {filtered.length}
              <span className="ml-1 hidden sm:inline text-[10px] uppercase tracking-tight opacity-70">
                Repositories
              </span>
            </Badge>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchRepos}
                  className="h-10 w-10 bg-background/50 border-muted-foreground/20"
                >
                  <RefreshCcw
                    className={`h-3.5 w-3.5 transition-all ${loading ? "animate-spin text-primary" : "text-muted-foreground"
                      }`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-[10px]">
                Sync from GitHub
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <Separator className="mb-6 opacity-50" />

        {/* ---------------- Content Area ---------------- */}
        <div className="relative flex-1 min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Error */}
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex h-full items-center justify-center p-6"
              >
                <Alert className="max-w-md bg-destructive/5 border-destructive/20">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm font-semibold">
                    Sync Failure
                  </AlertTitle>
                  <AlertDescription className="text-xs mt-1">
                    {error}
                  </AlertDescription>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={fetchRepos}
                    className="mt-4 w-full h-8 text-xs"
                  >
                    Retry
                  </Button>
                </Alert>
              </motion.div>
            ) : filtered.length === 0 ? (
              /* Empty */
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center text-center px-4"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed bg-muted/30">
                  {query ? (
                    <FilterX className="h-6 w-6 text-muted-foreground/50" />
                  ) : (
                    <FolderOpen className="h-6 w-6 text-muted-foreground/50" />
                  )}
                </div>

                <h3 className="text-sm font-semibold">
                  {query ? "No matches found" : "No repositories"}
                </h3>

                <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                  {query
                    ? `No repositories match "${query}".`
                    : "Connect GitHub to sync your projects."}
                </p>

                {query && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setQuery("")}
                    className="mt-2 text-xs"
                  >
                    Reset filters
                  </Button>
                )}
              </motion.div>
            ) : (
              /* Grid */
              <ScrollArea className="h-full pr-4 -mr-4">
                <motion.div
                  key="grid"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.04 },
                    },
                  }}
                  className="grid gap-3 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                >
                  {filtered.map((repo) => (
                    <motion.div
                      key={repo.id}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: { opacity: 1, y: 0 },
                      }}
                    >
                      <RepoCard repo={repo} />
                    </motion.div>
                  ))}
                </motion.div>
              </ScrollArea>
            )}
          </AnimatePresence>
        </div>

        {/* ---------------- Footer ---------------- */}
        <footer className="border-t pt-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground/40">
          <span>{user?.login}</span>
          <span className="hidden sm:block">Live GitHub Sync</span>
        </footer>
      </div>
    </TooltipProvider>
  );
}
