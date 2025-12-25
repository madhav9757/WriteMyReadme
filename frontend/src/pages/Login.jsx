"use client";

import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  const loginWithGithub = () => {
    window.location.href = "http://localhost:5000/auth/github";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border bg-muted">
              <Github className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-2xl">AI README Generator</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Login with your GitHub account to start generating professional READMEs.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-4">
            <Separator />
            <Button
              variant="default"
              className="w-full flex items-center justify-center gap-2"
              onClick={loginWithGithub}
            >
              <Github className="h-4 w-4" />
              Login with GitHub
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
