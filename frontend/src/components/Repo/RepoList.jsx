"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";

import RepoCard from "./RepoCard";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RepoList() {
  const { user, loading: authLoading } = useAuth();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || authLoading) return;

    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get("/repos");
        setRepos(res.data?.repos ?? []);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError("Failed to fetch repositories.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [user, authLoading]);

  /* ------------------------ Auth loading ------------------------ */
  if (authLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  /* ------------------------ API loading ------------------------ */
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  /* ------------------------ Error ------------------------ */
  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  /* ------------------------ Empty ------------------------ */
  if (!repos.length) {
    return (
      <p className="text-center text-muted-foreground">
        No repositories found.
      </p>
    );
  }

  /* ------------------------ Repo grid ------------------------ */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
