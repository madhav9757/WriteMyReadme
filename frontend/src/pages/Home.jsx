"use client";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ArrowRight, Sparkles } from "lucide-react";

import GitHubLoginButton from "@/components/auth/GitHubLoginButton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  return (
    <div className="relative flex max-h-full items-center justify-center bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="w-full max-w-xl px-4"
      >
        <Card>
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border bg-muted">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>

            {!user ? (
              <>
                <CardTitle className="text-3xl tracking-tight">
                  RepoSensei
                </CardTitle>
                <CardDescription className="text-base">
                  Generate clean, professional README files for your GitHub
                  repositories in seconds.
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-2xl tracking-tight">
                  Welcome back,
                  <span className="ml-2 text-primary">{user.login}</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Pick a repository and start generating polished READMEs.
                </CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <Separator />

            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                <GitHubLoginButton />
              </motion.div>
            )}

            {user && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  className="flex-1"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/generate")}
                >
                  Generate README
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
