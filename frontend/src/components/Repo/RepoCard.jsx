"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Star, BookOpen, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";

export default function RepoCard({ repo }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const owner = user?.login;

  const handleGenerate = async () => {
    if (loading) return;
    if (!owner || !repo?.name) return;

    setLoading(true);
    try {
      const res = await api.post("/readme/generate", {
        owner,
        repo: repo.name,
      });

      if (res.data?.success) {
        navigate("/generate", {
          state: { readme: res.data.data, repo: repo.name },
        });
      }
    } catch {
      alert("Failed to generate README. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full sm:w-80"
    >
      <Card className="border border-border shadow-sm hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-2">
          <CardTitle
            className="flex items-center justify-between text-base truncate"
            title={repo.name}
          >
            <span className="truncate">{repo.name}</span>
            <Star className="w-4 h-4 text-yellow-400 shrink-0" />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {repo.description || "No description provided."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 justify-center"
              >
                <Github className="w-4 h-4" />
                View
              </a>
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 justify-center flex-1 min-w-[140px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  Generate README
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
