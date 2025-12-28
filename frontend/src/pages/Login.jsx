"use client";

import { motion } from "framer-motion";
import { Github, ShieldCheck, ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import GitHubLoginButton from "@/components/auth/GitHubLoginButton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mb-6 w-full max-w-md"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="gap-2 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="border-border/60 bg-background">
          <CardHeader className="items-center space-y-4 pt-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border bg-muted">
              <Lock className="h-6 w-6 text-primary" />
            </div>

            <div className="space-y-1">
              <CardTitle className="text-2xl tracking-tight">
                Sign in to RepoSensei
              </CardTitle>
              <CardDescription className="text-sm">
                Authenticate with GitHub to access your repositories
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 px-6 pb-8">
            <Separator />

            <GitHubLoginButton />

            <div className="flex gap-3 rounded-lg border bg-muted/40 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Secure access</p>
                <p className="text-xs text-muted-foreground">
                  Read-only access to repositories. No code is modified or stored.
                </p>
              </div>
            </div>

            <p className="text-center text-[11px] text-muted-foreground">
              By continuing, you agree to our terms and privacy policy.
            </p>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
          <Github className="h-3 w-3" />
          <span className="uppercase tracking-wider">
            RepoSensei · GitHub Authentication
          </span>
        </div>
      </motion.div>
    </div>
  );
}