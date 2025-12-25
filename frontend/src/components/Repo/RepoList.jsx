"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Search,
  RefreshCcw,
  FolderOpen,
  FilterX,
  AlertCircle,
  Database,
  X,
  Layers,
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
    if (!authLoading) fetchRepos();
  }, [authLoading, user]);

  const filtered = useMemo(
    () =>
      repos.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.language?.toLowerCase().includes(query.toLowerCase())
      ),
    [repos, query]
  );

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
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-full flex-col">
        {/* Action Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative group w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repositories..."
              className="h-10 rounded-lg border-muted-foreground/20 bg-muted/30 pl-9 pr-9 focus-visible:ring-1 focus-visible:ring-primary/30"
            />
            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3 w-3" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-10 px-3 font-medium bg-background/50 border-dashed text-muted-foreground">
              <Layers className="mr-2 h-3.5 w-3.5 opacity-60" />
              {filtered.length} <span className="ml-1 hidden sm:inline text-[10px] uppercase tracking-tighter opacity-70">Repositories</span>
            </Badge>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchRepos}
                  className="h-10 w-10 border-muted-foreground/20 bg-background/50"
                >
                  <RefreshCcw
                    className={`h-3.5 w-3.5 text-muted-foreground transition-all ${loading ? "animate-spin text-primary" : "group-hover:text-foreground"}`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-[10px]">Sync from GitHub</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <Separator className="mb-6 opacity-50" />

        {/* Content Area */}
        <div className="relative flex-1 min-h-0">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex h-full items-center justify-center p-6"
              >
                <Alert variant="destructive" className="max-w-md bg-destructive/5 border-destructive/20 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm font-semibold tracking-tight">Sync Failure</AlertTitle>
                  <AlertDescription className="mt-1 text-xs opacity-90">
                    {error}
                  </AlertDescription>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={fetchRepos}
                    className="mt-4 h-8 w-full text-xs font-medium"
                  >
                    Attempt Re-sync
                  </Button>
                </Alert>
              </motion.div>
            ) : filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full flex-col items-center justify-center text-center py-20"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed bg-muted/30">
                  {query ? (
                    <FilterX className="h-6 w-6 text-muted-foreground/50" />
                  ) : (
                    <FolderOpen className="h-6 w-6 text-muted-foreground/50" />
                  )}
                </div>
                <h3 className="text-sm font-semibold tracking-tight">
                  {query ? "No matches found" : "No repositories"}
                </h3>
                <p className="mt-1 max-w-[240px] text-xs text-muted-foreground leading-relaxed">
                  {query
                    ? `We couldn't find any repositories matching "${query}".`
                    : "Connect your GitHub account to sync and manage your projects."}
                </p>
                {query && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => setQuery("")}
                    className="mt-2 text-xs text-primary"
                  >
                    Reset filters
                  </Button>
                )}
              </motion.div>
            ) : (
              <ScrollArea className="h-full pr-4 -mr-4">
                <motion.div
                  key="grid"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.03 },
                    },
                  }}
                  className="grid gap-3 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {filtered.map((repo) => (
                    <motion.div
                      key={repo.id}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <RepoCard repo={repo} />
                    </motion.div>
                  ))}
                </motion.div>
              </ScrollArea>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <footer className="mt-auto border-t pt-4 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/40">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>{user?.login}</span>
          </div>
          <span className="hidden sm:block">Automated Metadata Sync Active</span>
        </footer>
      </div>
    </TooltipProvider>
  );
}